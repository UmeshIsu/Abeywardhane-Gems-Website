import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ------------------------------------------------------------------ *
 *  A cluster of faceted, brilliant-cut gemstones rendered with a
 *  lightweight custom fresnel + facet shader. A royal-blue sapphire
 *  spins at the centre, flanked by a pigeon-blood ruby and a golden
 *  yellow sapphire. They turn like 360° turntables — reproducing the
 *  look of the old rotating video with none of the per-frame canvas
 *  processing, and no environment maps or post-processing, so it stays
 *  fast on mobile.
 * ------------------------------------------------------------------ */

/* Build a round-brilliant-style cut gem as a faceted, non-indexed
   geometry. Flat per-face normals give it the crisp facets of a
   polished stone. */
function makeBrilliantGeometry({
  sides = 12,
  tableRadius = 0.5,
  crownHeight = 0.4,
  girdleRadius = 1,
  pavilionDepth = 1.15,
} = {}) {
  const positions = [];
  const step = (Math.PI * 2) / sides;

  const tableCenter = [0, crownHeight, 0];
  const culet = [0, -pavilionDepth, 0];

  const girdle = [];
  const table = [];
  for (let i = 0; i < sides; i++) {
    const a = i * step;
    girdle.push([
      Math.cos(a) * girdleRadius,
      0,
      Math.sin(a) * girdleRadius,
    ]);
    // Table ring rotated half a step → classic brilliant zig-zag crown
    const at = (i + 0.5) * step;
    table.push([
      Math.cos(at) * tableRadius,
      crownHeight,
      Math.sin(at) * tableRadius,
    ]);
  }

  const tri = (a, b, c) => positions.push(...a, ...b, ...c);

  for (let i = 0; i < sides; i++) {
    const ni = (i + 1) % sides;
    // Flat table (top), fanned from the centre
    tri(tableCenter, table[ni], table[i]);
    // Crown band — two facets per segment form the brilliant zig-zag
    tri(girdle[i], table[i], girdle[ni]);
    tri(girdle[ni], table[i], table[ni]);
    // Pavilion — facets converging to the culet point
    tri(girdle[ni], culet, girdle[i]);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geo.computeVertexNormals();
  geo.center();
  return geo;
}

/* Each stone is the same model, tinted with its own palette. */
const PALETTES = {
  sapphire: { deep: '#0c2a6e', mid: '#2563EB', bright: '#cfe0ff', core: '#6f9bff' },
  ruby: { deep: '#4d030c', mid: '#cc1126', bright: '#ffc1c7', core: '#ff5d6c' },
  yellow: { deep: '#7a4a00', mid: '#f5b301', bright: '#fff3cf', core: '#ffd35e' },
};

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vNormal = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uDeep;
  uniform vec3 uMid;
  uniform vec3 uBright;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vec3 V = normalize(vViewDir);
    // Make the normal always face the viewer so shading reads correctly
    // on every facet regardless of triangle winding.
    vec3 N = normalize(vNormal);
    N = dot(N, V) < 0.0 ? -N : N;

    // Fresnel rim — bright at grazing angles, like a polished edge
    float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.4);

    // Facet shading from two soft key lights
    float diff = clamp(dot(N, normalize(vec3(0.4, 0.9, 0.6))), 0.0, 1.0);
    float fill = clamp(dot(N, normalize(vec3(-0.6, 0.2, -0.5))), 0.0, 1.0) * 0.35;

    vec3 base = mix(uDeep, uMid, diff + fill);
    vec3 col = mix(base, uBright, fres);

    // Travelling sparkle that catches individual facets
    vec3 sparkDir = normalize(vec3(sin(uTime * 0.7), 1.0, cos(uTime * 0.7)));
    float spark = pow(clamp(dot(N, sparkDir), 0.0, 1.0), 32.0);
    col += spark * vec3(1.0, 1.0, 1.0) * 1.1;

    // A second, faster glint for dispersion-like life
    float glint = pow(clamp(dot(N, normalize(vec3(cos(uTime * 1.3), 0.5, sin(uTime * 1.3)))), 0.0, 1.0), 48.0);
    col += glint * uBright * 0.8;

    float alpha = 0.86 + fres * 0.14;
    gl_FragColor = vec4(col, alpha);
  }
`;

function Gem({
  geo,
  palette,
  position = [0, 0, 0],
  scale = 1,
  tilt = [0.18, 0, 0.05],
  spin = 0.5,
  phase = 0,
  reducedMotion,
  parallax = false,
  withCore = false,
}) {
  const groupRef = useRef();
  const shellRef = useRef();
  const coreRef = useRef();
  const matRef = useRef();
  const { pointer } = useThree();

  const uniforms = useMemo(
    () => ({
      uDeep: { value: new THREE.Color(palette.deep) },
      uMid: { value: new THREE.Color(palette.mid) },
      uBright: { value: new THREE.Color(palette.bright) },
      uTime: { value: 0 },
    }),
    [palette]
  );

  const speed = reducedMotion ? 0.06 : spin;

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (matRef.current) matRef.current.uniforms.uTime.value = t;
    // 360° turntable spin on the vertical axis
    if (shellRef.current) shellRef.current.rotation.y += delta * speed;
    if (coreRef.current) coreRef.current.rotation.y -= delta * speed * 0.7;
    if (!groupRef.current) return;

    if (parallax) {
      // Gentle parallax toward the cursor (centre stone only)
      const tx = pointer.x * 0.12;
      const ty = pointer.y * 0.08;
      groupRef.current.position.x +=
        (position[0] + tx - groupRef.current.position.x) * 0.04;
      groupRef.current.position.y +=
        (position[1] - ty - groupRef.current.position.y) * 0.04;
    } else if (!reducedMotion) {
      // Soft independent bob for the accent stones
      groupRef.current.position.y = position[1] + Math.sin(t * 0.8 + phase) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={tilt}>
      {withCore && (
        <mesh ref={coreRef} geometry={geo} scale={0.5}>
          <meshBasicMaterial color={palette.core} transparent opacity={0.45} />
        </mesh>
      )}
      <mesh ref={shellRef} geometry={geo}>
        <shaderMaterial
          ref={matRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.NormalBlending}
        />
      </mesh>
    </group>
  );
}

function OrbitingShards({ reducedMotion }) {
  const group = useRef();
  const shards = useMemo(
    () => [
      { r: 2.7, s: 0.13, a: 0.6, y: 1.1 },
      { r: 2.9, s: 0.09, a: 2.6, y: -1.2 },
      { r: 2.5, s: 0.11, a: 4.1, y: 1.3 },
      { r: 3.1, s: 0.07, a: 5.5, y: -0.9 },
    ],
    []
  );
  useFrame((_, delta) => {
    if (group.current && !reducedMotion) group.current.rotation.y += delta * 0.14;
  });
  return (
    <group ref={group}>
      {shards.map((sh, i) => (
        <mesh
          key={i}
          position={[Math.cos(sh.a) * sh.r, sh.y, Math.sin(sh.a) * sh.r]}
          scale={sh.s}
        >
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#9fb6e6" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

/* A soft radial gradient used as a faked contact shadow. Dark navy so it
   reads as a shadow on the light hero while staying on-brand. */
function makeShadowTexture() {
  const size = 128;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(7,14,34,0.55)');
  g.addColorStop(0.45, 'rgba(7,14,34,0.30)');
  g.addColorStop(1, 'rgba(7,14,34,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

/* Camera-facing billboard ellipse sitting just below a stone. */
function ContactShadow({ texture, position, width, height }) {
  return (
    <mesh position={position} scale={[width, height, 1]} renderOrder={-1}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        depthTest={false}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function SapphireGem() {
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const geo = useMemo(() => makeBrilliantGeometry(), []);
  const shadowTex = useMemo(() => makeShadowTexture(), []);

  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.25, 5], fov: 54 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.9} />

      {/* Whole cluster (screen placement handled in CSS) */}
      <group position={[0, 0, 0]}>
        {/* Soft contact shadow beneath the stone */}
        <ContactShadow texture={shadowTex} position={[0, -2.35, 0]} width={3.8} height={1.0} />

        {/* Single large royal-blue Ceylon sapphire (the hero stone) */}
        <Gem
          geo={geo}
          palette={PALETTES.sapphire}
          scale={2.55}
          position={[0, 0, 0]}
          spin={0.5}
          parallax
          reducedMotion={reducedMotion}
        />

        <OrbitingShards reducedMotion={reducedMotion} />
      </group>
    </Canvas>
  );
}

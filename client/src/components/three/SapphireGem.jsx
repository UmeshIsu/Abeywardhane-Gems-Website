import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ------------------------------------------------------------------ *
 *  A faceted, glowing sapphire crystal rendered with a lightweight
 *  custom fresnel shader. No environment maps, no post-processing —
 *  it stays fast on mobile while reading as a refractive gemstone.
 * ------------------------------------------------------------------ */

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vec4 mvPos = viewMatrix * worldPos;
    vNormal = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * mvPos;
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
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewDir);

    // Fresnel rim — brighter at grazing angles, like a polished edge
    float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.2);

    // Facet shading from a soft key light
    vec3 light = normalize(vec3(0.4, 0.9, 0.7));
    float diff = clamp(dot(N, light), 0.0, 1.0);

    // Internal depth gradient
    vec3 base = mix(uDeep, uMid, diff);
    vec3 col = mix(base, uBright, fres);

    // Travelling sparkle highlight
    float spark = pow(clamp(dot(N, normalize(vec3(sin(uTime * 0.6), 1.0, cos(uTime * 0.6)))), 0.0, 1.0), 24.0);
    col += spark * 0.9;

    float alpha = 0.82 + fres * 0.18;
    gl_FragColor = vec4(col, alpha);
  }
`;

function Gem({ reducedMotion }) {
  const shellRef = useRef();
  const coreRef = useRef();
  const matRef = useRef();
  const { pointer } = useThree();

  // Faceted geometry with flat normals → reads as a cut crystal
  const geo = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1, 1).toNonIndexed();
    g.computeVertexNormals();
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uDeep: { value: new THREE.Color('#11317a') },
      uMid: { value: new THREE.Color('#2563EB') },
      uBright: { value: new THREE.Color('#bcd2ff') },
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    const speed = reducedMotion ? 0.05 : 0.28;
    if (shellRef.current) {
      shellRef.current.rotation.y += delta * speed;
      shellRef.current.rotation.x += delta * speed * 0.35;
      // Gentle parallax toward the cursor
      const tx = pointer.y * 0.25;
      const ty = pointer.x * 0.35;
      shellRef.current.rotation.x += (tx - shellRef.current.rotation.x * 0) * 0;
      shellRef.current.position.x += (ty * 0.15 - shellRef.current.position.x) * 0.05;
      shellRef.current.position.y += (-tx * 0.15 - shellRef.current.position.y) * 0.05;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * speed * 0.8;
      coreRef.current.rotation.z += delta * speed * 0.5;
    }
  });

  return (
    <group scale={1.15}>
      {/* Inner luminous core */}
      <mesh ref={coreRef} geometry={geo} scale={0.55}>
        <meshBasicMaterial color="#5b8bff" transparent opacity={0.5} />
      </mesh>
      {/* Outer faceted shell */}
      <mesh ref={shellRef} geometry={geo}>
        <shaderMaterial
          ref={matRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
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
      { r: 2.1, s: 0.16, a: 0, y: 0.6 },
      { r: 2.4, s: 0.1, a: 2.2, y: -0.5 },
      { r: 1.9, s: 0.12, a: 4.1, y: -0.9 },
      { r: 2.6, s: 0.08, a: 5.3, y: 0.9 },
    ],
    []
  );
  useFrame((_, delta) => {
    if (group.current && !reducedMotion) group.current.rotation.y += delta * 0.12;
  });
  return (
    <group ref={group}>
      {shards.map((sh, i) => (
        <mesh key={i} position={[Math.cos(sh.a) * sh.r, sh.y, Math.sin(sh.a) * sh.r]} scale={sh.s}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#9fb6e6" transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

export default function SapphireGem() {
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.8} />
      <Gem reducedMotion={reducedMotion} />
      <OrbitingShards reducedMotion={reducedMotion} />
    </Canvas>
  );
}

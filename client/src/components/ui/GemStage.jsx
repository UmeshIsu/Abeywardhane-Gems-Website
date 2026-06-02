import { Component, Suspense, lazy, useEffect, useState } from 'react';

const SapphireGem = lazy(() => import('@/components/three/SapphireGem'));

/* A glowing radial fallback shown before the WebGL scene mounts
   (and permanently on low-power devices or if WebGL is unavailable). */
function GemFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div
        className="w-[58%] aspect-square rounded-full animate-float"
        style={{
          background:
            'radial-gradient(circle at 35% 30%, rgba(147,180,255,0.9), rgba(37,99,235,0.55) 45%, rgba(17,49,122,0) 70%)',
          filter: 'blur(2px)',
        }}
      />
    </div>
  );
}

/* If WebGL fails (blocked, unsupported, or context lost) we show the
   gradient fallback rather than letting the page crash. */
class GemErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {}
  render() {
    if (this.state.failed) return <GemFallback />;
    return this.props.children;
  }
}

export default function GemStage({ className = '' }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const okSize = window.matchMedia('(min-width: 640px)').matches;
    // Verify a WebGL context can actually be created before mounting.
    let webgl = false;
    try {
      const c = document.createElement('canvas');
      webgl = !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch (_) {
      webgl = false;
    }
    if (!okSize || !webgl) return;
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 300));
    const id = idle(() => setEnabled(true));
    return () => {
      if (window.cancelIdleCallback && typeof id === 'number') {
        try { window.cancelIdleCallback(id); } catch (_) {}
      }
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(60% 50% at 50% 40%, rgba(37,99,235,0.16), transparent 72%)' }}
      />
      {enabled ? (
        <GemErrorBoundary>
          <Suspense fallback={<GemFallback />}>
            <SapphireGem />
          </Suspense>
        </GemErrorBoundary>
      ) : (
        <GemFallback />
      )}
    </div>
  );
}

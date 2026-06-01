import { useEffect, useState } from 'react';

/**
 * Counts from 0 to `target` over `duration` ms with eased-out cubic.
 * Only starts when `start === true` (use IntersectionObserver to flip it).
 */
export function useCountUp(target, { duration = 1800, start = true } = {}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return value;
}

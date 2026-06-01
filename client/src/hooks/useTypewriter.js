import { useEffect, useState, useRef } from 'react';

/**
 * Types `text` out one character at a time.
 * Returns the currently-typed substring and a `done` flag.
 *
 * @param {string} text   The full string to type.
 * @param {number} speed  Milliseconds per character (default 55).
 * @param {number} delay  Delay before typing starts (default 250ms).
 */
export function useTypewriter(text, { speed = 55, delay = 250 } = {}) {
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    setTyped('');
    setDone(false);
    let i = 0;

    const startTimer = setTimeout(function tick() {
      i++;
      setTyped(text.slice(0, i));
      if (i < text.length) {
        timerRef.current = setTimeout(tick, speed);
      } else {
        setDone(true);
      }
    }, delay);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(timerRef.current);
    };
  }, [text, speed, delay]);

  return { typed, done };
}

import { useEffect, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Counts characters "typed" so far. `speed` is ms per character, or a function of the
 * current count (for pauses / different speeds per segment). Reduced motion: done instantly.
 */
export function useTypedCount(total, { start = true, delay = 0, speed = 35 } = {}) {
  const [count, setCount] = useState(() => (prefersReducedMotion() ? total : 0));
  useEffect(() => {
    if (!start || count >= total) return undefined;
    const wait = count === 0 ? delay : typeof speed === 'function' ? speed(count) : speed;
    const t = setTimeout(() => setCount((c) => c + 1), wait);
    return () => clearTimeout(t);
  }, [start, count, total, delay, speed]);
  return count;
}

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Scroll-reveal wrapper. Backward compatible (children, delay, y, className,
 * once) with optional `x` for horizontal entrances. Honours reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 30,
  x = 0,
  className = '',
  once = true,
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

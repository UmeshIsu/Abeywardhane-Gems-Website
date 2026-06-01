import { useScroll, useSpring, motion } from 'framer-motion';

/** Slim sapphire reading-progress bar pinned to the very top of the page. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-sapphire-dark via-sapphire to-electric"
      aria-hidden="true"
    />
  );
}

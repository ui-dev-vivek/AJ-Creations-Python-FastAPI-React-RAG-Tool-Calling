import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="scroll-progress fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9E2189] to-[#FFC72C] z-[10002] origin-left"
      style={{ scaleX }}
    />
  );
};

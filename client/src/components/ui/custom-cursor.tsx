import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full border border-[#9E2189] pointer-events-none z-[10001] flex items-center justify-center mix-blend-difference"
      style={{
        translateX: cursorX,
        translateY: cursorY,
        x: "-50%",
        y: "-50%",
      }}
    >
      <div className="w-2 h-2 bg-[#FFC72C] rounded-full" />
    </motion.div>
  );
};

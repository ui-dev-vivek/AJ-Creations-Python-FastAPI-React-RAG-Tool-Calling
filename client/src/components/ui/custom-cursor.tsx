import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      animate={{
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering
          ? "rgba(158, 33, 137, 1)"
          : "rgba(158, 33, 137, 0)",
      }}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[#9E2189] pointer-events-none z-[10001] flex items-center justify-center mix-blend-difference"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        x: "-50%",
        y: "-50%",
      }}
    >
      <motion.div
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        className="w-1 h-1 bg-[#FFC72C] rounded-full"
      />
    </motion.div>
  );
};

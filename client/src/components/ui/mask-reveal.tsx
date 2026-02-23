import { motion } from "framer-motion";

export const MaskReveal = ({
  children,
  direction = "left",
}: {
  children: React.ReactNode;
  direction?: "left" | "right" | "top" | "bottom";
}) => {
  const variants = {
    initial: {
      clipPath:
        direction === "left"
          ? "inset(0 100% 0 0)"
          : direction === "right"
            ? "inset(0 0 0 100%)"
            : direction === "top"
              ? "inset(0 0 100% 0)"
              : "inset(100% 0 0 0)",
    },
    animate: {
      clipPath: "inset(0 0 0 0)",
      transition: { duration: 1, ease: [0.77, 0, 0.175, 1] },
    },
  };

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      initial="initial"
      variants={variants}
      viewport={{ once: true }}
      whileInView="animate"
    >
      {children}
    </motion.div>
  );
};

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const TextReveal = ({ text }: { text: string }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const words = text.split(" ");

  return (
    <div ref={container} className="flex flex-wrap gap-x-[0.2em] gap-y-0">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </div>
  );
};

const Word = ({ children, progress, range }: any) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative">
      <span className="absolute opacity-10">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const HorizontalScroll = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-transparent">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div className="flex gap-4 px-10" style={{ x }}>
          {children}
        </motion.div>
      </div>
    </section>
  );
};

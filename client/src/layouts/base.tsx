import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pathname } = useLocation();

  return (
    <div className="relative flex flex-col min-h-screen selection:bg-[#FFC72C] selection:text-[#9E2189]">
      <CustomCursor />
      <ScrollProgress />
      <div className="noise-overlay" />

      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          animate={{ opacity: 1, y: 0 }}
          className="flex-grow pt-24 pb-20 relative z-10 w-full"
          exit={{ opacity: 0, y: -10 }}
          initial={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}

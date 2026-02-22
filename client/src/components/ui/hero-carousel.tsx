import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import { Magnetic } from "@/components/ui/magnetic";

const slides = [
  {
    id: 1,
    title: "Artisanal Resin",
    subtitle: "Bespoke Masterworks",
    description: "Functional art that captures time and beauty in every pour.",
    color: "from-[#9E2189] to-[#EF99DF]",
    label: "Handcrafted Luxury",
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Pure Egyptian Cotton",
    subtitle: "Tactile Elegance",
    description:
      "Experience the timeless comfort of ethically sourced luxury linens.",
    color: "from-[#1A1A1A] to-[#4A4A4A]",
    label: "Ethical Craft",
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Golden Aura Wax",
    subtitle: "Sensory Illumination",
    description:
      "Scented candles that transform space into a sanctuary of light.",
    color: "from-[#FFC72C] to-[#F59E0B]",
    label: "Aromatic Bliss",
    image:
      "https://images.unsplash.com/photo-1603006905521-e5a24273d4ae?q=80&w=2000&auto=format&fit=crop",
  },
];

export const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[90vh] w-full overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          animate={{ opacity: 1 }}
          className="absolute inset-0"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] scale-110"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

          {/* Content Wrapper */}
          <div className="relative h-full container mx-auto px-6 flex flex-col justify-center">
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="max-w-3xl"
              initial={{ opacity: 0, x: -30 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-8">
                <span className="text-secondary text-[10px] font-black tracking-[0.3em] uppercase">
                  {slides[current].label}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-medium text-white/90 tracking-tight mb-2 italic drop-shadow-lg">
                {slides[current].subtitle}
              </h2>
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl">
                {slides[current].title.split(" ").map((word, i) => (
                  <span key={i} className="block">
                    {word}
                  </span>
                ))}
              </h1>

              <p className="text-lg md:text-xl text-white/60 max-w-xl font-medium leading-relaxed mb-10">
                {slides[current].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Magnetic>
                  <button className="liquid-button h-16 px-12 bg-primary text-white rounded-2xl font-black text-lg shadow-2xl hover:bg-primary/90 transition-all">
                    Explore Collection
                  </button>
                </Magnetic>
                <Magnetic>
                  <button className="liquid-button h-16 px-12 border-2 border-white/30 text-white rounded-2xl font-black text-lg hover:bg-white/10 transition-all">
                    Our Craft
                  </button>
                </Magnetic>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            className="group relative h-1.5 w-12 rounded-full overflow-hidden bg-white/20"
            onClick={() => setCurrent(i)}
          >
            {current === i && (
              <motion.div
                animate={{ scaleX: 1 }}
                className="absolute inset-0 bg-secondary"
                initial={{ scaleX: 0 }}
                layoutId="progress"
                transition={{ duration: 6, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

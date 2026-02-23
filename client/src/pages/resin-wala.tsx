import { motion } from "framer-motion";

import BaseLayout from "@/layouts/base";
import { Tilt } from "@/components/ui/tilt";
import { TextReveal } from "@/components/ui/text-reveal";
import { MaskReveal } from "@/components/ui/mask-reveal";

export default function ResinWala() {
  return (
    <BaseLayout>
      <div className="w-full pb-32 overflow-x-hidden">
        <section className="relative overflow-hidden mb-16 py-24 md:py-32 px-6 bg-gradient-to-b from-indigo-500/5 to-transparent">
          {/* Animated Crystalline Accents */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#3A0CA3]/5 rounded-full blur-[180px] opacity-40" />

          <div className="container mx-auto max-w-7xl relative z-10 flex flex-col items-center text-center gap-8">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#3A0CA3]/10 text-[#3A0CA3] px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] backdrop-blur-sm border border-[#3A0CA3]/10"
              initial={{ opacity: 0, y: -20 }}
            >
              Functional Masterpieces
            </motion.div>

            <motion.h1
              animate={{ opacity: 1, scale: 1 }}
              className="text-6xl md:text-8xl font-black text-[#1A1A1A] tracking-tighter flex justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <TextReveal text="Resin Wala" />
            </motion.h1>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="text-lg md:text-xl text-default-500 max-w-2xl font-medium leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Frozen in time, crafted for eternity. Explore our collection of
              bespoke resin art that merges nature with synthetic brilliance.
            </motion.p>
          </div>
        </section>

        <div className="container mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[1, 2, 3, 4, 5, 6].map((i, idx) => (
            <motion.div
              key={i}
              className="group flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Tilt>
                <div className="aspect-square rounded-[60px] bg-white overflow-hidden relative transition-all duration-700 hover:shadow-[0_60px_100px_-20px_rgba(58,12,163,0.1)] group-hover:-translate-y-2 border border-indigo-500/5">
                  <MaskReveal direction="right">
                    <div className="absolute inset-0 bg-white" />
                  </MaskReveal>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3A0CA3]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute top-8 left-8">
                    <div className="bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      Collector&apos;s Edition
                    </div>
                  </div>

                  <div className="absolute flex items-center justify-center inset-0 pointer-events-none">
                    <span className="text-indigo-200 text-9xl transition-all duration-700 group-hover:scale-125 group-hover:rotate-12 group-hover:blur-sm opacity-50">
                      🎨
                    </span>
                  </div>

                  <div className="absolute bottom-12 left-12 right-12 translate-y-20 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
                    <button className="w-full h-14 bg-[#3A0CA3] text-white font-black text-xs uppercase tracking-widest rounded-3xl shadow-2xl hover:bg-[#1A1A1A] transition-all active:scale-95">
                      View Masterpiece
                    </button>
                  </div>
                </div>
              </Tilt>

              <div className="mt-10 px-6 text-center">
                <h3 className="text-2xl font-black text-[#1A1A1A] tracking-tighter mb-2 italic">
                  Oceanic Depths Coaster
                </h3>
                <p className="text-[#3A0CA3] font-black text-xl mb-4">₹1,499</p>
                <div className="flex justify-center gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-[#FFC72C] text-xs">
                      ★
                    </span>
                  ))}
                </div>
                <div className="w-12 h-1.5 bg-[#3A0CA3] mx-auto rounded-full group-hover:w-full transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}

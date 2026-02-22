import { motion } from "framer-motion";

import BaseLayout from "@/layouts/base";
import { Tilt } from "@/components/ui/tilt";
import { TextReveal } from "@/components/ui/text-reveal";
import { MaskReveal } from "@/components/ui/mask-reveal";

export default function CosmeticWala() {
  return (
    <BaseLayout>
      <div className="w-full pb-32 overflow-x-hidden">
        <section className="relative overflow-hidden mb-16 py-24 md:py-32 px-6 bg-gradient-to-b from-primary/5 to-transparent">
          {/* Animated Accents */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9E2189]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

          <div className="container mx-auto max-w-7xl relative z-10 flex flex-col items-center text-center gap-8">
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#9E2189]/10 text-[#9E2189] px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] backdrop-blur-sm border border-[#9E2189]/10"
              initial={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              The Science of Radiance
            </motion.div>

            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black text-[#1A1A1A] tracking-tighter flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <TextReveal text="Cosmetic Wala" />
            </motion.h1>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="text-lg md:text-xl text-default-500 max-w-2xl font-medium leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Where organic purity meets modern chemistry. Discover our curated
              range of dermatologically tested essentials.
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
                <div className="aspect-[3/4] rounded-[50px] bg-white overflow-hidden relative transition-all duration-700 hover:shadow-[0_60px_100px_-20px_rgba(158,33,137,0.1)] group-hover:-translate-y-2 border border-primary/5">
                  <MaskReveal direction="bottom">
                    <div className="absolute inset-0 bg-white" />
                  </MaskReveal>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#9E2189]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute top-8 left-8">
                    <div className="bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      Organic
                    </div>
                  </div>

                  <div className="absolute bottom-10 left-10 right-10 translate-y-20 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
                    <button className="w-full h-14 bg-white text-[#9E2189] font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl hover:bg-[#9E2189] hover:text-white transition-all active:scale-95">
                      Quick Add
                    </button>
                  </div>
                </div>
              </Tilt>

              <div className="mt-8 px-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-black text-[#1A1A1A] tracking-tighter">
                    Glow Serum Pro
                  </h3>
                  <p className="text-[#9E2189] font-black">₹899</p>
                </div>
                <p className="text-default-400 text-sm font-medium mb-4">
                  Hydrating & Brightening • 30ml
                </p>
                <div className="w-0 h-1 bg-[#9E2189] group-hover:w-full transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}

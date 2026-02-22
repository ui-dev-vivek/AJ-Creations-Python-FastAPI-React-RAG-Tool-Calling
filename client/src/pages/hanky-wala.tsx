import { motion } from "framer-motion";

import BaseLayout from "@/layouts/base";
import { Tilt } from "@/components/ui/tilt";
import { TextReveal } from "@/components/ui/text-reveal";
import { MaskReveal } from "@/components/ui/mask-reveal";

export default function HankyWala() {
  return (
    <BaseLayout>
      <div className="w-full pb-32 overflow-x-hidden">
        <section className="relative overflow-hidden mb-16 py-24 md:py-32 px-6 bg-gradient-to-b from-blue-500/5 to-transparent">
          {/* Animated Soft Accents */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#4361EE]/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />

          <div className="container mx-auto max-w-7xl relative z-10 flex flex-col items-center text-center gap-8">
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#4361EE]/10 text-[#4361EE] px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] backdrop-blur-sm border border-[#4361EE]/10"
              initial={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              The Touch of Elegance
            </motion.div>

            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black text-[#1A1A1A] tracking-tighter flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <TextReveal text="Hanky Wala" />
            </motion.h1>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="text-lg md:text-xl text-default-500 max-w-2xl font-medium leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Finely woven stories. Discover our collection of luxury
              handkerchiefs, crafted from the world&apos;s softest long-staple
              cotton.
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
                <div className="aspect-[3/4] rounded-[50px] bg-white overflow-hidden relative transition-all duration-700 hover:shadow-[0_60px_100px_-20px_rgba(67,97,238,0.1)] group-hover:-translate-y-2 border border-blue-500/5">
                  <MaskReveal direction="left">
                    <div className="absolute inset-0 bg-white" />
                  </MaskReveal>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4361EE]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute top-8 left-8">
                    <div className="bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      100% Cotton
                    </div>
                  </div>

                  <div className="absolute flex items-center justify-center inset-0 pointer-events-none">
                    <span className="text-blue-200 text-9xl transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6">
                      🦋
                    </span>
                  </div>

                  <div className="absolute bottom-10 left-10 right-10 translate-y-20 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
                    <button className="w-full h-14 bg-white text-[#4361EE] font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl hover:bg-[#4361EE] hover:text-white transition-all active:scale-95">
                      Select Pattern
                    </button>
                  </div>
                </div>
              </Tilt>

              <div className="mt-8 px-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-black text-[#1A1A1A] tracking-tighter">
                    Azure Silk-Blend Hanky
                  </h3>
                  <p className="text-[#4361EE] font-black">₹349</p>
                </div>
                <p className="text-default-400 text-sm font-medium mb-4">
                  Designer Collection • 16x16 inch
                </p>
                <div className="w-0 h-1 bg-[#4361EE] group-hover:w-full transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}

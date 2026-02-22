import { motion } from "framer-motion";

import BaseLayout from "@/layouts/base";
import { Tilt } from "@/components/ui/tilt";
import { TextReveal } from "@/components/ui/text-reveal";
import { Marquee } from "@/components/ui/marquee";
import { Spotlight } from "@/components/ui/spotlight";
import { HorizontalScroll } from "@/components/ui/horizontal-scroll";
import { HeroCarousel } from "@/components/ui/hero-carousel";

export default function HomePage() {
  return (
    <BaseLayout>
      <div className="w-full overflow-x-hidden">
        {/* Full-Width Hero Carousel */}
        <div className="relative">
          <HeroCarousel />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
        </div>

        {/* Brand Marquee */}
        <div className="my-20">
          <Marquee
            items={[
              "Handmade Beauty",
              "Artisanal Wax",
              "Egyptian Cotton",
              "Bespoke Resin Art",
              "Modern Aesthetic",
            ]}
          />
        </div>

        {/* 4 CORE SECTIONS - Wrapped in container */}
        <section className="container mx-auto max-w-7xl py-20 mb-20 px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="text-4xl md:text-5xl font-black mb-6 tracking-tight flex justify-center">
              <TextReveal text="Discover Our Worlds" />
            </div>
            <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8" />
            <p className="text-default-500 max-w-xl mx-auto font-medium">
              Explore four unique artistic domains, each defined by meticulous
              quality and hand-selected materials.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
            initial="hidden"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            viewport={{ once: true }}
            whileInView="visible"
          >
            {[
              {
                id: "cosmetic",
                title: "Cosmetic Wala",
                color: "from-[#9E2189]/10 to-[#EF99DF]/5",
                iconBg: "bg-[#9E2189]",
                icon: "💄",
                link: "/cosmetic-wala",
                desc: "Science meets organic beauty. Premium products for a timeless, natural glow.",
              },
              {
                id: "candle",
                title: "Candle Wala",
                color: "from-[#FFC72C]/10 to-[#FDF2FB]/5",
                iconBg: "bg-[#FFC72C]",
                icon: "🕯️",
                link: "/candle-wala",
                desc: "Artisanal hand-poured candles to illuminate and elevate your home sanctuary.",
              },
              {
                id: "hanky",
                title: "Hanky Wala",
                color: "from-[#4361EE]/10 to-transparent",
                iconBg: "bg-[#4361EE]",
                icon: "🦋",
                link: "/hanky-wala",
                desc: "Designer handkerchiefs crafted from the finest Egyptian cotton for pure elegance.",
              },
              {
                id: "resin",
                title: "Resin Wala",
                color: "from-[#3A0CA3]/10 to-transparent",
                iconBg: "bg-[#3A0CA3]",
                icon: "🎨",
                link: "/resin-wala",
                desc: "Bespoke resin masterworks. Functional art that captures time and beauty.",
              },
            ].map((section) => (
              <Tilt key={section.id}>
                <motion.div
                  className={`group relative overflow-hidden rounded-[40px] bg-gradient-to-br ${section.color} p-10 border border-white/60 backdrop-blur-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500`}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.8 },
                    },
                  }}
                >
                  <div
                    className={`w-16 h-16 ${section.iconBg} rounded-3xl flex items-center justify-center text-3xl mb-8 shadow-2xl shadow-primary/10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500`}
                  >
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tighter text-default-800">
                    {section.title}
                  </h3>
                  <p className="text-default-500 text-sm mb-10 leading-relaxed font-medium">
                    {section.desc}
                  </p>

                  <a
                    className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-[#1A1A1A] group/btn"
                    href={section.link}
                  >
                    <span className="relative">
                      Enter Domain
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1A1A1A] group-hover/btn:w-full transition-all duration-300" />
                    </span>
                    <span className="group-hover/btn:translate-x-2 transition-transform duration-300">
                      →
                    </span>
                  </a>

                  {/* Decorative Element */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </motion.div>
              </Tilt>
            ))}
          </motion.div>
        </section>

        {/* Featured Products Section - Wrapped in container */}
        <section className="container mx-auto max-w-7xl relative z-10 py-20 px-4">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <div className="text-4xl md:text-5xl font-black tracking-tight text-[#1A1A1A]">
                <TextReveal text="The Best Sellers" />
              </div>
              <p className="text-default-500 mt-4 font-medium">
                Most loved products by our global community.
              </p>
            </motion.div>
            <motion.button
              className="group/all flex items-center gap-2 font-black text-xs uppercase tracking-[0.2em] py-3 px-6 border border-divider rounded-full hover:bg-black hover:text-white transition-all duration-300"
              initial={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              Discover Full Archive
              <span className="group-hover/all:translate-x-1 transition-transform">
                →
              </span>
            </motion.button>
          </div>

          <Spotlight className="p-4 md:p-12 rounded-[40px] md:rounded-[80px] bg-gradient-to-br from-white/40 to-default-50/20 backdrop-blur-3xl border border-white/60 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <HorizontalScroll>
              {[1, 2, 3, 4, 5, 6].map((item, idx) => (
                <motion.div
                  key={item}
                  className="w-[350px] flex-shrink-0 group relative flex flex-col"
                  initial={{ opacity: 0, y: 30 }}
                  transition={{
                    duration: 0.8,
                    delay: idx * 0.1,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <Tilt>
                    <div className="bg-[#F3F4F6] aspect-[4/5] rounded-[40px] flex items-center justify-center relative overflow-hidden transition-all duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] group-hover:-translate-y-2">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="text-default-300 font-bold uppercase tracking-widest text-xs opacity-50 group-hover:scale-110 group-hover:opacity-0 transition-all duration-700">
                        Premium Goods
                      </span>
                      <div className="absolute top-6 left-6 -translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <div className="bg-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">
                          In Stock
                        </div>
                      </div>
                      <div className="absolute top-6 right-6">
                        <button className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-rose-500 shadow-xl transition-all duration-500 hover:bg-rose-500 hover:text-white hover:scale-110 active:scale-90">
                          <span className="text-xl">♥</span>
                        </button>
                      </div>
                      <div className="absolute bottom-10 left-10 right-10 translate-y-20 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 cubic-bezier(0.23, 1, 0.32, 1)">
                        <button className="liquid-button w-full h-14 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl hover:bg-[#1A1A1A] hover:text-white transition-all">
                          Purchase Now
                        </button>
                      </div>
                    </div>
                  </Tilt>
                  <motion.div
                    className="mt-8 px-2"
                    initial={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.8, delay: idx * 0.1 + 0.2 }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-[10px] font-black tracking-[0.2em] uppercase text-default-400">
                        Collection 01
                      </div>
                      <div className="text-sm font-black text-primary">
                        ₹1,299
                      </div>
                    </div>
                    <h3 className="font-bold text-xl text-[#1A1A1A] tracking-tighter group-hover:text-primary transition-colors">
                      Velvet Matte Lipstick
                    </h3>
                    <div className="w-0 h-0.5 bg-primary group-hover:w-16 transition-all duration-500 mt-2" />
                  </motion.div>
                </motion.div>
              ))}
            </HorizontalScroll>
          </Spotlight>
        </section>
      </div>
    </BaseLayout>
  );
}

import { motion } from "framer-motion";

import BaseLayout from "@/layouts/base";
import { Tilt } from "@/components/ui/tilt";
// import { TextReveal } from "@/components/ui/text-reveal";
// import { Marquee } from "@/components/ui/marquee";
// import { Spotlight } from "@/components/ui/spotlight";
// import { HorizontalScroll } from "@/components/ui/horizontal-scroll";
// import { HeroCarousel } from "@/components/ui/hero-carousel";

export default function HomePage() {
  return (
    <BaseLayout>
      <div className="w-full overflow-x-hidden">
        {/* <HeroCarousel /> */}

        {/* 4 CORE SECTIONS - Wrapped in container */}
        <section className="container mx-auto max-w-7xl py-20 mb-20">
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
          {/* <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          > */}
          {/* <div className="text-4xl md:text-5xl font-black mb-6 tracking-tight flex justify-center">
              <TextReveal text="Discover Our Worlds" />
            </div> */}
          {/* <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8" /> */}
          {/* <p className="text-default-500 max-w-xl mx-auto font-medium">
              Explore four unique artistic domains, each defined by meticulous
              quality and hand-selected materials.
            </p> */}
          {/* </motion.div> */}
        </section>
      </div>
    </BaseLayout>
  );
}

import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { BiShoppingBag, BiArrowBack, BiChevronRight } from "react-icons/bi";

import DefaultLayout from "@/layouts/default";
import { categories } from "@/config/site";
import { fadeInUp, staggerContainer, heroTextReveal, productCardHover, buttonTadka } from "@/config/animations";

export default function HomePage() {
  return (
    <DefaultLayout>
      <div className="w-full relative overflow-hidden bg-background">

        {/* 🚀 ULTRA-PREMIUM EDITORIAL HERO */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden px-6 py-12 lg:py-20">
          {/* Advanced Dynamic Ambient Glows */}
          <div className="ambient-glow w-[800px] h-[800px] bg-primary/10 -top-1/4 -left-1/4" />
          <div className="ambient-glow w-[600px] h-[600px] bg-secondary/15 bottom-0 right-0" style={{ animationDelay: '-5s' }} />

          <div className="container mx-auto relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center">

              <motion.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="lg:col-span-12 xl:col-span-7 space-y-12"
              >
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-primary/[0.03] border border-primary/10 backdrop-blur-xl">
                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_15px_theme('colors.secondary.500')]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60 italic">World of Mava</span>
                </motion.div>

                <div className="mask-hero overflow-hidden">
                  <motion.h1
                    variants={heroTextReveal}
                    className="text-[12vw] lg:text-[10vw] font-black leading-[0.8] tracking-tighter"
                  >
                    THE <br />
                    <span className="text-secondary italic font-thin pr-4">AURA</span>
                    WALA
                  </motion.h1>
                </div>

                <motion.p
                  variants={fadeInUp}
                  className="max-w-xl text-xl md:text-3xl text-primary/40 font-light leading-snug tracking-tight"
                >
                  Indulge in a sensory journey through our curated "Wala" legacy.
                  Where tradition meets the avant-garde in every drop and flame.
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-wrap gap-10 pt-4">
                  <Button
                    as={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-20 px-16 rounded-[32px] bg-primary text-white font-black text-xl shadow-glow-primary hover:shadow-2xl transition-all duration-500"
                  >
                    Shop Boutique
                  </Button>
                  <Button
                    as={motion.button}
                    whileHover={{ x: 10 }}
                    variant="light"
                    className="h-20 px-8 rounded-[32px] font-black text-xl text-primary hover:bg-primary/5 group"
                    endContent={<BiChevronRight className="text-4xl group-hover:translate-x-2 transition-transform" />}
                  >
                    Watch Films
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-12 xl:col-span-5 relative hidden xl:block"
              >
                <div className="relative aspect-[4/5] rounded-[80px] overflow-hidden shadow-premium group">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 2 }}
                    className="w-full h-full"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1596462502278-27bfad450516?q=80&w=1000&auto=format&fit=crop"
                      alt="Luxury"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s]"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 via-transparent to-transparent opacity-60 z-10" />

                  <div className="absolute inset-0 p-12 z-20 flex flex-col justify-end">
                    <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.5em] mb-4">Volume #01</p>
                    <h4 className="text-4xl font-black text-white italic lowercase tracking-tighter">Bespoke Glassware</h4>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
          >
            <span className="text-[9px] font-black text-primary/20 uppercase tracking-[0.5em] rotate-90 mb-10">discover more</span>
            <div className="w-px h-32 bg-gradient-to-b from-primary/20 to-transparent" />
          </motion.div>
        </section>

        {/* 🕯️ "WALA" THEMED CATEGORIES - EDITORIAL GRID */}
        <section className="section-padding bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-[8vw] lg:text-[6vw] font-black italic tracking-tighter max-w-xl"
              >
                Curated <span className="text-secondary font-thin not-italic">Chapters.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-2xl text-primary/30 font-light leading-relaxed"
              >
                Every section is a world unto itself. Meticulously designed to provide more than just a product—a lifestyle experience.
              </motion.p>
            </div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-12"
            >
              {categories.map((cat, idx) => (
                <motion.div
                  key={cat.id}
                  variants={fadeInUp}
                  className={idx % 2 === 0 ? "lg:-translate-y-20" : "lg:translate-y-10"}
                >
                  <Card
                    isPressable
                    className={`h-[600px] border-none group overflow-hidden bg-background rounded-[64px] shadow-premium hover:shadow-[0_64px_128px_-32px_rgba(0,0,0,0.15)] transition-all duration-1000`}
                  >
                    <CardBody className="p-0 relative h-full">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-full h-full relative"
                      >
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
                      </motion.div>

                      <div className="absolute inset-0 p-12 z-20 flex flex-col justify-end items-center text-center">
                        <span className="text-7xl mb-8 block drop-shadow-2xl translate-y-8 group-hover:translate-y-0 transition-transform duration-700">{cat.icon}</span>
                        <h3 className="text-white text-5xl mb-4 italic tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-700">{cat.name}</h3>
                        <Button
                          as={motion.button}
                          whileHover={{ scale: 1.1 }}
                          className="bg-secondary text-primary rounded-full font-black uppercase tracking-widest text-[9px] w-fit px-10 opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-1000 delay-150"
                        >
                          Explore Chapter
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 🛍️ SIGNATURE PIECES - ADVANCED GRID */}
        <section className="section-padding bg-primary/[0.01]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-40">
              <span className="text-[10px] font-black text-secondary uppercase tracking-[0.5em] mb-8 italic">Curated Edit</span>
              <h2 className="text-[10vw] font-black leading-none uppercase tracking-tighter">Signature Cases</h2>
            </div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16"
            >
              {[1, 2, 3, 4].map((item) => (
                <motion.div key={item} variants={productCardHover} whileHover="hover">
                  <Card className="border-none shadow-none bg-transparent group overflow-visible">
                    <CardBody className="p-0 rounded-[64px] overflow-hidden relative shadow-premium group-hover:shadow-[0_80px_160px_-40px_rgba(0,0,0,0.2)] transition-all duration-1000">
                      <Link href={`/product/${item}`} className="block relative aspect-[4/5] overflow-hidden">
                        <motion.div
                          whileHover={{ scale: 1.12 }}
                          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full h-full"
                        >
                          <img
                            src={`https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=1000&auto=format&fit=crop`}
                            alt="Product Name"
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                        {/* High-End Floating Price */}
                        <div className="absolute top-10 right-10 z-20">
                          <div className="glass-ultra px-8 py-4 rounded-3xl shadow-2xl">
                            <p className="text-white font-black text-2xl italic leading-none">₹1,499</p>
                          </div>
                        </div>
                      </Link>
                    </CardBody>
                    <CardFooter className="flex-col items-center px-4 pt-16 pb-0 bg-transparent text-center">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-px bg-secondary opacity-30" />
                        <p className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] italic">Edition #00{item}</p>
                        <div className="w-10 h-px bg-secondary opacity-30" />
                      </div>
                      <h3 className="text-4xl font-black text-primary italic lowercase tracking-tighter mb-4 group-hover:text-secondary transition-colors duration-700">Mava Essence</h3>
                      <div className="w-12 h-1 bg-primary/5 group-hover:w-24 group-hover:bg-secondary transition-all duration-1000" />
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}

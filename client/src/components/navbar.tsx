"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { motion, AnimatePresence } from "framer-motion";
import {
  BiSearch,
  BiShoppingBag,
  BiHeart,
  BiUser,
  BiMenu,
  BiChevronDown,
  BiX,
  BiLogIn,
  BiUserPlus,
  BiBox,
  BiCog,
} from "react-icons/bi";
import { IoFlashOutline } from "react-icons/io5";

import { categories, promotions, siteConfig } from "../config/site";
import { ThemeSwitch } from "./theme-switch";
import { MavaLogo } from "./icons";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPromo, setCurrentPromo] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Rotate promotional banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promotions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full sticky top-0 z-50 transition-all duration-300">

      {/* ───── 1. PROMO TICKER (High-End Contrast) ───── */}
      <div className="bg-primary text-white overflow-hidden py-1 border-b border-primary/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center text-[9px] font-black uppercase tracking-[0.5em]">
            <motion.div
              key={currentPromo}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center gap-4"
            >
              <IoFlashOutline className="text-secondary text-sm animate-pulse" />
              <span>{promotions[currentPromo].title}</span>
              <span className="opacity-20">•</span>
              <span className="text-secondary">{promotions[currentPromo].subtitle}</span>
              <span className="bg-white/10 text-[8px] px-2 py-0.5 rounded-full border border-white/10">
                {promotions[currentPromo].code}
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ───── 2. MAIN HEADER (Ultra Glassmorphism) ───── */}
      <div
        className={`w-full transition-all duration-700 ${isScrolled ? "glass-ultra py-1 shadow-2xl" : "bg-background py-4"
          }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-10 h-14">

            {/* Logo - Magnetic Polish */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-2.5 rounded-[20px] bg-primary shadow-glow-primary transition-all duration-500"
              >
                <MavaLogo size={34} />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-primary tracking-tighter uppercase leading-[0.7]">Mava</span>
                <span className="text-[9px] font-black text-secondary uppercase tracking-[0.5em] mt-1 italic">World</span>
              </div>
            </Link>

            {/* Nav - Editorial Style */}
            <nav className="hidden lg:flex items-center gap-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  onMouseEnter={() => setActiveCategory(cat.id)}
                  onMouseLeave={() => setActiveCategory(null)}
                  className="relative"
                >
                  <Link
                    href={`/category/${cat.id}`}
                    className={`px-6 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${activeCategory === cat.id ? "bg-primary text-white shadow-glow-primary" : "text-primary/40 hover:text-primary hover:bg-primary/5"
                      }`}
                  >
                    {cat.name}
                  </Link>

                  {/* REFINED MEGA MENU (Ultra Glass) */}
                  <AnimatePresence>
                    {activeCategory === cat.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute top-full left-0 mt-4 w-[700px] glass-ultra shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] rounded-[48px] overflow-hidden z-50 p-12"
                      >
                        <div className="grid grid-cols-2 gap-12">
                          <div className="space-y-8">
                            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-secondary/60 border-b border-secondary/10 pb-3 italic">Boutique Selection</p>
                            <div className="grid grid-cols-1 gap-2">
                              {cat.subcategories.map((sub) => (
                                <Link
                                  key={sub.id}
                                  href={`/category/${cat.id}/${sub.id}`}
                                  className="group/link flex items-center justify-between p-4 rounded-3xl hover:bg-primary/5 transition-all duration-500"
                                >
                                  <span className="text-lg font-black text-primary italic lowercase tracking-tighter">{sub.name}</span>
                                  <div className="w-10 h-10 rounded-full border border-primary/10 group-hover/link:bg-primary group-hover/link:text-white flex items-center justify-center transition-all opacity-0 group-hover/link:opacity-100 -translate-x-4 group-hover/link:translate-x-0">
                                    <BiChevronDown className="-rotate-90 text-xl" />
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>

                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className={`rounded-[40px] overflow-hidden bg-gradient-to-br ${cat.gradient} p-12 relative group/card shadow-2xl`}
                          >
                            <div className="absolute inset-0 bg-black/20 group-hover/card:bg-black/0 transition-colors duration-700" />
                            <img src={cat.image} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 group-hover/card:scale-110 transition-transform duration-[2s]" />
                            <div className="relative z-10 h-full flex flex-col justify-end">
                              <span className="text-6xl mb-6 grayscale group-hover/card:grayscale-0 transition-all drop-shadow-2xl">{cat.icon}</span>
                              <h4 className="text-4xl font-black text-primary mb-3 uppercase leading-none italic">{cat.name}</h4>
                              <p className="text-primary/60 text-[10px] font-black uppercase tracking-[0.3em] mb-6">Chapter Edition</p>
                              <Button size="sm" className="bg-primary text-white w-fit rounded-full px-8 text-[9px] font-black uppercase tracking-widest shadow-xl">Explore Edition</Button>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Search - Glass Polish */}
            <div className="hidden xl:flex flex-1 max-w-sm ml-auto">
              <Input
                placeholder="search your aura..."
                classNames={{
                  inputWrapper: "bg-primary/5 border-none h-14 rounded-[22px] focus-within:ring-2 focus-within:ring-primary/10 pl-8 backdrop-blur-md transition-all duration-500",
                  input: "text-sm font-black italic placeholder:text-primary/20"
                }}
                endContent={
                  <Button isIconOnly className="bg-primary text-white rounded-[16px] h-10 w-10 min-w-10 mr-1 shadow-glow-primary">
                    <BiSearch className="text-xl" />
                  </Button>
                }
              />
            </div>

            {/* Actions - Magnetic */}
            <div className="flex items-center gap-4 pl-4 border-l border-primary/5">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button
                    as={motion.button}
                    whileHover={{ y: -2 }}
                    isIconOnly
                    className="w-14 h-14 rounded-[22px] bg-primary/5 hover:bg-primary/10 text-primary border border-primary/10 transition-colors"
                  >
                    <BiUser className="text-2xl" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu className="w-64 p-3 glass-ultra rounded-[32px] border border-primary/10" variant="flat">
                  <DropdownItem key="login" startContent={<BiLogIn className="text-xl text-primary" />} className="rounded-2xl p-4">
                    <span className="font-black text-primary italic lowercase text-lg pr-2">login</span>
                  </DropdownItem>
                  <DropdownItem key="signup" startContent={<BiUserPlus className="text-xl text-secondary" />} className="rounded-2xl p-4">
                    <span className="font-black text-primary italic lowercase text-lg pr-2">signup</span>
                  </DropdownItem>
                  <DropdownItem key="orders" startContent={<BiBox className="text-xl text-primary/30" />} className="rounded-2xl p-4">
                    <span className="font-bold text-primary/40 italic lowercase pr-2">orders</span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Button
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                className="h-14 px-8 rounded-[22px] bg-secondary text-primary font-black shadow-glow-primary gap-4 border border-secondary/20 transition-all duration-500"
              >
                <div className="relative">
                  <BiShoppingBag className="text-2xl" />
                  <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-primary text-white text-[10px] rounded-full flex items-center justify-center font-black border-4 border-secondary">2</span>
                </div>
                <span className="hidden md:inline text-sm italic">₹2,499</span>
              </Button>

              <Button
                isIconOnly
                className="lg:hidden w-12 h-12 rounded-2xl bg-primary text-white"
                onPress={() => setIsMenuOpen(!isMenuOpen)}
              >
                <BiMenu className="text-2xl" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

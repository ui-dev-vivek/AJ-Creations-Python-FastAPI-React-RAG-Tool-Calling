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
  BiPhone,
  BiLogIn,
  BiUserPlus,
  BiX,
  BiChevronRight,
} from "react-icons/bi";
import { IoFlashOutline } from "react-icons/io5";
import { MdLocalShipping } from "react-icons/md";

import { categories, promotions, siteConfig } from "../config/site";
import { ThemeSwitch } from "./theme-switch";

export const Navbar = () => {
  const [currentPromo, setCurrentPromo] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Rotate promotional banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promotions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection for glassmorphism
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full sticky top-0 z-50 flex flex-col">
      {/* ───── Tier 1: PROMO TICKER ───── */}
      <div className="bg-[#001f4d] text-white py-2">
        <div className="container mx-auto px-4 flex justify-center items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
          <IoFlashOutline className="text-[#FFC107] text-lg animate-pulse" />
          <motion.div
            key={currentPromo}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-2"
          >
            <span className="truncate max-w-[200px] sm:max-w-none">
              {promotions[currentPromo].title} — {promotions[currentPromo].subtitle}
            </span>
            <span className="bg-[#FFC107] text-[#001f4d] px-2 py-0.5 rounded text-[10px] font-black ml-2 shadow-[0_0_10px_rgba(255,193,7,0.4)]">
              {promotions[currentPromo].code}
            </span>
          </motion.div>
        </div>
      </div>

      {/* ───── Tier 2: MAIN HEADER ───── */}
      <div
        className={`transition-all duration-500 ${isScrolled ? "glass-ultra py-2 shadow-2xl" : "bg-white dark:bg-background py-4 shadow-sm"
          } border-b border-gray-100/10`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between gap-4 lg:gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <span className={`text-3xl sm:text-4xl font-serif tracking-tighter lowercase transition-colors duration-500 ${isScrolled ? "text-primary" : "text-[#3B1E54] dark:text-primary"
              }`}>
              mava
            </span>
          </Link>

          {/* Search Toggle (Mobile) */}
          <Button
            isIconOnly
            variant="light"
            className="lg:hidden rounded-full h-10 w-10"
            onPress={() => setIsSearchOpen(!isSearchOpen)}
          >
            <BiSearch className="text-xl text-gray-600 dark:text-gray-400" />
          </Button>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl">
            <div className="relative group w-full">
              <Input
                placeholder="What are you looking for?"
                classNames={{
                  inputWrapper: `bg-gray-50/50 hover:bg-gray-100/50 border-none h-12 rounded-full pl-8 pr-1 transition-all focus-within:ring-2 focus-within:ring-[#3B1E54]/10`,
                  input: "text-sm text-gray-700 dark:text-gray-200 font-medium placeholder:text-gray-400"
                }}
                endContent={
                  <Button isIconOnly className="bg-[#003366] text-white rounded-full h-10 w-12 min-w-[48px] shadow-sm hover:bg-[#002244] transition-colors">
                    <BiSearch className="text-xl" />
                  </Button>
                }
              />
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:block">
              <ThemeSwitch />
            </div>

            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button variant="light" className="flex items-center gap-2 h-10 px-2 rounded-full hover:bg-gray-50/10">
                  <div className="w-9 h-9 rounded-full bg-blue-50/50 flex items-center justify-center border border-blue-100/20">
                    <BiUser className="text-[#003366] dark:text-primary text-xl" />
                  </div>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300 hidden xl:block">Account</span>
                  <BiChevronDown className="text-gray-400 text-sm hidden lg:block" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu className="w-56 p-2 rounded-2xl border border-gray-100 shadow-xl" variant="flat">
                <DropdownItem key="login" startContent={<BiLogIn className="text-xl text-[#3B1E54]" />} className="rounded-xl p-3">
                  <span className="font-bold">Sign In</span>
                </DropdownItem>
                <DropdownItem key="signup" startContent={<BiUserPlus className="text-xl text-[#FFB300]" />} className="rounded-xl p-3">
                  <span className="font-bold">Create Account</span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Button isIconOnly variant="light" className="relative group rounded-full w-10 h-10 hover:bg-gray-50/10 hidden sm:flex">
              <BiHeart className="text-2xl text-gray-700 dark:text-gray-300 group-hover:text-red-500 transition-colors" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#FFC107] text-[#3B1E54] text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                3
              </span>
            </Button>

            <Button
              variant="flat"
              className="h-10 sm:h-11 px-3 sm:px-4 rounded-2xl bg-[#f0f7ff]/50 hover:bg-[#e1efff]/50 gap-2 sm:gap-3 border border-blue-50/10 transition-colors"
            >
              <div className="relative">
                <BiShoppingBag className="text-xl sm:text-2xl text-[#003366] dark:text-primary" />
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#FFC107] text-[#3B1E54] text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  2
                </span>
              </div>
              <span className="text-sm font-black text-[#FFB300] tracking-tight">₹2,499</span>
            </Button>

            <Button
              isIconOnly
              variant="light"
              className="lg:hidden rounded-full h-10 w-10 bg-gray-50/50"
              onPress={() => setIsMenuOpen(true)}
            >
              <BiMenu className="text-2xl text-[#3B1E54] dark:text-primary" />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar (Expandable) */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden container mx-auto px-4 pb-4"
            >
              <Input
                placeholder="What are you looking for?"
                classNames={{
                  inputWrapper: "bg-gray-100 dark:bg-gray-800 border-none h-11 rounded-full pl-6",
                  input: "text-sm"
                }}
                endContent={
                  <Button isIconOnly size="sm" variant="light" onPress={() => setIsSearchOpen(false)}>
                    <BiX className="text-xl" />
                  </Button>
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ───── Tier 3: SECONDARY NAV (Desktop Only) ───── */}
      <nav className="hidden lg:block bg-white dark:bg-background/80 backdrop-blur-md border-b border-gray-100/10 py-2">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {/* All Categories Dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="solid"
                  className="bg-[#4a6b8a] text-white h-10 px-6 rounded-lg font-bold text-sm gap-2 hover:bg-[#3d5a75] transition-colors"
                  startContent={<BiMenu className="text-xl" />}
                >
                  All Categories
                  <BiChevronDown className="text-sm opacity-60" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu className="w-64 p-2 rounded-2xl shadow-2xl border border-gray-50">
                {categories.map(cat => (
                  <DropdownItem
                    key={cat.id}
                    startContent={<span className="text-xl">{cat.icon}</span>}
                    className="rounded-xl p-3 hover:bg-gray-50"
                  >
                    <span className="font-bold text-gray-700">{cat.name}</span>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <div className="w-[1px] h-6 bg-gray-200 mx-6" />

            {/* Nav Main Links */}
            <div className="flex items-center gap-1">
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-[13px] font-bold text-gray-600 hover:text-[#3B1E54] dark:text-gray-300 dark:hover:text-primary transition-colors flex items-center gap-1.5 rounded-lg hover:bg-gray-50/50"
                >
                  {item.label === "New Arrivals" && <span className="text-xs text-[#FFC107]">✨</span>}
                  {item.label === "Offers" && <span className="text-xs text-[#FFC107]">🏷️</span>}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Utility Links */}
          <div className="flex items-center gap-8">
            <Link href="/premium" className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#FFC107] hover:text-[#FFB300] transition-colors">
              <span className="text-base">✨</span> Premium
            </Link>
            <Link href="/track-order" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#3B1E54] dark:hover:text-primary transition-colors">
              <MdLocalShipping className="text-[#3B1E54] dark:text-primary text-lg" /> Track Order
            </Link>
            <Link href="tel:support" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#3B1E54] dark:hover:text-primary transition-colors">
              <BiPhone className="text-[#3B1E54] dark:text-primary text-lg" /> Support
            </Link>
          </div>
        </div>
      </nav>

      {/* ───── 4. MOBILE DRAWER ───── */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-[#08040d] shadow-2xl flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                <span className="text-2xl font-serif text-[#3B1E54] dark:text-primary">mava</span>
                <Button isIconOnly variant="light" className="rounded-full" onPress={() => setIsMenuOpen(false)}>
                  <BiX className="text-3xl" />
                </Button>
              </div>

              <div className="overflow-y-auto flex-1 p-6 space-y-8 custom-scrollbar">
                {/* Mobile Account Action */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-primary text-white font-bold rounded-xl h-12">Login</Button>
                  <Button className="flex-1 bg-secondary text-primary font-bold rounded-xl h-12">Join</Button>
                </div>

                {/* Categories Grid */}
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#FFC107] mb-4">Shop by Category</p>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/category/${cat.id}`}
                        className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <span className="text-xs font-bold text-center">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Main Links */}
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#FFC107] mb-4">Quick Links</p>
                  {siteConfig.navMenuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-primary/5 group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="font-bold text-gray-700 dark:text-gray-300">{item.label}</span>
                      <BiChevronRight className="text-xl text-gray-400 group-hover:text-primary" />
                    </Link>
                  ))}
                </div>

                {/* Theme Switch Mobile */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50/10 border border-blue-100/10">
                  <span className="font-bold text-sm">Theme Mode</span>
                  <ThemeSwitch />
                </div>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-black/50 border-t border-gray-100 dark:border-gray-800">
                <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Premium Beauty & Home</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

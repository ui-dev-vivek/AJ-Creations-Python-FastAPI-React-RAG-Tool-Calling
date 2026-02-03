"use client";

/**
 * MAVA Navbar Component
 * ═══════════════════════════════════════════════════════════════════════════════
 * Theme Colors (Single Source of Truth):
 * - Primary (Dark Blue): #00296b → Headers, Nav, Primary buttons, Active states
 * - Primary Medium: #003f88 → Hover states, Focus rings
 * - Primary Light: #00509d → Secondary hover states
 * - Secondary (Yellow): #ffd500, #fdc500 → CTA buttons, Prices, Badges
 * - Text on Primary: #FFFFFF
 * - Text on Secondary: #00296b
 * - Neutrals: default-* tokens for backgrounds, borders, secondary text
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@heroui/dropdown";
import {
  BiSearch,
  BiShoppingBag,
  BiHeart,
  BiUser,
  BiMenu,
  BiChevronDown,
  BiChevronRight,
  BiPhone,
  BiBox,
  BiLogIn,
  BiCog,
  BiUserPlus,
  BiX,
} from "react-icons/bi";
import {
  MdLocalOffer,
  MdLocalShipping,
  MdNewReleases,
} from "react-icons/md";
import { IoFlashOutline } from "react-icons/io5";

import { siteConfig, categories, promotions } from "../config/site";
import { ThemeSwitch } from "./theme-switch";
import { MavaLogo } from "./icons";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentPromo, setCurrentPromo] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Rotate promotional banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promotions.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
      <header className={`w-full sticky top-0 z-50 transition-all duration-500 ${isScrolled ? "shadow-2xl shadow-primary/10" : ""}`}>

        {/* ══════════════════ PROMO TICKER (Primary bg - Jamuni) ══════════════════ */}
        <div className="bg-primary text-primary-foreground overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-9 px-4 text-xs sm:text-sm">
              <div className="flex items-center gap-3 animate-fade-in">
                <IoFlashOutline className="text-secondary text-lg animate-pulse" />
                <span className="font-medium">{promotions[currentPromo].title}</span>
                <span className="hidden sm:inline">—</span>
                <span className="font-bold hidden sm:inline">{promotions[currentPromo].subtitle}</span>
                {/* Promo code badge - Secondary highlight */}
                <code className="ml-2 bg-secondary text-[#00296b] px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold tracking-wider">
                  {promotions[currentPromo].code}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════ MAIN NAVBAR ══════════════════ */}
        <div className={`bg-background transition-all duration-300 ${isScrolled ? "border-b border-default-200" : ""}`}>
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-between h-16 lg:h-[72px] gap-4">

              {/* ──── Logo ──── */}
              <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
                <div className="relative w-10 h-10 lg:w-11 lg:h-11">
                  <div className="absolute inset-0 bg-primary rounded-2xl opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MavaLogo size={24} />
                  </div>
                </div>
                <div className="hidden md:block">
                  <h1 className="text-xl font-bold tracking-tight text-primary">MAVA</h1>
                  <p className="text-[10px] text-default-400 -mt-0.5 tracking-widest">BEAUTY • HOME</p>
                </div>
              </Link>

              {/* ──── Desktop Search ──── */}
              <div className="hidden lg:flex flex-1 max-w-xl mx-8">
                <div className="relative w-full group">
                  <Input
                    placeholder="What are you looking for?"
                    classNames={{
                      inputWrapper: "bg-default-100 hover:bg-default-200/70 border-0 h-11 rounded-2xl pl-4 pr-2 transition-all duration-200 group-focus-within:ring-2 group-focus-within:ring-primary/30",
                      input: "text-sm",
                    }}
                    endContent={
                      <Button
                        isIconOnly
                        className="bg-primary text-primary-foreground rounded-xl h-8 w-8 min-w-8"
                        size="sm"
                      >
                        <BiSearch className="text-lg" />
                      </Button>
                    }
                  />
                </div>
              </div>

              {/* ──── Right Actions ──── */}
              <div className="flex items-center gap-1 sm:gap-2">

                {/* Mobile Search Toggle */}
                <Button
                  isIconOnly
                  variant="light"
                  className="lg:hidden w-10 h-10 rounded-xl"
                  onPress={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <BiSearch className="text-xl text-default-600" />
                </Button>

                {/* Theme Switch */}
                <div className="hidden sm:block">
                  <ThemeSwitch />
                </div>

                {/* Account */}
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Button
                      variant="light"
                      className="hidden sm:flex items-center gap-2 h-10 px-3 rounded-xl"
                    >
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                        <BiUser className="text-primary text-lg" />
                      </div>
                      <span className="hidden lg:block text-sm font-medium">Account</span>
                      <BiChevronDown className="text-default-400 text-sm hidden lg:block" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu className="w-52">
                    <DropdownSection showDivider>
                      <DropdownItem key="signin" startContent={<BiLogIn className="text-primary" />}>
                        Sign In
                      </DropdownItem>
                      <DropdownItem key="signup" startContent={<BiUserPlus className="text-secondary" />}>
                        Create Account
                      </DropdownItem>
                    </DropdownSection>
                    <DropdownSection>
                      <DropdownItem key="orders" startContent={<BiBox className="text-default-500" />}>My Orders</DropdownItem>
                      <DropdownItem key="wishlist" startContent={<BiHeart className="text-primary" />}>Wishlist</DropdownItem>
                      <DropdownItem key="settings" startContent={<BiCog className="text-default-500" />}>Settings</DropdownItem>
                    </DropdownSection>
                  </DropdownMenu>
                </Dropdown>

                {/* Wishlist - Badge uses Secondary for highlight */}
                <Button
                  as={Link}
                  href="/wishlist"
                  isIconOnly
                  variant="light"
                  className="hidden sm:flex w-10 h-10 rounded-xl relative"
                >
                  <BiHeart className="text-xl text-default-600 hover:text-primary transition-colors" />
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary text-[#00296b] text-[10px] font-bold rounded-full flex items-center justify-center">
                    3
                  </span>
                </Button>

                {/* Cart - CTA style uses Primary, badge uses Secondary */}
                <Button
                  as={Link}
                  href="/cart"
                  variant="flat"
                  className="h-10 px-3 rounded-xl bg-primary/10 hover:bg-primary/20 gap-2"
                >
                  <div className="relative">
                    <BiShoppingBag className="text-xl text-primary" />
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-secondary text-[#00296b] text-[10px] font-bold rounded-full flex items-center justify-center">
                      2
                    </span>
                  </div>
                  {/* Price display - Secondary color for highlights */}
                  <span className="hidden sm:block text-sm font-semibold text-secondary">₹2,499</span>
                </Button>

                {/* Mobile Menu Toggle */}
                <Button
                  isIconOnly
                  variant="flat"
                  className="lg:hidden w-10 h-10 rounded-xl bg-default-100"
                  onPress={() => setIsMenuOpen(true)}
                >
                  <BiMenu className="text-xl" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════ DESKTOP NAVIGATION (Primary active states) ══════════════════ */}
        <nav className="hidden lg:block bg-default-50/80 backdrop-blur-sm border-t border-b border-default-100">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex items-center h-12 gap-1">

              {/* Categories Dropdown - Primary button */}
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="solid"
                    color="primary"
                    className="h-9 px-4 rounded-xl font-medium gap-2"
                    startContent={<BiMenu className="text-lg" />}
                  >
                    All Categories
                    <BiChevronDown className="text-sm opacity-70" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu className="w-80 p-2">
                  <DropdownSection title="Beauty & Cosmetics" showDivider>
                    {categories.slice(0, 4).map((cat) => (
                      <DropdownItem
                        key={cat.id}
                        href={`/category/${cat.id}`}
                        startContent={<span className="text-xl">{cat.icon}</span>}
                        description={cat.subcategories.slice(0, 3).map(s => s.name).join(", ")}
                      >
                        {cat.name}
                      </DropdownItem>
                    ))}
                  </DropdownSection>
                  <DropdownSection title="Home & Living">
                    {categories.slice(4).map((cat) => (
                      <DropdownItem
                        key={cat.id}
                        href={`/category/${cat.id}`}
                        startContent={<span className="text-xl">{cat.icon}</span>}
                        description={cat.subcategories.slice(0, 3).map(s => s.name).join(", ")}
                      >
                        {cat.name}
                      </DropdownItem>
                    ))}
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>

              <div className="w-px h-5 bg-default-200 mx-2" />

              {/* Nav Links - Primary for active/hover */}
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="h-9 px-4 rounded-xl text-sm font-medium text-default-600 hover:text-primary hover:bg-primary/10 transition-all flex items-center gap-1.5"
                >
                  {/* New Arrivals - Secondary highlight */}
                  {item.label === "New Arrivals" && <MdNewReleases className="text-secondary" />}
                  {/* Offers - Secondary highlight */}
                  {item.label === "Offers" && <MdLocalOffer className="text-secondary" />}
                  {item.label}
                </Link>
              ))}

              {/* Right Side Quick Links */}
              <div className="ml-auto flex items-center gap-4">
                {/* Premium - Secondary for CTA highlight */}
                <Link href="/premium" className="flex items-center gap-1.5 text-sm font-medium text-secondary hover:underline">
                  ✨
                  Premium
                </Link>
                <Link href="/track-order" className="flex items-center gap-1.5 text-sm text-default-500 hover:text-primary">
                  <MdLocalShipping />
                  Track Order
                </Link>
                <Link href="tel:+911234567890" className="flex items-center gap-1.5 text-sm text-default-500 hover:text-primary">
                  <BiPhone />
                  Support
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* ══════════════════ MOBILE SEARCH DROPDOWN ══════════════════ */}
        <div className={`lg:hidden bg-background border-b border-default-200 overflow-hidden transition-all duration-300 ${isSearchOpen ? "max-h-20 py-3" : "max-h-0 py-0"}`}>
          <div className="px-4">
            <Input
              placeholder="Search products..."
              classNames={{
                inputWrapper: "bg-default-100 border-0 h-11 rounded-xl focus-within:ring-2 focus-within:ring-primary/30",
              }}
              startContent={<BiSearch className="text-lg text-default-400" />}
              endContent={
                <Button isIconOnly size="sm" variant="light" onPress={() => setIsSearchOpen(false)}>
                  <BiX className="text-lg" />
                </Button>
              }
            />
          </div>
        </div>
      </header>

      {/* ══════════════════ MOBILE MENU DRAWER ══════════════════ */}
      <div
        className={`lg:hidden fixed inset-0 z-[100] transition-all duration-300 ${isMenuOpen ? "visible" : "invisible"}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-background shadow-2xl transition-transform duration-300 ease-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Drawer Header - Primary branding */}
          <div className="flex items-center justify-between p-4 border-b border-default-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <MavaLogo size={22} />
              </div>
              <div>
                <p className="font-bold text-lg text-primary">MAVA</p>
                <p className="text-[10px] text-default-400">BEAUTY • HOME</p>
              </div>
            </div>
            <Button isIconOnly variant="light" className="rounded-xl" onPress={() => setIsMenuOpen(false)}>
              <BiX className="text-2xl" />
            </Button>
          </div>

          {/* Drawer Content */}
          <div className="overflow-y-auto h-[calc(100%-140px)] p-4">

            {/* User Quick Actions */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              <Link href="/account" className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-default-100 hover:bg-primary/10 transition-colors">
                <BiUser className="text-2xl text-primary" />
                <span className="text-xs font-medium">Account</span>
              </Link>
              {/* Wishlist - Secondary badge for highlight */}
              <Link href="/wishlist" className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-default-100 hover:bg-primary/10 transition-colors relative">
                <BiHeart className="text-2xl text-primary" />
                <span className="text-xs font-medium">Wishlist</span>
                <span className="absolute top-2 right-2 w-4 h-4 bg-secondary text-[#00296b] text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
              </Link>
              <Link href="/orders" className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-default-100 hover:bg-primary/10 transition-colors">
                <BiBox className="text-2xl text-secondary" />
                <span className="text-xs font-medium">Orders</span>
              </Link>
            </div>

            {/* Promo Card - Primary bg with white text */}
            <div className="bg-primary p-4 rounded-2xl mb-6 text-primary-foreground">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-90">{promotions[currentPromo].title}</p>
                  <p className="text-lg font-bold">{promotions[currentPromo].subtitle}</p>
                </div>
                {/* Promo code - Secondary highlight */}
                <code className="bg-secondary text-[#00296b] px-3 py-1.5 rounded-lg text-sm font-bold">
                  {promotions[currentPromo].code}
                </code>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-default-400 uppercase tracking-wider mb-3 px-1">Shop by Category</p>
              <div className="grid grid-cols-4 gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.id}`}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-default-50 hover:bg-primary/10 border border-default-100 hover:border-primary/30 transition-all active:scale-95"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="text-[10px] text-center font-medium leading-tight">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1">
              <p className="text-xs font-semibold text-default-400 uppercase tracking-wider mb-3 px-1">Quick Links</p>
              {siteConfig.navMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-primary/10 transition-all active:scale-[0.98]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="font-medium">{item.label}</span>
                  <BiChevronRight className="text-default-400" />
                </Link>
              ))}
            </div>
          </div>

          {/* Drawer Footer - Primary CTA button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-default-100 bg-background">
            <div className="flex gap-2">
              <Button
                as={Link}
                href="/login"
                variant="flat"
                className="flex-1 h-11 rounded-xl font-medium bg-default-100 hover:bg-default-200"
                startContent={<BiLogIn />}
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Button>
              {/* Sign Up - Primary CTA */}
              <Button
                as={Link}
                href="/signup"
                color="primary"
                className="flex-1 h-11 rounded-xl font-medium"
                startContent={<BiUserPlus />}
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

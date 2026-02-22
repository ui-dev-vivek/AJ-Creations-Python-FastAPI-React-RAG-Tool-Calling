import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#FAFAFB] border-t border-divider mt-20">
      <div className="container mx-auto max-w-7xl px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1 flex flex-col gap-6">
            <Link className="flex items-center gap-2" href="/">
              <span className="text-2xl font-black tracking-tighter text-[#861C74]">
                MAVA
              </span>
            </Link>
            <p className="text-default-500 text-sm leading-relaxed max-w-xs">
              Curating premium aesthetics for your home and personal care.
              Handmade excellence, delivered to your doorstep.
            </p>
            <div className="flex gap-4">
              {/* Mock Social Links */}
              <div className="w-10 h-10 rounded-full bg-white border border-divider flex items-center justify-center hover:bg-primary/5 transition-colors cursor-pointer text-[#9E2189]">
                <span className="text-lg">📸</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white border border-divider flex items-center justify-center hover:bg-primary/5 transition-colors cursor-pointer text-[#861C74]">
                <span className="text-lg">📘</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white border border-divider flex items-center justify-center hover:bg-primary/5 transition-colors cursor-pointer text-[#FFC72C]">
                <span className="text-lg">🐦</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-widest text-default-800 mb-6">
              Shop Categories
            </h4>
            <div className="flex flex-col gap-4">
              <Link
                className="text-default-500 hover:text-[#9E2189] text-sm transition-colors"
                href="/cosmetic-wala"
              >
                Cosmetic Wala
              </Link>
              <Link
                className="text-default-500 hover:text-[#FFC72C] text-sm transition-colors"
                href="/candle-wala"
              >
                Candle Wala
              </Link>
              <Link
                className="text-default-500 hover:text-[#4361EE] text-sm transition-colors"
                href="/hanky-wala"
              >
                Hanky Wala
              </Link>
              <Link
                className="text-default-500 hover:text-[#3A0CA3] text-sm transition-colors"
                href="/resin-wala"
              >
                Resin Wala
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-widest text-default-800 mb-6">
              Customer Support
            </h4>
            <div className="flex flex-col gap-4">
              <Link
                className="text-default-500 hover:text-primary text-sm transition-colors"
                href="/contact"
              >
                Contact Us
              </Link>
              <Link
                className="text-default-500 hover:text-primary text-sm transition-colors"
                href="/shipping"
              >
                Shipping Policy
              </Link>
              <Link
                className="text-default-500 hover:text-primary text-sm transition-colors"
                href="/returns"
              >
                Returns & Refunds
              </Link>
              <Link
                className="text-default-500 hover:text-primary text-sm transition-colors"
                href="/faq"
              >
                FAQs
              </Link>
            </div>
          </div>

          {/* Legal / Policy */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-widest text-default-800 mb-6">
              Legal
            </h4>
            <div className="flex flex-col gap-4">
              <Link
                className="text-default-500 hover:text-primary text-sm transition-colors"
                href="/terms"
              >
                Terms & Conditions
              </Link>
              <Link
                className="text-default-500 hover:text-primary text-sm transition-colors"
                href="/privacy"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-default-500 hover:text-primary text-sm transition-colors"
                href="/about"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>

        <Divider className="my-12" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-default-400 text-xs text-center md:text-left">
            © {currentYear} AJ Creations. All rights reserved.
            <br className="md:hidden" />
            <span className="hidden md:inline ml-2">
              Crafted with passion for premium aesthetics.
            </span>
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-bold text-default-300 uppercase tracking-[0.2em]">
              Trusted By Thousands
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

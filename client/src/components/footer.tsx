"use client";

import { Link } from "@heroui/link";
import { BiPhone, BiEnvelope, BiMap, BiLogoFacebook, BiLogoInstagram, BiLogoTwitter, BiLogoLinkedin } from "react-icons/bi";

export const Footer = () => {
    return (
        <footer className="w-full bg-slate-50 dark:bg-[#08040d] border-t border-gray-100 dark:border-gray-800/50 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-3xl font-serif text-[#3B1E54] dark:text-primary tracking-tighter lowercase">mava</span>
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
                            Redefining luxury through the "Wala" legacy. Curating the finest cosmetics, aromatic candles, and lifestyle essentials for the modern aura.
                        </p>
                        <div className="flex items-center gap-4">
                            {[
                                { icon: <BiLogoFacebook />, href: "#" },
                                { icon: <BiLogoInstagram />, href: "#" },
                                { icon: <BiLogoTwitter />, href: "#" },
                                { icon: <BiLogoLinkedin />, href: "#" },
                            ].map((social, i) => (
                                <Link
                                    key={i}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white dark:hover:bg-primary transition-all duration-300"
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#3B1E54] dark:text-primary mb-8">Collections</h4>
                        <ul className="space-y-4">
                            {[
                                { label: "Cosmetics", href: "/category/cosmetics" },
                                { label: "Candiles Wala", href: "/category/candiles" },
                                { label: "Hanky Wala", href: "/category/hanky" },
                                { label: "Rasie Wala", href: "/category/rasie" },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#3B1E54] dark:hover:text-primary transition-colors flex items-center gap-2 group">
                                        <span className="w-0 group-hover:w-4 h-px bg-primary transition-all duration-300" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#3B1E54] dark:text-primary mb-8">Support</h4>
                        <ul className="space-y-4">
                            {[
                                { label: "Track Order", href: "/track-order" },
                                { label: "Shipping Policy", href: "/shipping" },
                                { label: "Help Center", href: "/help" },
                                { label: "Terms of Service", href: "/terms" },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#3B1E54] dark:hover:text-primary transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#3B1E54] dark:text-primary mb-8">Newsletter</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Join our elite community for exclusive updates and first access to new "chapters".</p>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="aura@mava.com"
                                className="w-full bg-white dark:bg-gray-800 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                            />
                            <button className="absolute right-2 top-2 bottom-2 bg-[#3B1E54] text-white px-6 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary-dark transition-colors">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-gray-100 dark:border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                        © 2026 Mava Aesthetics. Crafted with Elegance.
                    </p>
                    <div className="flex items-center gap-8">
                        <Link href="tel:+91" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#3B1E54] dark:text-primary">
                            <BiPhone className="text-base" /> +91 MAVA-AURA
                        </Link>
                        <Link href="mailto:hello@mava.com" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#3B1E54] dark:text-primary">
                            <BiEnvelope className="text-base" /> hello@mava.com
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

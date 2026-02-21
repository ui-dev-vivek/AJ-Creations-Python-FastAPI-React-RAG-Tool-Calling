import { Link } from "@heroui/link";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full bg-primary/5 border-t border-primary/10 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-black">M</div>
                <span className="text-xl font-black text-primary uppercase tracking-tighter">Mava</span>
              </div>
              <p className="text-sm text-default-500">
                Premium cosmetics and lifestyle essentials curated for the modern aesthetic. Experience the "Wala" legacy.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-6">Collections</h4>
              <ul className="space-y-3 text-sm text-default-600">
                <li><Link href="/category/cosmetics" className="hover:text-primary transition-colors">Cosmetics</Link></li>
                <li><Link href="/category/candiles" className="hover:text-primary transition-colors">Candiles Wala</Link></li>
                <li><Link href="/category/hanky" className="hover:text-primary transition-colors">Hanky Wala</Link></li>
                <li><Link href="/category/rasie" className="hover:text-primary transition-colors">Rasie Wala</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-6">Company</h4>
              <ul className="space-y-3 text-sm text-default-600">
                <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
                <li><Link href="/blog" className="hover:text-primary transition-colors">Journal</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-6">Stay Elegant</h4>
              <p className="text-xs text-default-400 mb-4">Join our community for exclusive luxury updates.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-white border border-primary/10 rounded-xl px-4 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button className="bg-primary text-white font-bold px-4 py-2 rounded-xl text-sm shadow-lg shadow-primary/20">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-bold text-default-400 uppercase tracking-widest">
              © 2026 Mava Aesthetics. All Rights Reserved.
            </p>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-default-400">Powered by</span>
              <Link isExternal href="https://heroui.com" className="text-primary font-bold">HeroUI</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

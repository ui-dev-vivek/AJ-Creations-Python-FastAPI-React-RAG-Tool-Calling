import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-40 px-0">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

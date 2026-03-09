import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow relative z-10 w-full">{children}</main>
      <Footer />
    </div>
  );
}

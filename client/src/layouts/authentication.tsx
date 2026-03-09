import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FDF2FB] flex items-center justify-center py-10 px-4">
      <main className="w-full max-w-[450px]">
        {children}
      </main>
    </div>
  );
}

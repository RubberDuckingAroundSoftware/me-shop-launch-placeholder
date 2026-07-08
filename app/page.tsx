import React from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-[var(--color-bg)] bg-artsy-grain text-[var(--color-text-body)] font-sans selection:bg-[#285331] selection:text-white">
      <div>
        <Header />
        <Hero />
      </div>
      <div>
        <Newsletter />
        <Footer />
      </div>
    </main>
  );
}

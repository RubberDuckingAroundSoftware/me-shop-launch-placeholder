import React from "react";
import { SubscribeForm } from "./subscribe-form";

export function Newsletter() {
  return (
    <section className="bg-gradient-to-b from-[var(--color-bg-dark)] to-[#1A1F1C] text-[var(--color-text-light)] py-20 sm:py-28 px-6 sm:px-8 border-t border-b border-[#285331]/30 relative overflow-hidden">
      {/* Artsy background accent light */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#285331]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-[var(--color-text-light)] text-4xl sm:text-6xl leading-[1.1] tracking-tight mb-6 sm:mb-8 select-none">
              Be in the{" "}
              <span className="italic text-[var(--color-accent-light)] font-normal">
                loop
              </span>{" "}
              when it
              <br />
              launches.
            </h2>

            <p className="text-base sm:text-lg font-sans text-[var(--color-text-light)]/80 leading-relaxed max-w-xl border-l border-[var(--color-accent-light)]/30 pl-5 py-1">
              Drop your email and you&apos;ll be first to hear when meShop opens
              its doors — plus the occasional note from the workshop along the
              way. No noise. Unsubscribe any time.
            </p>
          </div>

          <div className="lg:col-span-5 w-full max-w-md mt-4 lg:mt-0 p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-2xl">
            <SubscribeForm />
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { MoodboardGallery } from "./moodboard-gallery";

export function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-8 py-14 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 flex flex-col justify-between pr-0 lg:pr-6">
          <div>
            <h1 className="font-serif text-[var(--color-text-primary)] text-5xl sm:text-7xl lg:text-[5.25rem] leading-[1.02] tracking-tight mb-8 sm:mb-12 select-none">
              <span className="block">Shopping</span>
              <span className="block">is</span>
              <span className="block italic text-[var(--color-accent)] font-normal relative">
                personal.
              </span>
            </h1>

            <div className="border-l-2 border-[var(--color-accent)]/40 pl-6 py-1 mb-8">
              <p className="text-lg sm:text-xl font-sans text-[var(--color-text-body)] leading-relaxed max-w-xl">
                meShop is the space between wanting something and finding{" "}
                <span className="italic font-serif text-[var(--color-text-primary)] text-xl sm:text-2xl">
                  exactly the right one
                </span>
                . A pursuit driven by curiosity, taste, and passion — not
                conversion funnels or recommendation algorithms optimised for
                engagement.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end mt-4 lg:mt-0">
          <MoodboardGallery />
        </div>
      </div>
    </section>
  );
}

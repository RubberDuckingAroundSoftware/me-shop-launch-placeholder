"use client";

import React, { useState, useCallback, useEffect } from "react";
import { MoodboardGallery, moodboards } from "./moodboard-gallery";

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const transitionTo = useCallback((nextIndexInput: number | ((prev: number) => number)) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => {
        const nextIdx = typeof nextIndexInput === "function" ? nextIndexInput(prev) : nextIndexInput;
        return nextIdx;
      });
      setIsTransitioning(false);
    }, 400);
  }, []);

  // Auto-rotate every 8s. Automatically resets counter whenever currentIndex updates
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      transitionTo((prev) => (prev + 1) % moodboards.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isPaused, currentIndex, transitionTo]);

  const currentCatchphrase = moodboards[currentIndex]?.catchphrase || "exactly the right one";

  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-8 py-8 sm:py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-16 items-center">
        <div className="lg:col-span-7 flex flex-col justify-between pr-0 lg:pr-6">
          <div>
            <h1 className="font-serif text-[var(--color-text-primary)] text-5xl sm:text-7xl lg:text-[5.25rem] leading-[1.02] tracking-tight mb-6 sm:mb-10 lg:mb-12 select-none">
              <span className="block">Shopping</span>
              <span className="block">is</span>
              <span className="block italic text-[var(--color-accent)] font-normal relative">
                personal.
              </span>
            </h1>

            <div className="border-l-2 border-[var(--color-accent)]/40 pl-6 py-1 mb-2 lg:mb-8">
              <p className="text-lg sm:text-xl font-sans text-[var(--color-text-body)] leading-relaxed max-w-xl">
                meShop is the space between wanting something and finding{" "}
                <span className="inline-block min-h-[3.5rem] sm:min-h-[4rem] align-middle my-1">
                  <span
                    className={`italic font-serif text-[var(--color-text-primary)] text-xl sm:text-2xl transition-opacity duration-400 ease-in-out ${isTransitioning ? "opacity-0" : "opacity-100"
                      }`}
                  >
                    {currentCatchphrase}
                  </span>
                  <span className="not-italic font-sans text-[var(--color-text-body)]">.</span>
                </span>{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end mt-0">
          <MoodboardGallery
            currentIndex={currentIndex}
            isTransitioning={isTransitioning}
            onTransitionTo={transitionTo}
            onPauseChange={setIsPaused}
          />
        </div>
      </div>
    </section>
  );
}

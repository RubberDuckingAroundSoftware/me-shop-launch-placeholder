"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export interface MoodboardImage {
  src: string;
  alt: string;
}

const moodboards: MoodboardImage[] = [
  {
    src: "/moodboards/03-lovable.png",
    alt: "Minimalist",
  },
  {
    src: "/moodboards/01-the-archive.jpg",
    alt: "Moodboard with vintage books, New Balance sneakers, fresh vegetables, and handwritten notes",
  },
];

export function MoodboardGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate every 8s
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % moodboards.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Preload all images on mount so crossfade is seamless
  useEffect(() => {
    moodboards.forEach((m) => {
      const img = new window.Image();
      img.src = m.src;
    });
  }, []);

  const handleShuffle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => {
      if (moodboards.length <= 1) return prev;
      let nextIndex = prev;
      while (nextIndex === prev) {
        nextIndex = Math.floor(Math.random() * moodboards.length);
      }
      return nextIndex;
    });
  }, []);

  return (
    <div
      className="w-full max-w-md lg:max-w-none flex flex-col items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Card Container */}
      <div className="relative w-full transform rotate-1 hover:rotate-0 transition-all duration-700 ease-out group">
        <div className="p-3 sm:p-4 bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-[var(--color-border)]/70 transition-all duration-700 relative">

          {/* Image Container with 4:5 Aspect Ratio */}
          <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[var(--color-border)]/20">
            {moodboards.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={item.src}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-600 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                </div>
              );
            })}

            {/* Shuffle button floating bottom right of image area */}
            <button
              type="button"
              onClick={handleShuffle}
              aria-label="Shuffle moodboard image"
              title="Shuffle composition"
              className="absolute bottom-3 right-3 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-[var(--color-accent)] text-[var(--color-text-body)] hover:text-white shadow-md hover:shadow-lg border border-[var(--color-border)]/80 flex items-center justify-center transition-all duration-300 transform active:scale-90 cursor-pointer"
            >
              {/* Lucide Shuffle Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180"
              >
                <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.8-1.1 2-1.7 3.3-1.7H22" />
                <path d="m18 2 4 4-4 4" />
                <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
                <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
                <path d="m18 14 4 4-4 4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Dots below the card */}
      <div className="mt-5 flex items-center justify-center gap-2 z-10">
        {moodboards.map((item, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={item.src}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`View composition ${idx + 1}`}
              title={`View composition ${idx + 1}`}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${isActive
                ? "bg-[var(--color-accent)] scale-125 shadow-xs"
                : "border border-[var(--color-accent)]/50 bg-transparent hover:bg-[var(--color-accent)]/30"
                }`}
            />
          );
        })}
      </div>
    </div>
  );
}

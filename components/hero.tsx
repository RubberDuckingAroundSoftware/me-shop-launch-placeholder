"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { MoodboardGallery, moodboards } from "./moodboard-gallery";

const STORAGE_KEY = "meshop_seen_moodboards";

function useCollectorCount() {
  const [seen, setSeen] = useState<Set<number>>(() => new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setSeen(new Set(parsed));
          }
        }
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const markSeen = useCallback((index: number) => {
    setSeen((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev).add(index);
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
        }
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, []);

  const count = seen.size;
  const isComplete = mounted && count >= 100;
  const showCounter = mounted && count >= 5;

  return {
    count,
    isComplete,
    showCounter,
    markSeen,
  };
}

// LetterMorph component for Long Stay easter egg
function LetterMorph({
  fromText,
  toText,
  onComplete,
}: {
  fromText: string;
  toText: string;
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 1500; // 1.5s total sweep
    const startTime = Date.now();

    const frame = () => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(elapsed / totalDuration, 1);
      setProgress(p);

      if (p < 1) {
        requestAnimationFrame(frame);
      } else {
        // Hold for 5 seconds, then signal complete
        const timer = setTimeout(onComplete, 5000);
        return () => clearTimeout(timer);
      }
    };

    const animationId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animationId);
  }, [onComplete]);

  const fromChars = fromText.split("");
  const toChars = toText.split("");
  const maxLen = Math.max(fromChars.length, toChars.length);

  return (
    <span className="relative inline text-left select-none" aria-label={toText}>
      {/* Dissolving old text */}
      <span className="absolute left-0 top-0 w-full" aria-hidden>
        {fromChars.map((char, i) => {
          const charProgress = i / maxLen;
          const isVisible = charProgress > progress;
          return (
            <span
              key={`from-${i}`}
              style={{
                opacity: isVisible ? 1 : 0,
                transition: "opacity 50ms ease",
              }}
            >
              {char}
            </span>
          );
        })}
      </span>

      {/* Materializing new text */}
      <span aria-hidden>
        {toChars.map((char, i) => {
          const charProgress = i / maxLen;
          const isVisible = charProgress < progress - 0.05; // 30ms behind
          return (
            <span
              key={`to-${i}`}
              style={{
                opacity: isVisible ? 1 : 0,
                transition: "opacity 80ms ease",
              }}
            >
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
}

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Easter Eggs State
  const [speedReaderActive, setSpeedReaderActive] = useState(false);
  const [longStayActive, setLongStayActive] = useState(false);
  const [longStayFromText, setLongStayFromText] = useState("");
  const [nightOwlOverride, setNightOwlOverride] = useState<string | null>(null);

  const { count, isComplete, showCounter, markSeen } = useCollectorCount();

  const longStayTimer = useRef<NodeJS.Timeout | null>(null);
  const hasTriggeredLongStay = useRef(false);

  const transitionTo = useCallback((nextIndexInput: number | ((prev: number) => number)) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => {
        const nextIdx = typeof nextIndexInput === "function" ? nextIndexInput(prev) : nextIndexInput;

        // Check for Night Owl override (1 in 6 chance between midnight and 5am)
        const hour = new Date().getHours();
        const isNightOwlHour = hour >= 0 && hour < 5;
        if (isNightOwlHour && Math.random() < 1 / 6) {
          setNightOwlOverride("the thing you add to cart at 2am and don't regret in the morning");
        } else {
          setNightOwlOverride(null);
        }

        return nextIdx;
      });
      setIsTransitioning(false);
    }, 400);
  }, []);

  // Mark seen on every unique image display when normal rotation is active
  useEffect(() => {
    if (typeof currentIndex === "number" && !speedReaderActive && !longStayActive) {
      markSeen(currentIndex);
    }
  }, [currentIndex, speedReaderActive, longStayActive, markSeen]);

  // Auto-rotate every 8s. Automatically resets counter whenever currentIndex updates or easter egg is active
  useEffect(() => {
    if (isPaused || speedReaderActive || longStayActive) return;
    const interval = setInterval(() => {
      transitionTo((prev) => (prev + 1) % moodboards.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isPaused, speedReaderActive, longStayActive, currentIndex, transitionTo]);

  // Speed Reader Easter Egg handler
  const handleSpeedReaderTrigger = useCallback(() => {
    hasTriggeredLongStay.current = true; // Cancel Long Stay if Speed Reader fires
    setSpeedReaderActive(true);
    setTimeout(() => {
      setSpeedReaderActive(false);
      transitionTo((prev) => Math.floor(Math.random() * moodboards.length));
    }, 4000);
  }, [transitionTo]);

  // Long Stay Easter Egg triggers
  const triggerLongStay = useCallback(() => {
    if (hasTriggeredLongStay.current || speedReaderActive) return;
    hasTriggeredLongStay.current = true;
    const basePhrase = nightOwlOverride || moodboards[currentIndex]?.catchphrase || "exactly the right one";
    setLongStayFromText(basePhrase);
    setLongStayActive(true);
  }, [currentIndex, speedReaderActive, nightOwlOverride]);

  const handleLongStayComplete = useCallback(() => {
    setLongStayActive(false);
    transitionTo((prev) => (prev + 1) % moodboards.length);
  }, [transitionTo]);

  useEffect(() => {
    longStayTimer.current = setTimeout(() => {
      if (!hasTriggeredLongStay.current) {
        triggerLongStay();
      }
    }, 3 * 60 * 1000);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (longStayTimer.current) clearTimeout(longStayTimer.current);
      }
    });

    const newsletterEl = document.getElementById("newsletter") || document.getElementById("subscribe") || document.querySelector("input[type='email']");
    if (newsletterEl) observer.observe(newsletterEl);

    return () => {
      if (longStayTimer.current) clearTimeout(longStayTimer.current);
      observer.disconnect();
    };
  }, [triggerLongStay]);

  const baseCatchphrase = moodboards[currentIndex]?.catchphrase || "exactly the right one";
  const effectiveCatchphrase = speedReaderActive
    ? "patience."
    : isComplete
      ? "Curiosity is the new luxury."
      : nightOwlOverride || baseCatchphrase;

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
                    className={`italic font-serif text-[var(--color-text-primary)] text-xl sm:text-2xl transition-opacity duration-400 ease-in-out ${
                      isTransitioning ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {longStayActive ? (
                      <LetterMorph
                        fromText={longStayFromText}
                        toText="...and finding you. You're the thing worth finding."
                        onComplete={handleLongStayComplete}
                      />
                    ) : (
                      <>
                        {effectiveCatchphrase}
                        {!/[.!?]$/.test(effectiveCatchphrase) && (
                          <span className="not-italic font-sans text-[var(--color-text-body)]">.</span>
                        )}
                      </>
                    )}
                  </span>
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
            speedReaderActive={speedReaderActive}
            onSpeedReaderTrigger={handleSpeedReaderTrigger}
            isComplete={isComplete}
            count={count}
            showCounter={showCounter}
          />
        </div>
      </div>
    </section>
  );
}

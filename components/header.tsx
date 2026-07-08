import React from "react";

export function Header() {
  return (
    <header className="max-w-6xl mx-auto px-6 sm:px-8 pt-8 sm:pt-12 flex flex-row justify-between items-center gap-4 border-b border-[var(--color-border)]/30 pb-6 sm:pb-8">
      <div className="flex items-center gap-3 select-none group cursor-pointer">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#285331] flex items-center justify-center text-white shrink-0 shadow-md ring-4 ring-[#285331]/15 group-hover:ring-[#285331]/25 group-hover:scale-105 transition-all duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shopping-bag h-5 w-5 sm:h-6 sm:w-6 text-white"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
            <path d="M3 6h18"></path>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        </div>
        <span className="font-sans font-bold text-2xl sm:text-3xl text-[var(--color-text-primary)] tracking-tight">
          meShop
        </span>
      </div>
    </header>
  );
}

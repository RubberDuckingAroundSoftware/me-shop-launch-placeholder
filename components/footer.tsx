import React from "react";

export function Footer() {
  return (
    <footer className="bg-[var(--color-bg)]/90 backdrop-blur-md border-t border-[var(--color-border)]/50 py-14 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-[11px] tracking-[0.18em] font-medium text-[var(--color-text-muted)] font-mono">
        <div>
          <a
            href="https://github.com/RubberDuckingAroundSoftware/me-shop"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="meShop on GitHub"
            className="text-[var(--color-text-body)] hover:text-[var(--color-accent)] transition-colors inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-github w-5 h-5"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
          </a>
        </div>
        <div className="sm:text-right flex items-center gap-1.5 sm:justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-copyright w-3.5 h-3.5 shrink-0"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M14.83 14.83a4 4 0 1 1 0-5.66"></path>
          </svg>
          <span>2026 —</span>
          <a
            href="https://rubberduckingaround.software"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-body)] normal-case tracking-normal hover:text-[var(--color-accent)] transition-colors underline decoration-[var(--color-border)] underline-offset-4"
          >
            RubberDuckingAroundSoftware
          </a>
        </div>
      </div>
    </footer>
  );
}

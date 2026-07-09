"use client";

import React, { useState, useEffect, useCallback } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error" | "invalid";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      try {
        if (typeof window !== "undefined" && localStorage.getItem("meshop_subscribed") === "true") {
          setStatus("success");
        }
      } catch {
        // ignore storage errors
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSend = useCallback(async () => {
    if (status === "submitting") return;

    const trimmed = email.trim();
    if (!trimmed || !validateEmail(trimmed)) {
      setStatus("invalid");
      setErrorMsg("That doesn't look like an email. 👀");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmed }),
      });

      if (res.ok) {
        try {
          if (typeof window !== "undefined") {
            localStorage.setItem("meshop_subscribed", "true");
          }
        } catch {
          // ignore
        }
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg("Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Try again.");
    }
  }, [email, status]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  if (mounted && status === "success") {
    return (
      <div className="py-6 transition-all duration-500">
        <p className="font-serif italic text-3xl sm:text-4xl text-[var(--color-accent-light)]">
          You&apos;re in. ✓
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-start">
      <div className="w-full">
        <label
          htmlFor="newsletter-email"
          className="uppercase tracking-[0.15em] text-xs font-medium text-[var(--color-text-light)] block mb-3 font-sans select-none"
        >
          Your Email
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "invalid" || status === "error") {
              setStatus("idle");
              setErrorMsg("");
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder="you@somewhere.co"
          disabled={status === "submitting"}
          className="w-full bg-transparent border-b border-[var(--color-border)]/40 focus:border-[var(--color-accent-light)] text-[var(--color-text-light)] placeholder:text-[var(--color-text-light)]/40 focus:outline-none py-2 text-base font-sans transition-colors"
        />
        {(status === "invalid" || status === "error") && errorMsg && (
          <p className="text-sm text-[var(--color-accent-light)] mt-2 font-sans">
            {errorMsg}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={handleSend}
        disabled={status === "submitting"}
        className={`mt-6 sm:mt-8 bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white border border-white/10 px-8 py-3.5 rounded-full uppercase tracking-[0.2em] text-xs font-mono font-medium transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer select-none transform hover:-translate-y-0.5 ${
          status === "submitting" ? "animate-pulse opacity-80 cursor-wait" : ""
        }`}
      >
        {status === "submitting" ? "SENDING..." : "SEND IT →"}
      </button>
    </div>
  );
}

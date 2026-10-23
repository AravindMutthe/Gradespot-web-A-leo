"use client";

import { useEffect, useState } from "react";

// Theme toggle (DECISIONS §25) — salon-style sun/moon switch. The
// initial `.dark` class is set pre-paint by the inline script in
// layout.tsx; this control only flips it and persists the choice to
// localStorage. The icon itself is CSS-driven by the root class, so
// it renders correctly even before hydration; React state only
// drives the accessible name / pressed state.
function MoonIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

export default function ThemeToggle({
  variant = "icon",
}: {
  variant?: "icon" | "labeled";
}) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    // Brief colour cross-fade on switch — never under reduced motion.
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.add("theme-anim");
      window.setTimeout(() => root.classList.remove("theme-anim"), 420);
    }
    root.classList.toggle("dark", next);
    root.dataset.theme = next ? "dark" : "light";
    root.style.colorScheme = next ? "dark" : "light";
    try {
      localStorage.setItem("gradespot-theme", next ? "dark" : "light");
    } catch {
      // Storage unavailable (private mode) — the theme still applies
      // for this visit.
    }
    setDark(next);
  }

  const label = dark ? "Switch to light theme" : "Switch to dark theme";

  if (variant === "labeled") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        aria-pressed={dark}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-line bg-parchment px-4 py-3 text-left"
      >
        <span>
          <span className="block text-[15px] font-semibold text-heading">Theme</span>
          <span className="block text-[13px] text-body">
            {dark ? "Dark theme is on" : "Light theme is on"}
          </span>
        </span>
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-heading"
          aria-hidden="true"
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={dark}
      title={label}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-paper/85 transition-colors hover:border-brand-bright hover:text-brand-bright"
    >
      <span className="dark:hidden">
        <MoonIcon />
      </span>
      <span className="hidden dark:block">
        <SunIcon />
      </span>
    </button>
  );
}

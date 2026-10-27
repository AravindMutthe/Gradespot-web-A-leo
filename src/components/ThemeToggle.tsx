"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Theme toggle (DECISIONS §25, placement corrected §25.9) — ONE
// floating on-screen button at the bottom of the viewport, on every
// page, in both themes. Aravind's 2026-10-24 ruling: NOT in the
// header strip, NOT a mobile-sheet row, NOT an LP strip — a floating
// toggle, bottom side, like a floating action. The initial `.dark`
// class is set pre-paint by the inline script in layout.tsx; this
// control only flips it and persists the choice to localStorage.
// The icon itself is CSS-driven by the root class, so it renders
// correctly even before hydration; React state only drives the
// accessible name / pressed state.
//
// Placement (no collisions, §25.9):
// - Mobile (< nav breakpoint): the sticky Call/WhatsApp/Register
//   bar is 52px tall at the viewport bottom, so the button sits at
//   bottom 68px (52 + 16px clearance) + safe-area inset.
// - Desktop (>= nav breakpoint): the floating WhatsApp bubble is
//   56px tall at bottom 24px (top edge 80px), so the button sits at
//   bottom 96px (80 + 16px clearance) + safe-area inset.
// - Same right edge as the bubble (24px desktop, 16px mobile), same
//   z-50 stacking as the other floating chrome.
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

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  // LP pages are nav-free (no drawer), so they keep the floating
  // toggle on mobile too — otherwise LP visitors would have no
  // theme control at all. LP chrome has no sticky bar, so there
  // is no overlap to avoid there.
  const pathname = usePathname();
  const isLp = pathname?.startsWith("/lp/") ?? false;

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

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={dark}
      title={label}
      className={`fixed bottom-[calc(68px+env(safe-area-inset-bottom))] right-4 z-50 h-12 w-12 items-center justify-center rounded-full bg-ink text-paper shadow-[0_10px_30px_rgba(31,24,16,0.35)] ring-1 ring-black/10 transition-transform hover:scale-[1.05] dark:bg-paper dark:text-ink dark:ring-white/25 nav:bottom-[calc(96px+env(safe-area-inset-bottom))] nav:flex nav:right-6 ${isLp ? "flex" : "hidden"}`}
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

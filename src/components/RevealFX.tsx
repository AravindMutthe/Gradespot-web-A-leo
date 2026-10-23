"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Scroll-reveal engine (Leo redesign v2, DECISIONS.md §19). Progressive
// enhancement only: it adds .reveal-on to <html> (which arms the CSS
// transitions in globals.css) and .is-in to each [data-reveal] element
// as it enters the viewport. If JS is off, IO is unsupported, or the
// visitor prefers reduced motion, nothing is ever hidden.
export default function RevealFX() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    root.classList.add("reveal-on");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );

    const scan = () => {
      document
        .querySelectorAll("[data-reveal]:not(.is-in)")
        .forEach((el) => io.observe(el));
    };
    scan();

    // Client-rendered lists (catalogue search) inject nodes later.
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}

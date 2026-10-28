"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteStickyBar from "@/components/SiteStickyBar";

// Frontend 3.0 site chrome (Stage 1, feat/frontend-v3; FINAL DESIGN
// PHASE 1 adds the mobile-only site sticky bar below).
// Header + main + Footer everywhere EXCEPT /lp/* landing pages, which
// stay nav-free by design (they render their own minimal logo+phone
// chrome and their own sticky bar). No theme toggle in chrome: dark
// theme is deferred (v1.1 light-first). The v1 FloatingActions and
// ThemeToggle components remain on disk, unrendered, until their
// template stages decide their fate — nothing here imports them.
// The mobile-only spacer after the footer is the sticky bar's
// clearance: it keeps the bar from ever covering a CTA or footer
// link at full scroll.
export default function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLp = pathname?.startsWith("/lp/") ?? false;
  if (isLp) {
    return <main id="main">{children}</main>;
  }
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <div aria-hidden="true" className="h-[68px] md:hidden" />
      <SiteStickyBar />
    </>
  );
}

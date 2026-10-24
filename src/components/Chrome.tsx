"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import ThemeToggle from "@/components/ThemeToggle";

// Site chrome switch (research expansion pack, DECISIONS.md §18): the
// global header/footer/floating actions render everywhere EXCEPT the
// /lp/* paid-traffic landing pages, which are nav-free by design (ppc
// report tactic 1: one ad group → one page, no navigation; the LP
// renders its own minimal logo+phone chrome and sticky action bar).
export default function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLp = pathname?.startsWith("/lp/") ?? false;
  if (isLp) {
    // Nav-free LP chrome still gets the ONE floating theme toggle
    // (§25.9) — rendered outside <main>, like the global chrome.
    return (
      <>
        <main id="main">{children}</main>
        <ThemeToggle />
      </>
    );
  }
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <FloatingActions />
      <ThemeToggle />
    </>
  );
}

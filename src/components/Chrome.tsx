"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

// Site chrome switch (research expansion pack, DECISIONS.md §18): the
// global header/footer/floating actions render everywhere EXCEPT the
// /lp/* paid-traffic landing pages, which are nav-free by design (ppc
// report tactic 1: one ad group → one page, no navigation; the LP
// renders its own minimal logo+phone chrome and sticky action bar).
export default function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLp = pathname?.startsWith("/lp/") ?? false;
  if (isLp) {
    return <main>{children}</main>;
  }
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingActions />
    </>
  );
}

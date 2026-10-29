"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Frontend 3.0 site chrome (Stage 1, feat/frontend-v3; FINAL DESIGN
// PHASE 1 adds the mobile-only site sticky bar below).
// Perf note (feat/main-perf-tbt): the static chrome — Footer, the
// sticky-bar clearance spacer, SiteStickyBar — is server-rendered and
// passed in as props from the server layout, so it ships zero client
// JS and hydrates nothing. Only `header` (the interactive Header
// island) hydrates. Header + main + Footer everywhere EXCEPT /lp/*
// landing pages, which stay nav-free by design (they render their
// own minimal logo+phone chrome and their own sticky bar).
// The mobile-only spacer after the footer is the sticky bar's
// clearance: it keeps the bar from ever covering a CTA or footer
// link at full scroll.
export default function Chrome({
  header,
  footer,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isLp = pathname?.startsWith("/lp/") ?? false;
  if (isLp) {
    return <main id="main">{children}</main>;
  }
  return (
    <>
      {header}
      <main id="main">{children}</main>
      {footer}
    </>
  );
}

import Link from "next/link";
import { business, telHref } from "@/data/site";

// FINAL DESIGN PHASE 1 — site sticky bar, MOBILE ONLY (md:hidden).
// Two honest actions only: Call + Enquire. Never a confirmed demo
// or booking promise, never a demo-booking CTA. Rendered by Chrome on site
// pages only — LP pages keep their own sticky bar and never see
// this one. Chrome renders a matching mobile-only spacer after the
// footer so the bar can never cover a page CTA or footer links.
export default function SiteStickyBar() {
  const phone = business.phones[0];
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex bg-ink shadow-[0_-2px_8px_rgba(16,35,63,0.25)] md:hidden">
      <a
        href={telHref(phone)}
        className="flex min-h-[44px] flex-1 items-center justify-center px-1 text-center text-[12px] font-bold whitespace-nowrap text-white"
      >
        <span aria-hidden="true">📞</span> Call
      </a>
      <Link
        href="/contact-us"
        className="flex min-h-[44px] flex-1 items-center justify-center px-1 text-center text-[12px] font-bold whitespace-nowrap text-white"
      >
        <span aria-hidden="true">✉️</span> Enquire
      </Link>
    </div>
  );
}

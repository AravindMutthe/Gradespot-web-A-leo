"use client";

// Frontend 3.0 global header (Stage 1, feat/frontend-v3).
// Task-based navigation, NOT the v1 mega menu and NOT the Nexus header:
// six task groups as click-to-open menus (never hover-required), one
// open at a time, Escape closes, click-outside closes, full keyboard
// operation. Every interactive target is at least 44px tall.
// Route slugs are unchanged existing routes; no destination is added,
// removed, or renamed here. Search arrives with the Stage 6 build-time
// index: a search box in the desktop bar and at the top of the mobile
// sheet, both submitting to the local /search results page.
// Dark theme is deferred (v1.1 light-first): no theme toggle here.

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { business, telHref } from "@/data/site";
import SearchBox from "@/components/SearchBox";

type NavLink = { label: string; href: string };
type NavGroup = { key: string; label: string; links: NavLink[] };

const GROUPS: NavGroup[] = [
  {
    key: "training",
    label: "Training",
    links: [
      { label: "Trainings", href: "/trainings" },
      { label: "Compare courses", href: "/compare" },
      { label: "Career support", href: "/career-support" },
      { label: "Student certifications", href: "/student-certifications" },
    ],
  },
  {
    key: "solutions",
    label: "IT Solutions",
    links: [
      { label: "Services", href: "/services" },
      { label: "For institutes", href: "/for-institutes" },
      { label: "For colleges", href: "/for-colleges" },
      { label: "Corporate & international", href: "/corporate-and-international" },
      { label: "Partner with us", href: "/partner-with-us" },
    ],
  },
  {
    key: "resources",
    label: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Learning resources", href: "/resources" },
    ],
  },
  {
    key: "company",
    label: "Company",
    links: [
      { label: "About us", href: "/about-us" },
      { label: "Team members", href: "/team-members" },
      { label: "Why choose us", href: "/why-choose-us" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    key: "support",
    label: "Support",
    links: [
      { label: "Contact us", href: "/contact-us" },
      { label: "Register", href: "/register" },
      { label: "Certificate verification", href: "/certificate-verification" },
      { label: "FAQs", href: "/faq" },
    ],
  },
  {
    key: "legal",
    label: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Refund policy", href: "/refund-policy" },
      { label: "Terms & conditions", href: "/terms-and-conditions" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];

export default function Header() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!openGroup) return;
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenGroup(null);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openGroup]);

  const phone = business.phones[0];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to main content
      </a>
      <div className="wrap flex items-center gap-4 py-3">
        <Link href="/" aria-label="GradeSpot IT Solutions — home" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="GradeSpot IT Solutions"
            width={160}
            height={50}
            priority
            className="h-auto w-[160px]"
          />
        </Link>

        {/* Desktop task navigation (from the nav breakpoint, 960px). */}
        <nav ref={navRef} aria-label="Primary" className="hidden flex-1 items-center gap-1 xl:flex">
          {GROUPS.map((group) => {
            const open = openGroup === group.key;
            return (
              <div key={group.key} className="relative">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-haspopup="true"
                  aria-controls={`nav-panel-${group.key}`}
                  onClick={() => setOpenGroup(open ? null : group.key)}
                  className="flex min-h-11 items-center gap-1 rounded px-3 text-[15px] font-semibold text-body hover:text-brand-dark"
                >
                  {group.label}
                  <span aria-hidden="true" className={open ? "inline-block rotate-180" : "inline-block"}>
                    ▾
                  </span>
                </button>
                {open && (
                  <div
                    id={`nav-panel-${group.key}`}
                    className="absolute left-0 top-full z-50 mt-1 w-64 rounded-xl border border-line bg-surface p-2 shadow-lg"
                  >
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpenGroup(null)}
                        className="flex min-h-11 items-center rounded-lg px-3 text-[15px] text-body hover:bg-surface-muted hover:text-brand-dark"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden xl:block">
            <SearchBox compact />
          </div>
          <a
            href={telHref(phone)}
            className="hidden min-h-11 items-center rounded-lg border border-line px-4 text-[15px] font-semibold text-body hover:border-brand-dark hover:text-brand-dark lg:flex"
          >
            Call {phone}
          </a>
          <Link
            href="/contact-us"
            className="flex min-h-11 items-center rounded-lg bg-brand-dark px-5 text-[15px] font-semibold text-white hover:bg-ink"
          >
            Enquire
          </Link>
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line text-body xl:hidden"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              {mobileOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile sheet: accordion groups, every target ≥44px. */}
      {mobileOpen && (
        <nav aria-label="Mobile" className="max-h-[70vh] overflow-y-auto border-t border-line bg-surface xl:hidden">
          <div className="wrap py-2">
            <div className="border-b border-line pb-3">
              <SearchBox onNavigate={() => setMobileOpen(false)} />
            </div>
            {GROUPS.map((group) => {
              const open = mobileGroup === group.key;
              return (
                <div key={group.key} className="border-b border-line last:border-b-0">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setMobileGroup(open ? null : group.key)}
                    className="flex min-h-11 w-full items-center justify-between py-2 text-left text-[15px] font-semibold text-body"
                  >
                    {group.label}
                    <span aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  {open && (
                    <div className="pb-2 pl-3">
                      {group.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex min-h-11 items-center rounded-lg px-2 text-[15px] text-body hover:text-brand-dark"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <a
              href={telHref(phone)}
              className="flex min-h-11 items-center rounded-lg px-2 py-2 text-[15px] font-semibold text-body"
            >
              Call {phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

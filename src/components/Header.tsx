"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { business, telHref } from "@/data/site";
import { SocialLinks } from "@/components/ui";
import { navCourses } from "@/data/catalogue-nav";
import { services } from "@/data/services";
import { nexusMenus, type NavMenu } from "@/data/nexus-nav";

// Header — GradeSpot Nexus Release 1 (docs/frontend-v2/SPEC.md §2).
// Six primary menus only: Academy, Certifications, Career Pathways,
// Labs & Projects, IT Solutions, Company & Resources. Desktop mega panels are
// three structured columns plus a featured panel; mobile is a
// one-level accordion (each top menu expands once; groups inside are
// headings, not nested accordions). Panels open on hover AND click,
// are keyboard-operable (chevron buttons, Escape closes, focus
// opens), and the header search filters the real catalogue + services
// — it never invents a destination. Primary CTA is "Talk to an
// Advisor" → /contact-us (the existing advisory flow). Registration
// is contextual only: a small link inside the Training panel /
// accordion, never a prominent button on every page.
// Logo plate: UNTOUCHED — official artwork only, per-theme swap.
// Do not recolor, filter, crop or replace the logo files. Nexus
// brand colours come from BRAND-TOKENS.md, not from the plate.

type PanelKey = NavMenu["key"];

const navLink =
  "block whitespace-nowrap px-2 py-3 text-[14px] font-semibold text-nav underline-offset-4 transition-colors hover:text-signal hover:underline hover:decoration-2 nav:px-1.5 nav:py-2.5 nav:text-[12px] xl:px-2.5 xl:py-3 xl:text-[13px]";
const chevronBtn =
  "-ml-1 flex h-11 w-6 items-center justify-center text-[12px] text-nav transition-colors hover:text-signal nav:-ml-0.5 nav:w-4 xl:-ml-1 xl:w-6";
const mobileLink =
  "flex min-h-[48px] items-center px-3 text-[15px] font-semibold text-heading transition-colors hover:text-signal";

function HeaderSearch({ onNavigate, compact }: { onNavigate?: () => void; compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (q.length < 2) return [];
    const courseHits = navCourses
      .filter((c) => c.label.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q))
      .slice(0, 5)
      .map((c) => ({ label: c.label, href: `/trainings/${c.slug}`, kind: "Training" }));
    const serviceHits = services
      .filter((s) => s.title.toLowerCase().includes(q))
      .slice(0, 3)
      .map((s) => ({ label: s.title, href: `/services/${s.slug}`, kind: "Service" }));
    return [...courseHits, ...serviceHits].slice(0, 8);
  }, [q]);
  const showResults = focused && q.length >= 2;
  return (
    <div className="relative">
      <label htmlFor={compact ? "header-search-mobile" : "header-search"} className="sr-only">
        Search courses, services, certifications
      </label>
      <input
        id={compact ? "header-search-mobile" : "header-search"}
        type="search"
        role="searchbox"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => window.setTimeout(() => setFocused(false), 150)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setQuery("");
        }}
        placeholder="Search courses, services, certifications…"
        className="w-full rounded-full border border-line bg-parchment px-4 py-2.5 text-[13px] text-heading outline-none transition-colors placeholder:text-body/70 focus:border-brand nav:w-[150px] nav:focus:w-[210px] xl:w-[180px] xl:focus:w-[240px]"
      />
      {showResults && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-line bg-parchment shadow-[0_28px_56px_rgba(31,24,16,0.18)] nav:w-[300px]">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-[13px] text-body" role="status">
              No courses or services match. Try “CCNA”, “Azure” or “SOC”.
            </p>
          ) : (
            <ul>
              {results.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    onClick={() => {
                      setQuery("");
                      onNavigate?.();
                    }}
                    className="flex items-center justify-between gap-3 px-4 py-2.5 text-[13.5px] font-semibold text-heading transition-colors hover:bg-cream hover:text-signal"
                  >
                    <span>{r.label}</span>
                    <span className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.06em] text-signal-strong">
                      {r.kind}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link
            href="/trainings#course-search"
            onClick={() => {
              setQuery("");
              onNavigate?.();
            }}
            className="block border-t border-line px-4 py-2.5 text-[13px] font-bold text-signal hover:text-signal-strong"
          >
            Search all trainings →
          </Link>
        </div>
      )}
    </div>
  );
}

function MenuLinkItem({ label, href, external, note, onNavigate }: { label: string; href: string; external?: boolean; note?: string; onNavigate?: () => void }) {
  const cls =
    "block rounded-lg px-2 py-[7px] text-[13.5px] font-semibold text-heading transition-colors hover:bg-cream hover:text-signal";
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {label} ↗{note ? <span className="block text-[11.5px] font-normal text-body">{note}</span> : null}
    </a>
  ) : (
    <Link href={href} onClick={onNavigate} className={cls}>
      {label}
      {note ? <span className="block text-[11.5px] font-normal text-body">{note}</span> : null}
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<PanelKey | null>(null);
  const [mobilePanel, setMobilePanel] = useState<PanelKey | null>(null);
  const closeTimer = useRef<number | null>(null);

  const openNow = (key: PanelKey) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setPanel(key);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setPanel(null), 240);
  };
  const togglePanel = (key: PanelKey) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setPanel((p) => (p === key ? null : key));
  };
  const closeOnBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose();
  };
  const onPanelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setPanel(null);
  };

  const megaTrigger = (menu: NavMenu) => (
    <div
      key={menu.key}
      className="relative flex items-center"
      onMouseEnter={() => openNow(menu.key)}
      onMouseLeave={scheduleClose}
      onFocus={() => openNow(menu.key)}
      onBlur={closeOnBlur}
    >
      <Link className={navLink} href={menu.href} onClick={() => setPanel(null)}>
        {menu.label}
      </Link>
      <button
        type="button"
        className={chevronBtn}
        aria-expanded={panel === menu.key}
        aria-controls={`mega-${menu.key}`}
        aria-label={`${menu.label} menu`}
        onClick={() => togglePanel(menu.key)}
      >
        <span aria-hidden>{panel === menu.key ? "▴" : "▾"}</span>
      </button>
    </div>
  );

  const activeMenu = nexusMenus.find((m) => m.key === panel) ?? null;

  // Utility strip — spec §2 top bar: Hyderabad, India · Online &
  // Classroom Training, plus Contact and Student Support links.
  // Rendered twice, one instance per breakpoint (display:none hides
  // the other, so assistive tech sees only one), exactly as in v1:
  // below the 960px nav breakpoint it scrolls away; at/above nav it
  // sticks with the header.
  const strip = (
    <div className="bg-ink-deep text-footer-text">
      <div className="wrap flex flex-nowrap items-center justify-between gap-x-6 overflow-hidden py-2 font-mono text-[11px] uppercase tracking-[0.14em]">
        <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-x-5">
          <span className="min-w-0 truncate">Hyderabad, India · Online &amp; Classroom Training</span>
          <span className="hidden shrink-0 truncate md:inline">{business.locationLabel}</span>
          <a
            className="hidden min-w-0 truncate normal-case tracking-normal transition-colors hover:text-brand-bright lg:inline"
            href={`mailto:${business.emails[0]}`}
          >
            {business.emails[0]}
          </a>
        </div>
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <Link href="/contact-us" className="transition-colors hover:text-brand-bright">
            Contact
          </Link>
          <Link href="/career-support" className="hidden transition-colors hover:text-brand-bright sm:inline">
            Student Support
          </Link>
          <span className="hidden items-center gap-3 sm:flex sm:gap-4">
            <SocialLinks />
          </span>
          <span className="hidden items-center gap-4 md:flex">
            {business.phones.map((p) => (
              <a
                key={p}
                className="font-semibold normal-case tracking-normal text-brand-bright hover:text-paper"
                href={telHref(p)}
              >
                {p}
              </a>
            ))}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="nav:hidden">{strip}</div>

      <header className="sticky top-0 z-50">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2.5 focus:font-semibold focus:text-paper"
        >
          Skip to content
        </a>

        <div className="hidden nav:block">{strip}</div>

        {/* Main navigation — paper bar, ink type, official logo.
            Logo plate UNTOUCHED from Leo v1: luminous parchment
            plate + warm halo behind the unmodified artwork, per-theme
            swap via CSS (both files render, CSS picks one). */}
        <div className="glass-panel relative border-b border-line shadow-[0_1px_0_rgba(32,25,19,0.04)]">
          <div className="wrap flex items-center justify-between gap-3 py-2.5">
            <Link
              href="/"
              aria-label="GradeSpot IT Solutions — Home"
              className="logo-plate shrink-0 rounded-2xl px-3 py-1 ring-1 ring-line nav:px-1.5 xl:px-3"
            >
              <span className="dark:hidden">
                <Image
                  src="/images/logo.png"
                  alt="GradeSpot IT Solutions"
                  width={193}
                  height={60}
                  className="h-12 w-auto nav:h-10 xl:h-12"
                  priority
                />
              </span>
              <span className="hidden dark:block">
                <Image
                  src="/images/logo-light.png"
                  alt="GradeSpot IT Solutions"
                  width={193}
                  height={60}
                  className="h-12 w-auto nav:h-10 xl:h-12"
                  priority
                />
              </span>
            </Link>

            <nav className="hidden items-center nav:flex" aria-label="Primary">
              {nexusMenus.map(megaTrigger)}
              <div className="ml-2 hidden xl:block">
                <HeaderSearch />
              </div>
              <Link
                href="/contact-us"
                className="btn-primary ml-3 whitespace-nowrap nav:ml-1.5 nav:min-h-[44px] nav:px-2.5 nav:text-[12.5px] xl:ml-3 xl:min-h-[50px] xl:px-7 xl:text-[15px]"
              >
                Talk to an Advisor
              </Link>
            </nav>

            <div className="flex items-center gap-2 nav:hidden">
              <button
                className="flex min-h-[48px] items-center rounded-xl border border-heading/25 px-5 text-sm font-semibold text-heading"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-label="Toggle menu"
              >
                ☰ Menu
              </button>
            </div>
          </div>

          {/* Search row below the bar at the compact nav breakpoint,
              where the inline search field does not fit. */}
          <div className="hidden border-t border-line px-3 py-2 nav:block xl:hidden">
            <HeaderSearch />
          </div>

          {/* ——— GENERIC MEGA PANEL: three columns + featured panel ——— */}
          {activeMenu && (
            <div
              id={`mega-${activeMenu.key}`}
              className="absolute inset-x-0 top-full z-40 hidden nav:block"
              onMouseEnter={() => openNow(activeMenu.key)}
              onMouseLeave={scheduleClose}
              onKeyDown={onPanelKeyDown}
            >
              <div className="mx-auto w-full max-w-[1240px] px-3 pb-4">
                <div className="glass-panel overflow-hidden rounded-2xl border border-line border-t-2 border-t-brand shadow-[0_28px_56px_rgba(31,24,16,0.18)]">
                  <div className="grid max-h-[calc(100vh-170px)] grid-cols-[1fr_300px]">
                    <div className="grid gap-7 overflow-y-auto p-6 sm:grid-cols-3">
                      {activeMenu.columns.map((col) => (
                        <div key={col.title}>
                          <p className="eyebrow border-b-2 border-heading/70 pb-1.5 text-[10.5px] text-heading">
                            {col.title}
                          </p>
                          <ul className="mt-2 space-y-0.5">
                            {col.links.map((l) => (
                              <li key={`${col.title}-${l.label}`}>
                                <MenuLinkItem {...l} onNavigate={() => setPanel(null)} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="panel-ink overflow-y-auto p-5">
                      <p className="eyebrow text-brand-bright">{activeMenu.featured.eyebrow}</p>
                      <p className="mt-2 font-display text-[17px] font-semibold leading-snug text-paper">
                        {activeMenu.featured.title}
                      </p>
                      <p className="mt-1.5 text-[12.5px] leading-5 text-paper/75">{activeMenu.featured.body}</p>
                      <Link
                        href={activeMenu.featured.ctaHref}
                        onClick={() => setPanel(null)}
                        className="mt-3 inline-block text-[13px] font-bold text-brand-bright hover:text-paper"
                      >
                        {activeMenu.featured.ctaLabel} →
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 bg-ink px-6 py-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/75">
                      Hyderabad, India · Online &amp; Classroom Training
                    </span>
                    <Link
                      href={activeMenu.href}
                      onClick={() => setPanel(null)}
                      className="text-[13px] font-bold text-brand-bright hover:text-paper"
                    >
                      View {activeMenu.label} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile menu — one-level accordion, same six menus */}
        {open && (
          <nav className="border-b border-line bg-canvas nav:hidden" aria-label="Mobile">
            <div className="wrap py-3">
              <div className="pb-3">
                <HeaderSearch compact onNavigate={() => setOpen(false)} />
              </div>
              <div className="grid grid-cols-2 gap-3 pb-2">
                <Link href="/contact-us" className="btn-primary" onClick={() => setOpen(false)}>
                  Talk to an Advisor
                </Link>
                <Link
                  href="/trainings"
                  className="flex min-h-[48px] items-center justify-center rounded-xl border-[1.5px] border-heading/60 px-4 text-[14px] font-bold text-heading"
                  onClick={() => setOpen(false)}
                >
                  Explore Programs
                </Link>
              </div>

              {nexusMenus.map((menu) => (
                <div key={menu.key}>
                  <button
                    className={`${mobileLink} w-full justify-between text-left`}
                    onClick={() => setMobilePanel(mobilePanel === menu.key ? null : menu.key)}
                    aria-expanded={mobilePanel === menu.key}
                    aria-controls={`mobile-${menu.key}`}
                  >
                    {menu.label} <span aria-hidden>{mobilePanel === menu.key ? "▴" : "▾"}</span>
                  </button>
                  {mobilePanel === menu.key && (
                    <div id={`mobile-${menu.key}`} className="max-h-[62vh] overflow-y-auto pb-2 pl-3">
                      <Link
                        href={menu.href}
                        className="flex min-h-[44px] items-center py-2 pr-3 text-[13.5px] font-bold text-signal"
                        onClick={() => setOpen(false)}
                      >
                        View {menu.label} →
                      </Link>
                      {menu.columns.map((col) => (
                        <div key={col.title} className="mt-2">
                          <p className="eyebrow px-2 py-1.5 text-[10.5px] text-signal-strong">{col.title}</p>
                          {col.links.map((l) => (
                            <div key={l.label} className="pl-2">
                              <MenuLinkItem {...l} onNavigate={() => setOpen(false)} />
                            </div>
                          ))}
                        </div>
                      ))}
                      <div className="mt-3 rounded-xl bg-cream px-4 py-3">
                        <p className="eyebrow text-[10.5px] text-signal-strong">{menu.featured.eyebrow}</p>
                        <p className="mt-1 text-[13.5px] font-bold text-heading">{menu.featured.title}</p>
                        <Link
                          href={menu.featured.ctaHref}
                          className="mt-1 inline-block text-[13px] font-bold text-signal"
                          onClick={() => setOpen(false)}
                        >
                          {menu.featured.ctaLabel} →
                        </Link>
                      </div>
                      {menu.key === "academy" && (
                        <Link
                          href="/register"
                          className="mt-2 block px-2 py-2 text-[13px] font-semibold text-body hover:text-signal"
                          onClick={() => setOpen(false)}
                        >
                          Register / Book a Demo (contextual)
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <Link className={mobileLink} href="/contact-us" onClick={() => setOpen(false)}>
                Contact Us
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

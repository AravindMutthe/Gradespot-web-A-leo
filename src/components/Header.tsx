"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { business, telHref } from "@/data/site";
import { SocialLinks } from "@/components/ui";
import { navCourses } from "@/data/catalogue-nav";
import { services } from "@/data/services";
import { nexusMenus, type NavMenu } from "@/data/nexus-nav";
import { navJobs, jobMenus, jobForMenu } from "@/data/nav-jobs";
import { enabledHeaderCtas, type HeaderCta } from "@/data/site-settings";

// Header — GradeSpot Nexus, full redesign (2026-10-28, D2/D3).
// D2 PRESENTATION: the bar, drawer and footer present THREE visitor
// jobs — Training, IT Solutions, Company & Resources — over the
// unchanged six groups in nexus-nav.ts (see nav-jobs.ts). No group,
// label, href or link was deleted, renamed or added by the job
// presentation; the full old-group → job mapping is recorded in
// docs/frontend-v2/NAV-JOB-MAPPING-2026-10-28.md. Desktop: a job
// trigger opens a job panel listing that job's menus; choosing a
// menu opens its existing mega panel, with a back link to the job.
// Mobile drawer: jobs → menus → columns, same two-level pattern.
// D3 HERO (home page only): "Practical IT training — and IT
// services — in Hyderabad." with two equal CTAs, Training and
// IT Solutions. Logo plate: UNTOUCHED — official artwork only,
// per-theme swap. Do not recolor, filter, crop or replace the logo
// files. Brand anchor remains sampled logo orange #E57439 /
// charcoal #434140; supporting deep blue #17324D and teal #0D766E
// (dark-theme values in globals.css) are supporting colours only —
// never a primary CTA, never outranking logo orange/charcoal.
// CTA hierarchy (2026-10-27 audit fix): the desktop bar carries
// ONE primary CTA only — "Book Free Demo" → /register. The other
// two CTAs are NOT deleted as destinations: "Explore Programs" →
// /trainings is in the Academy mega-menu, the hero, and the drawer;
// "Talk to an Advisor" → /contact-us is in the IT Solutions mega
// menu, the hero, the drawer, and the footer. The drawer still
// shows all three CTAs. No permanent second header row, no sticky
// two-row header. The nav breakpoint is 80rem (1280px): below it
// visitors get the drawer, so the bar can never be cut off at
// 1280/1440px as it was in the R1-preview audit.
// Menu activation: CLICK is primary. Hover is an enhancement only
// (opens, never hover-only, with a 400ms gap-tolerant close delay
// and a panel that keeps itself open on hover). Keyboard: Enter /
// Space on a trigger opens, Escape closes and returns focus to
// that trigger. Every opener is at least 44×44px, with a visible
// open state (background + ring + rotated chevron), not only a glyph.

type PanelKey = NavMenu["key"];

interface SearchHit {
  label: string;
  href: string;
  kind: string;
  search: string;
}

function buildSearchIndex(): SearchHit[] {
  const hits: SearchHit[] = [];
  const seen = new Set<string>();
  const push = (label: string, href: string, kind: string, search: string) => {
    const key = `${href}|${label.toLowerCase()}`;
    if (seen.has(key)) return;
    seen.add(key);
    hits.push({ label, href, kind, search: `${label} ${search}`.toLowerCase() });
  };
  // Courses first, then services, then menu destinations. No hit is
  // invented: every href below comes from catalogue-nav.ts,
  // services data, or nexus-nav.ts as it exists in this repo.
  for (const c of navCourses) {
    push(c.label, `/trainings/${c.slug}`, "Training", `${c.title} ${c.category} ${c.code ?? ""}`);
  }
  for (const s of services) {
    push(s.title, `/services/${s.slug}`, "Service", s.title);
  }
  // D2: job headings are searchable entry points to their existing
  // job hrefs (which are themselves existing group hrefs) — no new
  // destination is introduced by indexing them.
  for (const job of navJobs) {
    push(job.label, job.href, "Menu", `${job.blurb} ${job.menuKeys.join(" ")}`);
  }
  for (const menu of nexusMenus) {
    push(menu.label, menu.href, "Menu", menu.label);
    for (const col of menu.columns) {
      for (const link of col.links) {
        push(link.label, link.href, `Menu · ${menu.label}`, `${col.title} ${menu.label} ${link.note ?? ""}`);
      }
    }
    push(menu.featured.ctaLabel, menu.featured.ctaHref, `Menu · ${menu.label}`, `${menu.featured.title} ${menu.label}`);
  }
  return hits;
}

const SEARCH_INDEX = buildSearchIndex();

function HeaderSearchInner({
  idPrefix,
  onNavigate,
  autoFocus,
}: {
  idPrefix: string;
  onNavigate?: () => void;
  autoFocus?: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (q.length < 2) return [];
    const scored = SEARCH_INDEX.filter((h) => h.search.includes(q)).map((h) => ({
      ...h,
      starts: h.label.toLowerCase().startsWith(q) ? 0 : 1,
    }));
    scored.sort((a, b) => a.starts - b.starts || a.label.length - b.label.length);
    return scored.slice(0, 10);
  }, [q]);
  const showResults = open && q.length >= 2;
  const close = () => {
    setOpen(false);
    setActive(-1);
  };
  const choose = (hit: SearchHit) => {
    setQuery("");
    close();
    onNavigate?.();
    router.push(hit.href);
  };
  return (
    <div
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) close();
      }}
    >
      <label htmlFor={`${idPrefix}-input`} className="sr-only">
        Search courses, services, and menu pages
      </label>
      <input
        ref={inputRef}
        id={`${idPrefix}-input`}
        type="search"
        role="combobox"
        aria-expanded={showResults}
        aria-controls={`${idPrefix}-listbox`}
        aria-activedescendant={active >= 0 ? `${idPrefix}-option-${active}` : undefined}
        autoFocus={autoFocus}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setQuery("");
            close();
            inputRef.current?.blur();
          } else if (e.key === "ArrowDown" && results.length > 0) {
            e.preventDefault();
            setActive((a) => (a + 1) % results.length);
          } else if (e.key === "ArrowUp" && results.length > 0) {
            e.preventDefault();
            setActive((a) => (a <= 0 ? results.length - 1 : a - 1));
          } else if (e.key === "Enter" && active >= 0 && results[active]) {
            e.preventDefault();
            choose(results[active]);
          }
        }}
        placeholder="Search courses, services, pages…"
        className="w-full rounded-full border border-line bg-parchment px-4 py-2.5 text-[13px] text-heading outline-none transition-colors placeholder:text-body/70 focus:border-brand"
      />
      {showResults && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-line bg-parchment shadow-[0_28px_56px_rgba(31,24,16,0.18)]">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-[13px] text-body" role="status">
              No matching course, service, or menu page. Try “CCNA”, “Azure”, “Career”, or “Labs”.
            </p>
          ) : (
            <ul id={`${idPrefix}-listbox`} role="listbox">
              {results.map((r, i) => (
                <li
                  key={`${r.href}|${r.label}`}
                  id={`${idPrefix}-option-${i}`}
                  role="option"
                  aria-selected={i === active}
                  className={i === active ? "bg-nexus-support-deep-soft" : undefined}
                >
                  <button
                    type="button"
                    tabIndex={-1}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => choose(r)}
                    className="flex min-h-[44px] w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-[13.5px] font-semibold text-heading transition-colors hover:bg-nexus-support-deep-soft"
                  >
                    <span>{r.label}</span>
                    <span className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.06em] text-nexus-support-teal-strong">
                      {r.kind}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="flex items-center justify-between border-t border-line">
            <Link
              href="/trainings#course-search"
              onClick={() => {
                setQuery("");
                close();
                onNavigate?.();
              }}
              className="block px-4 py-2.5 text-[13px] font-bold text-signal hover:text-signal-strong"
            >
              Search all trainings →
            </Link>
            <button
              type="button"
              onClick={close}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center px-3 text-[13px] font-semibold text-heading"
              aria-label="Close search results"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SearchPopover({ idPrefix }: { idPrefix: string }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`${idPrefix}-panel`}
        aria-label={open ? "Close search" : "Open search"}
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-line bg-parchment text-[16px] text-heading transition-colors hover:text-signal"
      >
        <span aria-hidden>⌕</span>
      </button>
      {open && (
        <div
          id={`${idPrefix}-panel`}
          className="absolute right-0 top-full z-50 mt-2 w-[320px] max-w-[92vw] rounded-2xl border border-line bg-parchment p-3 shadow-[0_28px_56px_rgba(31,24,16,0.18)]"
        >
          <HeaderSearchInner
            idPrefix={idPrefix}
            autoFocus
            onNavigate={() => {
              setOpen(false);
              buttonRef.current?.focus();
            }}
          />
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              buttonRef.current?.focus();
            }}
            className="mt-2 flex min-h-[44px] w-full items-center justify-center rounded-lg text-[13px] font-semibold text-heading"
          >
            Close search
          </button>
        </div>
      )}
    </div>
  );
}

function MenuLinkItem({ label, href, external, note, onNavigate }: { label: string; href: string; external?: boolean; note?: string; onNavigate?: () => void }) {
  const cls =
    "flex min-h-[44px] items-center rounded-lg px-2 py-2 text-[13.5px] font-semibold text-heading transition-colors hover:bg-nexus-support-deep-soft";
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      <span>
        {label} ↗{note ? <span className="block text-[11.5px] font-normal text-body">{note}</span> : null}
      </span>
    </a>
  ) : (
    <Link href={href} onClick={onNavigate} className={cls}>
      <span>
        {label}
        {note ? <span className="block text-[11.5px] font-normal text-body">{note}</span> : null}
      </span>
    </Link>
  );
}

// Featured panel rule (R1, objective, same on desktop and mobile):
// show the featured panel only where its CTA goes somewhere the
// group link itself does not go. Where ctaHref === menu.href, the
// destination is already reachable as "View {group}", so repeating
// it as a featured panel adds decoration, not a destination.
function showFeatured(menu: NavMenu): boolean {
  return menu.featured.ctaHref !== menu.href;
}

export default function Header() {
  const headerCtas = enabledHeaderCtas();
  const ctaByStyle = (style: HeaderCta["style"]) => headerCtas.find((c) => c.style === style);
  const primaryCta = ctaByStyle("primary");
  const secondaryCta = ctaByStyle("text");
  const outlineCta = ctaByStyle("outline");

  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<PanelKey | null>(null);
  // D2: desktop job panel (null = closed). A menu panel (panel)
  // always sits inside its job panel; closing the job closes both.
  const [jobPanel, setJobPanel] = useState<string | null>(null);
  const [mobileJob, setMobileJob] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<PanelKey | null>(null);
  const [openColumns, setOpenColumns] = useState<Record<string, boolean>>({});
  const closeTimer = useRef<number | null>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);

  const clearTimer = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const openPanel = (key: PanelKey) => {
    clearTimer();
    setPanel(key);
  };
  const openJobPanel = (key: string) => {
    clearTimer();
    setPanel(null);
    setJobPanel(key);
  };
  const toggleJobPanel = (key: string) => {
    clearTimer();
    setJobPanel((j) => {
      if (j === key) {
        setPanel(null);
        return null;
      }
      setPanel(null);
      return key;
    });
  };
  // Gap-tolerant close: 400ms, cancelled by re-entering the trigger
  // or the panel itself, so a small pointer gap never drops the menu.
  const scheduleClose = () => {
    clearTimer();
    closeTimer.current = window.setTimeout(() => {
      setPanel(null);
      setJobPanel(null);
    }, 400);
  };
  const closePanel = (returnFocusKey?: PanelKey) => {
    clearTimer();
    setPanel(null);
    setJobPanel(null);
    if (returnFocusKey) triggerRefs.current.get(returnFocusKey)?.focus();
  };
  // Back from a menu panel to its job panel (desktop): the job
  // panel stays open, only the menu level closes.
  const backToJobPanel = () => {
    clearTimer();
    setPanel(null);
  };

  const closeDrawer = () => {
    setOpen(false);
    menuButtonRef.current?.focus();
  };

  // Drawer: Escape closes, body scroll locked while open, focus to
  // the drawer Close button on open. Group / column state is kept
  // across taps and across drawer close — it is not reset on
  // every tap.
  useEffect(() => {
    if (!open) return;
    drawerCloseRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  const activeMenu = nexusMenus.find((m) => m.key === panel) ?? null;
  const activeJob = navJobs.find((j) => j.key === jobPanel) ?? null;
  const activeMobileMenu = nexusMenus.find((m) => m.key === mobileGroup) ?? null;
  const activeMobileJob = navJobs.find((j) => j.key === mobileJob) ?? null;

  // Utility strip — SINGLE instance, single behaviour in R1:
  // it scrolls away with the page on every size; only the header
  // bar itself is sticky. (Pre-R1 it was rendered twice, once per
  // breakpoint, with different sticky behaviour.)
  const strip = (
    <div className="bg-ink text-footer-text">
      <div className="wrap flex flex-nowrap items-center justify-between gap-x-6 overflow-hidden py-2 text-[12px]">
        <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-x-5">
          <span className="min-w-0 truncate">Hyderabad, India · Online &amp; Classroom Training</span>
          <span className="hidden shrink-0 truncate md:inline">{business.locationLabel}</span>
          <a
            className="hidden min-h-[24px] min-w-0 items-center truncate normal-case tracking-normal transition-colors hover:text-brand-bright lg:inline-flex"
            href={`mailto:${business.emails[0]}`}
          >
            {business.emails[0]}
          </a>
        </div>
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <Link href="/contact-us" className="inline-flex min-h-[24px] items-center transition-colors hover:text-brand-bright">
            Contact
          </Link>
          <Link href="/career-support" className="hidden min-h-[24px] items-center transition-colors hover:text-brand-bright sm:inline-flex">
            Student Support
          </Link>
          <span className="hidden items-center gap-3 sm:flex sm:gap-4">
            <SocialLinks />
          </span>
          <span className="hidden items-center gap-4 md:flex">
            {business.phones.map((p) => (
              <a
                key={p}
                className="inline-flex min-h-[24px] items-center font-semibold normal-case tracking-normal text-brand-bright hover:text-paper"
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

  const ctaButtons = (
    <>
      {primaryCta && (
        <Link href={primaryCta.href} className="btn-primary" onClick={() => setOpen(false)}>
          {primaryCta.label}
        </Link>
      )}
      {secondaryCta && (
        <Link
          href={secondaryCta.href}
          className="flex min-h-[48px] items-center justify-center rounded-xl border-[1.5px] border-heading/60 px-4 text-[14px] font-bold text-heading"
          onClick={() => setOpen(false)}
        >
          {secondaryCta.label}
        </Link>
      )}
      {outlineCta && (
        <Link href={outlineCta.href} className="btn-outline-navy w-full" onClick={() => setOpen(false)}>
          {outlineCta.label}
        </Link>
      )}
    </>
  );

  return (
    <>
      {strip}
      <header className="sticky top-0 z-50">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2.5 focus:font-semibold focus:text-paper"
        >
          Skip to content
        </a>

        {/* Main navigation — paper bar, ink type, official logo.
            Logo plate UNTOUCHED from Leo v1: luminous parchment
            plate + warm halo behind the unmodified artwork, per-theme
            swap via CSS (both files render, CSS picks one). */}
        <div className="relative border-b border-line bg-canvas/95 shadow-sm backdrop-blur-md">
          <div className="wrap flex items-center justify-between gap-3 py-2">
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
                  className="h-9 w-auto xl:h-11"
                  priority
                />
              </span>
              <span className="hidden dark:block">
                <Image
                  src="/images/logo-light.png"
                  alt="GradeSpot IT Solutions"
                  width={193}
                  height={60}
                  className="h-10 w-auto xl:h-12"
                  priority
                />
              </span>
            </Link>

            <nav className="hidden items-center nav:flex" aria-label="Primary">
              {navJobs.map((job) => {
                const isOpen = jobPanel === job.key;
                return (
                  <div
                    key={job.key}
                    className="relative"
                    onMouseEnter={() => openJobPanel(job.key)}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      ref={(el) => {
                        if (el) triggerRefs.current.set(job.key, el);
                        else triggerRefs.current.delete(job.key);
                      }}
                      type="button"
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      aria-controls={`job-${job.key}`}
                      aria-label={`${job.label} menu`}
                      onClick={() => toggleJobPanel(job.key)}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") closePanel();
                      }}
                      className={`flex min-h-[44px] min-w-[44px] items-center gap-1 whitespace-nowrap rounded-full px-3 py-2.5 text-[13px] font-bold tracking-[-0.01em] transition-colors 2xl:px-4 2xl:text-[14px] ${
                        isOpen
                          ? "bg-nexus-support-deep-soft text-heading ring-2 ring-brand"
                          : "text-nav hover:bg-nexus-support-deep-soft"
                      }`}
                    >
                      {job.label}
                      <span aria-hidden className={`inline-block transition-transform ${isOpen ? "rotate-180" : ""}`}>
                        ▾
                      </span>
                    </button>
                  </div>
                );
              })}
              <div className="ml-2 hidden w-[220px] shrink-0 nav:block">
                <HeaderSearchInner idPrefix="header-search-desktop" />
              </div>
              {/* Desktop bar: ONE primary CTA only (audit fix). The
                  other two CTAs live in the drawer, mega-menus,
                  hero, and footer — their destinations are not
                  removed. outlineCta is "Book Free Demo" → /register. */}
              {outlineCta && (
                <Link
                  href={outlineCta.href}
                  className="btn-primary ml-3 whitespace-nowrap"
                >
                  {outlineCta.label}
                </Link>
              )}
            </nav>

            <div className="flex items-center gap-2 nav:hidden">
              <SearchPopover idPrefix="header-search-mobile" />
              <button
                ref={menuButtonRef}
                className="flex min-h-[48px] items-center rounded-full border border-heading/25 px-4 text-sm font-bold text-heading"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-label="Toggle menu"
              >
                <span aria-hidden>☰</span>
                <span className="hidden min-[360px]:inline">&nbsp;Menu</span>
              </button>
            </div>
          </div>

          {/* ——— MEGA PANEL (R1): content-responsive columns, featured
              only where its CTA is a distinct destination, click as
              primary activation, hover as enhancement with a
              gap-tolerant close. Internal scrolling only as a
              fallback when the panel is taller than the viewport. ——— */}
          {/* ——— JOB PANEL (D2, 2026-10-28): a job trigger opens
              this panel listing that job's unchanged menus; choosing
              a menu opens its existing mega panel below, with a back
              link to the job. No destination is added or removed. ——— */}
          {activeJob && !activeMenu && (
            <div
              id={`job-${activeJob.key}`}
              className="absolute inset-x-0 top-full z-40 hidden nav:block"
              onMouseEnter={() => openJobPanel(activeJob.key)}
              onMouseLeave={scheduleClose}
              onKeyDown={(e) => {
                if (e.key === "Escape") closePanel();
              }}
            >
              <div className="mx-auto w-full max-w-[1240px] px-3 pb-4">
                <div className="overflow-hidden rounded-[20px] border border-line border-t-2 border-t-brand bg-canvas shadow-[0_28px_56px_rgba(31,24,16,0.18)]">
                  <div className="p-7">
                    <p className="eyebrow text-nexus-brand-600">{activeJob.label}</p>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-body">{activeJob.blurb}</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {jobMenus(activeJob).map((menu) => (
                        <button
                          key={menu.key}
                          type="button"
                          onClick={() => openPanel(menu.key)}
                          className="rounded-2xl border border-line bg-surface-light p-5 text-left transition-colors hover:bg-nexus-support-deep-soft"
                        >
                          <span className="block font-sans text-[16px] font-bold text-heading">{menu.label} ›</span>
                          <span className="mt-1 block text-[13px] leading-5 text-body">{menu.featured.body}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 bg-ink px-6 py-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/75">
                      Hyderabad, India · Online &amp; Classroom Training
                    </span>
                    <Link
                      href={activeJob.href}
                      onClick={() => closePanel()}
                      className="flex min-h-[44px] items-center text-[13px] font-bold text-brand-bright hover:text-paper"
                    >
                      View {activeJob.label} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeMenu && (
            <div
              id={`mega-${activeMenu.key}`}
              className="absolute inset-x-0 top-full z-40 hidden nav:block"
              onMouseEnter={() => openPanel(activeMenu.key)}
              onMouseLeave={scheduleClose}
              onKeyDown={(e) => {
                if (e.key === "Escape") closePanel(activeMenu.key);
              }}
            >
              <div className="mx-auto w-full max-w-[1240px] px-3 pb-4">
                <div className="overflow-hidden rounded-[20px] border border-line border-t-2 border-t-brand bg-canvas shadow-[0_28px_56px_rgba(31,24,16,0.18)]">
                  {jobForMenu(activeMenu.key) && (
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface-light px-6 py-2">
                      <button
                        type="button"
                        onClick={backToJobPanel}
                        className="flex min-h-[44px] items-center text-[13px] font-bold text-signal hover:text-signal-strong"
                      >
                        ← {jobForMenu(activeMenu.key)?.label}
                      </button>
                      <span className="text-[12px] font-semibold text-body">{activeMenu.label}</span>
                    </div>
                  )}
                  <div className="max-h-[calc(100dvh-120px)] overflow-y-auto">
                    <div className={`grid ${showFeatured(activeMenu) ? "lg:grid-cols-[1fr_280px]" : ""}`}>
                      <div
                        className="nexus-menu-cols p-7"
                        style={{ "--menu-cols": Math.min(activeMenu.columns.length, 3) } as React.CSSProperties}
                      >
                        {activeMenu.columns.map((col) => (
                          <div key={col.title}>
                            <p className="border-b-2 border-brand/60 pb-2 text-[12px] font-bold uppercase tracking-[0.14em] text-heading">
                              {col.title}
                            </p>
                            <ul className="mt-2 space-y-0.5">
                              {col.links.map((l) => (
                                <li key={`${col.title}-${l.label}`}>
                                  <MenuLinkItem {...l} onNavigate={() => closePanel()} />
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {showFeatured(activeMenu) && (
                        <div className="bg-nexus-support-deep p-6">
                          <p className="eyebrow text-paper/70">{activeMenu.featured.eyebrow}</p>
                          <p className="mt-2 font-sans text-[17px] font-bold leading-snug tracking-tight text-paper">
                            {activeMenu.featured.title}
                          </p>
                          <p className="mt-1.5 text-[12.5px] leading-5 text-paper/80">{activeMenu.featured.body}</p>
                          <Link
                            href={activeMenu.featured.ctaHref}
                            onClick={() => closePanel()}
                            className="mt-3 inline-block min-h-[44px] text-[13px] font-bold text-paper underline underline-offset-4"
                          >
                            {activeMenu.featured.ctaLabel} →
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 bg-ink px-6 py-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/75">
                      Hyderabad, India · Online &amp; Classroom Training
                    </span>
                    <Link
                      href={activeMenu.href}
                      onClick={() => closePanel()}
                      className="flex min-h-[44px] items-center text-[13px] font-bold text-brand-bright hover:text-paper"
                    >
                      View {activeMenu.label} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile drawer (D2): fixed dialog, not a full-page scroll
            dump. Jobs → menus → columns, with a sticky View action
            at each level, search and CTAs at the top. All three jobs,
            all six menus and all links from nexus-nav.ts are kept. */}
        {open && (
          <div className="fixed inset-0 z-[70] nav:hidden" role="presentation">
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeDrawer}
              className="absolute inset-0 bg-black/50"
            />
            <aside
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="absolute left-0 top-0 flex h-full w-[min(420px,92vw)] flex-col rounded-r-[24px] bg-canvas shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-line px-3 py-2">
                <span className="px-2 text-[16px] font-bold tracking-tight text-heading">Menu</span>
                <button
                  ref={drawerCloseRef}
                  type="button"
                  onClick={closeDrawer}
                  aria-label="Close menu"
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-[16px] font-bold text-heading"
                >
                  <span aria-hidden>✕</span>
                </button>
              </div>
              <div className="border-b border-line px-3 py-3">
                <HeaderSearchInner idPrefix="header-search-drawer" />
                <div className="mt-3 grid gap-2">{ctaButtons}</div>
                {/* Mobile theme toggle (2026-10-27 audit fix): the
                    floating toggle is hidden below the nav breakpoint
                    so it cannot overlap content or the sticky bar;
                    the drawer carries the toggle instead. Same
                    localStorage key as ThemeToggle ("gradespot-theme"). */}
                <button
                  type="button"
                  onClick={() => {
                    const root = document.documentElement;
                    const next = !root.classList.contains("dark");
                    root.classList.toggle("dark", next);
                    root.dataset.theme = next ? "dark" : "light";
                    root.style.colorScheme = next ? "dark" : "light";
                    try {
                      localStorage.setItem("gradespot-theme", next ? "dark" : "light");
                    } catch {
                      /* private mode — theme still applies this visit */
                    }
                  }}
                  className="mt-3 flex min-h-[44px] w-full items-center justify-between rounded-lg px-3 text-[13.5px] font-semibold text-heading"
                >
                  Theme
                  <span className="text-[13px] font-normal text-body">Tap to switch light / dark</span>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {!activeMobileJob && !activeMobileMenu && (
                  <nav aria-label="Mobile jobs">
                    {navJobs.map((job) => (
                      <button
                        key={job.key}
                        type="button"
                        onClick={() => setMobileJob(job.key)}
                        aria-expanded={false}
                        className="flex min-h-[56px] w-full items-center justify-between border-b border-line/60 px-5 text-left text-[15px] font-bold text-heading transition-colors hover:bg-nexus-support-deep-soft"
                      >
                        {job.label}
                        <span aria-hidden>›</span>
                      </button>
                    ))}
                    <Link
                      href="/contact-us"
                      onClick={() => setOpen(false)}
                      className="flex min-h-[48px] items-center px-5 text-[15px] font-semibold text-heading"
                    >
                      Contact Us
                    </Link>
                  </nav>
                )}
                {activeMobileJob && !activeMobileMenu && (
                  <nav aria-label={`Mobile menus in ${activeMobileJob.label}`}>
                    <div className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-line bg-canvas px-3 py-2">
                      <button
                        type="button"
                        onClick={() => setMobileJob(null)}
                        className="flex min-h-[44px] items-center px-2 text-[13.5px] font-bold text-signal"
                      >
                        ← All menus
                      </button>
                      <Link
                        href={activeMobileJob.href}
                        onClick={() => setOpen(false)}
                        className="flex min-h-[44px] items-center px-2 text-[13.5px] font-bold text-signal"
                      >
                        View {activeMobileJob.label} →
                      </Link>
                    </div>
                    {jobMenus(activeMobileJob).map((menu) => (
                      <button
                        key={menu.key}
                        type="button"
                        onClick={() => setMobileGroup(menu.key)}
                        aria-expanded={false}
                        className="flex min-h-[56px] w-full items-center justify-between border-b border-line/60 px-5 text-left text-[15px] font-bold text-heading transition-colors hover:bg-nexus-support-deep-soft"
                      >
                        {menu.label}
                        <span aria-hidden>›</span>
                      </button>
                    ))}
                  </nav>
                )}
                {activeMobileMenu && (
                  <div>
                    <div className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-line bg-canvas px-3 py-2">
                      <button
                        type="button"
                        onClick={() => setMobileGroup(null)}
                        className="flex min-h-[44px] items-center px-2 text-[13.5px] font-bold text-signal"
                      >
                        ← {activeMobileMenu && jobForMenu(activeMobileMenu.key)?.label
                          ? jobForMenu(activeMobileMenu.key)?.label
                          : "All menus"}
                      </button>
                      <Link
                        href={activeMobileMenu.href}
                        onClick={() => setOpen(false)}
                        className="flex min-h-[44px] items-center px-2 text-[13.5px] font-bold text-signal"
                      >
                        View {activeMobileMenu.label} →
                      </Link>
                    </div>
                    {activeMobileMenu.columns.map((col) => {
                      const key = `${activeMobileMenu.key}:${col.title}`;
                      const isColOpen = openColumns[key] ?? false;
                      return (
                        <div key={col.title} className="border-b border-line/60">
                          <button
                            type="button"
                            onClick={() => setOpenColumns((s) => ({ ...s, [key]: !s[key] }))}
                            aria-expanded={isColOpen}
                            className="flex min-h-[48px] w-full items-center justify-between px-5 text-left"
                          >
                            <span className="eyebrow text-[10.5px] text-nexus-support-teal-strong">{col.title}</span>
                            <span aria-hidden className={`inline-block transition-transform ${isColOpen ? "rotate-180" : ""}`}>
                              ▾
                            </span>
                          </button>
                          {isColOpen && (
                            <div className="px-3 pb-2">
                              {col.links.map((l) => (
                                <div key={l.label} className="pl-2">
                                  <MenuLinkItem {...l} onNavigate={() => setOpen(false)} />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {showFeatured(activeMobileMenu) && (
                      <div className="m-3 rounded-xl bg-nexus-support-deep px-4 py-3">
                        <p className="eyebrow text-[10.5px] text-paper/70">{activeMobileMenu.featured.eyebrow}</p>
                        <p className="mt-1 text-[13.5px] font-bold text-paper">{activeMobileMenu.featured.title}</p>
                        <Link
                          href={activeMobileMenu.featured.ctaHref}
                          className="mt-1 inline-block min-h-[44px] text-[13px] font-bold text-paper underline underline-offset-4"
                          onClick={() => setOpen(false)}
                        >
                          {activeMobileMenu.featured.ctaLabel} →
                        </Link>
                      </div>
                    )}
                    {activeMobileMenu.key === "academy" && (
                      <Link
                        href="/register"
                        className="block px-5 py-2 text-[13px] font-semibold text-body hover:text-signal"
                        onClick={() => setOpen(false)}
                      >
                        Register / Book a Demo (contextual)
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </aside>
          </div>
        )}
      </header>
    </>
  );
}

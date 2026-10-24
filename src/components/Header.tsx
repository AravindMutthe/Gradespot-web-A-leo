"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { business, telHref } from "@/data/site";
import { SocialLinks } from "@/components/ui";
import { categoryAnchor, navCategoryOrder, navCourses, type NavCourse } from "@/data/catalogue-nav";
import { services } from "@/data/services";
import { promotions } from "@/data/promotions";

// Header — Leo v1 ("Prospectus", DECISIONS.md §19; engagement +
// menu-effectiveness pass §22).
// The rich mega menu is the primary navigation instrument (Aravind,
// 2026-10-23 14:02 IST): the top bar stays lean because the panels
// carry the depth — the full catalogue grouped by domain with codes
// and published durations, a featured-training + Free Demo panel fed
// by the promotions data layer, grouped services with the three B2B
// doors, and grouped resources. Panels open on hover AND click, are
// fully keyboard-operable (chevron buttons, Escape closes, focus
// opens), and the mobile menu is a rich accordion with the same
// groupings. CTA hierarchy is stacked by colour, not competing:
// vermilion = the one conversion CTA (Request a Callback), ink =
// audience door (For Institutes), outline = self-serve (Register).
//
// Menu history: v1 trims (§19) — Home removed from the bar (logo is
// home), Contact Us removed from the DESKTOP bar (duplicated by the
// Callback CTA; kept in footer + mobile sheet), Digital moved into
// Resources. §22 verdicts on those three are logged in DECISIONS.md.
//
// §23 desktop fix (Aravind's ruling from his phone review): the full
// salon-style inline bar + mega panels moved from xl (1280px) down
// to the same breakpoint as the rest of the chrome.
// §24 single-threshold rule: ALL chrome now switches at the custom
// `nav` breakpoint (960px, --breakpoint-nav in globals.css) — header,
// mega panels, FloatingActions, the LP sticky bar and the body
// bottom-padding. 960px because a phone browser's desktop mode
// (Edge/Copilot) reports ~980 CSS px: at lg (1024px) it still got
// the hamburger. From 960 the bar runs the compact measure (smaller
// logo step, tighter links/CTAs) and restores the full measure at
// xl. Mobile (<960) markup and behaviour are untouched — only the
// visibility threshold moved.

type PanelKey = "trainings" | "services" | "resources";

const featuredCourse = navCourses.find((c) => c.slug === "certified-ethical-hacker-ceh");
const demoPromo =
  promotions.find((p) => p.slug === "free-demo-card" && p.active) ??
  promotions.find((p) => p.kind === "card" && p.active);

const coursesByCategory = navCategoryOrder
  .map((category) => ({
    category,
    courses: navCourses.filter((c) => c.category === category),
  }))
  .filter((g) => g.courses.length > 0);

const serviceGroups: { title: string; note: string; slugs: string[] }[] = [
  {
    title: "Training & Talent",
    note: "Programs for teams, colleges and students",
    slugs: ["corporate-trainings", "college-workshops", "industrial-trainings", "internships"],
  },
  {
    title: "Technology Services",
    note: "Build, secure and grow your systems",
    slugs: [
      "cybersecurity-services",
      "web-development",
      "network-infrastructure-building",
      "digital-marketing-solutions",
      "logo-designing",
    ],
  },
  {
    title: "Consultancy & Staffing",
    note: "People and opportunities, India and abroad",
    slugs: ["us-it-staffing", "domestic-consultancy", "abroad-consultancy"],
  },
];

const businessDoors = [
  {
    title: "For Institutes",
    desc: "WhatsApp Lead Engine, Learning Hub and Linux labs — book a live demo.",
    href: "/for-institutes",
  },
  {
    title: "For Colleges",
    desc: "Workshops, industrial trainings and internships at your campus.",
    href: "/for-colleges",
  },
  {
    title: "Partner With Us",
    desc: "Collaborations and franchise discussions are welcome.",
    href: "/partner-with-us",
  },
];

const resourceGroups: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}[] = [
  {
    title: "Proof & People",
    links: [
      { label: "Why Choose Us", href: "/why-choose-us" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Team Members", href: "/team-members" },
      { label: "Student Certifications", href: "/student-certifications" },
      { label: "Certificate Verification", href: "/certificate-verification" },
    ],
  },
  {
    title: "Learning & Career",
    links: [
      { label: "Career Support", href: "/career-support" },
      { label: "Learning Articles", href: "/blog" },
      { label: "Course Comparisons", href: "/compare" },
      { label: "Local Institute Page", href: "/training-institute-in-dilsukhnagar-hyderabad" },
    ],
  },
  {
    title: "More From GradeSpot",
    links: [
      { label: "DigiDefense Blog", href: business.blogUrl, external: true },
      { label: "GradeSpot Digital", href: business.digitalUrl, external: true },
      { label: "Help & FAQs", href: "/faq" },
      { label: "Partner With Us", href: "/partner-with-us" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];

const navLink =
  "block whitespace-nowrap px-2.5 py-3 text-[14px] font-semibold text-nav underline-offset-4 transition-colors hover:text-signal hover:underline hover:decoration-2 nav:px-1 nav:py-2.5 nav:text-[12px] xl:px-2.5 xl:py-3 xl:text-[14px]";
const chevronBtn =
  "-ml-1.5 flex h-11 w-7 items-center justify-center text-[12px] text-nav transition-colors hover:text-signal nav:-ml-1 nav:w-4 xl:-ml-1.5 xl:w-7";
const mobileLink =
  "flex min-h-[48px] items-center px-3 text-[15px] font-semibold text-heading transition-colors hover:text-signal";

function CourseEntry({ course, onNavigate }: { course: NavCourse; onNavigate?: () => void }) {
  const meta = [course.code, course.duration].filter(Boolean).join(" · ");
  return (
    <Link
      href={`/trainings/${course.slug}`}
      onClick={onNavigate}
      className="group flex items-start justify-between gap-3 rounded-lg px-2 py-[7px] transition-colors hover:bg-cream"
    >
      <span className="text-[13.5px] font-medium leading-snug text-body group-hover:text-heading">
        {course.label}
      </span>
      {meta && (
        <span className="shrink-0 pt-[1px] font-mono text-[10.5px] font-semibold uppercase tracking-[0.06em] text-signal-strong">
          {meta}
        </span>
      )}
    </Link>
  );
}

function CategoryBlock({
  category,
  courses,
  onNavigate,
}: {
  category: string;
  courses: NavCourse[];
  onNavigate?: () => void;
}) {
  return (
    <div className="mb-5 break-inside-avoid">
      <Link
        href={`/trainings#${categoryAnchor(category)}`}
        onClick={onNavigate}
        className="flex items-baseline justify-between gap-2 border-b-2 border-heading/70 px-2 pb-1.5"
      >
        <span className="eyebrow text-[10.5px] text-heading">{category}</span>
        <span className="font-mono text-[10.5px] font-semibold text-signal-strong">
          {courses.length} course{courses.length === 1 ? "" : "s"}
        </span>
      </Link>
      <ul className="mt-1">
        {courses.map((c) => (
          <li key={c.slug}>
            <CourseEntry course={c} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    </div>
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

  const megaTrigger = (
    key: PanelKey,
    href: string,
    label: string,
    controls: string,
  ) => (
    <div
      className="relative flex items-center"
      onMouseEnter={() => openNow(key)}
      onMouseLeave={scheduleClose}
      onFocus={() => openNow(key)}
      onBlur={closeOnBlur}
    >
      <Link className={navLink} href={href} onClick={() => setPanel(null)}>
        {label}
      </Link>
      <button
        type="button"
        className={chevronBtn}
        aria-expanded={panel === key}
        aria-controls={controls}
        aria-label={`${label} menu`}
        onClick={() => togglePanel(key)}
      >
        <span aria-hidden>{panel === key ? "▴" : "▾"}</span>
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2.5 focus:font-semibold focus:text-paper"
      >
        Skip to content
      </a>

      {/* Utility strip — mono index voice on ink. SINGLE ROW at
          every width (§25.11): no wrap anywhere, so the strip can
          never grow a second row or a gap row on mobile — the
          location/email group truncates with ellipsis on narrow
          screens instead, and the socials/phones group is fully
          absent below sm (not an empty flex item). Same py-2 and
          text size at all widths, so the strip height is identical
          on mobile and desktop. */}
      <div className="bg-ink-deep text-footer-text">
        <div className="wrap flex flex-nowrap items-center justify-between gap-x-6 overflow-hidden py-2 font-mono text-[11px] uppercase tracking-[0.14em]">
          <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-x-5">
            <span className="min-w-0 truncate">{business.locationLabel}</span>
            <a
              className="min-w-0 truncate normal-case tracking-normal transition-colors hover:text-brand-bright"
              href={`mailto:${business.emails[0]}`}
            >
              {business.emails[0]}
            </a>
            <span className="hidden shrink-0 md:inline">Office Hours: {business.officeHours}</span>
          </div>
          <div className="hidden shrink-0 items-center gap-3 sm:flex sm:gap-4">
            <span className="flex items-center gap-3">
              <SocialLinks />
            </span>
            <span className="flex items-center gap-4">
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

      {/* Main navigation — paper bar, ink type, official logo */}
      <div className="glass-panel relative border-b border-line shadow-[0_1px_0_rgba(32,25,19,0.04)]">
        <div className="wrap flex items-center justify-between py-2.5">
          {/* Logo brightening (§22): presentation only — a luminous
              parchment plate + warm halo behind the unmodified
              artwork at a stronger size. No filter, no recolor.
              §25: the plate is now the .logo-plate class (ink-glow
              variant in dark) and the artwork swaps to the official
              light-text file on dark — both files render, CSS picks
              one, so there is no flash or hydration mismatch. */}
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
            {megaTrigger("trainings", "/trainings", "Trainings", "mega-trainings")}
            {megaTrigger("services", "/services", "Services", "mega-services")}
            <Link className={navLink} href="/pricing">
              Pricing
            </Link>
            <Link className={navLink} href="/about-us">
              About Us
            </Link>
            {megaTrigger("resources", "/resources", "Resources", "mega-resources")}

            {/* Audience doors — colleges as a peer link, institutes as
                an ink door (audience, not the conversion CTA). */}
            <Link className={navLink} href="/for-colleges">
              For Colleges
            </Link>
            <Link
              className="ml-1 whitespace-nowrap rounded-xl bg-ink px-4 py-2.5 text-[14px] font-bold text-paper shadow-[0_8px_20px_rgba(23,18,8,0.25)] transition hover:bg-navy nav:ml-0.5 nav:px-2.5 nav:py-2 nav:text-[12px] xl:px-4 xl:py-2.5 xl:text-[14px]"
              href="/for-institutes"
            >
              For Institutes
            </Link>
            <Link
              href="/register"
              className="ml-3 flex min-h-[48px] items-center whitespace-nowrap rounded-xl border-[1.5px] border-heading/60 px-4 text-[14px] font-bold text-heading transition hover:border-heading hover:bg-ink hover:text-paper nav:ml-1.5 nav:min-h-[44px] nav:px-2.5 nav:text-[12px] xl:ml-3 xl:min-h-[48px] xl:px-4 xl:text-[14px]"
            >
              Register
            </Link>
            <Link
              href="/contact-us"
              className="btn-primary ml-3 whitespace-nowrap nav:ml-1.5 nav:min-h-[44px] nav:px-2.5 nav:text-[12.5px] xl:ml-3 xl:min-h-[50px] xl:px-7 xl:text-[15px]"
            >
              Request a Callback
            </Link>
          </nav>

          <button
            className="flex min-h-[48px] items-center rounded-xl border border-heading/25 px-5 text-sm font-semibold text-heading nav:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            ☰ Menu
          </button>
        </div>

        {/* ——— TRAININGS MEGA PANEL ——— */}
        {panel === "trainings" && (
          <div
            id="mega-trainings"
            className="absolute inset-x-0 top-full z-40 hidden nav:block"
            onMouseEnter={() => openNow("trainings")}
            onMouseLeave={scheduleClose}
            onKeyDown={onPanelKeyDown}
          >
            <div className="mx-auto w-full max-w-[1240px] px-3 pb-4">
              <div className="glass-panel overflow-hidden rounded-2xl border border-line border-t-2 border-t-brand shadow-[0_28px_56px_rgba(31,24,16,0.18)]">
                <div className="grid max-h-[calc(100vh-170px)] grid-cols-[290px_1fr]">
                  {/* Featured rail — featured training + the Free Demo
                      promotion from the promotions data layer (§19). */}
                  <div className="overflow-y-auto bg-cream p-5">
                    <p className="eyebrow text-signal-strong">Featured Training</p>
                    {featuredCourse && (
                      <div className="mt-3 overflow-hidden rounded-xl border border-line bg-parchment">
                        {featuredCourse.image && (
                          <div className="relative">
                            <Image
                              src={featuredCourse.image}
                              alt={featuredCourse.title}
                              width={520}
                              height={260}
                              className="h-28 w-full object-cover"
                            />
                            <span className="eyebrow absolute right-2.5 top-2.5 rounded-md bg-brand px-2 py-1 text-white">
                              Free Demo
                            </span>
                          </div>
                        )}
                        <div className="p-4">
                          <p className="font-display text-[16.5px] font-semibold leading-snug text-heading">
                            {featuredCourse.title}
                          </p>
                          <p className="mt-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-signal-strong">
                            {[featuredCourse.code, featuredCourse.duration]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                            <Link
                              href={`/trainings/${featuredCourse.slug}`}
                              onClick={() => setPanel(null)}
                              className="text-[13px] font-bold text-signal hover:text-signal-strong"
                            >
                              View Course →
                            </Link>
                            <Link
                              href={`/trainings/${featuredCourse.slug}#demo`}
                              onClick={() => setPanel(null)}
                              className="text-[13px] font-bold text-heading hover:text-signal"
                            >
                              Book the Free Demo →
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                    {demoPromo && (
                      <div className="mt-4 rounded-xl bg-ink p-4">
                        <p className="eyebrow text-brand-bright">Free First Step</p>
                        <p className="mt-2 font-display text-[16px] font-semibold text-paper">
                          {demoPromo.title}
                        </p>
                        {demoPromo.body && (
                          <p className="mt-1.5 text-[12.5px] leading-5 text-paper/75">
                            {demoPromo.body}
                          </p>
                        )}
                        {demoPromo.ctaHref && demoPromo.ctaLabel && (
                          <Link
                            href={demoPromo.ctaHref}
                            onClick={() => setPanel(null)}
                            className="mt-2.5 inline-block text-[13px] font-bold text-brand-bright hover:text-paper"
                          >
                            {demoPromo.ctaLabel} →
                          </Link>
                        )}
                      </div>
                    )}
                    <Link
                      href="/compare"
                      onClick={() => setPanel(null)}
                      className="mt-4 block rounded-xl border border-heading/20 px-4 py-3 text-[13px] font-bold text-heading transition-colors hover:border-brand hover:text-signal"
                    >
                      Can&apos;t decide? Compare courses side by side →
                    </Link>
                  </div>

                  {/* Grouped catalogue — every category, every course,
                      code + published duration as mono meta. */}
                  <div className="overflow-y-auto p-6">
                    <div className="columns-2 gap-7 2xl:columns-3">
                      {coursesByCategory.map((g) => (
                        <CategoryBlock
                          key={g.category}
                          category={g.category}
                          courses={g.courses}
                          onNavigate={() => setPanel(null)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 bg-ink px-6 py-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/75">
                    {navCourses.length} Trainings · Online &amp; Offline Classes
                  </span>
                  <span className="flex flex-wrap gap-x-5 gap-y-1">
                    <Link
                      href="/trainings#course-search"
                      onClick={() => setPanel(null)}
                      className="text-[13px] font-bold text-brand-bright hover:text-paper"
                    >
                      Search Trainings
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setPanel(null)}
                      className="text-[13px] font-bold text-brand-bright hover:text-paper"
                    >
                      Register / Book a Demo
                    </Link>
                    <Link
                      href="/trainings"
                      onClick={() => setPanel(null)}
                      className="text-[13px] font-bold text-brand-bright hover:text-paper"
                    >
                      View All Trainings →
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ——— SERVICES MEGA PANEL ——— */}
        {panel === "services" && (
          <div
            id="mega-services"
            className="absolute inset-x-0 top-full z-40 hidden nav:block"
            onMouseEnter={() => openNow("services")}
            onMouseLeave={scheduleClose}
            onKeyDown={onPanelKeyDown}
          >
            <div className="mx-auto w-full max-w-[1240px] px-3 pb-4">
              <div className="glass-panel overflow-hidden rounded-2xl border border-line border-t-2 border-t-brand shadow-[0_28px_56px_rgba(31,24,16,0.18)]">
                <div className="grid max-h-[calc(100vh-170px)] grid-cols-[1fr_300px]">
                  <div className="grid gap-7 overflow-y-auto p-6 sm:grid-cols-3">
                    {serviceGroups.map((g) => (
                      <div key={g.title}>
                        <p className="eyebrow border-b-2 border-heading/70 pb-1.5 text-[10.5px] text-heading">
                          {g.title}
                        </p>
                        <p className="mt-1.5 text-[11.5px] leading-4 text-body">{g.note}</p>
                        <ul className="mt-2 space-y-0.5">
                          {g.slugs.map((slug) => {
                            const s = services.find((x) => x.slug === slug);
                            if (!s) return null;
                            return (
                              <li key={slug}>
                                <Link
                                  href={`/services/${slug}`}
                                  onClick={() => setPanel(null)}
                                  className="group block rounded-lg px-2 py-[7px] transition-colors hover:bg-cream"
                                >
                                  <span className="block text-[13.5px] font-semibold leading-snug text-heading group-hover:text-signal">
                                    {s.title}
                                  </span>
                                  {s.summary && (
                                    <span className="mt-0.5 line-clamp-2 block text-[12px] leading-4.5 text-body">
                                      {s.summary}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* B2B doors rail */}
                  <div className="panel-ink overflow-y-auto p-5">
                    <p className="eyebrow text-brand-bright">For Business</p>
                    <div className="mt-3 space-y-3">
                      {businessDoors.map((d) => (
                        <Link
                          key={d.href}
                          href={d.href}
                          onClick={() => setPanel(null)}
                          className="block rounded-xl bg-white/[0.05] px-4 py-3.5 ring-1 ring-white/10 transition hover:bg-white/[0.09]"
                        >
                          <span className="font-display text-[15.5px] font-semibold text-paper">
                            {d.title} →
                          </span>
                          <span className="mt-1 block text-[12.5px] leading-5 text-paper/75">
                            {d.desc}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/pricing"
                      onClick={() => setPanel(null)}
                      className="mt-4 inline-block text-[13px] font-bold text-brand-bright hover:text-paper"
                    >
                      See Pricing &amp; Plans →
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-ink px-6 py-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/75">
                    {services.length} Services · Quoted to Scope
                  </span>
                  <Link
                    href="/services"
                    onClick={() => setPanel(null)}
                    className="text-[13px] font-bold text-brand-bright hover:text-paper"
                  >
                    View All Services →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ——— RESOURCES PANEL ——— */}
        {panel === "resources" && (
          <div
            id="mega-resources"
            className="absolute inset-x-0 top-full z-40 hidden nav:block"
            onMouseEnter={() => openNow("resources")}
            onMouseLeave={scheduleClose}
            onKeyDown={onPanelKeyDown}
          >
            <div className="mx-auto flex w-full max-w-[1240px] justify-end px-3 pb-4">
              <div className="w-[760px] glass-panel overflow-hidden rounded-2xl border border-line border-t-2 border-t-brand shadow-[0_28px_56px_rgba(31,24,16,0.18)]">
                <div className="grid grid-cols-3 gap-6 p-6">
                  {resourceGroups.map((g) => (
                    <div key={g.title}>
                      <p className="eyebrow border-b-2 border-heading/70 pb-1.5 text-[10.5px] text-heading">
                        {g.title}
                      </p>
                      <ul className="mt-2 space-y-0.5">
                        {g.links.map((l) => (
                          <li key={l.label}>
                            {l.external ? (
                              <a
                                href={l.href}
                                target="_blank"
                                rel="noreferrer"
                                className="block rounded-lg px-2 py-[7px] text-[13.5px] font-semibold text-heading transition-colors hover:bg-cream hover:text-signal"
                              >
                                {l.label} ↗
                              </a>
                            ) : (
                              <Link
                                href={l.href}
                                onClick={() => setPanel(null)}
                                className="block rounded-lg px-2 py-[7px] text-[13.5px] font-semibold text-heading transition-colors hover:bg-cream hover:text-signal"
                              >
                                {l.label}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between bg-ink px-6 py-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/75">
                    People · Proof · Credibility
                  </span>
                  <Link
                    href="/resources"
                    onClick={() => setPanel(null)}
                    className="text-[13px] font-bold text-brand-bright hover:text-paper"
                  >
                    All Resources →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu — rich accordion sheet, same groupings */}
      {open && (
        <nav className="border-b border-line bg-canvas nav:hidden" aria-label="Mobile">
          <div className="wrap py-3">
            <div className="grid grid-cols-2 gap-3 pb-2">
              <Link
                href="/register"
                className="flex min-h-[48px] items-center justify-center rounded-xl border-[1.5px] border-heading/60 px-4 text-[14px] font-bold text-heading"
                onClick={() => setOpen(false)}
              >
                Register
              </Link>
              <Link href="/contact-us" className="btn-primary" onClick={() => setOpen(false)}>
                Request a Callback
              </Link>
            </div>

            <button
              className={`${mobileLink} w-full justify-between text-left`}
              onClick={() => setMobilePanel(mobilePanel === "trainings" ? null : "trainings")}
              aria-expanded={mobilePanel === "trainings"}
            >
              Trainings <span aria-hidden>{mobilePanel === "trainings" ? "▴" : "▾"}</span>
            </button>
            {mobilePanel === "trainings" && (
              <div className="max-h-[62vh] overflow-y-auto pb-2 pl-3">
                <Link
                  href="/trainings"
                  className="flex min-h-[44px] items-center py-2 pr-3 text-[13.5px] font-bold text-signal"
                  onClick={() => setOpen(false)}
                >
                  View All {navCourses.length} Trainings
                </Link>
                {coursesByCategory.map((g) => (
                  <div key={g.category} className="mt-2">
                    <Link
                      href={`/trainings#${categoryAnchor(g.category)}`}
                      onClick={() => setOpen(false)}
                      className="eyebrow block px-2 py-1.5 text-[10.5px] text-signal-strong"
                    >
                      {g.category} · {g.courses.length}
                    </Link>
                    {g.courses.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/trainings/${c.slug}`}
                        className="flex min-h-[44px] items-center justify-between gap-3 py-1.5 pl-4 pr-3 text-[13.5px] font-medium text-body"
                        onClick={() => setOpen(false)}
                      >
                        <span>{c.label}</span>
                        {[c.code, c.duration].filter(Boolean).length > 0 && (
                          <span className="shrink-0 font-mono text-[10px] font-semibold uppercase text-signal-strong">
                            {[c.code, c.duration].filter(Boolean).join(" · ")}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}

            <button
              className={`${mobileLink} w-full justify-between text-left`}
              onClick={() => setMobilePanel(mobilePanel === "services" ? null : "services")}
              aria-expanded={mobilePanel === "services"}
            >
              Services <span aria-hidden>{mobilePanel === "services" ? "▴" : "▾"}</span>
            </button>
            {mobilePanel === "services" && (
              <div className="max-h-[62vh] overflow-y-auto pb-2 pl-3">
                <Link
                  href="/services"
                  className="flex min-h-[44px] items-center py-2 pr-3 text-[13.5px] font-bold text-signal"
                  onClick={() => setOpen(false)}
                >
                  View All Services
                </Link>
                {serviceGroups.map((g) => (
                  <div key={g.title} className="mt-2">
                    <p className="eyebrow px-2 py-1.5 text-[10.5px] text-signal-strong">{g.title}</p>
                    {g.slugs.map((slug) => {
                      const s = services.find((x) => x.slug === slug);
                      if (!s) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/services/${slug}`}
                          className="flex min-h-[44px] items-center py-1.5 pl-4 pr-3 text-[13.5px] font-medium text-body"
                          onClick={() => setOpen(false)}
                        >
                          {s.title}
                        </Link>
                      );
                    })}
                  </div>
                ))}
                <p className="eyebrow px-2 pb-1.5 pt-4 text-[10.5px] text-signal-strong">
                  For Business
                </p>
                {businessDoors.map((d) => (
                  <Link
                    key={d.href}
                    href={d.href}
                    className="flex min-h-[44px] items-center py-1.5 pl-4 pr-3 text-[13.5px] font-bold text-heading"
                    onClick={() => setOpen(false)}
                  >
                    {d.title} →
                  </Link>
                ))}
              </div>
            )}

            <Link className={mobileLink} href="/pricing" onClick={() => setOpen(false)}>
              Pricing
            </Link>
            <Link className={mobileLink} href="/about-us" onClick={() => setOpen(false)}>
              About Us
            </Link>

            <button
              className={`${mobileLink} w-full justify-between text-left`}
              onClick={() => setMobilePanel(mobilePanel === "resources" ? null : "resources")}
              aria-expanded={mobilePanel === "resources"}
            >
              Resources <span aria-hidden>{mobilePanel === "resources" ? "▴" : "▾"}</span>
            </button>
            {mobilePanel === "resources" && (
              <div className="max-h-[62vh] overflow-y-auto pb-2 pl-3">
                {resourceGroups.map((g) => (
                  <div key={g.title} className="mt-2">
                    <p className="eyebrow px-2 py-1.5 text-[10.5px] text-signal-strong">{g.title}</p>
                    {g.links.map((l) =>
                      l.external ? (
                        <a
                          key={l.label}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="flex min-h-[44px] items-center py-1.5 pl-4 pr-3 text-[13.5px] font-medium text-body"
                        >
                          {l.label} ↗
                        </a>
                      ) : (
                        <Link
                          key={l.label}
                          href={l.href}
                          className="flex min-h-[44px] items-center py-1.5 pl-4 pr-3 text-[13.5px] font-medium text-body"
                          onClick={() => setOpen(false)}
                        >
                          {l.label}
                        </Link>
                      ),
                    )}
                  </div>
                ))}
              </div>
            )}

            <Link className={mobileLink} href="/for-colleges" onClick={() => setOpen(false)}>
              For Colleges
            </Link>
            <Link
              className="flex min-h-[48px] items-center px-3 text-[15px] font-bold text-signal"
              href="/for-institutes"
              onClick={() => setOpen(false)}
            >
              For Institutes
            </Link>
            <Link className={mobileLink} href="/partner-with-us" onClick={() => setOpen(false)}>
              Partner With Us
            </Link>
            <Link className={mobileLink} href="/contact-us" onClick={() => setOpen(false)}>
              Contact Us
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

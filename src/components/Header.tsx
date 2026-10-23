"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { business, telHref } from "@/data/site";
import { SocialLinks } from "@/components/ui";

// Header — Leo redesign v2 ("Prospectus", DECISIONS.md §19).
// A light paper bar with ink type under a mono utility strip; the
// official logo artwork is unmodified (dark version on paper).
//
// Menu changes vs v1, made under Aravind's 2026-10-23 full-control
// mandate and logged in §19 (research: 4–6 core top-level items +
// audience doors + one CTA — NN/g menu guidance, SANS/EC-Council
// navs in the training-institute research):
//  1. "Home" removed from the bar — the logo is the home link
//     (universal convention; the route and footer links are unchanged).
//  2. "Contact Us" removed from the bar — it duplicated the persistent
//     "Request a Callback" CTA (same destination) plus the floating
//     Enquire action; the page stays one tap away via the CTA, the
//     footer Quick Links and the contact column.
//  3. "Digital ↗" moved into the Resources dropdown — external
//     properties (Blog ↗, Digital ↗) cluster together instead of
//     spending a primary-nav slot on an outbound link.
const resourceLinks = [
  { label: "Team Members", href: "/team-members" },
  { label: "Why Choose Us", href: "/why-choose-us" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Career Support", href: "/career-support" },
  { label: "Learning Articles", href: "/blog" },
  { label: "Course Comparisons", href: "/compare" },
  { label: "Blog", href: business.blogUrl, external: true },
  { label: "Digital", href: business.digitalUrl, external: true },
  { label: "Student Certifications", href: "/student-certifications" },
  { label: "Certificate Verification", href: "/certificate-verification" },
];

const trainingCategories = [
  "Microsoft Azure",
  "AWS",
  "Cisco",
  "CompTIA",
  "Cybersecurity",
  "Networking",
  "Programming & Data",
  "Medical Coding",
  "Digital Marketing",
  "Design & CAD",
];

const popularTrainings = [
  { title: "Microsoft Certified: Azure Fundamentals | AZ-900", slug: "azure-fundamentals-az-900" },
  {
    title: "Microsoft Certified: Azure Administrator Associate | AZ-104",
    slug: "azure-administrator-az-104",
  },
  { title: "Cisco Certified Network Associate: CCNA 200-301", slug: "ccna-200-301" },
  { title: "CCNP Enterprise 350-401 ENCOR", slug: "ccnp-350-401-encor" },
  { title: "CompTIA Network+: N10-008", slug: "comptia-network-plus" },
  { title: "CompTIA PenTest+: PT0-002", slug: "comptia-pentest-plus" },
  { title: "CompTIA Security+: Sy0-701", slug: "comptia-security-plus" },
  { title: "Computer Hardware and Networking Training", slug: "computer-hardware-and-networking" },
  { title: "Complete Digital Marketing", slug: "digital-marketing" },
  { title: "SOC Analyst Training in Hyderabad | Job-Ready in 90 Days", slug: "soc-analyst" },
  { title: "Certified Ethical Hacker [CEH v13]", slug: "certified-ethical-hacker-ceh" },
];

const navLink =
  "block px-3 py-3 text-[14px] font-semibold text-nav underline-offset-4 transition-colors hover:text-brand hover:underline hover:decoration-2";
const mobileLink =
  "flex min-h-[48px] items-center px-3 text-[15px] font-semibold text-ink transition-colors hover:text-brand";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [trainingsOpen, setTrainingsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2.5 focus:font-semibold focus:text-paper"
      >
        Skip to content
      </a>

      {/* Utility strip — mono index voice on ink */}
      <div className="bg-ink-deep text-footer-text">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2 font-mono text-[11px] uppercase tracking-[0.14em]">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>{business.locationLabel}</span>
            <a className="normal-case tracking-normal transition-colors hover:text-brand-bright" href={`mailto:${business.emails[0]}`}>
              {business.emails[0]}
            </a>
            <span className="hidden md:inline">Office Hours: {business.officeHours}</span>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            <span className="flex items-center gap-3">
              <SocialLinks />
            </span>
            {business.phones.map((p) => (
              <a
                key={p}
                className="font-semibold normal-case tracking-normal text-brand-bright hover:text-paper"
                href={telHref(p)}
              >
                {p}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main navigation — paper bar, ink type, official logo */}
      <div className="border-b border-line bg-paper/[0.96] shadow-[0_1px_0_rgba(32,25,19,0.04)] backdrop-blur">
        <div className="wrap flex items-center justify-between py-2.5">
          <Link href="/" aria-label="GradeSpot IT Solutions — Home" className="shrink-0 py-1">
            <Image
              src="/images/logo.png"
              alt="GradeSpot IT Solutions"
              width={193}
              height={60}
              className="h-11 w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center lg:flex" aria-label="Primary">
            {/* Trainings mega-menu */}
            <div className="group relative">
              <Link className={navLink} href="/trainings" aria-haspopup="true">
                Trainings <span aria-hidden>▾</span>
              </Link>
              <div className="invisible absolute left-1/2 top-full z-50 w-[820px] -translate-x-1/2 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="overflow-hidden rounded-2xl border border-line border-t-2 border-t-brand bg-parchment shadow-[0_28px_56px_rgba(31,24,16,0.16)]">
                  <div className="grid grid-cols-[200px_1fr] gap-0">
                    <div className="bg-cream px-5 py-5">
                      <p className="eyebrow text-brand-dark">Categories</p>
                      <ul className="mt-3 space-y-1">
                        {trainingCategories.map((c) => (
                          <li key={c}>
                            <Link
                              href="/trainings"
                              className="block rounded-lg px-2 py-2 text-[13.5px] font-medium text-body transition-colors hover:bg-parchment hover:text-brand"
                            >
                              {c}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="px-6 py-5">
                      <p className="eyebrow text-brand-dark">Popular Trainings</p>
                      <ul className="mt-3 grid grid-cols-2 gap-x-6">
                        {popularTrainings.map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/trainings/${c.slug}`}
                              className="block border-b border-line/70 py-2.5 font-display text-[14.5px] font-semibold leading-snug text-heading transition-colors hover:text-brand"
                            >
                              {c.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-ink px-6 py-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/75">
                      Online &amp; Offline Classes
                    </span>
                    <Link
                      href="/trainings"
                      className="text-[13px] font-bold text-brand-bright hover:text-paper"
                    >
                      View All Trainings →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link className={navLink} href="/services">
              Services
            </Link>
            <Link className={navLink} href="/pricing">
              Pricing
            </Link>
            <Link className={navLink} href="/about-us">
              About Us
            </Link>

            {/* Resources dropdown — original items + Digital (moved
                here from the top bar, §19). */}
            <div className="group relative">
              <Link className={navLink} href="/resources" aria-haspopup="true">
                Resources <span aria-hidden>▾</span>
              </Link>
              <div className="invisible absolute left-0 top-full z-50 w-72 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="overflow-hidden rounded-2xl border border-line border-t-2 border-t-brand bg-parchment py-2 shadow-[0_28px_56px_rgba(31,24,16,0.16)]">
                  {resourceLinks.map((l) =>
                    l.external ? (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="block px-5 py-2.5 text-[13.5px] font-semibold text-heading transition-colors hover:bg-cream hover:text-brand"
                      >
                        {l.label} ↗
                      </a>
                    ) : (
                      <Link
                        key={l.label}
                        href={l.href}
                        className="block px-5 py-2.5 text-[13.5px] font-semibold text-heading transition-colors hover:bg-cream hover:text-brand"
                      >
                        {l.label}
                      </Link>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Audience doors — colleges as a peer link, institutes as
                the highlighted B2B pill (Stage-1 sitemap treatment). */}
            <Link className={navLink} href="/for-colleges">
              For Colleges
            </Link>
            <Link
              className="ml-1 rounded-xl bg-brand px-4 py-2.5 text-[14px] font-bold text-white shadow-[0_8px_20px_rgba(178,58,10,0.28)] transition hover:bg-brand-dark"
              href="/for-institutes"
            >
              For Institutes
            </Link>
            <Link
              href="/register"
              className="ml-3 flex min-h-[48px] items-center rounded-xl border-[1.5px] border-ink/60 px-4 text-[14px] font-bold text-ink transition hover:border-ink hover:bg-ink hover:text-paper"
            >
              Register
            </Link>
            <Link href="/contact-us" className="btn-primary ml-3">
              Request a Callback
            </Link>
          </nav>

          <button
            className="flex min-h-[48px] items-center rounded-xl border border-ink/25 px-5 text-sm font-semibold text-ink lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            ☰ Menu
          </button>
        </div>
      </div>

      {/* Mobile menu — paper panel, ink type */}
      {open && (
        <nav className="border-b border-line bg-paper lg:hidden" aria-label="Mobile">
          <div className="wrap flex flex-col py-3">
            <button
              className={`${mobileLink} justify-between text-left`}
              onClick={() => setTrainingsOpen(!trainingsOpen)}
              aria-expanded={trainingsOpen}
            >
              Trainings <span aria-hidden>{trainingsOpen ? "▴" : "▾"}</span>
            </button>
            {trainingsOpen && (
              <>
                <Link
                  href="/trainings"
                  className="flex min-h-[44px] items-center py-2 pl-7 pr-3 text-[13.5px] font-bold text-brand"
                  onClick={() => setOpen(false)}
                >
                  View All Trainings
                </Link>
                {popularTrainings.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/trainings/${c.slug}`}
                    className="flex min-h-[44px] items-center py-2 pl-7 pr-3 text-[13.5px] font-medium text-body"
                    onClick={() => setOpen(false)}
                  >
                    {c.title}
                  </Link>
                ))}
              </>
            )}
            <Link className={mobileLink} href="/services" onClick={() => setOpen(false)}>
              Services
            </Link>
            <Link className={mobileLink} href="/pricing" onClick={() => setOpen(false)}>
              Pricing
            </Link>
            <Link className={mobileLink} href="/about-us" onClick={() => setOpen(false)}>
              About Us
            </Link>
            <button
              className={`${mobileLink} justify-between text-left`}
              onClick={() => setResourcesOpen(!resourcesOpen)}
              aria-expanded={resourcesOpen}
            >
              Resources <span aria-hidden>{resourcesOpen ? "▴" : "▾"}</span>
            </button>
            {resourcesOpen &&
              resourceLinks.map((l) =>
                l.external ? (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-[44px] items-center py-2 pl-7 pr-3 text-[13.5px] font-medium text-body"
                  >
                    {l.label} ↗
                  </a>
                ) : (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="flex min-h-[44px] items-center py-2 pl-7 pr-3 text-[13.5px] font-medium text-body"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ),
              )}
            <Link className={mobileLink} href="/for-colleges" onClick={() => setOpen(false)}>
              For Colleges
            </Link>
            <Link
              className="flex min-h-[48px] items-center px-3 text-[15px] font-bold text-brand"
              href="/for-institutes"
              onClick={() => setOpen(false)}
            >
              For Institutes
            </Link>
            <Link className={mobileLink} href="/register" onClick={() => setOpen(false)}>
              Register
            </Link>
            <Link
              href="/contact-us"
              className="btn-primary mt-3 text-center"
              onClick={() => setOpen(false)}
            >
              Request a Callback
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

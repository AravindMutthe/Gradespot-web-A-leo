"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { business, telHref } from "@/data/site";
import { SocialLinks } from "@/components/ui";

// Same menu options and destinations as the official site / replica build.
// The Trainings mega-menu is a presentation pattern only: every link in it
// points at a page that already exists in the trainings catalogue.
const resourceLinks = [
  { label: "Team Members", href: "/team-members" },
  { label: "Why Choose Us", href: "/why-choose-us" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: business.blogUrl, external: true },
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
  "block px-3 py-2 text-[13.5px] font-semibold text-nav transition-colors hover:text-brand";
const mobileLink = "block px-3 py-2.5 text-sm font-semibold text-white hover:text-brand";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [trainingsOpen, setTrainingsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-[0_6px_24px_rgba(6,23,36,0.25)]">
      {/* Top utility bar */}
      <div className="bg-navy-deep text-white/75">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-1.5 text-[12.5px]">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>{business.locationLabel}</span>
            <a className="transition-colors hover:text-brand" href={`mailto:${business.emails[0]}`}>
              {business.emails[0]}
            </a>
            <span className="hidden md:inline">Office Hours: {business.officeHours}</span>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            <span className="flex items-center gap-3">
              <SocialLinks />
            </span>
            {business.phones.map((p) => (
              <a key={p} className="font-semibold text-brand hover:text-white" href={telHref(p)}>
                {p}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main navigation — deep navy corporate bar, official light logo */}
      <div className="bg-navy">
        <div className="wrap flex items-center justify-between py-3">
          <Link href="/" aria-label="GradeSpot IT Solutions — Home" className="shrink-0">
            <Image
              src="/images/logo-light.png"
              alt="GradeSpot IT Solutions"
              width={193}
              height={60}
              className="h-11 w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center lg:flex" aria-label="Primary">
            <Link className={navLink} href="/">
              Home
            </Link>
            <Link className={navLink} href="/about-us">
              About Us
            </Link>

            {/* Trainings mega-menu */}
            <div className="group relative">
              <Link className={navLink} href="/trainings" aria-haspopup="true">
                Trainings <span aria-hidden>▾</span>
              </Link>
              <div className="invisible absolute left-1/2 top-full z-50 w-[780px] -translate-x-1/2 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="overflow-hidden rounded-xl border-t-4 border-brand bg-white shadow-2xl">
                  <div className="grid grid-cols-[190px_1fr] gap-0">
                    <div className="bg-surface-light px-5 py-5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-dark">
                        Categories
                      </p>
                      <ul className="mt-3 space-y-1">
                        {trainingCategories.map((c) => (
                          <li key={c}>
                            <Link
                              href="/trainings"
                              className="block rounded px-2 py-1.5 text-[13px] font-medium text-body transition-colors hover:bg-white hover:text-brand"
                            >
                              {c}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="px-6 py-5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-dark">
                        Popular Trainings
                      </p>
                      <ul className="mt-3 grid grid-cols-2 gap-x-6">
                        {popularTrainings.map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/trainings/${c.slug}`}
                              className="block border-b border-surface-light py-2 text-[13px] font-medium leading-snug text-heading transition-colors hover:text-brand"
                            >
                              {c.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-navy px-6 py-3">
                    <span className="text-[13px] font-medium text-white/85">
                      Online &amp; Offline Classes
                    </span>
                    <Link
                      href="/trainings"
                      className="text-[13px] font-bold text-brand hover:text-white"
                    >
                      View All Trainings →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Resources dropdown — same items as the replica */}
            <div className="group relative">
              <Link className={navLink} href="/resources" aria-haspopup="true">
                Resources <span aria-hidden>▾</span>
              </Link>
              <div className="invisible absolute left-0 top-full z-50 w-64 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="overflow-hidden rounded-xl border-t-4 border-brand bg-white py-2 shadow-2xl">
                  {resourceLinks.map((l) =>
                    l.external ? (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="block px-5 py-2.5 text-[13px] font-semibold text-heading transition-colors hover:bg-surface-light hover:text-brand"
                      >
                        {l.label} ↗
                      </a>
                    ) : (
                      <Link
                        key={l.label}
                        href={l.href}
                        className="block px-5 py-2.5 text-[13px] font-semibold text-heading transition-colors hover:bg-surface-light hover:text-brand"
                      >
                        {l.label}
                      </Link>
                    ),
                  )}
                </div>
              </div>
            </div>

            <a className={navLink} href={business.digitalUrl} target="_blank" rel="noreferrer">
              Digital ↗
            </a>
            <Link className={navLink} href="/services">
              Services
            </Link>
            <Link className={navLink} href="/contact-us">
              Contact Us
            </Link>
            <Link href="/contact-us" className="btn-primary ml-4">
              Get Started
            </Link>
          </nav>

          <button
            className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            ☰ Menu
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="bg-navy-deep lg:hidden" aria-label="Mobile">
          <div className="wrap flex flex-col py-3">
            <Link className={mobileLink} href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link className={mobileLink} href="/about-us" onClick={() => setOpen(false)}>
              About Us
            </Link>
            <button
              className={`${mobileLink} flex items-center justify-between text-left`}
              onClick={() => setTrainingsOpen(!trainingsOpen)}
              aria-expanded={trainingsOpen}
            >
              Trainings <span aria-hidden>{trainingsOpen ? "▴" : "▾"}</span>
            </button>
            {trainingsOpen && (
              <>
                <Link
                  href="/trainings"
                  className="block py-2 pl-7 pr-3 text-[13px] font-semibold text-brand"
                  onClick={() => setOpen(false)}
                >
                  View All Trainings
                </Link>
                {popularTrainings.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/trainings/${c.slug}`}
                    className="block py-2 pl-7 pr-3 text-[13px] font-medium text-white/85"
                    onClick={() => setOpen(false)}
                  >
                    {c.title}
                  </Link>
                ))}
              </>
            )}
            <button
              className={`${mobileLink} flex items-center justify-between text-left`}
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
                    className="block py-2 pl-7 pr-3 text-[13px] font-medium text-white/85"
                  >
                    {l.label} ↗
                  </a>
                ) : (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="block py-2 pl-7 pr-3 text-[13px] font-medium text-white/85"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ),
              )}
            <a className={mobileLink} href={business.digitalUrl} target="_blank" rel="noreferrer">
              Digital ↗
            </a>
            <Link className={mobileLink} href="/services" onClick={() => setOpen(false)}>
              Services
            </Link>
            <Link className={mobileLink} href="/contact-us" onClick={() => setOpen(false)}>
              Contact Us
            </Link>
            <Link
              href="/contact-us"
              className="btn-primary mt-3 text-center"
              onClick={() => setOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

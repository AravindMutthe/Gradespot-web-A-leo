// Frontend 3.0 — Stage 2 homepage (Staged Editorial Split, v1.1 §3).
//
// Layout-break note: this page deliberately does NOT reuse the v1
// hero wrapper or the old 14-section home rhythm, and it carries
// NO cards — discovery is index rows, interest is a link strip, doors
// are text rows. The old hero transition shim stays on disk for
// pre-template pages until their stages; it is not used here.
//
// Content honesty (v1.1 + refined boundary):
// - Hero wording is D3, verbatim, with the v1.1 subline. Training and
//   IT Solutions are equal doors: same-size CTAs in the hero, and a
//   door row each in the split column.
// - Category index is category-level only, computed from the repo data
//   files (36 trainings, 10 categories). No course is named, so no
//   PENDING catalogue-only course is given a status or an enrolment
//   CTA here; course-level status lives on the trainings template.
// - Services are title-only rows to /services/[slug]. The per-service
//   summaries in src/data/services.ts are flagged there as pending
//   accuracy confirmation, so they are NOT carried onto this page.
// - Deliberately omitted (no verified fact behind them on this page):
//   counters, learner counts, "years", ISO/AICTE emblems and claims,
//   employer logos, testimonials, stats ribbons, promo banners, ticker.
//   A section with no verified fact is omitted, not softened.
// - No search box: search arrives with the Stage 6 build-time index
//   and is not presented before it works. No new form: enquiry points
//   to the existing /contact-us and /register routes only.
// - Contrast pairs used here are all previously measured (see the
//   token file header): white on ink 15.74:1, footer-text on ink
//   10.60:1, brand-bright on ink 5.16:1 (accent text on ink ONLY),
//   body on canvas 13.98:1, muted on canvas 7.24:1, brand-dark on
//   white 6.74:1. Brand accent never appears as body text on light.

import type { Metadata } from "next";
import Link from "next/link";
import { courses, courseCategories } from "@/data/courses";
import { topicSlug } from "@/lib/two-door";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: {
    absolute: "IT Training Institute in Hyderabad, Dilsukhnagar | GradeSpot IT Solutions",
  },
  description:
    "GradeSpot IT Solutions is an IT training institute in Dilsukhnagar, Hyderabad offering cybersecurity, cloud, networking, digital marketing and more — online & offline classes, corporate training, internships and IT services.",
  alternates: { canonical: "/", languages: { en: "/" } },
  openGraph: {
    title: "IT Training Institute in Hyderabad, Dilsukhnagar | GradeSpot IT Solutions",
    description:
      "GradeSpot IT Solutions is an IT training institute in Dilsukhnagar, Hyderabad offering cybersecurity, cloud, networking, digital marketing and more — online & offline classes, corporate training, internships and IT services.",
    images: [{ url: "/images/og/home.jpg" }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Training Institute in Hyderabad, Dilsukhnagar | GradeSpot IT Solutions",
    description:
      "GradeSpot IT Solutions is an IT training institute in Dilsukhnagar, Hyderabad offering cybersecurity, cloud, networking, digital marketing and more — online & offline classes, corporate training, internships and IT services.",
    images: ["/images/og/home.jpg"],
  },
};

// Interest-led entries. Every href is an existing route — no invented
// destinations, no dead ends. Category rows link to the matching
// dynamic category page (/trainings/category/<slug>, two-door
// categorization), so each row lands on its own category instead of
// the top of the generic index. Old /trainings#category-<slug>
// anchors no longer resolve to sections: the directory carries no
// sections, so an old bookmark lands at the top of /trainings.
const INTERESTS: { label: string; href: string }[] = [
  { label: "I want to learn a new skill", href: "/trainings" },
  { label: "I want IT help for my business", href: "/services" },
  { label: "I want training for my team", href: "/corporate-and-international" },
  { label: "I run an institute", href: "/for-institutes" },
  { label: "I want a workshop at my college", href: "/for-colleges" },
  { label: "Verify a certificate", href: "/certificate-verification" },
];

export default function HomePage() {
  const categories = courseCategories
    .map((name) => ({
      name,
      count: courses.filter((c) => c.category === name).length,
    }))
    .filter((c) => c.count > 0);

  return (
    <>
      {/* Stage 1 — editorial split hero. Left: ink panel, D3 wording,
          equal-door CTAs. Right: the two doors as text rows, not
          cards, not a photo panel. */}
      <section aria-label="Introduction">
        <div className="wrap grid gap-0 py-6 md:py-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="bg-ink px-6 py-10 sm:px-10 md:py-14">
            <p className="eyebrow text-brand-bright">Dilsukhnagar · Hyderabad</p>
            <h1 className="mt-5 max-w-xl text-[40px] font-semibold leading-[1.08] text-white md:text-[56px]">
              Practical IT training — and IT services — in Hyderabad.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-footer-text">
              Explore technical courses and business IT solutions from GradeSpot IT Solutions.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/trainings" className="btn-primary">
                Explore Training
              </Link>
              <Link href="/services" className="btn-outline-light">
                Explore IT Solutions
              </Link>
            </div>
            <p className="mt-8 max-w-xl text-sm leading-6 text-footer-text">
              Two doors, one institute — training and IT services, side by side.
            </p>
          </div>
          <div className="border border-line bg-surface px-6 py-10 sm:px-10 md:py-14">
            <p className="eyebrow text-brand-dark">Two doors</p>
            <ul className="mt-4">
              <li className="border-b border-line">
                <Link
                  href="/trainings"
                  className="flex min-h-[64px] items-center justify-between gap-4 py-3"
                >
                  <span>
                    <span className="block text-lg font-semibold text-ink">Training</span>
                    <span className="block text-sm leading-6 text-muted">
                      Technical courses across {categories.length} categories — browse the full
                      catalogue.
                    </span>
                  </span>
                  <span aria-hidden className="shrink-0 text-xl text-brand-dark">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="flex min-h-[64px] items-center justify-between gap-4 py-3"
                >
                  <span>
                    <span className="block text-lg font-semibold text-ink">IT Solutions</span>
                    <span className="block text-sm leading-6 text-muted">
                      Business IT services, from web development to cybersecurity.
                    </span>
                  </span>
                  <span aria-hidden className="shrink-0 text-xl text-brand-dark">
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Stage 2 — fast discovery: compact 10-category index rows, NOT
          cards. Counts are computed from the repo data files. */}
      <section aria-label="Browse trainings by category" className="section-pad">
        <div className="wrap">
          <p className="eyebrow text-brand-dark">Trainings</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Browse trainings by category</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            {courses.length} trainings across {categories.length} categories. Pick a category to
            browse the catalogue.
          </p>
          <ul className="mt-8 border-t border-line">
            {categories.map((cat) => (
              <li key={cat.name} className="border-b border-line">
                <Link
                  href={`/trainings/category/${topicSlug(cat.name)}`}
                  className="flex min-h-[56px] items-center justify-between gap-4 py-3"
                >
                  <span className="text-lg font-semibold text-ink">{cat.name}</span>
                  <span className="shrink-0 text-sm text-muted">
                    {cat.count} {cat.count === 1 ? "training" : "trainings"} →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-6 text-muted">
            Availability for each course is confirmed on enquiry.
          </p>
        </div>
      </section>

      {/* Stage 3 — explore by interest: a link strip, not cards. */}
      <section aria-label="Explore by interest" className="border-y border-line bg-surface">
        <div className="wrap py-10 md:py-12">
          <p className="eyebrow text-brand-dark">Explore by interest</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Start from what you want</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {INTERESTS.map((item) => (
              <li key={item.href + item.label}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-[44px] items-center rounded-full border border-line bg-canvas px-5 py-2 text-[15px] font-semibold text-ink"
                >
                  {item.label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stage 4 — the IT Solutions door, at the same weight as the
          training index: title-only rows to the service pages. */}
      <section aria-label="IT services" className="section-pad">
        <div className="wrap">
          <p className="eyebrow text-brand-dark">IT Solutions</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Business IT services</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            {services.length} services listed on the services catalogue.
          </p>
          <ul className="mt-8 border-t border-line">
            {services.map((s) => (
              <li key={s.slug} className="border-b border-line">
                <Link
                  href={`/services/${s.slug}`}
                  className="flex min-h-[56px] items-center justify-between gap-4 py-3"
                >
                  <span className="text-lg font-semibold text-ink">{s.title}</span>
                  <span aria-hidden className="shrink-0 text-xl text-brand-dark">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stage 5 — task-focused enquiry. No new form: the existing
          enquiry and registration routes only. */}
      <section aria-label="Enquire" className="border-t border-line bg-surface">
        <div className="wrap py-10 md:py-12">
          <h2 className="text-3xl font-semibold md:text-4xl">Talk to us about your next step</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            Batch schedules and fees are confirmed on enquiry — talk to the team about the
            course or service you have in mind.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/contact-us" className="btn-primary">
              Contact Us
            </Link>
            <Link href="/register" className="btn-outline-navy">
              Register for a Free Demo Class
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

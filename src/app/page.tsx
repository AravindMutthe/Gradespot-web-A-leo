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
import { buildContentsChapters } from "@/lib/chapter-contract";
import { ChapterContents, ContentsGrid, ProspectusCover } from "@/components/prospectus";

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

  // Prospectus contents, computed from data only: category counts,
  // service titles, interest links. No count or entry is invented.
  const categoryChapters = buildContentsChapters(
    categories.map((cat) => ({
      title: cat.name,
      href: `/trainings/category/${topicSlug(cat.name)}`,
      meta: `${cat.count} ${cat.count === 1 ? "training" : "trainings"}`,
    })),
  );
  const interestChapters = buildContentsChapters(
    INTERESTS.map((item) => ({ title: item.label, href: item.href })),
  );
  const serviceChapters = buildContentsChapters(
    services.map((s) => ({ title: s.title, href: `/services/${s.slug}` })),
  );

  return (
    <>
      {/* Direction A — prospectus cover. Full-width ink panel, 64px
          serif title, meta line underneath computed from data only
          (location + counts), two equal-door CTAs. The old split
          hero's door rows are replaced by the contents index below
          the fold — the doors survive as CTAs, not as rows. */}
      <ProspectusCover
        metaLine={`Dilsukhnagar · Hyderabad · ${courses.length} trainings · ${services.length} services`}
        title="Practical IT training — and IT services — in Hyderabad."
        description="Explore technical courses and business IT solutions from GradeSpot IT Solutions."
      >
        <Link href="/trainings" className="btn-primary">
          Explore Training
        </Link>
        <Link href="/services" className="btn-outline-light">
          Explore IT Solutions
        </Link>
      </ProspectusCover>

      {/* Contents I — the catalogue index: 10 categories with counts,
          as a numbered Bootstrap editorial grid (single column below
          md and at 320 CSS px). */}
      <section aria-label="Browse trainings by category" className="section-pad">
        <div className="wrap">
          <p className="eyebrow text-brand-dark">Contents</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Browse trainings by category</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            {courses.length} trainings across {categories.length} categories. Pick a category to
            browse the catalogue.
          </p>
          <div className="mt-8">
            <ContentsGrid chapters={categoryChapters} />
          </div>
          <p className="mt-4 text-sm leading-6 text-muted">
            Availability for each course is confirmed on enquiry.
          </p>
        </div>
      </section>

      {/* Contents II — explore by interest, restyled as a numbered
          "Start here" contents list (same links, same destinations). */}
      <section aria-label="Explore by interest" className="border-y border-line bg-surface">
        <div className="wrap py-10 md:py-12">
          <p className="eyebrow text-brand-dark">Contents</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Start from what you want</h2>
          <div className="mt-6">
            <ChapterContents chapters={interestChapters} />
          </div>
        </div>
      </section>

      {/* Contents III — the IT Solutions door, at the same weight as
          the training index: title-only numbered contents. */}
      <section aria-label="IT services" className="section-pad">
        <div className="wrap">
          <p className="eyebrow text-brand-dark">Contents</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Business IT services</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            {services.length} services listed on the services catalogue.
          </p>
          <div className="mt-8">
            <ContentsGrid chapters={serviceChapters} />
          </div>
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
              Ask about a demo class
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

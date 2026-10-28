// Frontend 3.0 — Stage 5 course-detail template (compact, text-first).
//
// Replaces the pre-template detail page in full. What was removed and
// why (all recorded in src/lib/course-detail.ts):
// - Hero image (provenance unreviewed) and the priority/object-cover
//   treatment that came with it. OG images are unchanged (Stage 4
//   precedent: metadata, pre-existing local files).
// - DemoBand and every "free demo" promise: no course has a confirmed
//   demo offer. Enquiry covers demo questions.
// - RegisterStrip and the "Ready to enrol?" panel: no seat promise;
//   conversion semantics for Register remain an open owner decision.
// - B2BStrip: cross-sell for services whose scope is held (Stage 4).
// - LogoWall, StatsRibbon, FeatureTrio: unverified promotional
//   surfaces, same as Stages 3/4.
// - AnswerLead / courseAnswerSummary: it asserts a free demo class
//   for every full course and repeats published outcomes (including
//   SOC's job-ready outcome) as answer text.
// - Generated FAQs (lib/course-faqs): unapproved. Only repo sections
//   styled "faq" count as published FAQs, and no verified page has
//   one — so Stage 5 detail pages emit no FAQPage schema.
// - The old EnquiryRail (demo link, syllabus promise, learner
//   counters) is not reused; the enquiry panel below uses LeadForm
//   plus a WhatsApp enquiry link only. EnquiryRail itself is left
//   untouched on disk, like CourseCardBody/ServiceCard before it.
// - Section headings render verbatim (the old questionHeading
//   rewrite is dropped with the old template).
// - Data source: LOCAL repo files only (see course-detail.ts).
//   Slugs, categories, canonical URLs and routes are unchanged.
// - Curriculum gating (Stage 5 follow-up, owner-authorised two-tier
//   policy): the detail page shows module AREAS only ("What you will
//   learn", verbatim topic lists). Lesson-level curriculum sections
//   are NOT rendered publicly; a gated block points to the enquiry
//   panel, and the full syllabus is shared off-site by the team after
//   enquiry (manual until an Axon/n8n workflow exists). No download
//   is promised anywhere, and no gated paragraph reaches the model,
//   so it cannot leak into HTML, metadata, JSON-LD or search.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses as localCourses, type CourseSection } from "@/data/courses";
import { coursePageMetadata } from "@/lib/metadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, courseFaqs, courseSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { courseDetails } from "@/data/course-details";
import { comparisons } from "@/data/comparisons";
import { courseWaLink } from "@/lib/wa";
import { SampleTag } from "@/components/SampleTag";
import { DemoLegend } from "@/components/DemoLegend";
import {
  ENQUIRE_LABEL,
  PENDING_LABEL,
  buildCourseDetail,
  findLocalCourse,
} from "@/lib/course-detail";

function SectionBody({ section }: { section: CourseSection }) {
  // "cards" sections render as a plain list, not a card grid: the
  // template is text-first throughout.
  if (section.style === "cards") {
    return (
      <ul className="mt-3 list-disc space-y-1 pl-5">
        {section.paragraphs.map((p, j) => (
          <li key={j}>{p}</li>
        ))}
      </ul>
    );
  }
  return (
    <div className="mt-3 space-y-4">
      {section.paragraphs.map((p, j) => (
        <p key={j}>{p}</p>
      ))}
    </div>
  );
}

export function generateStaticParams() {
  return localCourses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = findLocalCourse(slug);
  if (!course) return { title: "Course not found" };
  const model = buildCourseDetail(course, courseDetails[course.slug], undefined);
  return coursePageMetadata(course, `/trainings/${slug}`, {
    displayTitle: model.displayTitle,
    held: model.heldBack,
    description: model.sample ? (model.summary ?? undefined) : undefined,
  });
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = findLocalCourse(slug);
  if (!course) notFound();

  const comparePair = comparisons.find((c) => c.a === course.slug || c.b === course.slug);
  const model = buildCourseDetail(course, courseDetails[course.slug], comparePair);
  // Published FAQ pairs only: repo sections styled "faq". Generated
  // FAQs are never rendered and never emitted as schema. No verified
  // page has a styled-faq section, so in practice this emits nothing
  // in Stage 5 — the check stays so a future published FAQ is handled.
  const publishedFaqs = model.heldBack ? [] : courseFaqs(course);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Trainings", path: "/trainings" },
    { name: model.displayTitle },
  ];

  return (
    <>
      <JsonLd
        data={courseSchema(course, {
          displayTitle: model.displayTitle,
          held: model.heldBack,
          suppressOffers: true,
        })}
      />
      <JsonLd data={webPageSchema(`/trainings/${course.slug}`, model.displayTitle)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Trainings", path: "/trainings" },
          { name: model.displayTitle, path: `/trainings/${course.slug}` },
        ])}
      />
      {publishedFaqs.length > 0 && <JsonLd data={faqSchema(publishedFaqs)} />}

      <section className="bg-ink py-6 text-white md:py-8">
        <div className="wrap">
          <Breadcrumbs dark items={crumbs} />
          <p className="eyebrow mt-6 text-brand-bright">{model.category}</p>
          <h1 className="mt-2 max-w-4xl text-4xl font-semibold md:text-5xl md:leading-tight">
            {model.displayTitle}
          </h1>
          {/* Demo-fill: sample courses show the Sample tag in the
              hero (white pill, sample-colored text — readable on
              ink), but NO sample-colored body text on the dark hero:
              the sample summary and duration live in the light body
              below, where the sample color passes AA. */}
          {model.sample && (
            <p className="mt-4">
              <SampleTag />
            </p>
          )}
          {model.heldBack ? (
            <>
              <p className="mt-4 max-w-3xl text-base leading-7 text-white/85">
                {PENDING_LABEL}. Availability, schedule and course details are confirmed
                directly by the GradeSpot team.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link href="/contact-us" className="btn-primary min-h-[44px]">
                  {ENQUIRE_LABEL}
                </Link>
                <Link href="/trainings" className="btn-outline-light min-h-[44px]">
                  All Trainings
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Verified pages show summary + duration in the hero.
                  Sample pages do not: sample-colored text never
                  renders on dark ink, so the sample summary and
                  duration render in the light body below. */}
              {!model.sample && model.summary && (
                <p className="mt-4 max-w-3xl text-base leading-7 text-white/85">{model.summary}</p>
              )}
              {!model.sample && model.durationLabel && (
                <p className="mt-4 text-base font-semibold text-white">{model.durationLabel}</p>
              )}
              <div className="mt-7 flex flex-wrap gap-4">
                <a href="#enquire" className="btn-primary min-h-[44px]">
                  {ENQUIRE_LABEL}
                </a>
                <Link href="/trainings" className="btn-outline-light min-h-[44px]">
                  All Trainings
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {!model.heldBack && (
        <section className="section-pad">
          <div className="wrap">
            <div className="mx-auto max-w-3xl">
              {/* Demo-fill: legend on every sample-carrying detail page. */}
              {model.sample && (
                <div className="mb-10">
                  <DemoLegend />
                </div>
              )}
              {/* Demo-fill: sample summary + duration on a light
                  surface, in the sample font color, with the tag. */}
              {model.sample && model.summary && (
                <div className="mb-10 rounded-2xl border border-sample/40 bg-[#F5F3FF] p-7">
                  <p className="flex flex-wrap items-center gap-3">
                    <SampleTag />
                  </p>
                  <p className="mt-3 text-base leading-7 text-sample">{model.summary}</p>
                </div>
              )}
              {model.facts && (
                <div className="mb-10 rounded-2xl border border-line bg-surface p-7">
                  <h2 className="flex flex-wrap items-center gap-3 text-lg font-bold text-ink">
                    Course facts {model.sample && <SampleTag />}
                  </h2>
                  <dl className="mt-4 space-y-3 text-[15px] leading-7 text-body">
                    <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                      <dt className="w-32 shrink-0 font-semibold text-ink">Who it&apos;s for</dt>
                      <dd className={model.sample ? "text-sample" : undefined}>{model.facts.who}</dd>
                    </div>
                    {model.sample && model.durationLabel && (
                      <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                        <dt className="w-32 shrink-0 font-semibold text-ink">Duration</dt>
                        <dd className="text-sample">{model.durationLabel}</dd>
                      </div>
                    )}
                    <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                      <dt className="w-32 shrink-0 font-semibold text-ink">Level</dt>
                      <dd className={model.sample ? "text-sample" : undefined}>{model.facts.level}</dd>
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                      <dt className="w-32 shrink-0 font-semibold text-ink">Certification</dt>
                      <dd className={model.sample ? "text-sample" : undefined}>{model.facts.certification}</dd>
                    </div>
                    {model.facts.topics && model.facts.topics.length > 0 && (
                      <div>
                        <dt className="font-semibold text-ink">What you will learn</dt>
                        <dd className="mt-2">
                          <ul className="list-disc space-y-1 pl-5">
                            {model.facts.topics.map((topic) => (
                              <li key={topic} className={model.sample ? "text-sample" : undefined}>{topic}</li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}

              {/* Two-tier curriculum gate: areas above stay public; the
                  full syllabus is shared by the team after enquiry. */}
              <div className="mb-10 rounded-2xl border border-line bg-surface p-7">
                <h2 className="flex flex-wrap items-center gap-3 text-lg font-bold text-ink">
                  Full syllabus — shared after enquiry {model.sample && <SampleTag />}
                </h2>
                <p className="mt-2 text-[15px] leading-7 text-body">
                  The full syllabus for this course is shared by the GradeSpot team
                  after enquiry — via WhatsApp or mail.
                </p>
                <a
                  href="#enquire"
                  className="btn-primary mt-4 inline-flex min-h-[44px] items-center"
                >
                  Enquire for the Full Syllabus
                </a>
              </div>

              <div className="space-y-12">
                {model.sections.map((s, i) => (
                  <article key={i}>
                    {s.heading && (
                      <h2 className="text-[28px] font-semibold leading-[34px] text-ink">
                        {s.heading}
                      </h2>
                    )}
                    <SectionBody section={s} />
                  </article>
                ))}
              </div>

              {model.compareSlug && model.compareTitle && (
                <div className="mt-12 rounded-2xl border border-line bg-surface p-8">
                  <h2 className="text-2xl font-semibold text-ink">Still deciding?</h2>
                  <p className="mt-2 max-w-xl text-body">
                    We compared this course side-by-side with the closest alternative — topics,
                    duration, certification and roles — so you can choose with the facts in
                    front of you.
                  </p>
                  <Link
                    href={`/compare/${model.compareSlug}`}
                    className="mt-4 inline-block min-h-[44px] text-[15px] font-bold text-signal hover:text-signal-strong"
                  >
                    {model.compareTitle} →
                  </Link>
                </div>
              )}

              <div id="enquire" className="mt-12 scroll-mt-32 rounded-2xl border border-line bg-surface p-7">
                <h2 className="text-[22px] font-semibold leading-snug text-ink">
                  Request a Callback
                </h2>
                <p className="mt-1.5 text-sm leading-6 text-body">
                  Ask about batches, mode of training and certification guidance for this course.
                </p>
                <div className="mt-4">
                  <LeadForm
                    interest={model.displayTitle}
                    idPrefix="detail-lead"
                    purposeNote="Share your details and the team will send the full syllabus via WhatsApp or mail."
                  />
                </div>
                <a
                  href={courseWaLink(model.displayTitle)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex min-h-[44px] items-center justify-center gap-2 rounded-xl border-2 border-wa px-6 py-3 text-[15px] font-semibold text-wa"
                >
                  Chat about this course on WhatsApp
                </a>
                <p className="mt-4 text-sm leading-6 text-body">
                  Prefer the contact page?{" "}
                  <Link href="/contact-us" className="font-semibold text-ink">
                    Enquire via contact
                  </Link>
                </p>
              </div>

              {model.related.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-[28px] font-semibold leading-[34px] text-ink">
                    Related Trainings
                  </h2>
                  <ul className="mt-6 border-t border-line">
                    {model.related.map((r) => (
                      <li key={r.slug} className="border-b border-line">
                        <Link
                          href={`/trainings/${r.slug}`}
                          className="flex min-h-[44px] items-center justify-between gap-4 py-3"
                        >
                          <span className="text-lg font-semibold text-ink">{r.title}</span>
                          <span className="shrink-0 text-sm text-muted">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

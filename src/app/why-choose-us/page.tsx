import { staticPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { whyChooseParagraphs } from "@/data/pages";
import { CtaBand, PageHero, SectionTitle } from "@/components/ui";

export const metadata = staticPageMetadata({
  title: "Why Choose Us",
  description:
    "Why choose GradeSpot IT Solutions — practical training, instructors and career support from Dilsukhnagar, Hyderabad.",
  path: "/why-choose-us",
});

// Stage 8: "best … to our customers" superlative neutralised, the "9
// years" experience badge removed, the employer logo wall removed, and
// service summaries held (Stage 4 holds all services title-only).
// Vision and mission below are the organisation's own statements,
// reproduced verbatim as statements of intent.
const highlights = [
  { title: "IT & Corporate Trainings", href: "/services/corporate-trainings" },
  { title: "Web Development", href: "/services/web-development" },
  { title: "Abroad Consultancy", href: "/services/abroad-consultancy" },
];

export default function WhyChoosePage() {
  const [, vision, mission] = whyChooseParagraphs;
  return (
    <>
      <PageHero title="Why Choose Us" />
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-4xl">
            <SectionTitle title="IT Solutions & Trainings from GradeSpot IT Solutions" />
            <p className="mt-4">
              GradeSpot IT Solutions offers IT training and IT services from Dilsukhnagar,
              Hyderabad. This page states what the institute aims to do — in its own vision
              and mission words below — and where to read more.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-5xl divide-y divide-line border-y border-line">
            {highlights.map((h) => (
              <article key={h.title} className="flex flex-wrap items-baseline justify-between gap-3 py-5">
                <h2 className="text-xl font-semibold text-heading">{h.title}</h2>
                <Link
                  href={h.href}
                  className="text-sm font-semibold text-signal hover:underline"
                >
                  Read More →
                </Link>
              </article>
            ))}
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-line bg-surface-light p-8">
              <h2 className="text-2xl font-semibold">Vision</h2>
              <p className="mt-3">{vision}</p>
            </article>
            <article className="rounded-2xl border border-line bg-surface-light p-8">
              <h2 className="text-2xl font-semibold">Mission</h2>
              <p className="mt-3">{mission}</p>
            </article>
          </div>
          <div className="mx-auto mt-14 max-w-3xl text-center">
            <h2 className="font-display text-[20px] font-semibold text-heading">
              Questions about trainings or services?
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-body">
              The answers live in one place — our Help &amp; FAQs.
            </p>
            <Link href="/faq" className="mt-3.5 inline-block text-sm font-bold text-signal hover:text-signal-strong">
              Read Help &amp; FAQs →
            </Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

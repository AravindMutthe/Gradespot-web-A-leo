import type { Metadata } from "next";
import Link from "next/link";
import { whyChooseParagraphs } from "@/data/pages";
import { CtaBand, ExperienceBadge, FaqList, LogoWall, PageHero, SectionTitle, siteFaqs } from "@/components/ui";

export const metadata: Metadata = { title: "Why Choose Us" };

const highlights = [
  { title: "IT & Corporate Trainings", href: "/services/corporate-trainings" },
  { title: "Web Development", href: "/services/web-development" },
  { title: "Abroad Consultancy", href: "/services/abroad-consultancy" },
];

export default function WhyChoosePage() {
  // whyChooseParagraphs: [intro, vision, mission, students-work-with(shared,
  // filtered), ...] — the first three are the page's own copy as published.
  const [intro, vision, mission] = whyChooseParagraphs;
  return (
    <>
      <PageHero title="Why Choose Us" />
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-4xl">
            <SectionTitle title="We Offer The Best IT Solutions & Trainings To Our Customers at GradeSpot IT Solutions" />
            <p className="mt-4">{intro}</p>
            <div className="mt-6">
              <ExperienceBadge />
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {highlights.map((h) => (
              <article
                key={h.title}
                className="flex flex-col rounded-lg bg-white p-8 shadow-[0_5px_30px_rgba(214,215,216,0.57)]"
              >
                <h2 className="text-xl font-semibold text-heading">{h.title}</h2>
                <Link
                  href={h.href}
                  className="mt-auto inline-block pt-5 text-sm font-semibold text-brand hover:underline"
                >
                  Read More →
                </Link>
              </article>
            ))}
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            <article className="rounded-lg bg-surface-light p-8">
              <h2 className="text-2xl font-semibold">Vision</h2>
              <p className="mt-3">{vision}</p>
            </article>
            <article className="rounded-lg bg-surface-light p-8">
              <h2 className="text-2xl font-semibold">Mission</h2>
              <p className="mt-3">{mission}</p>
            </article>
          </div>
          <div className="mx-auto mt-14 max-w-3xl">
            <SectionTitle label="FAQ" title="Most common question about our services" />
            <div className="mt-6">
              <FaqList items={siteFaqs} />
            </div>
          </div>
        </div>
      </section>
      <LogoWall />
      <CtaBand />
    </>
  );
}

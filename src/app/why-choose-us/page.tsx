import type { Metadata } from "next";
import Link from "next/link";
import { whyChooseParagraphs } from "@/data/pages";
import { services } from "@/data/services";
import { CtaBand, ExperienceBadge, LogoWall, PageHero, SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  alternates: { canonical: "/why-choose-us" }, title: "Why Choose Us" };

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
            {highlights.map((h) => {
              const svc = services.find((s) => `/services/${s.slug}` === h.href);
              return (
              <article
                key={h.title}
                className="flex flex-col rounded-2xl border border-line bg-parchment p-8 shadow-sm transition duration-300 hover:shadow-[0_20px_40px_rgba(31,24,16,0.12)]"
              >
                <span className="block h-[3px] w-10 rounded-full bg-brand" aria-hidden />
                <h2 className="mt-4 text-xl font-semibold text-heading">{h.title}</h2>
                {svc?.summary && <p className="mt-2 text-sm leading-6 text-body">{svc.summary}</p>}
                <Link
                  href={h.href}
                  className="mt-auto inline-block pt-5 text-sm font-semibold text-signal hover:underline"
                >
                  Read More →
                </Link>
              </article>
              );
            })}
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
          <div className="mx-auto mt-14 max-w-3xl rounded-[18px] border border-line bg-parchment px-7 py-6 text-center shadow-[0_1px_2px_rgba(31,24,16,0.05)]">
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
      <LogoWall />
      <CtaBand />
    </>
  );
}

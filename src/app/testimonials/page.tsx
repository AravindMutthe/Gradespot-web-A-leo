import type { Metadata } from "next";
import { testimonials } from "@/data/testimonials";
import { CtaBand, LogoWall, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  alternates: { canonical: "/testimonials" }, title: "Testimonials" };

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        title="Testimonials"
        subtitle="“The Accomplishments of Our Students” — explore the voices of satisfaction and success as our clients share their experiences with us."
      />
      <section className="section-pad">
        <div className="wrap grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-line bg-parchment p-7 shadow-sm"
            >
              <span aria-hidden className="font-display text-[40px] font-semibold leading-[0.6] text-brand">
                &ldquo;
              </span>
              <blockquote className="mt-3 grow text-[15px] leading-7 text-heading">
                {t.text}
              </blockquote>
              <figcaption className="mt-4 border-t border-line pt-3.5">
                <span className="font-semibold text-heading">{t.name}</span>
                <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-body">{t.source}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <LogoWall />
      <CtaBand />
    </>
  );
}

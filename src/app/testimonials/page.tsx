import type { Metadata } from "next";
import { testimonials } from "@/data/testimonials";
import { CtaBand, LogoWall, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Testimonials" };

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
              className="flex flex-col bg-white p-7 shadow-[0_5px_30px_rgba(214,215,216,0.57)]"
            >
              <blockquote className="grow text-[15px] leading-7 text-heading">
                {t.text}
              </blockquote>
              <figcaption className="mt-4">
                <span className="font-semibold text-heading">{t.name}</span>
                <span className="block text-xs text-body">{t.source}</span>
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

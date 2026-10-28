import { staticPageMetadata } from "@/lib/metadata";
import { testimonials } from "@/data/testimonials";
import { CtaBand, PageHero } from "@/components/ui";

export const metadata = staticPageMetadata({
  title: "Testimonials",
  description:
    "Testimonials from students and clients of GradeSpot IT Solutions, Dilsukhnagar, Hyderabad, as published on the live site.",
  path: "/testimonials",
});

// Stage 8: the testimonials index keeps the published Google reviews
// verbatim (wording and names unedited, each labelled "Posted on
// Google") — this page IS the testimonials collection, so these are
// not fallback reviews. Removed: the employer logo wall (R10) and the
// card grid, replaced by compact text rows.
export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        title="Testimonials"
        subtitle="What our students and clients say about GradeSpot IT Solutions."
      />
      <section className="section-pad">
        <div className="wrap mx-auto max-w-4xl divide-y divide-line border-y border-line">
          {testimonials.map((t) => (
            <figure key={t.name} className="py-6">
              <blockquote className="text-[15px] leading-7 text-heading">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-3">
                <span className="font-semibold text-heading">{t.name}</span>
                <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-body">
                  {t.source}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

import { staticPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { PageHero, SectionTitle } from "@/components/ui";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { comparisons } from "@/data/comparisons";
import { courseDetails } from "@/data/course-details";
import { courses } from "@/data/courses";

export const metadata = staticPageMetadata({
  title: "Course Comparisons",
  description:
    "Side-by-side comparisons of GradeSpot trainings — topics, duration, certification and job roles — built only from each course's published data.",
  path: "/compare",
});

// Stage 8: card grid → compact rows; the "book a free demo class"
// sentence removed (no course has a confirmed demo offer).
export default function CompareIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Course Comparisons", path: "/compare" },
        ])}
      />
      <PageHero
        title="Course Comparisons"
        subtitle="Two similar courses, one clear decision. Every comparison below is built from the courses' own published topics, durations, certifications and job roles — no invented differences."
      />
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Course Comparisons" }]} />
          </div>
          <div className="mx-auto mt-10 max-w-5xl divide-y divide-line border-y border-line">
            {comparisons.map((c) => {
              const a = courses.find((x) => x.slug === c.a);
              const b = courses.find((x) => x.slug === c.b);
              return (
                <article key={c.slug} className="flex flex-wrap items-baseline justify-between gap-3 py-5">
                  <div>
                    <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-signal-strong">
                      {courseDetails[c.a]?.short} vs {courseDetails[c.b]?.short}
                    </p>
                    <h2 className="mt-2 text-lg font-bold leading-snug text-heading">{c.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-body">
                      {a?.title} compared with {b?.title} — focus, duration, certification and
                      roles.
                    </p>
                  </div>
                  <Link
                    href={`/compare/${c.slug}`}
                    className="text-sm font-bold text-action hover:text-action-dark"
                  >
                    Compare them →
                  </Link>
                </article>
              );
            })}
          </div>
          <div className="mx-auto mt-14 max-w-3xl text-center">
            <SectionTitle title="Not sure either fits?" center />
            <p className="mt-3">
              Send an enquiry and a trainer will map the right course to your goal.
            </p>
            <Link href="/trainings" className="btn-primary mt-6">
              Browse All Trainings
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

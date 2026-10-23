import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionTitle } from "@/components/ui";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { comparisons } from "@/data/comparisons";
import { courseDetails } from "@/data/course-details";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  alternates: { canonical: "/compare" },
  title: "Course Comparisons",
  description:
    "Side-by-side comparisons of GradeSpot trainings — topics, duration, certification and job roles — built only from each course's published data.",
};

// Comparison hub (research expansion pack, DECISIONS.md §18): the
// entry point for the "X vs Y" pages the AEO research calls for.
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
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
            {comparisons.map((c) => {
              const a = courses.find((x) => x.slug === c.a);
              const b = courses.find((x) => x.slug === c.b);
              return (
                <article
                  key={c.slug}
                  className="flex flex-col rounded-2xl border border-line bg-parchment px-7 py-8 shadow-sm transition duration-300 hover:shadow-[0_20px_40px_rgba(31,24,16,0.12)]"
                >
                  <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-brand-dark">
                    {courseDetails[c.a]?.short} vs {courseDetails[c.b]?.short}
                  </p>
                  <h2 className="mt-3 text-lg font-bold leading-snug text-heading">{c.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-body">
                    {a?.title} compared with {b?.title} — focus, duration, certification and
                    roles.
                  </p>
                  <Link
                    href={`/compare/${c.slug}`}
                    className="mt-auto inline-block pt-5 text-sm font-bold text-brand hover:text-brand-dark"
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
              Book a free demo class or a counselling call and a trainer will map the right
              course to your goal.
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

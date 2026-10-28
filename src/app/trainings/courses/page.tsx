import type { Metadata } from "next";
import Link from "next/link";
import { staticPageMetadata } from "@/lib/metadata";
import { PageHero, AnswerLead } from "@/components/ui";
import SearchBox from "@/components/SearchBox";
import { topicCategories } from "@/lib/two-door";

export const metadata: Metadata = staticPageMetadata({
  title: "Courses",
  description:
    "GradeSpot IT Solutions courses in Dilsukhnagar, Hyderabad, grouped by topic — Microsoft Azure, Cisco, CompTIA, Networking, Digital Marketing, Cybersecurity, AWS, Programming & Data, Medical Coding and Design & CAD. Details are confirmed on enquiry.",
  path: "/trainings/courses",
});

// Two-door categorization: the Courses directory lists the 10 topic
// categories with REAL counts computed from local catalogue data.
// Each category links to its dynamic category page; this page itself
// lists no courses, so it never grows long as the catalogue grows.

export default function CoursesDirectoryPage() {
  const categories = topicCategories();
  const total = categories.reduce((n, c) => n + c.count, 0);

  return (
    <>
      <PageHero
        title="Courses"
        subtitle="Individual subjects and single-subject paths from GradeSpot IT Solutions in Dilsukhnagar, Hyderabad. Pick a topic to browse its courses."
      />
      <div className="wrap pt-8">
        <AnswerLead id="answer-summary">
          Browse {total} courses from GradeSpot IT Solutions in Dilsukhnagar, Hyderabad,
          grouped by topic below. Course details, schedules and availability are confirmed on
          enquiry.
        </AnswerLead>
        <div className="mt-6">
          <SearchBox />
        </div>
      </div>
      <section className="section-pad">
        <div className="wrap">
          <p className="mb-4">
            <Link href="/trainings" className="font-semibold text-ink underline">
              ← All Training
            </Link>
          </p>
          <ul className="border-t border-line">
            {categories.map((cat) => (
              <li key={cat.slug} className="border-b border-line">
                <Link
                  href={`/trainings/category/${cat.slug}`}
                  className="row-hover flex min-h-[56px] items-center justify-between gap-4 py-3"
                >
                  <span className="text-lg font-semibold text-ink">{cat.name}</span>
                  <span className="shrink-0 text-sm text-muted">
                    {cat.count} {cat.count === 1 ? "course" : "courses"} →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl border border-line bg-surface p-6">
            <h2 className="text-xl font-semibold">Not sure which track fits your background?</h2>
            <p className="mt-2 max-w-2xl text-body">
              Compare courses side by side by their published coverage areas.
            </p>
            <Link
              href="/compare"
              className="mt-4 inline-block min-h-[44px] text-[15px] font-bold text-signal hover:text-signal-strong"
            >
              Compare courses →
            </Link>
          </div>

          <div className="mt-16 rounded-2xl border border-line bg-surface-light p-8 text-center">
            <h2 className="text-2xl font-semibold">Not sure which course fits you?</h2>
            <p className="mx-auto mt-2 max-w-xl">
              Talk to a Trainer — tell us your goal and we will help you pick the right training
              path.
            </p>
            <Link href="/contact-us" className="btn-primary mt-5">
              Talk to a Trainer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { getCourses } from "@/lib/data";
import { courseCategories } from "@/data/courses";
import CatalogueSearch from "@/components/CatalogueSearch";
import { PageHero, AnswerLead } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { trainingsIndexSchema } from "@/lib/schema";
import { trainingsIndexMetadata } from "@/lib/metadata";
import { buildTrainingRow, displayCourseTitle } from "@/lib/trainings-rows";
import { DemoLegend } from "@/components/DemoLegend";

export async function generateMetadata(): Promise<Metadata> {
  const courses = await getCourses();
  return trainingsIndexMetadata(courses);
}

// Frontend 3.0 — Stage 3 trainings index (Option A, compact rows).
// What this template contains, and nothing else:
// - the search and category discovery, the compact rows, and an
//   enquiry/help section with truthful wording only.
// The promotional sections of the old template are removed from this
// template outright, not hidden: no stats ribbon, no video showcase,
// no employer logo wall, no blog card grid, no scrolling board, no
// feature trio. The blog is represented by a single link below.
// Slugs, categories, category order and routes are unchanged.

export default async function TrainingsPage() {
  const courses = await getCourses();
  const rows = courses.map((c) =>
    buildTrainingRow({
      slug: c.slug,
      title: c.title,
      category: c.category,
      summary: c.summary,
      catalogOnly: c.catalogOnly,
      duration: c.duration,
    }),
  );
  const categories = courseCategories.filter((cat) => rows.some((r) => r.category === cat));

  return (
    <>
      <JsonLd
        data={trainingsIndexSchema(
          courses.map((c) => ({ ...c, title: displayCourseTitle(c.title) })),
        )}
      />
      <PageHero
        title="Training Courses"
        subtitle="Creating a better IT solutions — At GradeSpot, we empower future engineers with cutting-edge IT skills, practical training, and real-world projects. Our mission is to turn learners into tech leaders. Transform every Digital Process — intelligent automation, expert-driven solutions, and scalable technology."
      />
      <div className="wrap pt-8">
        <AnswerLead id="answer-summary">
          Browse {courses.length} training courses from GradeSpot IT Solutions in Dilsukhnagar,
          Hyderabad, grouped by category below. Course details, schedules and availability are
          confirmed on enquiry.
        </AnswerLead>
        {/* Demo-fill: the catalogue now carries sample summaries for
            demo-filled courses, so the legend renders here. */}
        <div className="mt-6">
          <DemoLegend />
        </div>
      </div>
      <section className="section-pad">
        <div className="wrap">
          <CatalogueSearch rows={rows} categories={categories} />
          <div className="mt-16 rounded-2xl border border-line bg-surface-light p-8 text-center">
            <h2 className="text-2xl font-semibold">Not sure which course fits you?</h2>
            <p className="mx-auto mt-2 max-w-xl">
              Talk to a Trainer — tell us your goal and we will help you pick the right training
              path.
            </p>
            <Link href="/contact-us" className="btn-primary mt-5">
              Talk to a Trainer
            </Link>
            <p className="mt-6 text-[15px] text-body">
              More reading:{" "}
              <Link href="/blog" className="font-semibold text-ink underline">
                Visit our blog
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

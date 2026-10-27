import type { Metadata } from "next";
import Link from "next/link";
import { getCourses } from "@/lib/data";
import { courseCategories } from "@/data/courses";
import CatalogueSearch from "@/components/CatalogueSearch";
import Ticker from "@/components/Ticker";
import { BlogCards, FeatureTrio, LogoWall, PageHero, SectionTitle, StatsRibbon, AnswerLead } from "@/components/ui";
import { showcaseIcon } from "@/components/Artwork";
import JsonLd from "@/components/JsonLd";
import { trainingsIndexSchema } from "@/lib/schema";
import { trainingsIndexMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const courses = await getCourses();
  return trainingsIndexMetadata(courses);
}

// R2+R3: showcase cards are DESIGN-LED (no photo). The old
// showcase reused course/blog photos that also appear as course
// cards (microsoft-sentinel, aws-solutions-architect-associate,
// hardware-networking, Information_warfare) — the repeat the
// owner flagged. Titles and order are unchanged; only the
// photo is removed, replaced by a logo-palette design surface.
const showcaseItems = [
  { t: "IT Consultancy" },
  { t: "Cyber Security" },
  { t: "Cloud Computing" },
  { t: "Backup & Recovery" },
];

export default async function TrainingsPage() {
  const courses = await getCourses();
  const byCategory = new Map<string, typeof courses>();
  for (const c of courses) {
    const list = byCategory.get(c.category) ?? [];
    list.push(c);
    byCategory.set(c.category, list);
  }
  const categories = courseCategories.filter((cat) => byCategory.has(cat));

  return (
    <>
      <JsonLd data={trainingsIndexSchema(courses)} />
      <PageHero
        title="Trainings"
        subtitle="Creating a better IT solutions — At GradeSpot, we empower future engineers with cutting-edge IT skills, practical training, and real-world projects. Our mission is to turn learners into tech leaders. Transform every Digital Process — intelligent automation, expert-driven solutions, and scalable technology."
      />
      <Ticker />
      {/* AEO answer-first summary (§25.22): counts/categories are live data. */}
      <div className="wrap pt-8">
        <AnswerLead id="answer-summary">
          GradeSpot&apos;s Dilsukhnagar, Hyderabad institute offers {courses.length} IT trainings
          with online and offline classes, covering cybersecurity, cloud, networking,
          programming, data and digital marketing. Courses prepare learners for industry
          certifications and job roles. Learners can start with a free demo class; batch
          schedules are confirmed on enquiry.
        </AnswerLead>
      </div>
      {/* §22: the catalogue + search used to sit BELOW a stats ribbon
          and a text-only showcase — students now meet the courses and
          the search box immediately after the hero. */}
      <section className="section-pad">
        <div className="wrap">
          <CatalogueSearch
            courses={courses.map((c) => ({
              slug: c.slug,
              title: c.title,
              category: c.category,
              summary: c.summary,
              image: c.image,
              duration: c.duration,
              catalogOnly: c.catalogOnly,
            }))}
            categories={categories}
          />
          <div className="mt-16 rounded-2xl border border-line bg-surface-light p-8 text-center">
            <h2 className="text-2xl font-semibold">Not sure which course fits you?</h2>
            <p className="mx-auto mt-2 max-w-xl">
              Talk to a Trainer — tell us your goal and we will help you pick the right training
              path.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact-us" className="btn-primary">
                Talk to a Trainer
              </Link>
              <Link href="#course-search" className="text-sm font-bold text-signal hover:underline">
                Explore Programs ↑
              </Link>
            </div>
          </div>
        </div>
      </section>
      <StatsRibbon />
      <section className="section-pad">
        <div className="wrap">
          <SectionTitle label="Showcase" title="Video Showcase" center />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {showcaseItems.map((x, i) => (
              <article
                key={x.t}
                data-reveal
                className="group overflow-hidden modern-card text-center"
              >
                <div className="flex aspect-video w-full flex-col items-start justify-end gap-3 p-5 text-left design-led-card">
                  <span aria-hidden className="text-4xl">
                    {showcaseIcon(x.t)}
                  </span>
                  <span className="modern-chip bg-white/15 text-paper">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="px-6 py-5 font-sans text-xl font-bold tracking-tight text-heading">{x.t}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
      <FeatureTrio />
      <section className="section-pad">
        <div className="wrap">
          <SectionTitle label="Blog" title="Visit our Blog" center />
          <div className="mt-10">
            <BlogCards />
          </div>
        </div>
      </section>
      <LogoWall />
    </>
  );
}

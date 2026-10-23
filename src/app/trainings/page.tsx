import type { Metadata } from "next";
import Link from "next/link";
import { getCourses } from "@/lib/data";
import { courseCategories } from "@/data/courses";
import { BlogCards, CourseCard, FeatureTrio, LogoWall, PageHero, SectionTitle, StatsRibbon } from "@/components/ui";

export const metadata: Metadata = { title: "Trainings" };

const showcaseItems = ["IT Consultancy", "Cyber Security", "Cloud Computing", "Backup & Recovery"];

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
      <PageHero
        title="Trainings"
        subtitle="Creating a better IT solutions — At GradeSpot, we empower future engineers with cutting-edge IT skills, practical training, and real-world projects. Our mission is to turn learners into tech leaders. Transform every Digital Process — intelligent automation, expert-driven solutions, and scalable technology."
      />
      <StatsRibbon />
      <section className="section-pad">
        <div className="wrap">
          <SectionTitle label="Video Showcase" title="Video Showcase" center />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {showcaseItems.map((t) => (
              <article
                key={t}
                className="bg-white px-[30px] py-[40px] text-center shadow-[0_5px_30px_rgba(214,215,216,0.57)]"
              >
                <h3 className="text-xl font-bold text-heading">{t}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="wrap space-y-16">
          {categories.map((cat) => (
            <div key={cat}>
              <h2 className="text-2xl font-semibold text-heading">{cat}</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {(byCategory.get(cat) ?? []).map((c) => (
                  <CourseCard key={c.slug} course={c} />
                ))}
              </div>
            </div>
          ))}
          <div className="rounded-lg bg-surface-light p-8 text-center">
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

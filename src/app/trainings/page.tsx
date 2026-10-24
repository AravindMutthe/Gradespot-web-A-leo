import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCourses } from "@/lib/data";
import { courseCategories } from "@/data/courses";
import CatalogueSearch from "@/components/CatalogueSearch";
import Ticker from "@/components/Ticker";
import { BlogCards, FeatureTrio, LogoWall, PageHero, SectionTitle, StatsRibbon } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { trainingsIndexSchema } from "@/lib/schema";
import { trainingsIndexMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const courses = await getCourses();
  return trainingsIndexMetadata(courses);
}

const showcaseItems = [
  { t: "IT Consultancy", img: "/images/courses/microsoft-sentinel.jpg" },
  { t: "Cyber Security", img: "/images/blog/Information_warfare.jpg" },
  { t: "Cloud Computing", img: "/images/courses/aws-solutions-architect-associate.jpg" },
  { t: "Backup & Recovery", img: "/images/courses/hardware-networking.jpg" },
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
            }))}
            categories={categories}
          />
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
      <StatsRibbon />
      <section className="section-pad">
        <div className="wrap">
          <SectionTitle label="Showcase" title="Video Showcase" center />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {showcaseItems.map((x, i) => (
              <article
                key={x.t}
                data-reveal
                className="group overflow-hidden rounded-2xl border border-line bg-parchment text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(31,24,16,0.12)]"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={x.img}
                    alt={x.t}
                    width={600}
                    height={340}
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                    className="h-32 w-full object-cover sepia-[0.12] transition duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="eyebrow absolute left-3 top-3 rounded-md bg-ink/85 px-2.5 py-1.5 text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="px-6 py-6 text-xl font-bold text-heading">{x.t}</h3>
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

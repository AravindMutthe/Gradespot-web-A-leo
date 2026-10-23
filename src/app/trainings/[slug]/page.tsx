import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses as localCourses, type CourseSection } from "@/data/courses";
import { getCourse } from "@/lib/data";
import { BlogCards, FeatureTrio, LogoWall, StatsRibbon } from "@/components/ui";

function SectionBody({ section }: { section: CourseSection }) {
  if (section.style === "cards") {
    return (
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {section.paragraphs.map((p, j) => (
          <div
            key={j}
            className="rounded bg-surface-light px-4 py-3 text-center text-[15px] font-semibold text-heading"
          >
            {p}
          </div>
        ))}
      </div>
    );
  }
  if (section.style === "pricing") {
    return (
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {section.paragraphs.map((p, j) => {
          const [name, price] = p.split(" — ");
          return (
            <div
              key={j}
              className="rounded-lg bg-white px-6 py-8 text-center shadow-[0_5px_30px_rgba(214,215,216,0.57)]"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-body">{name}</p>
              <p className="mt-2 text-3xl font-extrabold text-heading">{price ?? p}</p>
            </div>
          );
        })}
      </div>
    );
  }
  if (section.style === "faq") {
    return (
      <div className="mt-3 space-y-4">
        {section.paragraphs.map((p, j) =>
          j % 2 === 0 ? (
            <h3 key={j} className="pt-2 text-lg font-semibold text-heading">
              {p}
            </h3>
          ) : (
            <p key={j}>{p}</p>
          ),
        )}
      </div>
    );
  }
  return (
    <div className="mt-3 space-y-4">
      {section.paragraphs.map((p, j) => (
        <p key={j}>{p}</p>
      ))}
    </div>
  );
}

export function generateStaticParams() {
  return localCourses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) return { title: "Course not found" };
  return {
    title: course.title,
    description: course.summary || `${course.title} — training at GradeSpot IT Solutions, Hyderabad.`,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) notFound();

  return (
    <>
      <section className="bg-heading py-14 text-white md:py-20">
        <div className="wrap">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            {course.category}
          </p>
          <h1 className="mt-2 max-w-4xl text-4xl font-semibold md:text-5xl md:leading-tight">
            {course.title}
          </h1>
          {course.summary && (
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/85">{course.summary}</p>
          )}
          <div className="mt-7 flex flex-wrap gap-4">
            <Link href="/contact-us" className="btn-primary">
              Enquire About This Course
            </Link>
            <Link href="/trainings" className="btn-outline-light">
              All Trainings
            </Link>
          </div>
        </div>
      </section>

      {course.image && (
        <div className="wrap mt-10">
          <Image
            src={course.image}
            alt={course.title}
            width={1140}
            height={480}
            className="h-72 w-full rounded-lg object-cover md:h-96"
          />
        </div>
      )}

      <section className="section-pad">
        <div className="wrap">
          {course.catalogOnly ? (
            <div className="mx-auto max-w-3xl">
              <h2 className="text-[32px] font-semibold leading-[38px]">About This Course</h2>
              <p className="mt-4">
                {course.title} is part of the GradeSpot IT Solutions training catalogue, offered
                at our Dilsukhnagar, Hyderabad institute with online and offline classes. Our
                organization offers an array of professional training programs for both
                corporates and students — ranging across computer hardware, networking,
                cybersecurity, cloud computing, digital marketing, data science and more — with
                comprehensive, up-to-date expertise in each technology.
              </p>
              <p className="mt-4">
                For the current batch schedule, curriculum and enrolment details for this
                course, talk to a trainer and we will walk you through the complete program.
              </p>
              <Link href="/contact-us" className="btn-primary mt-6">
                Talk to a Trainer
              </Link>
            </div>
          ) : (
            <div className="mx-auto max-w-4xl space-y-12">
              {course.sections.map((s, i) => (
                <div key={i}>
                  <article>
                    {s.heading && (
                      <h2 className="text-[28px] font-semibold leading-[34px]">{s.heading}</h2>
                    )}
                    <SectionBody section={s} />
                  </article>
                  {s.heading === "Visit our Blog" && (
                    <div className="mt-6">
                      <BlogCards />
                    </div>
                  )}
                </div>
              ))}
              <div className="rounded-lg bg-surface-light p-8 text-center">
                <h2 className="text-2xl font-semibold">Ready to enrol?</h2>
                <p className="mx-auto mt-2 max-w-xl">
                  Send an enquiry and our team will help you with batches, mode of training and
                  certification guidance for {course.title}.
                </p>
                <Link href="/contact-us" className="btn-primary mt-5">
                  Enquire Now
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {!course.catalogOnly && (
        <>
          <LogoWall />
          <StatsRibbon />
          <FeatureTrio />
        </>
      )}
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionTitle, LogoWall, CtaBand } from "@/components/ui";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { courses } from "@/data/courses";
import { courseDetails } from "@/data/course-details";
import { getJobRoles } from "@/lib/course-faqs";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";

export const metadata: Metadata = {
  alternates: { canonical: "/career-support" },
  title: "Career Support",
  description:
    "The job roles GradeSpot trainings prepare you for, the companies our students work with, and the career services we actually offer — roles and facts, no placement guarantees.",
};

// Career support page (research expansion pack, DECISIONS.md §18).
// The Oct-6 build's /placements page carried a "Career Support Till
// You Get Hired" guarantee framing — explicitly NOT harvested (task
// hard limit + inventory NOT-recommended list). This page is built
// from what is real and published: the job-role sections on 9 course
// pages, the employer logo wall as the live site publishes it, and the
// career-oriented services among the real 12. No placement
// percentages, no salary figures, no guarantees.

const careerServiceSlugs = [
  "internships",
  "corporate-trainings",
  "domestic-consultancy",
  "us-it-staffing",
  "abroad-consultancy",
];

const roleCourses = courses
  .filter((c) => !c.catalogOnly)
  .map((c) => ({ course: c, roles: getJobRoles(c) }))
  .filter((x) => x.roles.length > 0);

const careerServices = careerServiceSlugs
  .map((slug) => services.find((s) => s.slug === slug))
  .filter((s): s is NonNullable<typeof s> => Boolean(s));

export default function CareerSupportPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Career Support", path: "/career-support" },
        ])}
      />
      <PageHero
        title="Career Support — Roles, Proof, No Promises"
        subtitle="Every GradeSpot training is published with the job roles it prepares you for. This page gathers them, the companies our students work with, and the career services we actually run."
      />
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Career Support" }]} />
            <div className="mt-8 rounded-2xl border border-line bg-surface-light p-7">
              <h2 className="text-lg font-bold text-heading">Our honest position</h2>
              <p className="mt-2 text-[15px] leading-7 text-body">
                We publish the roles our courses prepare you for and the companies our students
                work with — and we back your preparation with hands-on labs, certification
                guidance and career-oriented services. We do not publish placement percentages
                and we do not guarantee a job. Any institute that promises you one should be
                asked for its proof.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <SectionTitle label="Job Roles" title="Roles each training prepares you for" center />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {roleCourses.map(({ course, roles }) => (
                <article
                  key={course.slug}
                  className="flex flex-col rounded-2xl border border-line bg-parchment px-7 py-8 shadow-sm"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-dark">
                    {course.category}
                  </p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-heading">
                    {courseDetails[course.slug]?.short ?? course.title}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {roles.slice(0, 8).map((r) => (
                      <span
                        key={r}
                        className="rounded-full bg-surface-light px-3 py-1.5 text-[13px] font-medium text-heading"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/trainings/${course.slug}`}
                    className="mt-auto inline-block pt-5 text-sm font-bold text-brand hover:text-brand-dark"
                  >
                    View the course →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LogoWall />

      <section className="section-pad">
        <div className="wrap">
          <SectionTitle label="Services" title="Career services we actually offer" center />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {careerServices.map((s) => (
              <article
                key={s.slug}
                className="flex flex-col rounded-2xl border border-line border-l-4 border-l-brand bg-parchment px-8 py-9 shadow-sm"
              >
                <h3 className="text-xl font-bold text-heading">{s.title}</h3>
                {s.summary && <p className="mt-2 text-sm leading-6 text-body">{s.summary}</p>}
                {s.offerings && (
                  <ul className="mt-4 space-y-2">
                    {s.offerings.map((o) => (
                      <li key={o} className="flex gap-2.5 text-sm leading-6 text-body">
                        <span className="mt-0.5 font-bold text-brand">✓</span>
                        {o}
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href={`/services/${s.slug}`}
                  className="mt-auto inline-block pt-5 text-sm font-bold text-brand hover:text-brand-dark"
                >
                  About {s.title} →
                </Link>
              </article>
            ))}
            <article className="flex flex-col rounded-[18px] panel-ink px-8 py-9">
              <h3 className="font-display text-xl font-semibold text-paper">Verify a certificate</h3>
              <p className="mt-2 text-sm leading-6 text-paper/80">
                Employers can verify a GradeSpot certificate by its code — and students can see
                the certifications our alumni have achieved.
              </p>
              <div className="mt-auto flex flex-col gap-2 pt-5">
                <Link href="/certificate-verification" className="text-sm font-bold text-brand-bright hover:text-paper">
                  Certificate Verification →
                </Link>
                <Link href="/student-certifications" className="text-sm font-bold text-brand-bright hover:text-paper">
                  Student Certifications →
                </Link>
              </div>
            </article>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <SectionTitle label="Learner Voices" title="In their own words" center />
            <div className="mt-8 space-y-4">
              {testimonials.slice(0, 3).map((t) => (
                <blockquote
                  key={t.name}
                  className="rounded-2xl border border-line bg-parchment px-7 py-6 shadow-sm"
                >
                  <p className="text-[15px] leading-7 text-heading">“{t.text}”</p>
                  <footer className="mt-3 text-sm font-semibold text-body">
                    {t.name} · <span className="font-normal">{t.source}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

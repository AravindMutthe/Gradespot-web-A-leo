import { staticPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { PageHero, SectionTitle, CtaBand, AnswerLead } from "@/components/ui";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { courses } from "@/data/courses";
import { courseDetails } from "@/data/course-details";
import { getJobRoles } from "@/lib/course-faqs";
import { buildCourseDetail } from "@/lib/course-detail";
import { displayCourseTitle } from "@/lib/trainings-rows";
import { services } from "@/data/services";

export const metadata = staticPageMetadata({
  title: "Career Support",
  description:
    "The job roles GradeSpot trainings prepare you for, and the career services we actually offer — roles and facts, no placement guarantees.",
  path: "/career-support",
});

// Career support page — Stage 8 re-template. Held from the old body:
// the employer logo wall (R10 — wall OFF), the "companies our students
// work with" claim, the generic testimonial slice (unmatched reviews
// attached to this page), service summaries/offerings (Stage 4 holds
// all 12 services title-only: summaries are unconfirmed live-scrape
// filler), and the "hands-on labs" assertion. Job roles are shown ONLY
// for verified courses (Stage 5 detail model): held courses (CCNA R1,
// CCNP R2, Digital Marketing R4, all catalogue-only) contribute no
// roles here. No placement percentages, no salary figures, no
// guarantees anywhere on this page.
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
  .filter((x) => x.roles.length > 0)
  // Held courses contribute NO roles here — the original sections
  // of a held full course (e.g. CCNA's contested curriculum) must
  // not leak in as roles. This page stays verified-only by design.
  .filter((x) => !buildCourseDetail(x.course, courseDetails[x.course.slug], undefined).heldBack);

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
        title="Career Support — Roles, No Promises"
        subtitle="Every verified GradeSpot training is published with the job roles it prepares you for. This page gathers them, and the career services we actually run."
      />
      <div className="wrap pt-8">
        <AnswerLead id="answer-summary">
          GradeSpot&apos;s career support gathers the job roles each verified training prepares
          learners for, and the career services it actually runs, including internships and
          consultancy. It publishes no placement percentages and guarantees no job — preparation
          and certification guidance are what it offers.
        </AnswerLead>
      </div>
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Career Support" }]} />
            <div className="mt-8 rounded-2xl border border-line bg-surface-light p-7">
              <h2 className="text-lg font-bold text-heading">Our honest position</h2>
              <p className="mt-2 text-[15px] leading-7 text-body">
                We publish the roles our verified courses prepare you for — and we back your
                preparation with certification guidance and career-oriented services. We do not
                publish placement percentages and we do not guarantee a job. Any institute that
                promises you one should be asked for its proof.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <SectionTitle label="Job Roles" title="Roles each verified training prepares you for" center />
            <div className="mx-auto mt-10 max-w-4xl divide-y divide-line border-y border-line">
              {roleCourses.map(({ course, roles }) => (
                <article key={course.slug} className="py-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-signal-strong">
                    {course.category}
                  </p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-heading">
                    {displayCourseTitle(course.title)}
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
                    className="mt-4 inline-block text-sm font-bold text-action hover:text-action-dark"
                  >
                    View the course →
                  </Link>
                </article>
              ))}
            </div>
            <p className="mx-auto mt-6 max-w-4xl text-sm leading-6 text-body">
              Courses whose details are still to be confirmed contribute no roles here yet —
              see the training catalogue for their status.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap">
          <SectionTitle label="Services" title="Career services we actually offer" center />
          <div className="mx-auto mt-10 max-w-4xl divide-y divide-line border-y border-line">
            {careerServices.map((s) => (
              <article key={s.slug} className="flex flex-wrap items-baseline justify-between gap-3 py-5">
                <div>
                  <h3 className="text-xl font-bold text-heading">{s.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-body">Service details to be confirmed</p>
                </div>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-sm font-bold text-action hover:text-action-dark"
                >
                  About {s.title} →
                </Link>
              </article>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-line bg-surface-light p-7">
            <h3 className="text-xl font-semibold text-heading">Verify a certificate</h3>
            <p className="mt-2 text-sm leading-6 text-body">
              Employers can verify a GradeSpot certificate by its code — and students can see
              the certifications our alumni have achieved.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/certificate-verification" className="text-sm font-bold text-action hover:text-action-dark">
                Certificate Verification →
              </Link>
              <Link href="/student-certifications" className="text-sm font-bold text-action hover:text-action-dark">
                Student Certifications →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

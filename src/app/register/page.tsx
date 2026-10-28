import { staticPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { PageHero, SectionTitle } from "@/components/ui";
import RegisterForm from "@/components/RegisterForm";
import { courses } from "@/data/courses";
import { business, telHref } from "@/data/site";

// Registration (DECISIONS.md §20) — Aravind's decision, 2026-10-23:
// "put Registration on the site." Implemented as course/demo LEAD
// registration on the existing /api/leads pipeline — NOT password user
// accounts, which stay deferred to the LMS/admin phase
// (gradespot-axon). A course can be pre-selected with ?course=<slug>
// (the course-page Register buttons use it).
export const metadata = staticPageMetadata({
  title: "Register",
  description: "Register your interest in a GradeSpot IT Solutions course in Dilsukhnagar, Hyderabad — online and offline trainings. The team calls to discuss batch, mode and next steps.",
  path: "/register",
});

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const { course: courseSlug } = await searchParams;
  const initial = courses.find((c) => c.slug === courseSlug);
  const phone = business.phones[0];

  return (
    <>
      <PageHero
        title="Register"
        subtitle="Register your interest in a course. Send the form and our team will call to discuss batch, mode and next steps. No payment is taken on this page."
      />
      <section className="section-pad">
        <div className="wrap grid items-start gap-12 lg:grid-cols-[1fr_460px]">
          <div data-reveal>
            <SectionTitle label="How It Works" title="Three steps to starting" />
            <ol className="mt-8 space-y-6">
              {[
                {
                  t: "Send the registration",
                  d: "Pick your course and tell us what you want. Phone is the only detail we truly need.",
                },
                {
                  t: "We call to discuss",
                  d: "The team calls to discuss batch timings, online or offline mode, and your questions about the syllabus and certification path.",
                },
                {
                  t: "Start learning",
                  d: "Join at the Dilsukhnagar institute or online, once batch, mode and next steps are agreed on the call.",
                },
              ].map((s, i) => (
                <li key={s.t} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy font-display text-lg font-semibold text-brand-bright">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-[19px] font-semibold text-heading">{s.t}</h3>
                    <p className="mt-1 max-w-xl text-[15px] leading-7 text-body">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-9 max-w-xl text-[15px] leading-7 text-body">
              Rather talk first? Call{" "}
              <a href={telHref(phone)} className="font-semibold text-signal hover:text-signal-strong">
                {phone}
              </a>{" "}
              or browse the{" "}
              <Link href="/trainings" className="font-semibold text-signal hover:text-signal-strong">
                full training catalogue
              </Link>{" "}
              before you decide.
            </p>
          </div>
          <div data-reveal>
            <RegisterForm
              courses={courses.map((c) => c.title)}
              initialCourse={initial?.title}
            />
          </div>
        </div>
      </section>
    </>
  );
}

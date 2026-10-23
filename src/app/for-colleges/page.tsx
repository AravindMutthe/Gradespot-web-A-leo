import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionTitle, FaqList } from "@/components/ui";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { services } from "@/data/services";

export const metadata: Metadata = {
  alternates: { canonical: "/for-colleges" },
  title: "For Colleges",
  description:
    "College workshops, industrial trainings and internships from GradeSpot IT Solutions — hands-on technical programs conducted for colleges and their students in Hyderabad.",
};

// For Colleges (research expansion pack, DECISIONS.md §18) — the
// third audience track. The nav research (folder 3, Part A2) puts the
// third audience on its own tab rather than a separate site, and the
// business-model research (Algoritma/Supertype) names university
// partnerships as the bridge product between training and services.
// The page mirrors the /for-institutes anatomy and stands ONLY on the
// three real published services: College Workshops, Industrial
// Trainings and Internships (summaries + offerings from
// src/data/services.ts). No college names, counts or outcomes are
// claimed — none exist in the record.

const pains = [
  {
    t: "Theory-heavy semesters",
    d: "Students learn concepts in class but rarely touch the tools and labs the industry actually uses. A hands-on workshop closes that gap in days, not semesters.",
  },
  {
    t: "Industry exposure is hard to arrange",
    d: "Industrial visits and practical training need a partner who already runs live infrastructure and trainers — not another theory vendor.",
  },
  {
    t: "Internships need structure",
    d: "Students need mentored internships with real industry exposure, and colleges need a training partner who can run them end to end.",
  },
];

const collegeServices = ["college-workshops", "industrial-trainings", "internships"]
  .map((slug) => services.find((s) => s.slug === slug))
  .filter((s): s is NonNullable<typeof s> => Boolean(s));

const steps = [
  { n: "1", t: "Enquire", d: "Tell us your branch, batch size and the outcome you want." },
  { n: "2", t: "Plan", d: "We map a workshop, industrial training or internship plan to your academic calendar." },
  { n: "3", t: "Deliver", d: "Hands-on sessions conducted at your college, led by our trainers and instructors." },
  { n: "4", t: "Extend", d: "Students can continue into full trainings, internships and certification paths at GradeSpot." },
];

const collegeFaqs = [
  {
    q: "Where are the workshops conducted?",
    a: "At colleges — College Workshops are technical workshops conducted for college students, with hands-on sessions at the college itself.",
  },
  {
    q: "What does an Industrial Training cover?",
    a: "Practical training programs aligned to industry needs, with a practical industry-aligned curriculum and expert instructors — for students and working professionals.",
  },
  {
    q: "What do students get from the Internships?",
    a: "Internship programs offering exceptional learning opportunities and industry exposure, with hands-on industry exposure and mentorship.",
  },
  {
    q: "Which topics can a workshop cover?",
    a: "GradeSpot's training catalogue spans cybersecurity, networking, cloud computing, computer hardware, digital marketing and data programs — workshops are drawn from the same hands-on curriculum.",
  },
];

export default function ForCollegesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "For Colleges", path: "/for-colleges" },
        ])}
      />
      <JsonLd data={faqSchema(collegeFaqs)} />
      <PageHero
        title="Workshops, Industrial Trainings & Internships for Your Students"
        subtitle="GradeSpot IT Solutions partners with colleges to give students hands-on technical skills and real industry exposure — conducted at your campus."
      />
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "For Colleges" }]} />
          </div>

          <div className="mt-12">
            <SectionTitle
              label="For Colleges"
              title="The gaps every placement cell talks about"
              center
            />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {pains.map((p) => (
                <article
                  key={p.t}
                  className="rounded-2xl border border-line bg-parchment px-8 py-10 shadow-sm"
                >
                  <span className="block h-1 w-10 rounded-full bg-brand" aria-hidden />
                  <h3 className="mt-4 text-xl font-bold text-heading">{p.t}</h3>
                  <p className="mt-2 text-sm leading-6 text-body">{p.d}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <SectionTitle label="Programs" title="Three programs for colleges" center />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {collegeServices.map((s) => (
                <article
                  key={s.slug}
                  className="flex flex-col rounded-2xl border border-line bg-parchment px-8 py-10 shadow-sm transition duration-300 hover:shadow-[0_20px_40px_rgba(31,24,16,0.12)]"
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
                  <a
                    href="#enquire"
                    className="mt-auto inline-block pt-5 text-sm font-bold text-brand hover:text-brand-dark"
                  >
                    Enquire for your college →
                  </a>
                  <Link
                    href={`/services/${s.slug}`}
                    className="mt-1 inline-block text-sm font-semibold text-body hover:text-brand"
                  >
                    About {s.title}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-light section-pad">
        <div className="wrap">
          <SectionTitle title="How a college engagement runs" center />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <article
                key={s.n}
                className="rounded-2xl border border-line bg-parchment px-6 py-8 text-center shadow-sm"
              >
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-navy font-display text-lg font-extrabold text-brand-bright">
                  {s.n}
                </span>
                <h3 className="mt-4 text-lg font-bold text-heading">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-6 text-body">{s.d}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-[15px] leading-7 text-body">
            Businesses looking for automation products for their own institute will find them on{" "}
            <Link href="/for-institutes" className="font-semibold text-brand hover:underline">
              For Institutes
            </Link>
            ; companies training their teams can start with{" "}
            <Link href="/services/corporate-trainings" className="font-semibold text-brand hover:underline">
              Corporate Trainings
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="enquire" className="scroll-mt-32 section-pad">
        <div className="wrap grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle label="Partner With Us" title="Plan a program for your college" />
            <p className="mt-4 max-w-xl">
              Tell us what your students need. We will map a workshop, industrial training or
              internship plan to your calendar — every enquiry is stored with its source, and
              our team responds directly.
            </p>
            <div className="mt-8">
              <LeadForm
                idPrefix="college"
                hideMessage
                submitLabel="Request a Callback"
                interestOptions={[
                  "College Workshop",
                  "Industrial Training",
                  "Internships for Our Students",
                  "Other College Enquiry",
                ]}
              />
            </div>
          </div>
          <div>
            <SectionTitle label="Questions" title="College FAQ" />
            <div className="mt-6">
              <FaqList items={collegeFaqs} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

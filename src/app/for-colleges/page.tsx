import { staticPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { PageHero, SectionTitle, AnswerLead } from "@/components/ui";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { services } from "@/data/services";

export const metadata = staticPageMetadata({
  title: "For Colleges",
  description: "College workshops, industrial trainings and internships from GradeSpot IT Solutions — technical programs conducted for colleges and their students in Hyderabad.",
  path: "/for-colleges",
});

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
  { n: "3", t: "Deliver", d: "Sessions conducted at your college, led by our trainers and instructors." },
  { n: "4", t: "Extend", d: "Students can continue into full trainings, internships and certification paths at GradeSpot." },
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
      <PageHero
        title="Workshops, Industrial Trainings & Internships for Your Students"
        subtitle="GradeSpot IT Solutions partners with colleges to give students hands-on technical skills and real industry exposure — conducted at your campus."
      />
      <div className="wrap pt-8">
        <AnswerLead id="answer-summary">
          GradeSpot partners with colleges to run workshops, industrial trainings and internships
          that give students technical skills and real industry exposure, conducted at
          the college campus, with programs planned through the enquiry form and confirmed with
          the college team directly.
        </AnswerLead>
      </div>
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "For Colleges" }]} />
          </div>

          {/* First-screen actions (§22) */}
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <a href="#enquire" className="btn-primary">
              Plan a Program for Your College
            </a>
            <Link href="/for-institutes" className="btn-outline-navy">
              For Institutes
            </Link>
            <Link href="/partner-with-us" className="btn-outline-navy">
              Partner With Us
            </Link>
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
            <div className="mx-auto mt-10 max-w-4xl divide-y divide-line border-y border-line">
              {collegeServices.map((s) => (
                <article key={s.slug} className="flex flex-wrap items-baseline justify-between gap-3 py-5">
                  <div>
                    <h3 className="text-xl font-bold text-heading">{s.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-body">Service details to be confirmed</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <a
                      href="#enquire"
                      className="text-sm font-bold text-action hover:text-action-dark"
                    >
                      Enquire for your college →
                    </a>
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-sm font-semibold text-body hover:text-action-dark"
                    >
                      About {s.title}
                    </Link>
                  </div>
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
            <Link href="/for-institutes" className="font-semibold text-action hover:underline">
              For Institutes
            </Link>
            ; companies training their teams can start with{" "}
            <Link href="/services/corporate-trainings" className="font-semibold text-action hover:underline">
              Corporate Trainings
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Partner band (§22): the third client door, cross-linked
          from the college track as it is from the institute track. */}
      <section className="section-pad pt-0">
        <div className="wrap">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[24px] border border-line bg-surface-light p-8 md:p-10">
            <div className="max-w-2xl">
              <p className="eyebrow text-signal-strong">Partner With Us</p>
              <h2 className="mt-3 font-display text-[28px] font-semibold leading-tight text-heading">
                Thinking beyond one program?
              </h2>
              <p className="mt-2 text-[15px] leading-7 text-body">
                Collaborations and franchise discussions are welcome — with colleges,
                institutes, trainers and people thinking about a centre of their own.
              </p>
            </div>
            <Link href="/partner-with-us" className="btn-primary">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      <section id="enquire" className="scroll-mt-32 section-pad">
        <div className="wrap grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle label="Partner With Us" title="Plan a program for your college" />
            <p className="mt-4 max-w-xl">
              Tell us what your students need. We will map a workshop, industrial training or
              internship plan to your calendar, and our team responds directly.
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
            <SectionTitle label="Questions" title="What happens next" />
            <p className="mt-4 max-w-xl">
              Send the form and the team will call you back to discuss the program, the
              calendar and the scope. Schedules, fees and availability are confirmed on
              enquiry — nothing here promises a batch, a fee or a seat.
            </p>
            <p className="mt-4 max-w-xl">
              <Link href="/contact-us" className="font-semibold text-action hover:underline">
                Or reach the team on the contact page →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

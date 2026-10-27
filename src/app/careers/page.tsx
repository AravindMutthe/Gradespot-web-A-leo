import { staticPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { PageHero, SectionTitle, AnswerLead } from "@/components/ui";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = staticPageMetadata({
  title: "Careers at GradeSpot IT Solutions",
  description:
    "Careers at GradeSpot IT Solutions, an IT training and IT services company in Dilsukhnagar, Hyderabad. This page does not list individual openings — it explains how to express interest.",
  path: "/careers",
});

// Careers page — DRAFT, new route, no opening listed.
// GradeSpot has supplied no verified job opening, salary, benefit,
// work mode, interview step, deadline, or headcount for this page,
// so none is stated here. Anyone interested in working with
// GradeSpot is directed to the existing contact/enquiry routes
// only — no new form, email, or resume-upload flow is invented.
// This page is about working AT GradeSpot. Learner career support
// (courses, roadmaps, placement guidance) is a different page:
// /career-support — see the disambiguation box below.

export default function CareersPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ])}
      />
      <PageHero
        title="Careers — Work with GradeSpot"
        subtitle="GradeSpot IT Solutions provides IT training and IT services from Dilsukhnagar, Hyderabad, with online and classroom classes."
      />
      <div className="wrap pt-8">
        <AnswerLead id="answer-summary">
          This page is about working at GradeSpot. It does not list individual openings,
          because none has been supplied for publication here. If you are interested in
          working with GradeSpot, you can express that interest through the existing
          contact route — see below.
        </AnswerLead>
      </div>

      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Careers" }]} />

            <div className="mt-8 rounded-2xl border border-line bg-surface-light p-7">
              <h2 className="text-lg font-bold text-heading">
                Looking for learner career support instead?
              </h2>
              <p className="mt-2 text-[15px] leading-7 text-body">
                If you are a learner looking for help with courses, career paths, or
                guidance after training, that is a different page — Career Support — not
                this one. This Careers page is for people interested in working at
                GradeSpot itself.
              </p>
              <Link
                href="/career-support"
                className="mt-3 inline-block text-sm font-bold text-signal hover:text-signal-strong"
              >
                Career Support for learners →
              </Link>
            </div>

            <div className="mt-16">
              <SectionTitle label="About GradeSpot" title="What GradeSpot does" />
              <p className="mt-4 text-[15px] leading-7 text-body">
                GradeSpot IT Solutions is an IT training institute and services company
                in Dilsukhnagar, Hyderabad. It offers training in areas including
                cybersecurity, cloud, networking, programming, data, and digital
                marketing, with online and offline classes, as well as corporate
                training, internships, and IT services.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/about-us" className="btn-outline-navy">
                  About GradeSpot →
                </Link>
                <Link href="/services" className="btn-outline-navy">
                  Our services →
                </Link>
                <Link href="/trainings" className="btn-outline-navy">
                  Our trainings →
                </Link>
              </div>
            </div>

            <div className="mt-16">
              <SectionTitle label="Openings" title="Individual openings" />
              <p className="mt-4 text-[15px] leading-7 text-body">
                This page does not list individual openings. No role, location, work
                mode, salary, requirement, or closing date is stated here, because none
                has been supplied for publication. A role will appear on this page only
                once GradeSpot supplies its details and approves them for publication.
              </p>
              <p className="mt-4 text-[15px] leading-7 text-body">
                If you are interested in working with GradeSpot, express your interest
                through the existing contact route and mention the kind of work you are
                interested in. That is an expression of interest, not an application for
                a listed opening, and it does not promise a response, an interview, or
                a role.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/contact-us" className="btn-primary">
                  Contact GradeSpot →
                </Link>
                <Link href="/register" className="btn-outline-navy">
                  Register your interest →
                </Link>
              </div>
              <p className="mt-4 text-sm leading-6 text-body">
                The register route is the site&apos;s existing enquiry route. It does
                not create a job application, and it does not collect a resume.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

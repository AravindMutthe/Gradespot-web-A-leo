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

// Careers page — Stage 8, Option A rebuild from spec (reference: the
// Nexus branch's careers page + spec, read-only, code NOT copied).
// GradeSpot has supplied no verified job opening, salary, benefit,
// work mode, interview step, deadline, or headcount for this page, so
// none is stated here. Anyone interested in working with GradeSpot is
// directed to the existing contact/enquiry route only — no new form,
// email, or resume-upload flow is invented. This page is about working
// AT GradeSpot; learner career support is a different page
// (/career-support) — see the disambiguation box below.
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
              <Link href="/career-support" className="mt-4 inline-block text-sm font-bold text-action hover:text-action-dark">
                Career Support →
              </Link>
            </div>

            <div className="mt-12">
              <SectionTitle label="Openings" title="No openings listed" />
              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-body">
                GradeSpot has not published any individual opening on this page — no role,
                salary, benefit, work mode, interview step, deadline, or headcount is stated
                here, because none has been supplied for publication. When an opening is
                approved for publication, it will appear here with its full details.
              </p>
            </div>

            <div className="mt-12">
              <SectionTitle label="Express Interest" title="Interested in working with us?" />
              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-body">
                Tell us who you are and what you do through the contact route. There is no
                separate careers form and no resume upload on this site — the contact form
                reaches the same team, and they reply personally.
              </p>
              <div className="mt-6 flex flex-wrap gap-3.5">
                <Link href="/contact-us" className="btn-primary">
                  Express Interest via Contact
                </Link>
                <Link href="/about-us" className="btn-outline-navy">
                  About GradeSpot
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

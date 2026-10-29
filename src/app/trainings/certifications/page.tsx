import type { Metadata } from "next";
import Link from "next/link";
import { staticPageMetadata } from "@/lib/metadata";
import { PageHero, AnswerLead } from "@/components/ui";

export const metadata: Metadata = staticPageMetadata({
  title: "Certifications",
  description:
    "Certification-related training from GradeSpot IT Solutions in Dilsukhnagar, Hyderabad — courses covering certification-related subjects. Course-to-certification mapping is pending approval.",
  path: "/trainings/certifications",
});

// Two-door categorization — INDEXED explanatory page.
//
// Honesty rules (pinned by test):
// - NO per-certification course cards and NO per-certification course
//   links until a course-to-certification mapping is owner-approved.
//   Today none is approved, so this page links only to the Courses
//   directory generally.
// - No claim that GradeSpot awards a vendor's certification, no
//   vendor authorization claim, no pass promise, no exam-voucher
//   claim, no employment or placement promise. Preparation wording
//   for a named examination is used only AFTER verification — and
//   nothing here is verified yet, so nothing is named.

export default function CertificationsPage() {
  return (
    <>
      <PageHero
        title="Certifications"
        subtitle="Certification-related training from GradeSpot IT Solutions in Dilsukhnagar, Hyderabad. Which examinations a course prepares you for is confirmed on enquiry."
      />
      <div className="wrap pt-8">
        <AnswerLead id="answer-summary">
          GradeSpot offers courses covering certification-related subjects. The mapping from
          each course to a specific examination is pending approval, so no course is presented
          here as preparation for a named examination yet.
        </AnswerLead>
      </div>
      <section className="section-pad">
        <div className="wrap">
          <p className="mb-4">
            <Link href="/trainings" className="font-semibold text-ink underline">
              ← All Training
            </Link>
          </p>
          <p className="max-w-3xl text-base leading-7 text-body">
            GradeSpot does not award vendor certifications. When the course-to-certification
            mapping is approved, this page will list which courses cover which examination
            topics. Until then, ask the team about a specific course and examination — they
            will confirm what is covered.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/trainings/courses" className="btn-primary min-h-[44px]">
              Browse All Courses
            </Link>
            <Link href="/contact-us" className="btn-primary min-h-[44px]">
              <span aria-hidden="true">✉️</span> Enquire
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

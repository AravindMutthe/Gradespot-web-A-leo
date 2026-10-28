import type { Metadata } from "next";
import Link from "next/link";
import { staticPageMetadata } from "@/lib/metadata";
import { PageHero, AnswerLead } from "@/components/ui";

export const metadata: Metadata = {
  ...staticPageMetadata({
    title: "Training Programmes",
    description:
      "Training programmes from GradeSpot IT Solutions in Dilsukhnagar, Hyderabad — broader multi-subject programmes taught at basics, fundamentals and entry level.",
    path: "/trainings/training-programmes",
  }),
  // Planned page: a visitor destination, not indexed content. It is
  // excluded from the sitemap and from search-as-available content.
  robots: { index: false, follow: true },
};

// Two-door categorization — PLANNED page, kept separate from Courses
// by Leo's call: Training programmes are broader multi-subject
// programmes taught at basics, fundamentals and entry level (the
// owner's definition). No programme curriculum is confirmed yet, so
// this page names NO tracks, tracks names, syllabi, durations or
// dates — those appear only when GradeSpot confirms a real programme.

export default function TrainingProgrammesPage() {
  return (
    <>
      <PageHero
        title="Training Programmes"
        subtitle="Broader multi-subject programmes from GradeSpot IT Solutions in Dilsukhnagar, Hyderabad, taught at basics, fundamentals and entry level."
      />
      <div className="wrap pt-8">
        <AnswerLead id="answer-summary">
          Training programmes are broader than a single course: they cover a role or a field
          across several subjects, starting from the basics. No programme curriculum is
          confirmed yet — programmes will be listed here when GradeSpot confirms them.
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
            If you are looking for a single subject, browse the courses directory. If you want
            a broader programme, enquire below and the team will discuss what is planned and
            when details are confirmed.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/trainings/courses" className="btn-primary min-h-[44px]">
              Browse Courses
            </Link>
            <Link href="/contact-us" className="btn-primary min-h-[44px]">
              Enquire About Training Programmes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

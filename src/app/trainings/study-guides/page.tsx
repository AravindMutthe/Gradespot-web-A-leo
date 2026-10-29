import type { Metadata } from "next";
import Link from "next/link";
import { staticPageMetadata } from "@/lib/metadata";
import { PageHero, AnswerLead } from "@/components/ui";

export const metadata: Metadata = {
  ...staticPageMetadata({
    title: "Study Guides & Notes",
    description:
      "Study guides and notes from GradeSpot IT Solutions — learning resources to support GradeSpot courses. Planned: no guides are available yet.",
    path: "/trainings/study-guides",
  }),
  // Planned page: a visitor destination, not indexed content. It is
  // excluded from the sitemap and from search-as-available content.
  robots: { index: false, follow: true },
};

// Two-door categorization — PLANNED page, published at the owner's
// explicit direction ("put it even though future"). NO invented
// guide titles, previews, prices, downloads, ratings or dates: the
// page says plainly that nothing is available yet.

export default function StudyGuidesPage() {
  return (
    <>
      <PageHero
        title="Study Guides & Notes"
        subtitle="Learning resources to support GradeSpot courses. Planned — resources are being prepared."
      />
      <div className="wrap pt-8">
        <AnswerLead id="answer-summary">
          Planned. Learning resources are being prepared. No guides are available for download
          or purchase yet.
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
            When guides are ready, they will be listed here. If you need study material for a
            course you are considering, enquire below and the team will tell you what is
            available.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/trainings/courses" className="btn-primary min-h-[44px]">
              Browse Courses
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

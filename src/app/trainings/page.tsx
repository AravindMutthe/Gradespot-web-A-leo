import type { Metadata } from "next";
import Link from "next/link";
import { staticPageMetadata } from "@/lib/metadata";
import { PageHero, AnswerLead } from "@/components/ui";
import DirectoryBoard from "@/components/DirectoryBoard";
import SearchBox from "@/components/SearchBox";
import { TRAINING_DIRECTORY_ENTRIES } from "@/lib/two-door";

export const metadata: Metadata = staticPageMetadata({
  title: "Training",
  description:
    "Training from GradeSpot IT Solutions in Dilsukhnagar, Hyderabad — courses, training programmes, certifications, internships and study resources. Details are confirmed on enquiry.",
  path: "/trainings",
});

// Frontend 3.0 — Two-door categorization (owner-ordered 2026-10-28,
// Leo's final call after Das's consolidated recommendation).
//
// /trainings is an OFFERING-TYPE DIRECTORY, not a course list: the
// old long page (all 36 courses in 10 sections at once, with the
// CatalogueSearch live-filtering bar) is retired with this change.
// The directory carries a search box that goes to /search — it is
// navigation to search results, not a filter control: no
// visitor-operated category filters exist anywhere (owner rejected
// filters as extra user work).
// Entries are in the owner's order. Only Courses carries a real
// count (36); every other entry carries status wording, never an
// invented count. This page carries no sample content, so no
// DemoLegend renders here; sample content lives on the category
// pages, detail pages and search results.

export default function TrainingsDirectoryPage() {
  return (
    <>
      <PageHero
        title="Training"
        subtitle="Training from GradeSpot IT Solutions in Dilsukhnagar, Hyderabad. Pick a door below — course details, schedules and availability are confirmed on enquiry."
      />
      <div className="wrap pt-8">
        <AnswerLead id="answer-summary">
          Browse training from GradeSpot IT Solutions in Dilsukhnagar, Hyderabad, by what you
          are looking for. Availability for each course is confirmed on enquiry.
        </AnswerLead>
        <div className="mt-6">
          <SearchBox />
        </div>
      </div>
      <section className="section-pad">
        <div className="wrap">
          <DirectoryBoard door="training" title="Browse training">
          <ul className="border-t border-line">
            {TRAINING_DIRECTORY_ENTRIES.map((entry) => (
              <li key={entry.href} className="border-b border-line">
                <article className="row-hover flex min-h-[56px] flex-wrap items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold">
                      <Link href={entry.href} className="hover:text-signal">
                        {entry.title}
                      </Link>
                    </h2>
                    <p className="mt-1 text-[15px] text-body">{entry.line}</p>
                    <p className="mt-1 text-[15px] text-muted">{entry.status}</p>
                  </div>
                  <Link
                    href={entry.href}
                    className="inline-flex min-h-[44px] items-center rounded-full border border-line bg-canvas px-5 py-2 text-[15px] font-semibold text-ink"
                  >
                    Browse →
                  </Link>
                </article>
              </li>
            ))}
          </ul>
          </DirectoryBoard>

          <div className="mt-16 rounded-2xl border border-line bg-surface-light p-8 text-center">
            <h2 className="text-2xl font-semibold">Not sure which course fits you?</h2>
            <p className="mx-auto mt-2 max-w-xl">
              Talk to a Trainer — tell us your goal and we will help you pick the right training
              path.
            </p>
            <Link href="/contact-us" className="btn-primary mt-5">
              Talk to a Trainer
            </Link>
            <p className="mt-6 text-[15px] text-body">
              More reading:{" "}
              <Link href="/blog" className="font-semibold text-ink underline">
                Visit our blog
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

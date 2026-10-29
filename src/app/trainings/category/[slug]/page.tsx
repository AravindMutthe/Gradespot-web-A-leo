import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { staticPageMetadata } from "@/lib/metadata";
import { PageHero, AnswerLead } from "@/components/ui";
import DirectoryBoard from "@/components/DirectoryBoard";
import { ChapterRow } from "@/components/prospectus";
import { chapterNumber } from "@/lib/chapter-contract";
import { courses, courseDurations } from "@/data/courses";
import { buildTrainingRow } from "@/lib/trainings-rows";
import { topicCategories, topicCategoryBySlug } from "@/lib/two-door";

// Two-door categorization: ONE dynamic route generates all 10 topic
// category pages from local catalogue data — no hardcoded page per
// category. Unknown slugs 404. Each page lists ONLY its own topic's
// course rows, reusing the existing row model: held rows carry the
// pending notice, verified rows their summary.

export function generateStaticParams() {
  return topicCategories().map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = topicCategoryBySlug(slug);
  if (!cat) return { title: "Category not found" };
  return staticPageMetadata({
    title: `${cat.name} Courses`,
    description: `${cat.name} training courses from GradeSpot IT Solutions in Dilsukhnagar, Hyderabad. Course details, schedules and availability are confirmed on enquiry.`,
    path: `/trainings/category/${cat.slug}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = topicCategoryBySlug(slug);
  if (!cat) notFound();

  const rows = courses
    .filter((c) => c.category === cat.name)
    .map((c) =>
      buildTrainingRow({
        slug: c.slug,
        title: c.title,
        category: c.category,
        summary: c.summary,
        catalogOnly: c.catalogOnly,
        duration: courseDurations[c.slug],
      }),
    );

  return (
    <>
      <PageHero
        title={`${cat.name} Courses`}
        subtitle={`${cat.name} training courses from GradeSpot IT Solutions in Dilsukhnagar, Hyderabad. Course details, schedules and availability are confirmed on enquiry.`}
      />
      <div className="wrap pt-8">
        <AnswerLead id="answer-summary">
          Browse {rows.length} {cat.name} {rows.length === 1 ? "course" : "courses"} from
          GradeSpot IT Solutions in Dilsukhnagar, Hyderabad, listed below.
        </AnswerLead>
      </div>
      <section className="section-pad">
        <div className="wrap">
          <p className="mb-4 flex flex-wrap gap-4">
            <Link href="/trainings/courses" className="font-semibold text-ink underline">
              ← All Courses
            </Link>
            <Link href="/trainings" className="font-semibold text-ink underline">
              ← All Training
            </Link>
          </p>
          <DirectoryBoard
            door="training"
            eyebrow={`Training · ${cat.name}`}
            title={`${cat.name} courses`}
            countLine={`${rows.length} ${rows.length === 1 ? "course" : "courses"} listed below.`}
          >
          <ul className="border-t border-line">
            {(() => {
              // Direction A: a chapter opener per course ONLY where a
              // verified summary exists (row.description). Catalogue-only
              // and held rows stay compact index lines — no invented
              // body. Opener numbers run sequentially across openers.
              let opener = 0;
              return rows.map((row) =>
                row.description ? (
                  <li key={row.slug} className="border-b border-line">
                    <ChapterRow
                      number={chapterNumber(++opener)}
                      door="training"
                      title={row.displayTitle}
                      titleHref={row.titleHref ?? undefined}
                      description={row.description}
                      status={row.durationLabel}
                      actionLabel={row.actionLabel}
                      actionHref={row.actionHref}
                    />
                  </li>
                ) : (
                  <li key={row.slug} className="border-b border-line">
                    <ChapterRow
                      compact
                      door="training"
                      title={row.displayTitle}
                      titleHref={row.titleHref ?? undefined}
                      status={row.statusLabel}
                      meta={row.durationLabel}
                      actionLabel={row.actionLabel}
                      actionHref={row.actionHref}
                    />
                  </li>
                ),
              );
            })()}
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
          </div>
        </div>
      </section>
    </>
  );
}

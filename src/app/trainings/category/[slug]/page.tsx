import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { staticPageMetadata } from "@/lib/metadata";
import { PageHero, AnswerLead } from "@/components/ui";
import DirectoryBoard from "@/components/DirectoryBoard";
import VisualTopicCard from "@/components/VisualTopicCard";
import { DemoLegend } from "@/components/DemoLegend";
import { SampleTag } from "@/components/SampleTag";
import { courses, courseDurations } from "@/data/courses";
import { buildTrainingRow } from "@/lib/trainings-rows";
import { topicCategories, topicCategoryBySlug } from "@/lib/two-door";

// Two-door categorization: ONE dynamic route generates all 10 topic
// category pages from local catalogue data — no hardcoded page per
// category. Unknown slugs 404. Each page lists ONLY its own topic's
// course rows, reusing the existing row model including demo-fill
// SampleTag/legend behaviour: category pages render sample summaries,
// so the DemoLegend renders here unconditionally (it is the
// demo-only component removed in one place at purge time).

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
        large
        title={`${cat.name} Courses`}
        subtitle={`${cat.name} training courses from GradeSpot IT Solutions in Dilsukhnagar, Hyderabad. Course details, schedules and availability are confirmed on enquiry.`}
      />
      <div className="wrap pt-8">
        <AnswerLead id="answer-summary">
          Browse {rows.length} {cat.name} {rows.length === 1 ? "course" : "courses"} from
          GradeSpot IT Solutions in Dilsukhnagar, Hyderabad, listed below.
        </AnswerLead>
        <div className="mt-6">
          <DemoLegend />
        </div>
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
          {/* Modern + stylish pass: course cards sit ALONGSIDE the
              board below — the board stays, the cards add the visual
              layer. Sample rows keep their SampleTag on the card.
              No artwork files exist yet, so the cards render their
              tint panels. */}
          <ul
            aria-label={`${cat.name} courses`}
            className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {rows.map((row) => (
              <li key={row.slug}>
                <VisualTopicCard
                  href={row.titleHref ?? row.actionHref}
                  title={row.displayTitle}
                  eyebrow={`Training · ${cat.name}`}
                  description={row.description}
                  countLabel={row.durationLabel ?? undefined}
                  sample={row.sample}
                  aspect="square"
                />
              </li>
            ))}
          </ul>
          <DirectoryBoard
            door="training"
            eyebrow={`Training · ${cat.name}`}
            title={`${cat.name} courses`}
            countLine={`${rows.length} ${rows.length === 1 ? "course" : "courses"} listed below.`}
          >
          <ul className="border-t border-line">
            {rows.map((row) => (
              <li key={row.slug} className="border-b border-line">
                <article className="row-hover flex min-h-[56px] flex-wrap items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <h2 className="flex flex-wrap items-center gap-3 text-lg font-semibold">
                      {row.titleHref ? (
                        <Link href={row.titleHref} className="hover:text-signal focus-visible:underline">
                          {row.displayTitle}
                        </Link>
                      ) : (
                        row.displayTitle
                      )}
                      {row.sample && <SampleTag />}
                    </h2>
                    {row.sample && row.description ? (
                      <p className="mt-1 text-[15px] text-sample">{row.description}</p>
                    ) : row.statusLabel ? (
                      <p className="mt-1 text-[15px] text-body">{row.statusLabel}</p>
                    ) : (
                      row.description && (
                        <p className="mt-1 text-[15px] text-body">{row.description}</p>
                      )
                    )}
                    {row.durationLabel && (
                      <p className="mt-1 text-[15px] text-muted">{row.durationLabel}</p>
                    )}
                  </div>
                  <Link
                    href={row.actionHref}
                    className="inline-flex min-h-[44px] items-center rounded-full border border-line bg-canvas px-5 py-2 text-[15px] font-semibold text-ink"
                  >
                    {row.actionLabel}
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
          </div>
        </div>
      </section>
    </>
  );
}

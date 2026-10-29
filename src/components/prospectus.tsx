// Direction A — "The Prospectus" shared templates (design-focus brief
// §4, 2026-10-29). Editorial, print-grade: numbered chapters, mono
// index voice, rules and margins doing the work photographs do
// elsewhere. No images are rendered by any component here — course
// image provenance is unreviewed (no provenance record exists in the
// repo), so chapter openers stay typographic by design, not by
// omission. All counts/labels are caller-computed from data; nothing
// here invents a fact. Motion is CSS-only (see globals.css
// .chapter-rule-draw); reduced-motion is respected there.

import type { ReactNode } from "react";
import Link from "next/link";
import type { Chapter } from "@/lib/chapter-contract";

/** Mono numbered chapter marker: "01 — Syllabus". */
export function ChapterEyebrow({ number, title }: { number: string; title: string }) {
  return (
    <p className="eyebrow text-brand-dark">
      {number} — {title}
    </p>
  );
}

/**
 * Numbered contents list (home indexes + detail chapter anchors).
 * Every link is min-h-[44px] (tap target), so the list needs no
 * mobile collapse — it is already the anchor flow on small screens.
 */
export function ChapterContents({ chapters, dark }: { chapters: Chapter[]; dark?: boolean }) {
  const border = dark ? "border-white/20" : "border-line";
  const numberText = dark ? "text-footer-text" : "text-muted";
  const titleText = dark ? "text-white" : "text-ink";
  const arrowText = dark ? "text-brand-bright" : "text-brand-dark";
  return (
    <nav aria-label="Contents">
      <ol className={`border-t ${border}`}>
        {chapters.map((chapter) => (
          <li key={chapter.id} className={`border-b ${border}`}>
            {chapter.href ? (
              <Link
                href={chapter.href}
                className="flex min-h-[44px] items-center gap-4 py-3"
              >
                <span className={`w-8 shrink-0 font-mono text-[13px] font-semibold ${numberText}`}>
                  {chapter.number}
                </span>
                <span className={`min-w-0 flex-1 text-lg font-semibold ${titleText}`}>
                  {chapter.title}
                </span>
                {chapter.description && (
                  <span className={`shrink-0 text-sm ${numberText}`}>{chapter.description}</span>
                )}
                <span aria-hidden className={`shrink-0 text-xl ${arrowText}`}>
                  →
                </span>
              </Link>
            ) : (
              <a
                href={`#${chapter.id}`}
                className="flex min-h-[44px] items-center gap-4 py-3"
              >
                <span className={`w-8 shrink-0 font-mono text-[13px] font-semibold ${numberText}`}>
                  {chapter.number}
                </span>
                <span className={`min-w-0 flex-1 text-lg font-semibold ${titleText}`}>
                  {chapter.title}
                </span>
                <span aria-hidden className={`shrink-0 text-xl ${arrowText}`}>
                  →
                </span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Numbered contents as a Bootstrap editorial grid: two columns from
 * md up, single column below (and at 320 CSS px). Used for the long
 * home indexes (categories, services). The grid classes come from
 * bootstrap-prospectus.scss (grid only); below md every cell is
 * full-width via the grid's row-child rule, so max-zoom reflow never
 * squeezes a cell.
 */
export function ContentsGrid({ chapters }: { chapters: Chapter[] }) {
  return (
    <nav aria-label="Contents">
      <div className="row g-4">
        {chapters.map((chapter) => (
          // col-md-6 only: below md, Bootstrap's .row > * rule already
          // makes each cell full-width, and an explicit col-12 would
          // also make Tailwind emit its (inert, but noisy) grid-column
          // utility for the same class name — dual-system noise the
          // Path 2 mitigations exist to avoid.
          <div key={chapter.id} className="col-md-6">
            <Link
              href={chapter.href ?? `#${chapter.id}`}
              className="flex min-h-[56px] items-center gap-4 border-b border-line py-3"
            >
              <span className="w-8 shrink-0 font-mono text-[13px] font-semibold text-muted">
                {chapter.number}
              </span>
              <span className="min-w-0 flex-1 text-lg font-semibold text-ink">
                {chapter.title}
              </span>
              {chapter.description && (
                <span className="shrink-0 text-sm text-muted">{chapter.description}</span>
              )}
              <span aria-hidden className="shrink-0 text-xl text-brand-dark">
                →
              </span>
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
}

export type ProspectusDoor = "training" | "business";

/**
 * Directory row as a chapter opener: mono number, generous left
 * margin, title, one-line description and/or status line, and the
 * 3px door rule as the chapter marker (training = brand orange,
 * business = teal — the Gate 1 door accents, unchanged). The compact
 * variant is the catalogue-only index line: title + action only, no
 * number, no invented body.
 */
export function ChapterRow({
  number,
  door,
  title,
  titleHref,
  description,
  status,
  actionLabel,
  actionHref,
  compact,
  meta,
  titleTag = "h2",
}: {
  number?: string;
  door: ProspectusDoor;
  title: string;
  titleHref?: string;
  description?: string | null;
  status?: string | null;
  actionLabel: string;
  actionHref: string;
  compact?: boolean;
  /** Secondary muted line for compact rows (e.g. a duration label). */
  meta?: string | null;
  /** Heading level for the row title (services rows keep h3 under the board h2). */
  titleTag?: "h2" | "h3";
}) {
  const accent = door === "training" ? "bg-door-training" : "bg-door-business";
  if (compact) {
    return (
      <article className="row-hover flex min-h-[56px] items-center justify-between gap-4 py-3">
        <span className="min-w-0">
          {titleTag === "h3" ? (
            <h3 className="block text-lg font-semibold text-ink">
              {titleHref ? (
                <Link href={titleHref} className="hover:text-action-dark">
                  {title}
                </Link>
              ) : (
                title
              )}
            </h3>
          ) : (
            <h2 className="block text-lg font-semibold text-ink">
              {titleHref ? (
                <Link href={titleHref} className="hover:text-action-dark">
                  {title}
                </Link>
              ) : (
                title
              )}
            </h2>
          )}
          {status && <span className="mt-1 block text-[15px] text-body">{status}</span>}
          {meta && <span className="mt-1 block text-[15px] text-muted">{meta}</span>}
        </span>
        <Link
          href={actionHref}
          className="inline-flex min-h-[44px] shrink-0 items-center rounded-full border border-line bg-canvas px-5 py-2 text-[15px] font-semibold text-ink"
        >
          {actionLabel}
        </Link>
      </article>
    );
  }
  return (
    <article className="row-hover flex min-h-[56px] flex-wrap items-start justify-between gap-4 py-5">
      <div className="flex min-w-0 flex-1 gap-4">
        {number && (
          <span className="w-10 shrink-0 pt-1">
            <span className="block font-mono text-[13px] font-semibold text-muted">
              {number}
            </span>
            <span aria-hidden className={`mt-2 block h-[3px] w-8 rounded-full ${accent}`} />
          </span>
        )}
        <div className="min-w-0">
          {titleTag === "h3" ? (
            <h3 className="text-lg font-semibold">
              {titleHref ? (
                <Link href={titleHref} className="hover:text-action-dark">
                  {title}
                </Link>
              ) : (
                title
              )}
            </h3>
          ) : (
            <h2 className="text-lg font-semibold">
              {titleHref ? (
                <Link href={titleHref} className="hover:text-action-dark">
                  {title}
                </Link>
              ) : (
                title
              )}
            </h2>
          )}
          {description && <p className="mt-1 text-[15px] text-body">{description}</p>}
          {status && <p className="mt-1 text-[15px] text-muted">{status}</p>}
        </div>
      </div>
      <Link
        href={actionHref}
        className="inline-flex min-h-[44px] shrink-0 items-center rounded-full border border-line bg-canvas px-5 py-2 text-[15px] font-semibold text-ink"
      >
        {actionLabel}
      </Link>
    </article>
  );
}

/**
 * Prospectus cover (home hero): full-width ink panel, oversized
 * serif title, meta line underneath computed from data only, then
 * the two equal-door CTAs. The meta line is passed in — this
 * component computes nothing, so no count can be invented here.
 */
export function ProspectusCover({
  metaLine,
  title,
  description,
  children,
}: {
  metaLine: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section aria-label="Introduction" className="panel-ink">
      <div className="wrap py-10 md:py-14">
        <h1 className="max-w-4xl text-[40px] font-semibold leading-[1.08] text-white md:text-[64px]">
          {title}
        </h1>
        <p className="mt-5 font-mono text-[13px] font-medium tracking-[0.08em] text-footer-text">
          {metaLine}
        </p>
        <p className="mt-5 max-w-2xl text-base leading-7 text-footer-text">{description}</p>
        <div className="mt-8 flex flex-wrap gap-4">{children}</div>
      </div>
    </section>
  );
}

/**
 * Detail facts as a spec line, not a card: mono labels + values in a
 * bordered strip. Dark variant for the ink chapter-opener hero.
 * Values are caller-supplied verbatim (including the AZ-900
 * special-case wording owned by the detail template).
 */
export function FactsStrip({
  facts,
}: {
  facts: { who: string; level: string; certification: string };
}) {
  return (
    <div className="mt-8 border-y border-white/20 py-5">
      <p className="eyebrow text-footer-text">Course facts</p>
      <dl className="mt-4 space-y-3 text-[15px] leading-7 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0">
        <div>
          <dt className="font-mono text-[12px] font-semibold tracking-[0.14em] text-footer-text uppercase">
            Who it&apos;s for
          </dt>
          <dd className="mt-1 text-white">{facts.who}</dd>
        </div>
        <div>
          <dt className="font-mono text-[12px] font-semibold tracking-[0.14em] text-footer-text uppercase">
            Level
          </dt>
          <dd className="mt-1 text-white">{facts.level}</dd>
        </div>
        <div>
          <dt className="font-mono text-[12px] font-semibold tracking-[0.14em] text-footer-text uppercase">
            Certification
          </dt>
          <dd className="mt-1 text-white">{facts.certification}</dd>
        </div>
      </dl>
    </div>
  );
}

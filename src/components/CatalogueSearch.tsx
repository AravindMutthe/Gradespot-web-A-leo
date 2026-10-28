"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { categoryAnchor } from "@/data/catalogue-nav";
import type { TrainingRow } from "@/lib/trainings-rows";
import { groupTrainingRows } from "@/lib/trainings-rows";

// Stage 3 trainings index: search-first catalogue rendered as compact,
// text-first rows. No images, no image treatments, no promotional
// sections. With no query the catalogue renders grouped by category,
// in the repo category order; typing filters live across titles,
// categories and descriptions. Held-back rows have no description, so
// a query can never surface held or truncated text through search.

function TrainingCourseRow({ row }: { row: TrainingRow }) {
  return (
    <article className="border-b border-line py-5">
      <h3 className="text-[19px] font-semibold leading-snug text-heading">
        {row.titleHref ? (
          <Link href={row.titleHref} className="transition-colors hover:text-signal">
            {row.displayTitle}
          </Link>
        ) : (
          row.displayTitle
        )}
      </h3>
      {row.statusLabel && (
        <p className="mt-2">
          <span className="inline-block rounded-md border border-line bg-canvas px-2.5 py-1.5 text-[13px] font-semibold text-body">
            {row.statusLabel}
          </span>
        </p>
      )}
      {row.description && <p className="mt-2 leading-7 text-body">{row.description}</p>}
      {row.durationLabel && (
        <p className="mt-2 text-[15px] font-medium text-body">{row.durationLabel}</p>
      )}
      <p className="mt-3">
        <Link
          href={row.actionHref}
          className="inline-flex min-h-[44px] items-center rounded-full border border-line bg-surface px-5 py-2 text-[15px] font-semibold text-ink transition-colors hover:border-brand hover:text-signal"
        >
          {row.actionLabel}
        </Link>
      </p>
    </article>
  );
}

export default function CatalogueSearch({
  rows,
  categories,
}: {
  rows: TrainingRow[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return null;
    return rows.filter(
      (r) =>
        r.displayTitle.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        (r.description ?? "").toLowerCase().includes(q),
    );
  }, [q, rows]);

  const groups = useMemo(() => groupTrainingRows(rows, categories), [rows, categories]);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const r of rows) map.set(r.category, (map.get(r.category) ?? 0) + 1);
    return map;
  }, [rows]);

  return (
    <div id="course-search" className="scroll-mt-36">
      <div className="mx-auto max-w-2xl">
        <label htmlFor="course-search-input" className="sr-only">
          Search training courses
        </label>
        <input
          id="course-search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${rows.length} training courses — try "CCNA", "Azure", "SOC"…`}
          className="w-full rounded-full border border-line bg-parchment px-6 py-4 text-[15px] text-heading shadow-[0_10px_30px_rgba(31,24,16,0.08)] outline-none transition-colors placeholder:text-body/70 focus:border-brand"
        />
        {results !== null && (
          <p className="mt-3 text-center text-sm text-body" role="status">
            {results.length === 0
              ? "No courses match your search."
              : `${results.length} course${results.length === 1 ? "" : "s"} found`}
          </p>
        )}
        {results === null && (
          <nav aria-label="Training categories" className="mt-5 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <a
                key={cat}
                href={`#${categoryAnchor(cat)}`}
                className="rounded-full border border-line bg-parchment px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-heading transition-colors hover:border-brand hover:text-signal"
              >
                {cat} · {counts.get(cat) ?? 0}
              </a>
            ))}
          </nav>
        )}
      </div>

      {results === null ? (
        <div className="mt-14 space-y-16">
          {groups.map((group) => (
            <div key={group.category} id={categoryAnchor(group.category)} className="scroll-mt-36">
              <h2 className="text-2xl font-semibold text-heading">{group.category}</h2>
              <div className="mt-2 border-t border-line">
                {group.rows.map((row) => (
                  <TrainingCourseRow key={row.slug} row={row} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-line bg-surface-light p-8 text-center">
          <h2 className="text-2xl font-semibold">Not sure which course fits you?</h2>
          <p className="mx-auto mt-2 max-w-xl">
            Talk to a Trainer — tell us your goal and we will help you pick the right training
            path.
          </p>
          <Link href="/contact-us" className="btn-primary mt-5">
            Talk to a Trainer
          </Link>
        </div>
      ) : (
        <div className="mt-10 border-t border-line">
          {results.map((row) => (
            <TrainingCourseRow key={row.slug} row={row} />
          ))}
        </div>
      )}
    </div>
  );
}

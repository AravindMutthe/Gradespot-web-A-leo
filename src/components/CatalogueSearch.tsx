"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CourseCardBody } from "@/components/ui";
import { categoryAnchor } from "@/data/catalogue-nav";

export interface CatalogueCourse {
  slug: string;
  title: string;
  category: string;
  summary: string;
  image: string | null;
  duration?: string;
  catalogOnly?: boolean;
}

// Search-first catalogue (Simplilearn pattern from the research): one
// search box over the whole trainings catalogue. With no query the
// catalogue renders grouped by category, exactly as published; typing
// filters live across titles, categories and summaries.
export default function CatalogueSearch({
  courses,
  categories,
}: {
  courses: CatalogueCourse[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  // P2 status lens (research pattern): "Available now" = a course with
  // published full detail you can enquire about; "Coming soon — ask us"
  // = a catalog-only course (catalogOnly). This lens reflects published
  // detail only — it is NOT a B1 program_status, whose fields are still
  // unfilled and must never be defaulted.
  const [lens, setLens] = useState<"all" | "available" | "coming">("all");
  const q = query.trim().toLowerCase();

  const lensFiltered = useMemo(() => {
    if (lens === "available") return courses.filter((c) => !c.catalogOnly);
    if (lens === "coming") return courses.filter((c) => c.catalogOnly);
    return courses;
  }, [lens, courses]);

  const results = useMemo(() => {
    if (!q) return null;
    return lensFiltered.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q),
    );
  }, [q, lensFiltered]);

  const byCategory = useMemo(() => {
    const map = new Map<string, CatalogueCourse[]>();
    for (const c of lensFiltered) {
      const list = map.get(c.category) ?? [];
      list.push(c);
      map.set(c.category, list);
    }
    return map;
  }, [lensFiltered]);

  const visibleCategories = categories.filter((cat) => (byCategory.get(cat)?.length ?? 0) > 0);
  const lensOptions: { key: "all" | "available" | "coming"; label: string; count: number }[] = [
    { key: "all", label: "All trainings", count: courses.length },
    { key: "available", label: "Available now", count: courses.filter((c) => !c.catalogOnly).length },
    { key: "coming", label: "Coming soon — ask us", count: courses.filter((c) => c.catalogOnly).length },
  ];

  return (
    <div id="course-search" className="scroll-mt-36">
      <div className="mx-auto max-w-2xl">
        <label htmlFor="course-search-input" className="sr-only">
          Search trainings
        </label>
        <input
          id="course-search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${courses.length} trainings — try "CCNA", "Azure", "SOC"…`}
          className="w-full rounded-full border border-line bg-parchment px-6 py-4 text-[15px] text-heading shadow-[0_10px_30px_rgba(31,24,16,0.08)] outline-none transition-colors placeholder:text-body/70 focus:border-brand"
        />
        {results !== null && (
          <p className="mt-3 text-center text-sm text-body" role="status">
            {results.length === 0
              ? "No trainings match your search."
              : `${results.length} training${results.length === 1 ? "" : "s"} found`}
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
                {cat} · {byCategory.get(cat)?.length ?? 0}
              </a>
            ))}
          </nav>
        )}
        {/* P2 status lens: filters both the grouped view and search
            results. Counts are live catalogue counts. */}
        <div className="mt-5 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter trainings by availability">
          {lensOptions.map((o) => (
            <button
              key={o.key}
              type="button"
              aria-pressed={lens === o.key}
              onClick={() => setLens(o.key)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                lens === o.key
                  ? "border-brand bg-brand text-paper"
                  : "border-line bg-parchment text-heading hover:border-brand hover:text-signal"
              }`}
            >
              {o.label} · {o.count}
            </button>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-body">
          “Available now” means the course has published full detail you can
          enquire about. “Coming soon — ask us” courses have a title and
          category only — ask us for their syllabus, duration, and fee.
        </p>
      </div>

      {results === null ? (
        <div className="mt-14 space-y-16">
          {visibleCategories.map((cat) => (
            <div key={cat} id={categoryAnchor(cat)} className="scroll-mt-36">
              <h2 className="text-2xl font-semibold text-heading">{cat}</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {(byCategory.get(cat) ?? []).map((c) => (
                  <CourseCardBody key={c.slug} {...c} />
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
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((c) => (
            <CourseCardBody key={c.slug} {...c} />
          ))}
        </div>
      )}
    </div>
  );
}

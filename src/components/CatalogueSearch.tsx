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
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return null;
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q),
    );
  }, [q, courses]);

  const byCategory = useMemo(() => {
    const map = new Map<string, CatalogueCourse[]>();
    for (const c of courses) {
      const list = map.get(c.category) ?? [];
      list.push(c);
      map.set(c.category, list);
    }
    return map;
  }, [courses]);

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
                className="rounded-full border border-line bg-parchment px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-heading transition-colors hover:border-brand hover:text-brand"
              >
                {cat} · {byCategory.get(cat)?.length ?? 0}
              </a>
            ))}
          </nav>
        )}
      </div>

      {results === null ? (
        <div className="mt-14 space-y-16">
          {categories.map((cat) => (
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

import type { Metadata } from "next";
import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import { DemoLegend } from "@/components/DemoLegend";
import { SampleTag } from "@/components/SampleTag";
import {
  SEARCH_CATEGORIES,
  buildSearchIndex,
  categorySlug,
  filterSearchResults,
  parseSearchQuery,
  searchEntries,
  type SearchKind,
} from "@/lib/search";

// Frontend 3.0 — Stage 6 search results page (build-time local index).
// Text-first rows, same language as Stages 3/4/5: one row per result
// (title, type/category label, truthful snippet or held notice, a
// single action). No images, no image treatments, no promotional
// sections. A search-results page is a utility surface, not indexable
// content, so it carries robots noindex (follow stays on so the
// linked catalogue pages remain reachable).
export const metadata: Metadata = {
  title: "Search — GradeSpot IT Solutions",
  description: "Search training courses and IT services from GradeSpot IT Solutions.",
  robots: { index: false, follow: true },
};

const TYPE_FILTERS: { key: SearchKind | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "course", label: "Courses" },
  { key: "service", label: "Services" },
  { key: "page", label: "Pages" },
];

function hrefFor(
  query: { q: string; type: SearchKind | null; category: string | null },
  overrides: Partial<{ q: string; type: SearchKind | null; category: string | null }>,
): string {
  const merged = { ...query, ...overrides };
  const params = new URLSearchParams();
  if (merged.q) params.set("q", merged.q);
  if (merged.type) params.set("type", merged.type);
  if (merged.category) params.set("category", merged.category);
  const qs = params.toString();
  return qs ? `/search?${qs}` : "/search";
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = parseSearchQuery(await searchParams);
  const hasCriteria =
    query.q !== "" || query.type !== null || query.category !== null;
  const results = hasCriteria
    ? filterSearchResults(searchEntries(buildSearchIndex(), query.q), query)
    : [];

  return (
    <div className="wrap py-8">
      <h1 className="text-3xl font-semibold text-heading">Search</h1>
      <p className="mt-2 leading-7 text-body">
        Search training courses and IT services from GradeSpot IT Solutions.
      </p>

      <div className="mt-6 max-w-xl">
        <SearchBox />
      </div>

      {!hasCriteria ? (
        <div className="mt-10 rounded-2xl border border-line bg-surface-light p-8">
          <h2 className="text-xl font-semibold text-heading">
            What are you looking for?
          </h2>
          <p className="mt-2 leading-7 text-body">
            Type a course or service name above, or browse the catalogues
            directly.
          </p>
          <p className="mt-4 flex flex-wrap gap-3">
            <Link href="/trainings" className="btn-primary">
              Browse trainings
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-11 items-center rounded-lg border border-line px-4 text-[15px] font-semibold text-body hover:border-brand-dark hover:text-brand-dark"
            >
              Browse services
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex min-h-11 items-center rounded-lg border border-line px-4 text-[15px] font-semibold text-body hover:border-brand-dark hover:text-brand-dark"
            >
              Enquire
            </Link>
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 flex flex-wrap gap-2" aria-label="Filter by type">
            {TYPE_FILTERS.map((f) => {
              const active =
                (f.key === "all" && query.type === null) || f.key === query.type;
              return (
                <Link
                  key={f.key}
                  href={hrefFor(query, {
                    type: f.key === "all" ? null : f.key,
                  })}
                  aria-current={active ? "true" : undefined}
                  className={
                    active
                      ? "flex min-h-11 items-center rounded-full bg-ink px-4 text-[15px] font-semibold text-white"
                      : "flex min-h-11 items-center rounded-full border border-line px-4 text-[15px] font-semibold text-body hover:border-brand-dark hover:text-brand-dark"
                  }
                >
                  {f.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap gap-2" aria-label="Filter courses by category">
            <Link
              href={hrefFor(query, { category: null })}
              aria-current={query.category === null ? "true" : undefined}
              className={
                query.category === null
                  ? "flex min-h-11 items-center rounded-full bg-ink px-4 text-[15px] font-semibold text-white"
                  : "flex min-h-11 items-center rounded-full border border-line px-4 text-[15px] font-semibold text-body hover:border-brand-dark hover:text-brand-dark"
              }
            >
              All categories
            </Link>
            {SEARCH_CATEGORIES.map((cat) => {
              const slug = categorySlug(cat);
              const active = query.category === slug;
              return (
                <Link
                  key={cat}
                  href={hrefFor(query, { category: slug })}
                  aria-current={active ? "true" : undefined}
                  className={
                    active
                      ? "flex min-h-11 items-center rounded-full bg-ink px-4 text-[15px] font-semibold text-white"
                      : "flex min-h-11 items-center rounded-full border border-line px-4 text-[15px] font-semibold text-body hover:border-brand-dark hover:text-brand-dark"
                  }
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          {results.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-line bg-surface-light p-8">
              <h2 className="text-xl font-semibold text-heading">
                No matching courses or services found
              </h2>
              <p className="mt-2 leading-7 text-body">
                {query.q ? (
                  <>
                    Nothing in the catalogue matches “{query.q}”. Try different
                    words, or ask the team directly.
                  </>
                ) : (
                  <>Nothing in the catalogue matches the selected filters.</>
                )}
              </p>
              <p className="mt-4">
                <Link href="/contact-us" className="btn-primary">
                  Enquire
                </Link>
              </p>
            </div>
          ) : (
            <>
              <p className="mt-8 text-[15px] font-medium text-body" role="status">
                {results.length} result{results.length === 1 ? "" : "s"}
                {query.q ? <> for “{query.q}”</> : null}
              </p>
              {/* Demo-fill: any sample result carries its tag below;
                  the legend renders once when any result is sample. */}
              {results.some((entry) => entry.sample) && (
                <div className="mt-6">
                  <DemoLegend />
                </div>
              )}
              <div className="mt-2">
                {results.map((entry) => (
                  <article key={`${entry.kind}:${entry.href}`} className="border-b border-line py-5">
                    <h3 className="flex flex-wrap items-center gap-3 text-[19px] font-semibold leading-snug text-heading">
                      <Link href={entry.href} className="transition-colors hover:text-signal">
                        {entry.title}
                      </Link>
                      {entry.sample && <SampleTag />}
                    </h3>
                    <p className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-block rounded-md border border-line bg-canvas px-2.5 py-1.5 text-[13px] font-semibold text-body">
                        {entry.kind === "course"
                          ? `Course — ${entry.category ?? ""}`
                          : entry.kind === "service"
                            ? "Service"
                            : "Page"}
                      </span>
                      {entry.statusLabel && (
                        <span className="inline-block rounded-md border border-line bg-canvas px-2.5 py-1.5 text-[13px] font-semibold text-body">
                          {entry.statusLabel}
                        </span>
                      )}
                    </p>
                    {entry.snippet && (
                      <p className={`mt-2 leading-7 ${entry.sample ? "text-sample" : "text-body"}`}>{entry.snippet}</p>
                    )}
                    <p className="mt-3">
                      <Link
                        href={entry.actionHref}
                        className="inline-flex min-h-11 items-center rounded-lg border border-line px-4 text-[15px] font-semibold text-body hover:border-brand-dark hover:text-brand-dark"
                      >
                        {entry.actionLabel} →
                      </Link>
                    </p>
                  </article>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

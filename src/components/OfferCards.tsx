import Link from "next/link";
import { getPromotions } from "@/lib/data";

// Offer card row (Leo redesign v1, DECISIONS.md §19) — the "board" of
// free first steps. Renders the active "card" promotions from the
// data layer (config seam today, site_promotions after migration
// 0005). Only offers that are actually true may be seeded (§19
// content rule). Zero active cards → the row hides itself.
export default async function OfferCards({ excludeSlug }: { excludeSlug?: string } = {}) {
  const cards = (await getPromotions("card")).filter((c) => c.slug !== excludeSlug);
  if (cards.length === 0) return null;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c, i) => (
        <article
          key={c.slug}
          data-reveal
          className="group relative flex flex-col overflow-hidden rounded-[18px] border border-line bg-parchment p-6 shadow-[0_1px_2px_rgba(31,24,16,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_rgba(31,24,16,0.12)]"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-1 -top-4 font-display text-[64px] font-semibold leading-none text-heading/[0.05]"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="eyebrow text-signal-strong">Free</p>
          <h3 className="mt-2.5 font-display text-[20px] font-semibold leading-snug text-heading">
            {c.title}
          </h3>
          {c.body && <p className="mt-2 text-sm leading-6 text-body">{c.body}</p>}
          {c.ctaLabel && c.ctaHref && (
            <Link
              href={c.ctaHref}
              className="mt-auto inline-block pt-4 text-sm font-bold text-signal transition-colors hover:text-signal-strong"
            >
              {c.ctaLabel} →
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}

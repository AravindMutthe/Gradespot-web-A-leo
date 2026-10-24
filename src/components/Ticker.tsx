import { courses } from "@/data/courses";
import { getPromotions } from "@/lib/data";

// Scrolling board (Leo redesign v1, DECISIONS.md §19) — the salon
// site's board pattern adapted to an institute: a slow ink ticker of
// FEATURED trainings and free services. Nothing here is hardcoded:
// course lines come from the catalogue data and the service lines
// from the promotions data layer (kind "ticker"), so the admin phase
// can reprogram the board from site_promotions. "Featured", not
// "Trending" — no view analytics exist to substantiate "trending".
// The animation is CSS-only, pauses on hover, and becomes a static
// wrapped board under prefers-reduced-motion. Duplication note
// (DECISIONS §25.34): the scrolling track needs two identical rows for
// the seamless loop; the second row is aria-hidden (visual-only), and
// there is deliberately NO sr-only copy — the visible row already
// exposes the text once to assistive tech, so a hidden copy would
// double it. Raw HTML still contains the aria-hidden visual duplicate
// (a marquee technique, not keyword text), but the accessible text is
// a single copy.
export default async function Ticker() {
  const lines = await getPromotions("ticker");
  const featured = courses.filter((c) => !c.catalogOnly).map((c) => c.title);
  const items = [...featured, ...lines.map((l) => l.title)];
  if (items.length === 0) return null;

  const row = (ariaHidden: boolean) => (
    <div aria-hidden={ariaHidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="flex items-center font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-paper/85"
        >
          <span className="px-5">{item}</span>
          <span aria-hidden className="text-brand-bright">
            ◆
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="ticker relative flex items-stretch overflow-hidden border-b border-ink-deep bg-ink-deep"
      role="region"
      aria-label="Featured trainings and free services"
    >
      <span className="eyebrow z-10 flex shrink-0 items-center bg-gradient-to-r from-brand to-brand-dark px-4 py-3 text-white">
        Featured
      </span>
      <div
        className="ticker-track flex items-center"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 4%, black 96%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 4%, black 96%, transparent)",
        }}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

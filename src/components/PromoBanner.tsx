import Image from "next/image";
import Link from "next/link";
import { getPromotions } from "@/lib/data";
import { business, telHref } from "@/data/site";

// Hero promotional banner (Leo redesign v1, DECISIONS.md §19) — a
// layered salon-style promo panel: ink stock, signal glow, serif
// headline, real course imagery and a floating fact chip. Content is
// NOT hardcoded: it renders the first active "banner" promotion from
// the data layer (today the config seam in src/data/promotions.ts;
// after migration 0005, the site_promotions table the admin drives).
// No active banner → the slot hides itself.
export default async function PromoBanner() {
  const [banner] = await getPromotions("banner");
  if (!banner) return null;
  const phone = business.phones[0];

  return (
    <section className="wrap">
      <div
        data-reveal
        className="panel-ink grid overflow-hidden rounded-[24px] lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div className="flex flex-col justify-center p-8 md:p-12">
          <p className="eyebrow text-brand-bright">Featured Offer</p>
          <h2 className="mt-4 font-display text-[34px] font-semibold leading-[1.12] text-paper md:text-[42px]">
            {banner.title}
          </h2>
          {banner.body && (
            <p className="mt-4 max-w-xl text-[15.5px] leading-7 text-paper/80">{banner.body}</p>
          )}
          <div className="mt-7 flex flex-wrap gap-3.5">
            {banner.ctaLabel && banner.ctaHref && (
              <Link href={banner.ctaHref} className="btn-primary">
                {banner.ctaLabel}
              </Link>
            )}
            <a href={telHref(phone)} className="btn-outline-light">
              Call {phone}
            </a>
          </div>
        </div>
        {banner.image && (
          <div className="relative min-h-[240px]">
            <Image
              src={banner.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-[#171208] via-transparent to-transparent lg:bg-gradient-to-r"
            />
            <p className="glass-panel absolute bottom-4 left-4 rounded-full px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink shadow-lg ring-1 ring-line">
              Online &amp; Offline · Dilsukhnagar
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

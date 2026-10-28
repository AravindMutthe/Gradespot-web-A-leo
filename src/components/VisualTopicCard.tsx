// Modern + stylish pass (feat/frontend-v3-modern-stylish, owner-approved
// 2026-10-29) — VisualTopicCard: the image-led card that sits
// ALONGSIDE the existing directory boards. Boards stay; these cards
// add the visual hierarchy the boards deliberately do not carry.
//
// IMAGE SLOT CONTRACT (read before supplying artwork — no component
// change is needed when real files land):
//   - Category art: SQUARE, 1:1, PNG or WebP, 1200x1200 recommended.
//     Conventional path: /images/topics/<topic-slug>.webp
//     (e.g. /images/topics/microsoft-azure.webp).
//   - Banner art: WIDE, 16:9, PNG or WebP, 1920x1080 recommended.
//     Conventional path: /images/banners/<name>.webp
//     (e.g. /images/banners/trainings-catalogue.webp).
//   - Course art (optional, per course): SQUARE, 1:1, PNG or WebP,
//     1200x1200 recommended. Conventional path:
//     /images/courses/<course-slug>.webp.
//   - Files MUST be local in the repo under public/. Remote URLs are
//     refused by design: any imageSrc that does not start with "/"
//     renders the tint panel instead, never a remote image.
//   - Until a file exists, a topic card with a motifKey renders
//     its finished SVG motif (TopicMotif): original abstract
//     geometry per topic, token colors only, decorative. A card
//     WITHOUT a motifKey (the hub offering cards) keeps the plain
//     token-tint panel below, unchanged.
//   - No artwork is faked, invented, or hotlinked.
//
// Sample discipline: when sample is true the card renders the same
// SampleTag the board rows render, so sample content is marked
// everywhere it appears. Sample markers and the legend are untouched
// by this component; purge still removes them in one place.

import Image from "next/image";
import Link from "next/link";
import { SampleTag } from "@/components/SampleTag";
import TopicMotif from "@/components/TopicMotif";

export interface VisualTopicCardProps {
  href: string;
  title: string;
  eyebrow: string;
  /** Muted meta line under the title, e.g. "7 courses" or a status line. */
  countLabel?: string;
  /** Short neutral description line, when the source row carries one. */
  description?: string | null;
  /** Local repo path only (must start with "/"). Remote URLs render the motif/tint panel. */
  imageSrc?: string | null;
  /** Topic slug for the finished SVG motif fallback (TopicMotif).
      When absent, the card keeps the plain token-tint panel. */
  motifKey?: string | null;
  /** Alt text for the artwork; defaults to the card title when art is supplied. */
  imageAlt?: string;
  /** Slot shape: "square" for category/course art, "wide" for banners. */
  aspect?: "square" | "wide";
  /** True when the card's content is owner-authorised sample data. */
  sample?: boolean;
  /** Door accent for the tint panel rule: training orange, business teal. */
  accent?: "training" | "business";
}

const ACCENT_RULE: Record<"training" | "business", string> = {
  training: "bg-door-training",
  business: "bg-door-business",
};

export default function VisualTopicCard({
  href,
  title,
  eyebrow,
  countLabel,
  description,
  imageSrc,
  imageAlt,
  motifKey,
  aspect = "square",
  sample = false,
  accent = "training",
}: VisualTopicCardProps) {
  // Local-only by design: anything that is not a repo path renders
  // the motif (when a motifKey is supplied) or the tint panel, so
  // a remote URL can never slip onto a page.
  const art = imageSrc && imageSrc.startsWith("/") ? imageSrc : null;

  return (
    <Link
      href={href}
      aria-label={`${title}${countLabel ? ` — ${countLabel}` : ""}`}
      data-reveal
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_1px_2px_rgba(31,24,16,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_rgba(31,24,16,0.13)]"
    >
      <span
        className={`relative block overflow-hidden bg-surface-muted ${
          aspect === "wide" ? "aspect-video" : "aspect-square"
        }`}
      >
        {art ? (
          <Image
            src={art}
            alt={imageAlt ?? title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : motifKey ? (
          <span aria-hidden className="absolute inset-0 block">
            <TopicMotif slug={motifKey} className="absolute inset-0 h-full w-full" />
            <span
              className={`absolute top-5 left-5 block h-[3px] w-14 rounded-full ${ACCENT_RULE[accent]}`}
            />
            <span className="absolute inset-x-5 bottom-5 block">
              <span className="eyebrow block text-muted">{eyebrow}</span>
            </span>
          </span>
        ) : (
          <span aria-hidden className="absolute inset-0 block">
            <span className="absolute -top-10 -right-10 block h-40 w-40 rounded-full bg-brand/10" />
            <span className="absolute -bottom-12 -left-8 block h-44 w-44 rounded-full bg-ink/5" />
            <span
              className={`absolute top-5 left-5 block h-[3px] w-14 rounded-full ${ACCENT_RULE[accent]}`}
            />
            <span className="absolute inset-x-5 bottom-5 block">
              <span className="eyebrow block text-muted">{eyebrow}</span>
            </span>
          </span>
        )}
      </span>
      <span className="flex flex-1 flex-col p-5">
        <span className="flex flex-wrap items-center gap-3">
          <span className="text-lg font-semibold text-ink group-hover:text-signal-strong">
            {title}
          </span>
          {sample && <SampleTag />}
        </span>
        {description && (
          <span className="mt-1 text-[15px] leading-6 text-body">{description}</span>
        )}
        {countLabel && <span className="mt-1 text-sm text-muted">{countLabel}</span>}
        <span aria-hidden className="mt-4 text-[15px] font-semibold text-signal-strong">
          Explore →
        </span>
      </span>
    </Link>
  );
}

import type { ReactNode } from "react";

// Final Design Phase 2 — DirectoryBoard: the ONE shared board system
// for both doors (Trainings + IT Services) and all directory surfaces
// (trainings hub, /trainings/courses, /trainings/category/[slug],
// services directory).
//
// DOOR POLARITY, as agreed (Das's qualifications adopted): the two
// doors are ONE brand system, not two disconnected systems. Everything
// structural is shared — PageHero above, this board chrome, the
// Phase 1 row-hover treatment on rows, the same CTA button styles.
// The ONLY door-specific styling is the eyebrow label and the thin
// solid accent rule under the board header (training = brand orange,
// business = teal). No second card language, no second row language,
// no gradient borders, no large cards: rows stay flat text-first
// rows inside the board. A future large-card treatment would need a
// new gate decision and is deliberately not built here.
//
// CANDIDATE tokens: --color-door-training / --color-door-business are
// CANDIDATES ONLY. Gate 1 owner review of tokens + typography is
// still pending; this component finalizes nothing. Board titles use
// plain semibold text (no display-serif decision) for the same reason.
//
// Max-zoom care: no fixed widths, no nowrap, no horizontal-scroll
// containers anywhere in this component; rows already flex-wrap.
// Narrow-width rendering remains owner-phone verification.

export type DirectoryDoor = "training" | "business";

const DOOR_META: Record<
  DirectoryDoor,
  { eyebrowDefault: string; accentClass: string; accentLabel: string }
> = {
  training: {
    eyebrowDefault: "Training",
    accentClass: "bg-door-training",
    accentLabel: "Training door accent",
  },
  business: {
    eyebrowDefault: "IT Services",
    accentClass: "bg-door-business",
    accentLabel: "Business door accent",
  },
};

interface DirectoryBoardProps {
  door: DirectoryDoor;
  title: string;
  /** Small label above the title; defaults to the door name. */
  eyebrow?: string;
  /** Truthful count/status line under the title (real counts only). */
  countLine?: string;
  /** Supporting line under the title (e.g. a group description). */
  description?: string;
  children: ReactNode;
}

export default function DirectoryBoard({
  door,
  title,
  eyebrow,
  countLine,
  description,
  children,
}: DirectoryBoardProps) {
  const meta = DOOR_META[door];
  return (
    <section aria-label={title} className="min-w-0">
      <p className="text-[13px] font-bold tracking-[0.08em] text-muted uppercase">
        {eyebrow ?? meta.eyebrowDefault}
      </p>
      <h2 className="mt-1 text-2xl font-semibold text-ink">{title}</h2>
      <span
        aria-hidden
        title={meta.accentLabel}
        className={`mt-3 block h-[3px] w-14 rounded-full ${meta.accentClass}`}
      />
      {countLine && <p className="mt-3 text-[15px] text-muted">{countLine}</p>}
      {description && <p className="mt-2 max-w-2xl text-base leading-7 text-muted">{description}</p>}
      <div className="mt-4 min-w-0">{children}</div>
    </section>
  );
}

// Direction A — "The Prospectus" (design-focus brief §4, 2026-10-29).
// JSON chapter contract: a page is an ordered array of chapter
// objects (cover, contents, chapter, enquiry), each rendered by one
// template. Validated at build with Zod (already a dependency):
// pages run parseChapters() on the builder output before render, so
// a malformed contract fails the build instead of shipping a broken
// page. Content itself still comes from the existing data files —
// this contract shapes presentation only; it never invents content.
// B1 rules it carries structurally: slugs immutable (chapters carry
// hrefs, never rename slugs), null-never-defaults (optional fields
// stay optional), enquiry-only rendering (the enquiry chapter is a
// link to enquiry, never an enrolment promise).

import { z } from "zod";

export const chapterKindSchema = z.enum(["cover", "contents", "chapter", "enquiry"]);
export type ChapterKind = z.infer<typeof chapterKindSchema>;

export const chapterSchema = z.object({
  /** Template kind: cover | contents | chapter | enquiry. */
  kind: chapterKindSchema,
  /** Anchor/id for the chapter (contents links target it). Unique per page. */
  id: z.string().min(1),
  /** Two-digit chapter number, "01", "02", … — sequential per page. */
  number: z.string().regex(/^\d{2}$/),
  /** Chapter title, rendered verbatim. */
  title: z.string().min(1),
  /** Optional one-line description or count line (computed, never invented). */
  description: z.string().optional(),
  /** Optional href for contents/index entries (must be an existing route). */
  href: z.string().min(1).optional(),
});

export type Chapter = z.infer<typeof chapterSchema>;

export const chaptersSchema = z
  .array(chapterSchema)
  .refine((chapters) => new Set(chapters.map((c) => c.id)).size === chapters.length, {
    message: "chapter ids must be unique per page",
  })
  .refine(
    (chapters) =>
      chapters.every((c, i) => c.number === String(i + 1).padStart(2, "0")),
    { message: "chapter numbers must be sequential from 01" },
  );

/** Validate a chapter array at build; throws on any contract violation. */
export function parseChapters(input: unknown): Chapter[] {
  return chaptersSchema.parse(input);
}

/** Two-digit chapter number for a 1-based position. */
export function chapterNumber(position: number): string {
  return String(position).padStart(2, "0");
}

export interface ContentsEntry {
  title: string;
  href: string;
  /** Optional count/status line, computed from data only. */
  meta?: string;
}

/**
 * Build a contents chapter list from index entries (home categories,
 * interests, services). Numbers are sequential per list; meta lines
 * are caller-computed (counts), never invented here.
 */
export function buildContentsChapters(entries: ContentsEntry[]): Chapter[] {
  return parseChapters(
    entries.map((entry, i) => ({
      kind: "contents" as const,
      id: `contents-${i + 1}`,
      number: chapterNumber(i + 1),
      title: entry.title,
      description: entry.meta,
      href: entry.href,
    })),
  );
}

/**
 * Build the chapter spine of a course detail page. Syllabus is always
 * chapter 01 on a full page; About is chapter 02 only where about
 * sections actually exist; Enquire is the closing chapter (02 or 03).
 * Held pages take no chapters — they keep their held branch exactly.
 */
export function buildDetailChapters(hasAbout: boolean): Chapter[] {
  const chapters: { kind: ChapterKind; id: string; title: string }[] = [
    { kind: "chapter", id: "syllabus", title: "Syllabus" },
  ];
  if (hasAbout) chapters.push({ kind: "chapter", id: "about", title: "About the course" });
  chapters.push({ kind: "enquiry", id: "enquire", title: "Enquire" });
  return parseChapters(
    chapters.map((c, i) => ({ ...c, number: chapterNumber(i + 1) })),
  );
}

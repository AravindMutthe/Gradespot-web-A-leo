// Frontend 3.0 — Stage 3 trainings index row model (pure, no rendering).
//
// Rules applied here, from the Stage 2→3 gate agreement:
// - One row per course, grouped by the repo category order, unchanged.
// - No images on rows: image provenance is unreviewed, so rows are text-first.
// - Catalogue-only courses and the three held full-detail courses are
//   title-only: no summary, no level, no mode, no certification, no
//   availability claim, and a single enquiry action. Nothing is
//   auto-completed and no truncated summary is rendered as complete text.
// - Duration comes only from the repo duration map. Where a course has
//   no repo duration, the label is "Duration confirmed on enquiry" for
//   the three named courses and "Duration not yet published" otherwise.
//   Held rows carry no duration line at all: their facts are contested
//   or held, so asserting a duration for them would present an
//   unverified fact as settled.
// - A title carrying an outcome promise is neutralised for display.
//   The source data file is never edited; only the displayed title changes.
// - Conversion actions on the index are limited to the two labels below.
//   No other conversion label is produced by this module.

import { getSampleCourse } from "@/lib/demo-fill";

export interface TrainingRowInput {
  slug: string;
  title: string;
  category: string;
  summary: string;
  catalogOnly: boolean;
  duration?: string;
}

export interface TrainingRow {
  slug: string;
  category: string;
  displayTitle: string;
  description: string | null;
  durationLabel: string | null;
  statusLabel: string | null;
  actionLabel: string;
  actionHref: string;
  titleHref: string | null;
  heldBack: boolean;
  // Demo-fill: true when the row renders owner-authorised SAMPLE
  // data (summary + duration). Templates must render the Sample tag
  // + sample font color whenever this is true. False for verified
  // rows and for any row with no sample record.
  sample: boolean;
}

// Summaries that end mid-sentence in the repo data. Rendering them
// would present a fragment as a complete description, so these rows
// are held back to title-only until the owner/content approver
// supplies complete text.
const HELD_SUMMARY_SLUGS = new Set([
  "ccna-200-301",
  "ccnp-350-401-encor",
  "digital-marketing",
]);

// The only courses whose duration label says "confirmed on enquiry"
// without a repo duration. Every other course without a repo duration
// says "not yet published".
const DURATION_ON_ENQUIRY_SLUGS = new Set([
  "azure-fundamentals-az-900",
  "azure-administrator-az-104",
  "computer-hardware-and-networking",
  "soc-analyst",
]);

const PENDING_LABEL = "Course details to be confirmed";
const ENQUIRE_LABEL = "Enquire About This Course";
const DETAILS_LABEL = "View course details";

// Strip an outcome-promise segment (for example a "| ... in 90 Days"
// suffix) from a displayed title. Returns the original title when
// there is no such segment or stripping would leave nothing.
export function displayCourseTitle(title: string): string {
  if (!/job-ready/i.test(title)) return title;
  const stripped = title
    .replace(/\s*\|\s*[^|]*job-ready[^|]*/i, "")
    .replace(/\s*[-–—]\s*[^|]*job-ready[^|]*/i, "")
    .trim();
  return stripped.length > 0 ? stripped : title;
}

export function buildTrainingRow(course: TrainingRowInput): TrainingRow {
  const heldBack = course.catalogOnly || HELD_SUMMARY_SLUGS.has(course.slug);
  const displayTitle = displayCourseTitle(course.title);

  // Demo-fill (owner-authorised, preview only): a sample record
  // un-holds the row for demo — filled summary + duration, "View
  // course details" action, sample flag set. Sample content closes
  // no R-row; the flag is what lets the purge find it later. The
  // held path below survives for any slug with no sample record.
  const sample = getSampleCourse(course.slug);
  if (sample) {
    return {
      slug: course.slug,
      category: course.category,
      displayTitle,
      description: sample.summary,
      durationLabel: `Duration: ${sample.duration}`,
      statusLabel: null,
      actionLabel: DETAILS_LABEL,
      actionHref: `/trainings/${course.slug}`,
      titleHref: `/trainings/${course.slug}`,
      heldBack: false,
      sample: true,
    };
  }

  let durationLabel: string | null;
  if (heldBack && HELD_SUMMARY_SLUGS.has(course.slug)) {
    // Held full-detail rows: duration facts are part of what is held.
    durationLabel = null;
  } else if (course.duration) {
    durationLabel = `Duration: ${course.duration}`;
  } else if (DURATION_ON_ENQUIRY_SLUGS.has(course.slug)) {
    durationLabel = "Duration confirmed on enquiry";
  } else {
    durationLabel = "Duration not yet published";
  }

  if (heldBack) {
    return {
      slug: course.slug,
      category: course.category,
      displayTitle,
      description: null,
      durationLabel: course.catalogOnly ? durationLabel : null,
      statusLabel: PENDING_LABEL,
      actionLabel: ENQUIRE_LABEL,
      actionHref: "/contact-us",
      titleHref: null,
      heldBack: true,
      sample: false,
    };
  }

  return {
    slug: course.slug,
    category: course.category,
    displayTitle,
    description: course.summary,
    durationLabel,
    statusLabel: null,
    actionLabel: DETAILS_LABEL,
    actionHref: `/trainings/${course.slug}`,
    titleHref: `/trainings/${course.slug}`,
    heldBack: false,
    sample: false,
  };
}

export interface TrainingGroup {
  category: string;
  rows: TrainingRow[];
}

// Groups rows by the given category order, preserving the input order
// of rows inside each group. Categories with no rows are omitted.
// Slugs, categories and order are never changed here.
export function groupTrainingRows(
  rows: TrainingRow[],
  categories: string[],
): TrainingGroup[] {
  const groups: TrainingGroup[] = [];
  for (const category of categories) {
    const groupRows = rows.filter((r) => r.category === category);
    if (groupRows.length > 0) groups.push({ category, rows: groupRows });
  }
  return groups;
}

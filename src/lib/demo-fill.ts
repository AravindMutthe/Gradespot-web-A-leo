// Frontend 3.0 — demo-fill lookups (pure, no rendering).
//
// Single enforcement point for sample data: every model that renders
// a sample datum looks it up here, so a sample slug can never render
// through a forgotten page edit without its flag. Templates render
// the flag as SampleTag + the sample font color (see components).
//
// Sample color #6D28D9 (violet-700), measured by relative-luminance
// computation (WCAG 2.2): 6.79:1 on canvas #F8FAFC, 7.10:1 on white
// #FFFFFF, 6.48:1 on legend tint #F5F3FF, 6.32:1 on surface-muted
// #EEF2F7, white-on-#6D28D9 7.10:1 — AA normal PASS on every surface
// sample text renders on. Sample-colored text is NEVER rendered on
// the dark ink hero: detail heroes for sample courses show the title
// and a white-background Sample tag only; sample body text lives on
// light surfaces. The color is deliberately outside the brand
// palette (orange / charcoal / ink / teal / link blue), so sample
// content cannot be mistaken for brand styling.

import {
  SAMPLE_COURSE_FEE_RANGES,
  SAMPLE_COURSES,
  SAMPLE_INSTITUTE_TIER_RANGES,
  SAMPLE_SERVICES,
  type SampleCourse,
  type SampleService,
} from "@/data/demo-samples";

export const SAMPLE_COLOR = "#6D28D9";

export const SAMPLE_LEGEND_TEXT =
  "Demo preview — data marked Sample is placeholder and will be replaced with official GradeSpot data.";

const sampleCourseBySlug = new Map(SAMPLE_COURSES.map((s) => [s.slug, s]));
const sampleServiceBySlug = new Map(SAMPLE_SERVICES.map((s) => [s.slug, s]));

export function getSampleCourse(slug: string): SampleCourse | undefined {
  return sampleCourseBySlug.get(slug);
}

export function getSampleService(slug: string): SampleService | undefined {
  return sampleServiceBySlug.get(slug);
}

export const SAMPLE_COURSE_SLUGS: string[] = SAMPLE_COURSES.map((s) => s.slug);
export const SAMPLE_SERVICE_SLUGS: string[] = SAMPLE_SERVICES.map((s) => s.slug);

export { SAMPLE_COURSE_FEE_RANGES, SAMPLE_INSTITUTE_TIER_RANGES };

// AEO answer-first summaries (§25.22–25.23). Every summary is assembled
// ONLY from published fields (course data, harvested detail, job-role
// sections) — anything unpublished is answered as "confirmed on
// enquiry", never invented. Target length 40–60 words; the word counts
// for sample courses are logged in DECISIONS.

import type { Course } from "@/data/courses";
import type { CourseDetail } from "@/data/course-details";
import { getJobRoles } from "@/lib/course-faqs";

export function courseAnswerSummary(
  course: Course,
  detail: CourseDetail | undefined,
): string {
  const short = detail?.short ?? course.title;
  if (course.catalogOnly) {
    return (
      `${course.title} is part of GradeSpot's training catalogue at its Dilsukhnagar, ` +
      `Hyderabad institute, with online and offline classes. Learners get hands-on labs ` +
      `and live classes, not just theory. Batch schedules, curriculum and fees are ` +
      `confirmed on enquiry — talk to a trainer for the complete program.`
    );
  }
  const parts: string[] = [];
  parts.push(
    `${short} is a training at GradeSpot IT Solutions in Dilsukhnagar, Hyderabad` +
      `${course.duration ? ` lasting ${course.duration}` : ""}, with online and offline classes.`,
  );
  if (detail?.outcome) parts.push(`The published outcome is ${detail.outcome}.`);
  if (detail?.certification) parts.push(`It prepares learners for ${detail.certification}.`);
  const roles = getJobRoles(course).slice(0, 3);
  if (roles.length > 0) parts.push(`Roles it prepares you for include ${roles.join(", ")}.`);
  parts.push(
    `A free demo class is available, and batch schedules are confirmed on enquiry.`,
  );
  return parts.join(" ");
}

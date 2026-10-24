// Central metadata builders — v1 hardening (§25.19). Every dynamic
// route's metadata is GENERATED here from the single file-based data
// source (src/data/* via @/lib/data), never hand-written per page:
// editing a course/service in one place updates its title,
// description, OG/Twitter tags, canonical, and (via @/lib/schema) its
// JSON-LD everywhere. Title/description strings are identical to the
// ones the routes previously inlined; the only addition is per-route
// OG/Twitter images (previously every route silently inherited the
// layout default). No data backend change: this is plumbing only.

import type { Metadata } from "next";
import type { Course } from "@/data/courses";
import type { CourseDetail } from "@/data/course-details";
import type { Service } from "@/data/services";
import type { Article } from "@/data/articles";

const DEFAULT_OG_IMAGE = "/images/courses/ceh.jpg";

function social(title: string, description: string, image: string) {
  return {
    openGraph: { title, description, images: [{ url: image }] },
    twitter: { card: "summary_large_image" as const, title, description, images: [image] },
  };
}

export function coursePageMetadata(course: Course, canonicalPath: string): Metadata {
  const description =
    course.summary || `${course.title} — training at GradeSpot IT Solutions, Hyderabad.`;
  return {
    title: course.title,
    description,
    alternates: { canonical: canonicalPath },
    ...social(course.title, description, course.image ?? DEFAULT_OG_IMAGE),
  };
}

export function lpPageMetadata(
  course: Course,
  detail: CourseDetail | undefined,
  canonicalPath: string,
): Metadata {
  const short = detail?.short ?? course.title;
  const title = `${short} Training in Hyderabad`;
  const description = `${short} training in Hyderabad at GradeSpot IT Solutions, Dilsukhnagar — online & offline classes. ${detail?.outcome ?? "Book a free counselling call."}`;
  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    ...social(title, description, course.image ?? DEFAULT_OG_IMAGE),
  };
}

export function servicePageMetadata(service: Service, canonicalPath: string): Metadata {
  const description =
    service.summary ?? `${service.title} — a GradeSpot IT Solutions service, Hyderabad.`;
  return {
    title: service.title,
    description,
    alternates: { canonical: canonicalPath },
    ...social(service.title, description, DEFAULT_OG_IMAGE),
  };
}

export function comparisonPageMetadata(
  title: string,
  aTitle: string,
  bTitle: string,
  canonicalPath: string,
): Metadata {
  const description = `${title} A side-by-side comparison of ${aTitle} and ${bTitle} at GradeSpot IT Solutions, Hyderabad — focus, duration, certification, fees where published, and job roles.`;
  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    ...social(title, description, DEFAULT_OG_IMAGE),
  };
}

export function articlePageMetadata(article: Article, canonicalPath: string): Metadata {
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: canonicalPath },
    ...social(article.title, article.excerpt, DEFAULT_OG_IMAGE),
  };
}

/** Trainings index metadata, derived from the live catalogue: the
 *  course count and the categories actually present in the data. */
export function trainingsIndexMetadata(courses: Course[]): Metadata {
  const categories = [...new Set(courses.map((c) => c.category))];
  const description =
    `${courses.length} IT trainings across ${categories.join(", ")} at GradeSpot IT Solutions, Dilsukhnagar, Hyderabad — online & offline classes.`;
  return {
    title: "Trainings",
    description,
    alternates: { canonical: "/trainings" },
    ...social("Trainings", description, DEFAULT_OG_IMAGE),
  };
}

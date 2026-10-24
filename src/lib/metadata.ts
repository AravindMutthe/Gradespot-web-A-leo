// Central metadata builders — v1 hardening (§25.19) + SEO/AEO pass
// (§25.21–25.25). Every dynamic route's metadata is GENERATED here from
// the single file-based data source (src/data/* via @/lib/data), never
// hand-written per page: editing a course/service in one place updates
// its title, description, OG/Twitter tags, canonical, and (via
// @/lib/schema) its JSON-LD everywhere. Every page also declares its OWN
// title, description, canonical, OG image and Twitter card — no page
// silently inherits the layout defaults. og:locale is en_IN (English
// content, India audience); hreflang carries ONLY the self-referencing
// "en" (no Telugu/Hindi versions exist, so none are declared).

import type { Metadata } from "next";
import type { Course } from "@/data/courses";
import type { CourseDetail } from "@/data/course-details";
import type { Service } from "@/data/services";
import type { Article } from "@/data/articles";

const DEFAULT_OG_IMAGE = "/images/courses/ceh.jpg";
const OG_LOCALE = "en_IN";

function social(title: string, description: string, image: string, path: string) {
  return {
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      locale: OG_LOCALE,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: path,
      languages: { en: path },
    },
  };
}

/** Route-level metadata for static pages. `image` must be a content
 *  image for the page where one exists, else the documented catalogue
 *  fallback (DEFAULT_OG_IMAGE) — see DECISIONS §25.24 for the per-page
 *  content-vs-fallback table. */
export function staticPageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const image = opts.image ?? DEFAULT_OG_IMAGE;
  return {
    title: opts.title,
    description: opts.description,
    ...social(opts.title, opts.description, image, opts.path),
  };
}

// Location/mode clause appended to a course description ONLY when the
// summary itself does not already name Hyderabad — factual site-wide
// copy (Dilsukhnagar institute, online & offline classes), never a
// claim about the individual course beyond its published mode.
function withPlace(description: string): string {
  if (/hyderabad/i.test(description)) return description;
  return `${description} Training in Dilsukhnagar, Hyderabad with online and offline classes.`;
}

export function coursePageMetadata(course: Course, canonicalPath: string): Metadata {
  const description = withPlace(
    course.summary || `${course.title} — training at GradeSpot IT Solutions, Hyderabad.`,
  );
  return {
    title: course.title,
    description,
    ...social(course.title, description, course.image ?? DEFAULT_OG_IMAGE, canonicalPath),
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
    ...social(title, description, course.image ?? DEFAULT_OG_IMAGE, canonicalPath),
  };
}

export function servicePageMetadata(service: Service, canonicalPath: string): Metadata {
  const description = withPlace(
    service.summary ?? `${service.title} — a GradeSpot IT Solutions service, Hyderabad.`,
  );
  return {
    title: service.title,
    description,
    ...social(service.title, description, DEFAULT_OG_IMAGE, canonicalPath),
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
    ...social(title, description, DEFAULT_OG_IMAGE, canonicalPath),
  };
}

export function articlePageMetadata(article: Article, canonicalPath: string): Metadata {
  return {
    title: article.title,
    description: article.excerpt,
    ...social(article.title, article.excerpt, DEFAULT_OG_IMAGE, canonicalPath),
  };
}

/** Trainings index metadata, derived from the live catalogue: the
 *  course count and the categories actually present in the data. */
export function trainingsIndexMetadata(courses: Course[]): Metadata {
  const categories = [...new Set(courses.map((c) => c.category))];
  const title = "IT Trainings in Hyderabad";
  const description =
    `IT courses and trainings in Hyderabad: ${courses.length} trainings across ${categories.join(", ")} at GradeSpot IT Solutions, Dilsukhnagar, Hyderabad — online & offline classes.`;
  return {
    title,
    description,
    ...social(title, description, DEFAULT_OG_IMAGE, "/trainings"),
  };
}

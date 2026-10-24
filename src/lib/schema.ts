// Structured-data builders (research floor set: EducationalOrganization,
// Course, FAQPage, BreadcrumbList — ppc report §2.4 / folder-1 Q5).
// Every value comes from content already published on this site
// (src/data/*). Nothing is invented: no AggregateRating (no verified
// rating exists in the record), no geo coordinates, no opening-hours
// days (the site publishes hours without days).

import { business, telHref } from "@/data/site";
import type { Course } from "@/data/courses";

export const SITE_URL = "https://gsitssolutions.com";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: business.name,
    legalName: business.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-light.png`,
    email: business.emails[0],
    telephone: telHref(business.phones[0]),
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "16-126, 2nd Floor, Near Sai Baba Temple, Road No.1, Sri Krishna Nagar, Dilsukhnagar",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500060",
      addressCountry: "IN",
    },
    sameAs: [
      "https://in.linkedin.com/company/gradespot-it-solutions",
      "https://www.youtube.com/watch?v=owhuBrGIOsE",
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  const clean = items.filter((f) => f.q && f.a);
  if (clean.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: clean.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

// FAQ Q&A pairs live inside course sections styled "faq": paragraphs
// alternate question, answer, question, answer…
export function courseFaqs(course: Course): { q: string; a: string }[] {
  const out: { q: string; a: string }[] = [];
  for (const s of course.sections) {
    if (s.style !== "faq") continue;
    for (let i = 0; i + 1 < s.paragraphs.length; i += 2) {
      out.push({ q: s.paragraphs[i], a: s.paragraphs[i + 1] });
    }
  }
  return out;
}

export function courseSchema(course: Course) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description:
      course.summary ||
      `${course.title} — training at GradeSpot IT Solutions, Dilsukhnagar, Hyderabad.`,
    provider: {
      "@type": "EducationalOrganization",
      name: business.name,
      sameAs: SITE_URL,
    },
  };
  if (!course.catalogOnly) {
    // The site publishes "Online & Offline Classes" for its trainings.
    schema.hasCourseInstance = {
      "@type": "CourseInstance",
      courseMode: ["Online", "Onsite"],
    };
    // Offers only where a real published pricing section exists
    // ("Plan Name — ₹Price" paragraphs), never invented fees.
    const offers: Record<string, unknown>[] = [];
    for (const s of course.sections) {
      if (s.style !== "pricing") continue;
      for (const p of s.paragraphs) {
        const m = p.match(/₹\s*([\d,]+)/);
        if (!m) continue;
        offers.push({
          "@type": "Offer",
          category: p.split(" — ")[0] ?? "Course fee",
          price: m[1].replace(/,/g, ""),
          priceCurrency: "INR",
        });
      }
    }
    if (offers.length > 0) schema.offers = offers;
  }
  return schema;
}

// LocalBusiness view of the same organization for the Dilsukhnagar
// local page (ppc report §2.4: LocalBusiness + address + areaServed for
// local/AEO legibility). Same restraint as organizationSchema: no geo
// coordinates and no opening-hours days exist in the published record,
// so neither is emitted.
export function localBusinessSchema() {
  return {
    ...organizationSchema(),
    "@type": ["EducationalOrganization", "LocalBusiness"],
    areaServed: "Hyderabad, Telangana, IN",
    priceRange: "Course fees published per course; other fees confirmed on enquiry",
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(business.address)}`,
  };
}

export function serviceSchema(title: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    url: `${SITE_URL}/services/${slug}`,
    provider: {
      "@type": "EducationalOrganization",
      name: business.name,
      sameAs: SITE_URL,
    },
    areaServed: "Hyderabad, Telangana, IN",
  };
}

// Trainings index as an ItemList, generated from the live catalogue —
// the index page's JSON-LD counterpart to trainingsIndexMetadata.
export function trainingsIndexSchema(courses: Course[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "GradeSpot IT Solutions Trainings",
    numberOfItems: courses.length,
    itemListElement: courses.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.title,
      url: `${SITE_URL}/trainings/${c.slug}`,
    })),
  };
}

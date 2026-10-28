// Structured-data builders — SEO/AEO + strict-schema pass (DECISIONS.md
// §25.21–25.25). ONE canonical Organization entity, referenced by @id
// everywhere else; never redefined per page. Every value comes from
// content already published on this site (src/data/*) or from a verified
// external fact noted in DECISIONS. Nothing is invented:
// - NO AggregateRating (no verifiable aggregate exists in the record)
// - sameAs carries only the business's own web properties from repo
//   data plus the LinkedIn company page the site itself links in its
//   footer; the YouTube URL on record is a single video, not a
//   channel, so it is omitted and logged as a gap in DECISIONS
// - NO opening-hours days (the site publishes hours without days, so the
//   OpeningHoursSpecification carries opens/closes only)
// - geo is the Dilsukhnagar locality centre, verified against Wikipedia
//   (17.368784°N, 78.524652°E — the contact map centre sits in the same
//   locality); it is locality-level, not a surveyed premises pin
// - NO branches, NO invented fees/offers (offers only where a real
//   published pricing section exists)

import { business, telHref } from "@/data/site";
import type { Course } from "@/data/courses";
import { courseDetails } from "@/data/course-details";

// Canonical base — the LEO build itself is the ranking entity
// (DECISIONS §25.21): every canonical, OG URL and @id is
// self-referential to the Leo domain, NOT the official domain.
// Implication: the Leo build and gsitssolutions.com carry the same
// content, so search engines will treat them as duplicates and the
// self-canonical tells them to prefer the Leo build.
export const SITE_URL = "https://gradespot-leo-build-app.vercel.app";
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const ORG_DESCRIPTION =
  "GradeSpot IT Solutions is an IT training institute and services company in Dilsukhnagar, Hyderabad, Telangana, India, offering professional training programs for corporates and students across computer hardware, networking, cybersecurity, cloud computing, digital marketing and data science, with online and offline classes, plus IT services, corporate trainings, internships and certificate verification.";

const DISAMBIGUATING_DESCRIPTION =
  "GradeSpot IT Solutions is the IT training institute and services company based in Dilsukhnagar, Hyderabad, Telangana, India, founded and led by Founder & Managing Director Nikhil Duth D. It runs classroom and online IT trainings, corporate trainings, internships and IT services from its Dilsukhnagar institute and online across India. This entity is identified by its Dilsukhnagar, Hyderabad location, its founder, and its training-and-services business.";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@id": ORG_ID,
    "@type": ["EducationalOrganization", "LocalBusiness"],
    name: business.name,
    legalName: business.legalName,
    description: ORG_DESCRIPTION,
    disambiguatingDescription: DISAMBIGUATING_DESCRIPTION,
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
    geo: {
      "@type": "GeoCoordinates",
      latitude: 17.368784,
      longitude: 78.524652,
    },
    // Hours as published on the site (utility strip + local page):
    // 8:00 AM – 9:00 PM. Days are NOT published anywhere, so no
    // dayOfWeek is asserted — Aravind to confirm the days (DECISIONS).
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      opens: "08:00",
      closes: "21:00",
    },
    // In-person area + India-wide for the real online-classes offering.
    areaServed: ["Dilsukhnagar, Hyderabad, Telangana, India", "India"],
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(business.address)}`,
    // Own web properties from repo data only (site.ts) plus the LinkedIn
    // company page the site itself links in its footer (ui.tsx) as its
    // own profile. The YouTube URL on record is a single video, not a
    // channel/profile, so it is NOT a sameAs candidate — gap in DECISIONS.
    sameAs: [
      "https://gsitssolutions.com",
      "https://digital.gsitssolutions.com",
      "https://digidefense.in",
      "https://in.linkedin.com/company/gradespot-it-solutions",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@id": WEBSITE_ID,
    "@type": "WebSite",
    url: SITE_URL,
    name: business.name,
    description: ORG_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

// Per-page WebPage node. speakableSelector, when given, must be the CSS
// selector of a visible answer-first paragraph on that page.
export function webPageSchema(path: string, name: string, speakableSelector?: string) {
  const page: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en",
  };
  if (speakableSelector) {
    page.speakable = {
      "@type": "SpeakableSpecification",
      cssSelector: [speakableSelector],
    };
  }
  return page;
}

export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/about-us#webpage`,
    url: `${SITE_URL}/about-us`,
    name: "About Us",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    mainEntity: { "@id": ORG_ID },
    inLanguage: "en",
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

export function courseSchema(
  course: Course,
  opts?: { displayTitle?: string; held?: boolean; suppressOffers?: boolean },
) {
  // Stage 5: the detail template passes displayTitle (SOC neutralised)
  // and held (held pages get a minimal schema). Callers without opts
  // (the LP pages) keep the previous behaviour exactly.
  const name = opts?.displayTitle ?? course.title;
  const held = opts?.held ?? false;
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    url: `${SITE_URL}/trainings/${course.slug}`,
    description: held
      ? `${name} — training at GradeSpot IT Solutions, Dilsukhnagar, Hyderabad. Course details are confirmed on enquiry.`
      : course.summary ||
        `${course.title} — training at GradeSpot IT Solutions, Dilsukhnagar, Hyderabad.`,
    // Single canonical entity by reference — never redefined here.
    provider: { "@id": ORG_ID },
  };
  if (!course.catalogOnly && !held) {
    // The site publishes "Online & Offline Classes" for its trainings.
    schema.hasCourseInstance = {
      "@type": "CourseInstance",
      courseMode: ["online", "onsite"],
      // NO courseSchedule: batch schedules are "confirmed on enquiry"
      // (site FAQ), which is not a schedule — omitted, never invented.
    };
    // educationalCredentialAwarded ONLY where course-details names a
    // certification for this course (11 full courses). Catalogue
    // courses and courses without a named certification get none.
    const detail = courseDetails[course.slug];
    if (detail?.certification) {
      schema.educationalCredentialAwarded = detail.certification;
    }
    // Stage 5: the detail template never publishes offers (no verified
    // price exists). Other callers keep the previous behaviour unless
    // they pass suppressOffers.
    if (!opts?.suppressOffers) {
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
            url: `${SITE_URL}/trainings/${course.slug}`,
          });
        }
      }
      if (offers.length > 0) schema.offers = offers;
    }
  }
  return schema;
}

export function serviceSchema(title: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    url: `${SITE_URL}/services/${slug}`,
    provider: { "@id": ORG_ID },
    areaServed: "Dilsukhnagar, Hyderabad, Telangana, India",
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

// Person schema — ONLY for the one team member with a dedicated profile
// page carrying real published facts (Nikhil Duth D). No other member
// gets a Person node: they have no profile page and no published
// detail beyond name/role on the index. No personal LinkedIn is linked:
// the site links only the company's LinkedIn page (see sameAs), never
// a personal profile. Skill bars on the profile page (SOC Analysis,
// Technical Trainer, 95%) become knowsAbout, not invented credentials.
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nikhil Duth D",
    jobTitle: "Founder & Managing Director",
    email: "nikhil@gsitssolutions.com",
    url: `${SITE_URL}/team-members/nikhil-duth-d`,
    worksFor: { "@id": ORG_ID },
    knowsAbout: ["SOC Analysis", "Technical Trainer"],
  };
}

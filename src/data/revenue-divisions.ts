// Revenue divisions — GradeSpot revenue strategy (Axon docs/REVENUE-STRATEGY.md),
// applied to the Nexus build WITHOUT publishing any price, traffic figure,
// payment flow or authorized-partner claim.
//
// Each division lists ONLY services that already exist in src/data/services.ts
// (or, for Education, the real trainings catalogue). A division with no real
// offering is marked Planned and is never presented as available or enrollable.
// "Get a Quote" leads to the draft-only deal brief on
// /corporate-and-international; "Book a Consultation" leads to /contact-us;
// "Enroll Now" / "Book Free Demo" lead to the existing /register lead flow
// and only for real courses. No price, no checkout, no recurring-billing
// claim anywhere in this file.

import { services } from "@/data/services";

export type RevenueDivisionStatus = "Available" | "Partial" | "Planned";

export interface RevenueDivision {
  key: string;
  title: string;
  blurb: string;
  status: RevenueDivisionStatus;
  statusNote: string;
  serviceSlugs: string[];
  /** Secondary destination for the division, e.g. the trainings catalogue. */
  exploreHref: string;
  exploreLabel: string;
}

export const revenueDivisions: RevenueDivision[] = [
  {
    key: "web-software",
    title: "Web, Software & Digital Engineering",
    blurb:
      "Business websites, digital presence and design — projects plus ongoing support agreed on consultation.",
    status: "Available",
    statusNote: "Available — see the services below.",
    serviceSlugs: ["web-development", "digital-marketing-solutions", "logo-designing"],
    exploreHref: "/services",
    exploreLabel: "All services",
  },
  {
    key: "education",
    title: "Education, Training & Professional Development",
    blurb:
      "Corporate, industrial and college training, workshops and internships — plus the published trainings catalogue.",
    status: "Available",
    statusNote: "Available — enrollable only for real, published courses.",
    serviceSlugs: ["corporate-trainings", "internships", "industrial-trainings", "college-workshops"],
    exploreHref: "/trainings",
    exploreLabel: "Explore programs",
  },
  {
    key: "cloud-managed",
    title: "Cloud, DevOps & Managed IT Services",
    blurb:
      "Infrastructure work today, and ongoing support and maintenance arrangements agreed on consultation — scope and terms are quoted, never sold at a published price here.",
    status: "Partial",
    statusNote:
      "Partial — network infrastructure building is available; a standalone cloud/DevOps implementation offering is Planned.",
    serviceSlugs: ["network-infrastructure-building"],
    exploreHref: "/contact-us",
    exploreLabel: "Book a consultation",
  },
  {
    key: "ai-automation",
    title: "AI, Automation & Business Solutions",
    blurb:
      "AI chatbots, automation and workflow integration — a strategy division with no published GradeSpot offering yet.",
    status: "Planned",
    statusNote: "Planned — no such service is published; ask on consultation, do not buy here.",
    serviceSlugs: [],
    exploreHref: "/contact-us",
    exploreLabel: "Ask about this",
  },
  {
    key: "cybersecurity",
    title: "Cybersecurity & IT Assurance",
    blurb:
      "Security assessments, architecture and monitoring — assessments plus remediation and periodic reviews, scoped on consultation.",
    status: "Available",
    statusNote: "Available — see the service below.",
    serviceSlugs: ["cybersecurity-services"],
    exploreHref: "/services/cybersecurity-services",
    exploreLabel: "Cybersecurity services",
  },
  {
    key: "digital-learning-saas",
    title: "Digital Learning Products & SaaS",
    blurb:
      "Paid course libraries, practice exams, certificates and institute tools — a future division, not a product sold here.",
    status: "Planned",
    statusNote: "Planned — no digital product or subscription is sold on this site.",
    serviceSlugs: [],
    exploreHref: "/trainings",
    exploreLabel: "Browse trainings",
  },
  {
    key: "partnerships",
    title: "Partnerships, Referrals & Business Enablement",
    blurb:
      "Staffing, consultancy and training partnerships — discussion only. No authorized-reseller or authorized-partner claim is made here.",
    status: "Available",
    statusNote: "Available as a discussion — partnership terms are drafted, never signed, through a form alone.",
    serviceSlugs: ["us-it-staffing", "domestic-consultancy", "abroad-consultancy"],
    exploreHref: "/partner-with-us",
    exploreLabel: "Partner discussion",
  },
];

/** Real service objects for a division, resolved against src/data/services.ts. */
export function divisionServices(division: RevenueDivision) {
  return division.serviceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
}

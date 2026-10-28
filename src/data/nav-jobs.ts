// GradeSpot Nexus navigation jobs — D2 decision, owner-tapped
// 2026-10-28 (on Muse's recommendation). PRESENTATION ONLY.
// The six groups in src/data/nexus-nav.ts are unchanged: every
// group, label, href, column and link stays exactly as it is.
// These three jobs are how the six groups are PRESENTED in the
// header, mobile drawer, footer and search kinds:
//   Training           → Academy, Certifications, Career Pathways,
//                        Labs & Projects
//   IT Solutions       → IT Solutions
//   Company & Resources → Company & Resources
// No destination is deleted, renamed or added by this file. The
// full per-destination mapping (old group → job) is recorded in
// docs/frontend-v2/NAV-JOB-MAPPING-2026-10-28.md, generated from
// nexus-nav.ts, so nothing can disappear silently.

import { nexusMenus, type NavMenu } from "@/data/nexus-nav";

export interface NavJob {
  key: string;
  label: string;
  href: string;
  blurb: string;
  menuKeys: string[];
}

export const navJobs: NavJob[] = [
  {
    key: "training",
    label: "Training",
    href: "/trainings",
    blurb: "Courses, certification preparation, career pathways and labs inside courses.",
    menuKeys: ["academy", "certifications", "pathways", "labs"],
  },
  {
    key: "solutions",
    label: "IT Solutions",
    href: "/services",
    blurb: "Services and consulting for businesses, plus enterprise training.",
    menuKeys: ["solutions"],
  },
  {
    key: "company",
    label: "Company & Resources",
    href: "/about-us",
    blurb: "About GradeSpot, enterprise partnerships, resources and support.",
    menuKeys: ["company"],
  },
];

export function jobMenus(job: NavJob): NavMenu[] {
  return job.menuKeys
    .map((key) => nexusMenus.find((m) => m.key === key))
    .filter((m): m is NavMenu => Boolean(m));
}

export function jobForMenu(menuKey: string): NavJob | undefined {
  return navJobs.find((j) => j.menuKeys.includes(menuKey));
}

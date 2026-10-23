import type { MetadataRoute } from "next";
import { courses } from "@/data/courses";
import { services } from "@/data/services";
import { comparisons } from "@/data/comparisons";
import { articles } from "@/data/articles";

const base = "https://gsitssolutions.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/about-us",
    "/trainings",
    "/services",
    "/resources",
    "/team-members",
    "/team-members/nikhil-duth-d",
    "/why-choose-us",
    "/testimonials",
    "/student-certifications",
    "/certificate-verification",
    "/pricing",
    "/for-institutes",
    "/for-colleges",
    "/career-support",
    "/compare",
    "/blog",
    "/training-institute-in-dilsukhnagar-hyderabad",
    "/contact-us",
    "/faq",
    "/terms-and-conditions",
  ];
  return [
    ...staticPaths.map((p) => ({ url: `${base}${p || "/"}` })),
    ...courses.map((c) => ({ url: `${base}/trainings/${c.slug}` })),
    ...services.map((s) => ({ url: `${base}/services/${s.slug}` })),
    // Research expansion pack (§18): city × course landing pages,
    // comparison pairs and articles.
    ...courses
      .filter((c) => !c.catalogOnly)
      .map((c) => ({ url: `${base}/lp/${c.slug}-in-hyderabad` })),
    ...comparisons.map((c) => ({ url: `${base}/compare/${c.slug}` })),
    ...articles.map((a) => ({ url: `${base}/blog/${a.slug}` })),
  ];
}

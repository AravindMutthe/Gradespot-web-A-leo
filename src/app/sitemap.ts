import type { MetadataRoute } from "next";
import { courses } from "@/data/courses";
import { services } from "@/data/services";

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
    "/contact-us",
    "/faq",
    "/terms-and-conditions",
  ];
  return [
    ...staticPaths.map((p) => ({ url: `${base}${p || "/"}` })),
    ...courses.map((c) => ({ url: `${base}/trainings/${c.slug}` })),
    ...services.map((s) => ({ url: `${base}/services/${s.slug}` })),
  ];
}

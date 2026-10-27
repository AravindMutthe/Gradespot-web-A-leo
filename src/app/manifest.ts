import type { MetadataRoute } from "next";

// Web app manifest (2026-10-27 audit fix). Uses only the existing
// favicon.ico — no new logo file, and no square app icon is claimed:
// PWA installability remains blocked on a dedicated owner-approved
// square icon (recorded in the R1 report), so this manifest is a
// metadata fix, not an installability claim.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GradeSpot IT Solutions",
    short_name: "GradeSpot",
    description:
      "GradeSpot IT Solutions — IT training institute in Dilsukhnagar, Hyderabad: cybersecurity, cloud, networking, digital marketing and more.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffbf5",
    theme_color: "#c24e1f",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}

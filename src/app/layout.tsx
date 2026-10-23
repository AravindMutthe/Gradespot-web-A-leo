import type { Metadata } from "next";
import "./globals.css";
import Chrome from "@/components/Chrome";
import JsonLd from "@/components/JsonLd";
import RevealFX from "@/components/RevealFX";
import { organizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  // Canonical/OG base — the production origin, matching sitemap.ts
  // and robots.ts in this repo (DECISIONS.md §19 standards layer).
  metadataBase: new URL("https://gsitssolutions.com"),
  title: {
    default: "GradeSpot IT Solutions - Empower Your Business with Top-Notch IT Solutions",
    template: "%s - GradeSpot IT Solutions",
  },
  description:
    "GradeSpot IT Solutions, Dilsukhnagar, Hyderabad — IT training institute and services company: cybersecurity, cloud, networking and digital marketing trainings, corporate training, internships and IT services.",
  openGraph: {
    type: "website",
    siteName: "GradeSpot IT Solutions",
    title: "GradeSpot IT Solutions - Empower Your Business with Top-Notch IT Solutions",
    description:
      "GradeSpot IT Solutions, Dilsukhnagar, Hyderabad — IT training institute and services company: cybersecurity, cloud, networking and digital marketing trainings, corporate training, internships and IT services.",
    images: [{ url: "/images/courses/ceh.jpg", alt: "GradeSpot IT Solutions — training in Hyderabad" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GradeSpot IT Solutions - Empower Your Business with Top-Notch IT Solutions",
    description:
      "GradeSpot IT Solutions, Dilsukhnagar, Hyderabad — IT training institute and services company: cybersecurity, cloud, networking and digital marketing trainings, corporate training, internships and IT services.",
    images: ["/images/courses/ceh.jpg"],
  },
};

// §25 — theme bootstrap: runs before first paint so there is never a
// flash of the wrong theme. Stored choice (localStorage) wins; a first
// visit follows prefers-color-scheme. Kept dependency-free and tiny.
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("gradespot-theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;var e=document.documentElement;e.classList.toggle("dark",d);e.dataset.theme=d?"dark":"light";e.style.colorScheme=d?"dark":"light";}catch(_){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <link
          rel="preload"
          href="/fonts/fraunces-normal-100_900.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/instrument-normal-400_700.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <JsonLd data={organizationSchema()} />
        <Chrome>{children}</Chrome>
        <RevealFX />
      </body>
    </html>
  );
}

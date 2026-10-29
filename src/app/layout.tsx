import type { Metadata } from "next";
import "./globals.css";
import Chrome from "@/components/Chrome";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteStickyBar from "@/components/SiteStickyBar";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  // Canonical/OG base — the LEO build itself is the ranking entity
  // (DECISIONS.md §25.21): self-referential to the Leo domain.
  metadataBase: new URL("https://leo-web-a.vercel.app"),
  title: {
    default: "GradeSpot IT Solutions - Empower Your Business with Top-Notch IT Solutions",
    template: "%s - GradeSpot IT Solutions",
  },
  description:
    "GradeSpot IT Solutions is an IT training institute in Dilsukhnagar, Hyderabad — cybersecurity, cloud, networking, digital marketing and more, with online & offline classes, corporate training, internships and IT services.",
  openGraph: {
    type: "website",
    siteName: "GradeSpot IT Solutions",
    locale: "en_IN",
    title: "GradeSpot IT Solutions - Empower Your Business with Top-Notch IT Solutions",
    description:
      "GradeSpot IT Solutions is an IT training institute in Dilsukhnagar, Hyderabad — cybersecurity, cloud, networking, digital marketing and more, with online & offline classes, corporate training, internships and IT services.",
    images: [{ url: "/images/og/home.jpg", alt: "GradeSpot IT Solutions — IT training institute in Hyderabad, Dilsukhnagar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GradeSpot IT Solutions - Empower Your Business with Top-Notch IT Solutions",
    description:
      "GradeSpot IT Solutions is an IT training institute in Dilsukhnagar, Hyderabad — cybersecurity, cloud, networking, digital marketing and more, with online & offline classes, corporate training, internships and IT services.",
    images: ["/images/og/home.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
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
        <JsonLd data={websiteSchema()} />
        {/* Static chrome is server-rendered and passed as props, so
            Footer / spacer / sticky bar ship no client JS: only the
            Header island hydrates (see Chrome.tsx, feat/main-perf-tbt). */}
        <Chrome
          header={<Header />}
          footer={
            <>
              <Footer />
              <div aria-hidden="true" className="h-[68px] md:hidden" />
              <SiteStickyBar />
            </>
          }
        >
          {children}
        </Chrome>
      </body>
    </html>
  );
}

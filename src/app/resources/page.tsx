import { staticPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { business } from "@/data/site";
import { CtaBand, PageHero } from "@/components/ui";

export const metadata = staticPageMetadata({
  title: "Resources",
  description: "Resources from GradeSpot IT Solutions — team, testimonials, student certifications and career support.",
  path: "/resources",
});

// Stage 8: card grid → compact rows; descriptions corrected (no employer
// wall claim on the career-support line, no "best choice" superlative,
// no "satisfaction and success" marketing claim on testimonials).
const items = [
  {
    title: "Team Members",
    href: "/team-members",
    desc: "Meet the leadership behind GradeSpot IT Solutions.",
  },
  {
    title: "Why Choose Us",
    href: "/why-choose-us",
    desc: "Our vision, mission and what GradeSpot offers in IT solutions and trainings.",
  },
  {
    title: "Testimonials",
    href: "/testimonials",
    desc: "Testimonials from our students and clients, as published on the live site.",
  },
  {
    title: "DigiDefense Blog",
    href: business.blogUrl,
    external: true,
    desc: "Security write-ups and learning articles on our security blog, DigiDefense.",
  },
  {
    title: "Partner With Us",
    href: "/partner-with-us",
    desc: "Collaborations and franchise discussions are welcome — institutes, colleges, trainers and new-centre conversations.",
  },
  {
    title: "Student Certifications",
    href: "/student-certifications",
    desc: "Certifications our alumni have achieved, as published on the live site.",
  },
  {
    title: "Certificate Verification",
    href: "/certificate-verification",
    desc: "Verify a GradeSpot certificate using its certificate code.",
  },
  {
    title: "Career Support",
    href: "/career-support",
    desc: "The job roles each verified training prepares you for, and the career services we offer.",
  },
  {
    title: "Learning Articles",
    href: "/blog",
    desc: "Roadmaps and explainers: starting a cybersecurity career, CEH vs Security+, and what a SOC analyst does.",
  },
  {
    title: "Course Comparisons",
    href: "/compare",
    desc: "Similar courses compared side by side — topics, duration, certification and roles — from their published data.",
  },
  {
    title: "For Colleges",
    href: "/for-colleges",
    desc: "Workshops, industrial trainings and internships conducted for colleges and their students.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero title="Resources" subtitle="People, proof and further reading from GradeSpot." />
      <section className="section-pad">
        <div className="wrap mx-auto max-w-4xl divide-y divide-line border-y border-line">
          {items.map((it) =>
            it.external ? (
              <a
                key={it.title}
                href={it.href}
                target="_blank"
                rel="noreferrer"
                className="flex flex-wrap items-baseline justify-between gap-3 py-5"
              >
                <div>
                  <h2 className="text-xl font-bold">{it.title} ↗</h2>
                  <p className="mt-1 text-sm leading-6">{it.desc}</p>
                </div>
              </a>
            ) : (
              <Link
                key={it.title}
                href={it.href}
                className="flex flex-wrap items-baseline justify-between gap-3 py-5"
              >
                <div>
                  <h2 className="text-xl font-bold">{it.title}</h2>
                  <p className="mt-1 text-sm leading-6">{it.desc}</p>
                </div>
                <span aria-hidden className="text-signal">→</span>
              </Link>
            ),
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/data/site";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Resources" };

const items = [
  {
    title: "Team Members",
    href: "/team-members",
    desc: "Meet the leadership and trainers behind GradeSpot IT Solutions.",
  },
  {
    title: "Why Choose Us",
    href: "/why-choose-us",
    desc: "Our vision, mission and what makes GradeSpot the best choice for IT solutions and trainings.",
  },
  {
    title: "Testimonials",
    href: "/testimonials",
    desc: "Explore the voices of satisfaction and success as our students and clients share their experiences.",
  },
  {
    title: "Blog",
    href: business.blogUrl,
    external: true,
    desc: "Security write-ups and learning articles on our blog (DigiDefense).",
  },
  {
    title: "Student Certifications",
    href: "/student-certifications",
    desc: "A glimpse into the certifications our alumni have successfully achieved.",
  },
  {
    title: "Certificate Verification",
    href: "/certificate-verification",
    desc: "Verify a GradeSpot certificate using its certificate code.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero title="Resources" subtitle="Everything about the people, proof and credibility behind GradeSpot." />
      <section className="section-pad">
        <div className="wrap grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) =>
            it.external ? (
              <a
                key={it.title}
                href={it.href}
                target="_blank"
                rel="noreferrer"
                className="block bg-white px-[30px] py-[40px] shadow-[0_5px_30px_rgba(214,215,216,0.57)]"
              >
                <h2 className="text-xl font-bold">{it.title} ↗</h2>
                <p className="mt-2 text-sm leading-6">{it.desc}</p>
              </a>
            ) : (
              <Link
                key={it.title}
                href={it.href}
                className="block bg-white px-[30px] py-[40px] shadow-[0_5px_30px_rgba(214,215,216,0.57)]"
              >
                <h2 className="text-xl font-bold">{it.title}</h2>
                <p className="mt-2 text-sm leading-6">{it.desc}</p>
              </Link>
            ),
          )}
        </div>
      </section>
    </>
  );
}

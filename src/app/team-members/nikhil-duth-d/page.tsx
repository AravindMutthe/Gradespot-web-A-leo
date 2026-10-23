import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { team } from "@/data/team";
import { CtaBand, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Nikhil Duth D — Founder, Managing Director" };

// Profile facts exactly as published on the live Team Single page
// (crawl 2026-10-23): role, 9 years of experience, two 95% skill bars and
// the published email. The live page's bio paragraphs are theme filler and
// are not reproduced; its phone number is retired (DECISIONS.md §1).
const skills = [
  { label: "SOC Analysis", pct: 95 },
  { label: "Technical Trainer", pct: 95 },
];

export default function NikhilProfilePage() {
  const member = team.find((m) => m.name === "Nikhil Duth D") ?? team[0];
  return (
    <>
      <PageHero title={member.name} subtitle="Founder, Managing Director" />
      <section className="section-pad">
        <div className="wrap grid items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Image
            src={member.image}
            alt={member.name}
            width={350}
            height={350}
            className="w-full rounded object-cover"
          />
          <div>
            <h2 className="text-[32px] font-semibold leading-[38px]">{member.name}</h2>
            <p className="mt-1 text-lg font-medium text-brand">Founder, Managing Director</p>

            <dl className="mt-8 space-y-4">
              <div className="flex gap-3">
                <dt className="w-32 shrink-0 font-semibold text-heading">Experience:</dt>
                <dd>9 Years</dd>
              </div>
              {member.email && (
                <div className="flex gap-3">
                  <dt className="w-32 shrink-0 font-semibold text-heading">Email:</dt>
                  <dd>
                    <a className="text-brand hover:underline" href={`mailto:${member.email}`}>
                      {member.email}
                    </a>
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-10 space-y-6">
              {skills.map((s) => (
                <div key={s.label}>
                  <div className="flex items-center justify-between text-sm font-semibold text-heading">
                    <span>{s.label}</span>
                    <span>{s.pct}%</span>
                  </div>
                  <div className="mt-2 h-2.5 w-full rounded bg-surface-light">
                    <div className="h-full rounded bg-brand" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <Link href="/team-members" className="btn-primary mt-10">
              Back to Team Members
            </Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

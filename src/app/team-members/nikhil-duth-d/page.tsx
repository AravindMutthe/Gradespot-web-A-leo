import { staticPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { personSchema } from "@/lib/schema";
import Link from "next/link";
import { team } from "@/data/team";
import { CtaBand, PageHero } from "@/components/ui";

export const metadata = staticPageMetadata({
  title: "Nikhil Duth D — Founder, Managing Director",
  description:
    "Nikhil Duth D, Founder & Managing Director of GradeSpot IT Solutions, Dilsukhnagar, Hyderabad.",
  path: "/team-members/nikhil-duth-d",
});

// Stage 8: portrait held (image provenance unreviewed) and the two 95%
// skill bars removed (quantified skill claims, unverified). Kept, as
// published on the live Team Single page: role, 9 years of experience
// (published bio, not independently verified — flagged in the report),
// and the published email. The live page's phone number stays retired
// and its bio paragraphs stay unreproduced (theme filler).
export default function NikhilProfilePage() {
  const member = team.find((m) => m.name === "Nikhil Duth D") ?? team[0];
  return (
    <>
      <JsonLd data={personSchema()} />
      <PageHero title={member.name} subtitle="Founder, Managing Director" />
      <section className="section-pad">
        <div className="wrap mx-auto max-w-4xl">
          <h2 className="text-[32px] font-semibold leading-[38px]">{member.name}</h2>
          <p className="mt-1 text-lg font-medium text-signal">Founder, Managing Director</p>

          <dl className="mt-8 space-y-4">
            <div className="flex gap-3">
              <dt className="w-32 shrink-0 font-semibold text-heading">Experience:</dt>
              <dd>9 Years</dd>
            </div>
            {member.email && (
              <div className="flex gap-3">
                <dt className="w-32 shrink-0 font-semibold text-heading">Email:</dt>
                <dd>
                  <a className="text-signal hover:underline" href={`mailto:${member.email}`}>
                    {member.email}
                  </a>
                </dd>
              </div>
            )}
          </dl>

          <Link href="/team-members" className="btn-primary mt-10">
            Back to Team Members
          </Link>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

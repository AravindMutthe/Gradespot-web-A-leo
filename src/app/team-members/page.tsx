import { staticPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { team } from "@/data/team";
import { CtaBand, PageHero } from "@/components/ui";

export const metadata = staticPageMetadata({
  title: "Team Members",
  description:
    "Meet the leadership behind GradeSpot IT Solutions, Dilsukhnagar, Hyderabad, including Founder & MD Nikhil Duth D.",
  path: "/team-members",
});

// Stage 8: portraits held (image provenance unreviewed — text rows
// instead), "Expert team" superlative neutralised. Names and roles are
// exactly as published on the live Team Members page.
export default function TeamPage() {
  return (
    <>
      <PageHero title="Team Members" subtitle="Meet the leadership behind GradeSpot IT Solutions." />
      <section className="section-pad">
        <div className="wrap mx-auto max-w-4xl divide-y divide-line border-y border-line">
          {team.map((m) => (
            <article key={m.name} className="flex flex-wrap items-baseline justify-between gap-3 py-5">
              <div>
                <h2 className="text-lg font-semibold">{m.name}</h2>
                <p className="mt-1 text-sm font-medium text-signal">{m.role}</p>
                {m.email && (
                  <p className="mt-2 text-sm">
                    <a className="text-signal hover:underline" href={`mailto:${m.email}`}>
                      {m.email}
                    </a>
                  </p>
                )}
              </div>
              {m.profileHref && (
                <Link
                  href={m.profileHref}
                  className="text-sm font-semibold text-signal hover:underline"
                >
                  View Profile →
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

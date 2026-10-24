import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { team } from "@/data/team";
import { CtaBand, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  alternates: { canonical: "/team-members" }, title: "Team Members" };

export default function TeamPage() {
  return (
    <>
      <PageHero title="Team Members" subtitle="Expert Team — Meet Our Leadership" />
      <section className="section-pad">
        <div className="wrap grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <article
              key={m.name}
              className="overflow-hidden rounded-2xl border border-line bg-parchment text-center shadow-sm transition duration-300 hover:shadow-[0_20px_40px_rgba(31,24,16,0.12)]"
            >
              <Image
                src={m.image}
                alt={m.name}
                width={350}
                height={350}
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                className="h-80 w-full object-cover"
              />
              <div className="p-6">
                <h2 className="text-lg font-semibold">{m.name}</h2>
                <p className="mt-1 text-sm font-medium text-signal">{m.role}</p>
                {m.email && (
                  <p className="mt-2 text-sm">
                    <a className="text-signal hover:underline" href={`mailto:${m.email}`}>
                      {m.email}
                    </a>
                  </p>
                )}
                {m.profileHref && (
                  <p className="mt-3">
                    <Link
                      href={m.profileHref}
                      className="text-sm font-semibold text-signal hover:underline"
                    >
                      View Profile →
                    </Link>
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

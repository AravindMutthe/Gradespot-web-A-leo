import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { certificationsParagraphs } from "@/data/pages";
import { certificationGallery } from "@/data/certifications";
import { LogoWall, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Student Certifications" };

export default function CertificationsPage() {
  return (
    <>
      <PageHero
        title="Our Students 100+ Certifications"
        subtitle="Certifications achieved by GradeSpot students, as showcased on our live site."
      />
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-4xl space-y-5">
            {certificationsParagraphs.slice(0, 3).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="rounded-lg bg-surface-light p-5 font-medium text-heading">
              Our distinctive &lsquo;Pay after you Pass&rsquo; methodology guarantees the
              attainment of your desired credentials prior to any financial obligations.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {certificationGallery.map((c) => (
              <figure key={c.image} className="text-center">
                <Image
                  src={c.image}
                  alt={c.caption}
                  width={300}
                  height={300}
                  className="mx-auto w-full rounded object-cover"
                />
                <figcaption className="mt-2 text-sm font-medium text-heading">
                  {c.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-4xl space-y-5">
            {certificationsParagraphs.slice(3).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p>
              Received a certificate from us?{" "}
              <Link href="/certificate-verification" className="font-semibold text-brand hover:underline">
                Verify it here
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
      <LogoWall />
    </>
  );
}

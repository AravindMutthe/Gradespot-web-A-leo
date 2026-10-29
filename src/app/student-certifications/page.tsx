import { staticPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { certificationGallery } from "@/data/certifications";
import { CtaBand, PageHero } from "@/components/ui";

export const metadata = staticPageMetadata({
  title: "Student Certifications",
  description:
    "Certifications achieved by GradeSpot students, as published on the live site, from the Dilsukhnagar, Hyderabad institute.",
  path: "/student-certifications",
});

// Stage 8: "100+" count removed from title and metadata (unverified —
// the same claim Stage 1/2 already removed elsewhere), the certificate
// image gallery replaced by its published caption list (gallery images
// held pending provenance/consent review — they show student names),
// the "Pay after you Pass" panel replaced by an enquiry notice (R8
// terms unverified), the employer logo wall removed, and "Enroll
// today" marketing copy dropped.
export default function CertificationsPage() {
  return (
    <>
      <PageHero
        title="Student Certifications"
        subtitle="Certifications achieved by GradeSpot students, as published on the live site."
      />
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-4xl space-y-5">
            <p>
              At GradeSpot IT Solutions, we present the certifications our alumni have achieved,
              as published on the live site. The list below names the certification shown for
              each student; the certificate images themselves are held pending a provenance
              and consent review.
            </p>
            <p className="rounded-2xl border border-line bg-surface-light p-5 font-medium text-heading">
              Payment terms for any training are confirmed on enquiry — ask the team before
              you commit.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl divide-y divide-line border-y border-line">
            {certificationGallery.map((c) => (
              <p key={c.image} className="py-3 text-[15px] leading-6 text-heading">
                {c.caption}
              </p>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-4xl space-y-5">
            <p>
              Received a certificate from us?{" "}
              <Link href="/certificate-verification" className="font-semibold text-action hover:underline">
                Verify it here
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

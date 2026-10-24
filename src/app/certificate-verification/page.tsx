import { staticPageMetadata } from "@/lib/metadata";
import VerifyForm from "@/components/VerifyForm";
import { CtaBand, LogoWall, PageHero } from "@/components/ui";

export const metadata = staticPageMetadata({
  title: "Certificate Verification",
  description: "Verify a GradeSpot certificate by its printed code — confirm it was issued by GradeSpot IT Solutions, Dilsukhnagar, Hyderabad.",
  path: "/certificate-verification",
});

export default function VerifyPage() {
  return (
    <>
      <PageHero
        title="Verify Our Certificates"
        subtitle="Enter the certificate code printed on a GradeSpot certificate to confirm it was issued by GradeSpot IT Solutions."
      />
      <section className="section-pad bg-surface-light">
        <div className="wrap">
          <VerifyForm />
        </div>
      </section>
      <LogoWall />
      <CtaBand />
    </>
  );
}

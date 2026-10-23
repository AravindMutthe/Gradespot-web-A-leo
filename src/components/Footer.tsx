import Image from "next/image";
import Link from "next/link";
import { business, telHref } from "@/data/site";
import { SocialLinks } from "@/components/ui";

const companyLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Team Members", href: "/team-members" },
  { label: "Why Choose Us", href: "/why-choose-us" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Help & FAQs", href: "/faq" },
];

const quickLinks = [
  { label: "Trainings", href: "/trainings" },
  { label: "Services", href: "/services" },
  { label: "Student Certifications", href: "/student-certifications" },
  { label: "Certificate Verification", href: "/certificate-verification" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
];

export default function Footer() {
  return (
    <footer className="border-t-4 border-brand bg-navy-deep text-footer-text">
      <div className="wrap grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/images/logo-light.png"
            alt="GradeSpot IT Solutions"
            width={193}
            height={60}
            className="h-12 w-auto"
          />
          <p className="mt-4 text-sm leading-6">
            At GradeSpot IT Solutions, our commitment is to craft superior IT solutions that
            redefine industry standards — training, services and cybersecurity from
            Dilsukhnagar, Hyderabad.
          </p>
          <p className="mt-5 text-sm font-semibold text-white">Connect With Us</p>
          <p className="mt-2 flex items-center gap-4">
            <SocialLinks className="h-5 w-5" />
          </p>
        </div>

        <nav aria-label="Company">
          <h3 className="mb-4 text-lg font-semibold text-white">Company</h3>
          <ul className="space-y-2 text-sm">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link className="hover:text-brand" href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Quick links">
          <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link className="hover:text-brand" href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Contact Info</h3>
          <address className="space-y-3 text-sm not-italic leading-6">
            <p>{business.address}</p>
            <p>
              {business.emails.map((e) => (
                <span key={e} className="block">
                  <a className="hover:text-brand" href={`mailto:${e}`}>
                    {e}
                  </a>
                </span>
              ))}
            </p>
            <p>
              {business.phones.map((p) => (
                <span key={p} className="block">
                  <a className="hover:text-brand" href={telHref(p)}>
                    {p}
                  </a>
                </span>
              ))}
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-wrap items-center justify-between gap-2 py-4 text-[13px] text-footer-text">
          <p>© Copyright {new Date().getFullYear()}. {business.legalName}</p>
          <p>
            <Link className="hover:text-brand" href="/">
              Home
            </Link>
            {" · "}
            <Link className="hover:text-brand" href="/testimonials">
              Testimonials
            </Link>
            {" · "}
            <Link className="hover:text-brand" href="/services">
              Our Services
            </Link>
            {" · "}
            <Link className="hover:text-brand" href="/terms-and-conditions">
              Terms and Conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

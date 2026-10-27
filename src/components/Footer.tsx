import Image from "next/image";
import Link from "next/link";
import { business, telHref } from "@/data/site";
import { SocialLinks } from "@/components/ui";

// Footer — Leo redesign v1 ("Prospectus", DECISIONS.md §19): deep ink
// stock, serif column heads, mono index labels. Link set is the v1 set
// plus "Contact Us" in Quick Links (it left the top bar in §19 because
// the Callback CTA duplicates it there; the footer keeps a plain path).

const companyLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Team Members", href: "/team-members" },
  { label: "Why Choose Us", href: "/why-choose-us" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Career Support", href: "/career-support" },
  // 2026-10-28: Careers (working AT GradeSpot) — distinct from learner
  // Career Support above; the page itself carries the disambiguation.
  { label: "Careers", href: "/careers" },
  { label: "For Colleges", href: "/for-colleges" },
  { label: "Partner With Us", href: "/partner-with-us" },
  { label: "Corporate & International", href: "/corporate-and-international" },
  { label: "Help & FAQs", href: "/faq" },
];

const quickLinks = [
  { label: "Trainings", href: "/trainings" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Student Certifications", href: "/student-certifications" },
  { label: "Certificate Verification", href: "/certificate-verification" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
  // 2026-10-27 audit fix: Privacy Policy and Refund Policy are DRAFTS
  // (TODO fact slots, no verified facts) and are deliberately NOT
  // linked from the footer until the owner + lawyer publish real
  // policies. The routes still exist in the repo, unlinked.
  { label: "Accessibility", href: "/accessibility" },
];

// Footer keyword cluster (local-SEO pattern): the headline trainings,
// linked by their real published titles to their real pages.
const popularTrainings = [
  { label: "Certified Ethical Hacker [CEH v13]", href: "/trainings/certified-ethical-hacker-ceh" },
  { label: "SOC Analyst Training in Hyderabad", href: "/trainings/soc-analyst" },
  { label: "CCNA 200-301", href: "/trainings/ccna-200-301" },
  { label: "Azure Fundamentals | AZ-900", href: "/trainings/azure-fundamentals-az-900" },
  { label: "Azure Administrator | AZ-104", href: "/trainings/azure-administrator-az-104" },
  { label: "CompTIA Security+: Sy0-701", href: "/trainings/comptia-security-plus" },
];

const linkCls = "inline-flex min-h-[44px] items-center rounded-lg px-2 -mx-2 transition-colors hover:bg-white/5 hover:text-brand-bright"; // 44px rows kept (R1 target, above the 24px AA floor and the 44px AAA target); R2+R3 adds only a soft hover surface.
const headCls = "mb-3 font-sans text-[13px] font-bold uppercase tracking-[0.16em] text-paper";

export default function Footer() {
  return (
    <footer className="border-t-[3px] border-brand bg-ink-deep text-footer-text">
      <div className="wrap grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.8fr_1.05fr_1fr]">
        <div>
          {/* Logo brightening (§22): luminous plate + halo on the
              ink footer behind the unmodified light artwork. */}
          <span className="inline-block rounded-2xl bg-white/[0.07] px-3 py-2 shadow-[0_0_30px_rgba(247,99,27,0.28)] ring-1 ring-white/15">
            <Image
              src="/images/logo-light.png"
              alt="GradeSpot IT Solutions"
              width={193}
              height={60}
              className="h-[52px] w-auto"
            />
          </span>
          <p className="mt-5 text-sm leading-6">
            At GradeSpot IT Solutions, our commitment is to craft superior IT solutions that
            redefine industry standards — training, services and cybersecurity from
            Dilsukhnagar, Hyderabad.
          </p>
          <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.18em] text-paper">Connect With Us</p>
          <p className="mt-3 flex items-center gap-4">
            <SocialLinks className="h-5 w-5" />
          </p>
        </div>

        <nav aria-label="Company">
          <h3 className={headCls}>Company</h3>
          <ul className="space-y-1.5 text-sm">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link className={linkCls} href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Get started">
          <h3 className={headCls}>Get Started</h3>
          <ul className="space-y-1.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link className={linkCls} href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Popular trainings">
          <h3 className={headCls}>Popular Trainings</h3>
          <ul className="space-y-1.5 text-sm">
            {popularTrainings.map((l) => (
              <li key={l.href}>
                <Link className={linkCls} href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className={headCls}>Visit Us</h3>
          <address className="space-y-3 text-sm not-italic leading-6">
            <p>{business.address}</p>
            <p>
              <a
                className="font-semibold text-brand-bright hover:text-paper"
                href={`https://www.google.com/maps?q=${encodeURIComponent(business.address)}`}
                target="_blank"
                rel="noreferrer"
              >
                View on Google Maps →
              </a>
            </p>
            <p>
              {business.emails.map((e) => (
                <span key={e} className="block">
                  <a className={linkCls} href={`mailto:${e}`}>
                    {e}
                  </a>
                </span>
              ))}
            </p>
            <p>
              {business.phones.map((p) => (
                <span key={p} className="block">
                  <a className={linkCls} href={telHref(p)}>
                    {p}
                  </a>
                </span>
              ))}
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-wrap items-center justify-between gap-2 py-5 text-[13px] text-footer-text">
          <p>© Copyright {new Date().getFullYear()}. {business.legalName}</p>
          {/* §22 dedupe: this strip used to repeat Home / Testimonials /
              Services / Terms, which already live in the columns above.
              It now carries only the links the columns don't. */}
          <p>
            <Link className="hover:text-brand-bright" href="/pricing">
              Pricing
            </Link>
            {" · "}
            <Link className="hover:text-brand-bright" href="/for-institutes">
              For Institutes
            </Link>
            {" · "}
            <Link
              className="hover:text-brand-bright"
              href="/training-institute-in-dilsukhnagar-hyderabad"
            >
              Institute in Dilsukhnagar
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

// Frontend 2.0 navigation data — docs/frontend-v2/SPEC.md §2.
//
// Honesty rule for this file: every href below is an existing route in
// this repo, an existing trainings-category anchor, or an existing
// external link already used in v1. No route was invented for this
// menu. Where the spec names something that has no real destination
// yet, the link points at the closest existing real page and the gap
// is recorded in docs/frontend-v2/IMPLEMENTATION-NOTES.md:
//   - No /certifications route: vendor links are filtered Training
//     views (/trainings#category-…), labelled as training, never as
//     a guaranteed certification or exam page.
//   - No standalone labs/projects route: labs links point at real
//     course pages whose published content describes hands-on labs.
//   - No Linux / DevOps & SRE catalogue category: no such domain
//     column is published. Azure DevOps (AZ-400) and AWS DevOps
//     courses appear under their real vendor categories.
//   - No level tags in the catalogue: By Experience links all point
//     at /trainings until levels are actually tagged in the data.
//   - No upcoming-batches page: "Upcoming Batches" points at
//     /trainings; batch schedules are confirmed on enquiry (already
//     stated on the Trainings page).

export interface NavMenuLink {
  label: string;
  href: string;
  external?: boolean;
  note?: string;
}

export interface NavMenuColumn {
  title: string;
  links: NavMenuLink[];
}

export interface NavMenuFeatured {
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface NavMenu {
  key: string;
  label: string;
  href: string;
  columns: NavMenuColumn[];
  featured: NavMenuFeatured;
}

export const frontendV2Menus: NavMenu[] = [
  {
    key: "training",
    label: "Training",
    href: "/trainings",
    columns: [
      {
        title: "By Domain",
        links: [
          { label: "Cybersecurity", href: "/trainings#category-cybersecurity" },
          { label: "Cloud Computing — AWS", href: "/trainings#category-aws" },
          { label: "Cloud Computing — Microsoft Azure", href: "/trainings#category-microsoft-azure" },
          { label: "Networking & Infrastructure — Cisco", href: "/trainings#category-cisco" },
          { label: "Networking & Infrastructure", href: "/trainings#category-networking" },
          { label: "Software & Data", href: "/trainings#category-programming-data" },
          { label: "Other Programs", href: "/trainings#category-medical-coding" },
          { label: "Digital Marketing", href: "/trainings#category-digital-marketing" },
          { label: "Design & CAD", href: "/trainings#category-design-cad" },
        ],
      },
      {
        title: "By Experience",
        links: [
          { label: "Foundation", href: "/trainings", note: "Level tags not yet in catalogue" },
          { label: "Intermediate", href: "/trainings", note: "Level tags not yet in catalogue" },
          { label: "Advanced", href: "/trainings", note: "Level tags not yet in catalogue" },
          { label: "Professional Upskilling", href: "/trainings", note: "Level tags not yet in catalogue" },
        ],
      },
      {
        title: "Discover",
        links: [
          { label: "All Training Programs", href: "/trainings" },
          { label: "Upcoming Batches", href: "/trainings", note: "Schedules confirmed on enquiry" },
          { label: "Free Demo", href: "/trainings" },
          { label: "Training Modes — Online & Offline", href: "/trainings" },
          { label: "Course Comparisons", href: "/compare" },
          { label: "Search Trainings", href: "/trainings#course-search" },
        ],
      },
    ],
    featured: {
      eyebrow: "Free First Step",
      title: "Book a Free Demo",
      body: "Attend a real session of any course before you enrol — online or at the Dilsukhnagar institute.",
      ctaLabel: "Browse Trainings",
      ctaHref: "/trainings",
    },
  },
  {
    key: "certifications",
    label: "Certifications",
    href: "/trainings",
    columns: [
      {
        title: "Vendor Training",
        links: [
          { label: "AWS Training", href: "/trainings#category-aws" },
          { label: "Microsoft Azure Training", href: "/trainings#category-microsoft-azure" },
          { label: "Cisco Training", href: "/trainings#category-cisco" },
          { label: "CompTIA Training", href: "/trainings#category-comptia" },
          { label: "Cybersecurity Training", href: "/trainings#category-cybersecurity" },
        ],
      },
      {
        title: "Certification Pathways",
        links: [
          { label: "CEH v13 — Featured Program", href: "/trainings/certified-ethical-hacker-ceh" },
          { label: "CCNA 200-301", href: "/trainings/ccna-200-301" },
          { label: "CompTIA Security+", href: "/trainings/comptia-security-plus" },
          { label: "Azure AZ-900", href: "/trainings/azure-fundamentals-az-900" },
          { label: "AWS Cloud Practitioner", href: "/trainings/aws-cloud-practitioner" },
        ],
      },
      {
        title: "Proof & Verification",
        links: [
          { label: "Student Certifications", href: "/student-certifications" },
          { label: "Certificate Verification", href: "/certificate-verification" },
          { label: "Course Comparisons", href: "/compare" },
        ],
      },
    ],
    featured: {
      eyebrow: "Verification",
      title: "Verify a GradeSpot Certificate",
      body: "Employers and students can verify any GradeSpot certificate by its code — free, on this site.",
      ctaLabel: "Verify a Certificate",
      ctaHref: "/certificate-verification",
    },
  },
  {
    key: "labs",
    label: "Labs & Projects",
    href: "/trainings",
    columns: [
      {
        title: "Hands-on Inside Courses",
        links: [
          { label: "CEH v13 — Live Labs", href: "/trainings/certified-ethical-hacker-ceh" },
          { label: "CCNA 200-301 — Packet Tracer Labs", href: "/trainings/ccna-200-301" },
          { label: "Azure AZ-104 — Hands-on Labs", href: "/trainings/azure-administrator-az-104" },
          { label: "SOC Analyst — Practical Labs", href: "/trainings/soc-analyst" },
          { label: "Vulnerability Assessment & Penetration Testing", href: "/trainings/vapt" },
        ],
      },
      {
        title: "Projects & Assessment",
        links: [
          { label: "All Training Programs", href: "/trainings" },
          { label: "Career Support", href: "/career-support" },
          { label: "Student Certifications", href: "/student-certifications" },
        ],
      },
      {
        title: "About Labs Here",
        links: [
          { label: "How Labs Work — Ask on Enquiry", href: "/contact-us" },
          { label: "Book a Free Demo", href: "/trainings" },
        ],
      },
    ],
    featured: {
      eyebrow: "Honest Note",
      title: "No Standalone Labs Portal Yet",
      body: "Labs and projects are delivered inside training programs, not as a separate portal. The links here go to real course pages whose published content describes their labs.",
      ctaLabel: "Browse Trainings",
      ctaHref: "/trainings",
    },
  },
  {
    key: "solutions",
    label: "IT Solutions",
    href: "/services",
    columns: [
      {
        title: "Enterprise & Institutional Training",
        links: [
          { label: "Corporate Trainings", href: "/services/corporate-trainings" },
          { label: "Industrial Trainings", href: "/services/industrial-trainings" },
          { label: "College Workshops", href: "/services/college-workshops" },
          { label: "Internships", href: "/services/internships" },
        ],
      },
      {
        title: "Technology Services",
        links: [
          { label: "Cybersecurity Services", href: "/services/cybersecurity-services" },
          { label: "Network Infrastructure Building", href: "/services/network-infrastructure-building" },
          { label: "Web Development", href: "/services/web-development" },
          { label: "Digital Marketing Solutions", href: "/services/digital-marketing-solutions" },
          { label: "Logo Designing", href: "/services/logo-designing" },
        ],
      },
      {
        title: "Talent & Consulting",
        links: [
          { label: "US IT Staffing", href: "/services/us-it-staffing" },
          { label: "Domestic Consultancy", href: "/services/domestic-consultancy" },
          { label: "Abroad Consultancy", href: "/services/abroad-consultancy" },
        ],
      },
    ],
    featured: {
      eyebrow: "For Business",
      title: "Request a Service Consultation",
      body: "Tell us the problem and the scope — the team replies with the next step. No prices are published here; services are quoted to scope.",
      ctaLabel: "Talk to an Advisor",
      ctaHref: "/contact-us",
    },
  },
  {
    key: "organizations",
    label: "For Organizations",
    href: "/for-institutes",
    columns: [
      {
        title: "Institutions",
        links: [
          { label: "For Institutes", href: "/for-institutes" },
          { label: "For Colleges", href: "/for-colleges" },
          { label: "Corporate & International", href: "/corporate-and-international" },
        ],
      },
      {
        title: "Enterprise Training",
        links: [
          { label: "Corporate Trainings", href: "/services/corporate-trainings" },
          { label: "Industrial Trainings", href: "/services/industrial-trainings" },
          { label: "College Workshops", href: "/services/college-workshops" },
          { label: "Internships", href: "/services/internships" },
        ],
      },
      {
        title: "Partnerships",
        links: [
          { label: "Partner With Us", href: "/partner-with-us", note: "Discussion invitation only" },
          { label: "Corporate & International Programs", href: "/corporate-and-international" },
          { label: "Talk to an Advisor", href: "/contact-us" },
        ],
      },
    ],
    featured: {
      eyebrow: "Partnerships",
      title: "Partner With Us",
      body: "Collaborations and franchise discussions are welcome. This is a discussion invitation, not an application or an account.",
      ctaLabel: "Start a Discussion",
      ctaHref: "/partner-with-us",
    },
  },
  {
    key: "explore",
    label: "Explore",
    href: "/about-us",
    columns: [
      {
        title: "About GradeSpot",
        links: [
          { label: "About Us", href: "/about-us" },
          { label: "Why Choose Us", href: "/why-choose-us" },
          { label: "Team Members", href: "/team-members" },
          { label: "Local Institute Page", href: "/training-institute-in-dilsukhnagar-hyderabad" },
        ],
      },
      {
        title: "Knowledge & Resources",
        links: [
          { label: "Learning Articles", href: "/blog" },
          { label: "Resources", href: "/resources" },
          { label: "Help & FAQs", href: "/faq" },
          { label: "Course Comparisons", href: "/compare" },
          { label: "DigiDefense Blog", href: "https://digidefense.in", external: true },
          { label: "GradeSpot Digital", href: "https://digital.gsitssolutions.com", external: true },
        ],
      },
      {
        title: "Outcomes & Support",
        links: [
          { label: "Testimonials", href: "/testimonials" },
          { label: "Student Certifications", href: "/student-certifications" },
          { label: "Certificate Verification", href: "/certificate-verification" },
          { label: "Career Support", href: "/career-support" },
          { label: "Contact & Advisory", href: "/contact-us" },
          { label: "Pricing Information", href: "/pricing" },
          { label: "Accessibility", href: "/accessibility" },
        ],
      },
    ],
    featured: {
      eyebrow: "Contact & Advisory",
      title: "Talk to an Advisor",
      body: "Training enquiry, service consultation, location and contact — one advisory flow, on the existing contact page.",
      ctaLabel: "Contact Us",
      ctaHref: "/contact-us",
    },
  },
];

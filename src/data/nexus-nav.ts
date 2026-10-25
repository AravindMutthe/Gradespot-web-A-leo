// GradeSpot Nexus navigation — docs/frontend-v2/SPEC.md §2 (v2).
// Six groups only: Academy, Certifications, Career Pathways,
// Labs & Projects, IT Solutions, Company & Resources.
// Honesty rule: every href below is an existing route in this repo,
// an existing trainings-category anchor, or an external link already
// used in v1. No route was invented for this menu. Where the spec
// names something with no real destination yet, the link points at
// the closest existing real page, the featured panel says so plainly,
// and the gap is recorded in docs/frontend-v2/IMPLEMENTATION-NOTES.md:
//   - No /certifications route: vendor links are filtered Training
//     views, labelled as training, never as a guaranteed exam page.
//     EC-Council = CEH course page only. Red Hat and Kubernetes have
//     no catalogue courses — marked Planned, not available.
//   - No standalone labs/projects route or portal: labs links point
//     at real course pages whose published content describes labs.
//     Capstones, quizzes and portfolios as standalone products are
//     Planned, not available.
//   - No Linux / DevOps & SRE catalogue category: AZ-400 and AWS
//     DevOps appear under their real vendor categories. Linux,
//     AI & Data as standalone domains are Planned except for the
//     Programming & Data courses that actually exist.
//   - No level tags in the catalogue: level links point at
//     /trainings until levels are actually tagged (Release 2).
//   - No career-roadmap pages yet (Release 2): pathway links point
//     at /career-support and at real role-matching course pages.
//   - No upcoming-batches page: schedules are confirmed on enquiry,
//     as already stated on the Trainings page.

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

export const nexusMenus: NavMenu[] = [
  {
    key: "academy",
    label: "Academy",
    href: "/trainings",
    columns: [
      {
        title: "Programs",
        links: [
          { label: "All Programs", href: "/trainings" },
          { label: "Cybersecurity", href: "/trainings#category-cybersecurity" },
          { label: "Cloud — AWS", href: "/trainings#category-aws" },
          { label: "Cloud — Microsoft Azure", href: "/trainings#category-microsoft-azure" },
          { label: "Networking — Cisco", href: "/trainings#category-cisco" },
          { label: "Networking & Infrastructure", href: "/trainings#category-networking" },
          { label: "Software Engineering", href: "/trainings#category-programming-data" },
          { label: "Other Existing Programs", href: "/trainings#category-medical-coding" },
        ],
      },
      {
        title: "By Level — Release 2 tagging",
        links: [
          { label: "Foundation", href: "/trainings", note: "Level tags not yet in catalogue" },
          { label: "Professional", href: "/trainings", note: "Level tags not yet in catalogue" },
          { label: "Advanced / Specialist", href: "/trainings", note: "Level tags not yet in catalogue" },
        ],
      },
      {
        title: "Planned Domains",
        links: [
          { label: "Linux & Infrastructure", href: "/trainings", note: "Planned — no Linux catalogue yet" },
          { label: "DevOps & SRE", href: "/trainings#category-microsoft-azure", note: "AZ-400 under Azure; standalone DevOps domain Planned" },
          { label: "AI & Data", href: "/trainings#category-programming-data", note: "Data courses exist; AI pathway Planned" },
          { label: "Course Comparisons", href: "/compare" },
          { label: "Search Programs", href: "/trainings#course-search" },
        ],
      },
    ],
    featured: {
      eyebrow: "Academy",
      title: "Learning programs, cohorts and curricula",
      body: "Browse the real catalogue. Levels, curriculum previews and demo eligibility arrive with Release 2 tagging — nothing here is marked available that is not published.",
      ctaLabel: "Browse Programs",
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
          { label: "Microsoft Training", href: "/trainings#category-microsoft-azure" },
          { label: "Cisco Training", href: "/trainings#category-cisco" },
          { label: "CompTIA Training", href: "/trainings#category-comptia" },
          { label: "EC-Council Training — CEH", href: "/trainings/certified-ethical-hacker-ceh", note: "Training toward CEH, not the exam itself" },
        ],
      },
      {
        title: "Planned Pathways",
        links: [
          { label: "Red Hat", href: "/trainings", note: "Planned — no Red Hat courses published" },
          { label: "Kubernetes", href: "/trainings", note: "Planned — no Kubernetes course published" },
          { label: "CompTIA Security+", href: "/trainings/comptia-security-plus", note: "Training toward Security+, not the exam itself" },
          { label: "Azure AZ-900", href: "/trainings/azure-fundamentals-az-900", note: "Training toward AZ-900" },
          { label: "AWS Cloud Practitioner", href: "/trainings/aws-cloud-practitioner", note: "Training toward CLF-C02" },
        ],
      },
      {
        title: "Proof & Verification",
        links: [
          { label: "Student Certifications", href: "/student-certifications" },
          { label: "Certificate Verification", href: "/certificate-verification" },
        ],
      },
    ],
    featured: {
      eyebrow: "Certification Preparation",
      title: "Training toward certification — never a guarantee",
      body: "Certification itself is awarded by the vendor or exam body, not by this site. No exam date, fee or eligibility is claimed here.",
      ctaLabel: "Verify a Certificate",
      ctaHref: "/certificate-verification",
    },
  },
  {
    key: "pathways",
    label: "Career Pathways",
    href: "/career-support",
    columns: [
      {
        title: "Roles — Release 2 roadmaps",
        links: [
          { label: "SOC Analyst", href: "/trainings/soc-analyst" },
          { label: "Security Engineer", href: "/trainings#category-cybersecurity" },
          { label: "Cloud Engineer", href: "/trainings#category-aws" },
          { label: "DevOps Engineer", href: "/trainings/microsoft-devops-az-400" },
          { label: "Systems Engineer", href: "/trainings/computer-hardware-and-networking" },
          { label: "Software Engineer", href: "/trainings#category-programming-data" },
        ],
      },
      {
        title: "More Roles — Planned Roadmaps",
        links: [
          { label: "Frontend / Backend / Full-Stack Engineer", href: "/career-support", note: "Interactive roadmap Planned — Release 2" },
          { label: "SRE / Infrastructure Engineer", href: "/career-support", note: "Interactive roadmap Planned — Release 2" },
          { label: "AI / LLM Engineer", href: "/career-support", note: "Interactive roadmap Planned — Release 2" },
          { label: "Career Support", href: "/career-support" },
        ],
      },
      {
        title: "How Pathways Work",
        links: [
          { label: "Skill Matrices & Prerequisites", href: "/career-support", note: "Release 2 interactive roadmaps" },
          { label: "Readiness Assessments", href: "/career-support", note: "Release 2" },
          { label: "Talk to an Advisor", href: "/contact-us" },
        ],
      },
    ],
    featured: {
      eyebrow: "Career Pathways",
      title: "Role roadmaps, not blog articles",
      body: "Interactive roadmaps with skills, tools, certifications and projects arrive in Release 2. Today, role links go to real course pages and to Career Support — no roadmap is presented as built.",
      ctaLabel: "Career Support",
      ctaHref: "/career-support",
    },
  },
  {
    key: "labs",
    label: "Labs & Projects",
    href: "/trainings",
    columns: [
      {
        title: "Labs Inside Courses",
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
        title: "Planned — Not Available",
        links: [
          { label: "Standalone Labs Portal", href: "/contact-us", note: "Planned — ask on enquiry" },
          { label: "Capstones & Portfolios", href: "/contact-us", note: "Planned — delivered inside programs today" },
          { label: "Quizzes & Challenges", href: "/contact-us", note: "Planned — Release 2/4" },
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
        title: "Professional Services",
        links: [
          { label: "Cybersecurity Services", href: "/services/cybersecurity-services" },
          { label: "Cloud & Infrastructure", href: "/services/network-infrastructure-building" },
          { label: "Software Engineering", href: "/services/web-development" },
          { label: "Digital Solutions", href: "/services/digital-marketing-solutions" },
          { label: "Logo Designing", href: "/services/logo-designing" },
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
        title: "Talent & Consulting",
        links: [
          { label: "US IT Staffing", href: "/services/us-it-staffing" },
          { label: "Domestic Consultancy", href: "/services/domestic-consultancy" },
          { label: "Abroad Consultancy", href: "/services/abroad-consultancy" },
        ],
      },
    ],
    featured: {
      eyebrow: "For Business — Prominent",
      title: "Request a Service Consultation",
      body: "For Business lives here, in IT Solutions — not buried in the Academy. Tell us the problem and the scope; the team replies with the next step. No prices are published here; services are quoted to scope.",
      ctaLabel: "Talk to an Advisor",
      ctaHref: "/contact-us",
    },
  },
  {
    key: "company",
    label: "Company & Resources",
    href: "/about-us",
    columns: [
      {
        title: "Company",
        links: [
          { label: "About Us", href: "/about-us" },
          { label: "Why Choose Us", href: "/why-choose-us" },
          { label: "Team Members", href: "/team-members" },
          { label: "Local Institute Page", href: "/training-institute-in-dilsukhnagar-hyderabad" },
        ],
      },
      {
        title: "Enterprise & Partnerships",
        links: [
          { label: "For Colleges", href: "/for-colleges" },
          { label: "For Institutes", href: "/for-institutes" },
          { label: "Corporate & International", href: "/corporate-and-international" },
          { label: "Partner With Us", href: "/partner-with-us", note: "Discussion invitation only" },
        ],
      },
      {
        title: "Resources & Support",
        links: [
          { label: "Learning Articles", href: "/blog" },
          { label: "Resources", href: "/resources" },
          { label: "Help & FAQs", href: "/faq" },
          { label: "Course Comparisons", href: "/compare" },
          { label: "Testimonials", href: "/testimonials" },
          { label: "Student Certifications", href: "/student-certifications" },
          { label: "Certificate Verification", href: "/certificate-verification" },
          { label: "Career Support", href: "/career-support" },
          { label: "Pricing Information", href: "/pricing" },
          { label: "Accessibility", href: "/accessibility" },
          { label: "Contact & Advisory", href: "/contact-us" },
        ],
      },
    ],
    featured: {
      eyebrow: "Company & Resources",
      title: "About, enterprise training and support",
      body: "Outcomes, verification, articles and policies — one place, with the same advisory flow for training and for business enquiries.",
      ctaLabel: "Contact Us",
      ctaHref: "/contact-us",
    },
  },
];

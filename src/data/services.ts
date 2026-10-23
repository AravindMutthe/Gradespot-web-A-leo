// The 12 services exactly as listed on the live Services page.
//
// Harvest 2026-10-23 (see DECISIONS.md §17): per-service summaries and
// offerings were recovered from the business's own live-site scrape
// (~/workspace/gradespot-planning/gsitssolutions-content.json, 2026-10-02)
// — the Oct-2023 rebuild had dropped them because the live detail pages
// themselves carry only template filler. Accreditation claims in the
// scrape (ISO/AICTE lines) are deliberately NOT carried here; they stay
// flagged per DECISIONS.md §3. Summaries are pending Aravind's accuracy
// confirmation.

export interface Service {
  slug: string;
  title: string;
  summary?: string;
  offerings?: string[];
}

export const services: Service[] = [
  {
    slug: "corporate-trainings",
    title: "Corporate Trainings",
    summary:
      "Professional IT training programs for corporates and students across hardware, networking, cybersecurity, cloud computing, digital marketing and more.",
    offerings: [
      "Online & offline batches",
      "Hands-on labs",
      "Certification preparation",
      "Career guidance and placement assistance",
    ],
  },
  {
    slug: "internships",
    title: "Internships",
    // The scrape's summary/offerings lead with an AICTE-approval claim;
    // that accreditation line is excluded here per DECISIONS.md §3/§17.
    summary:
      "Internship programs offering exceptional learning opportunities and industry exposure.",
    offerings: ["Hands-on industry exposure", "Mentorship"],
  },
  {
    slug: "industrial-trainings",
    title: "Industrial Trainings",
    summary:
      "Practical training programs aligned to industry needs for students and working professionals.",
    offerings: ["Practical industry-aligned curriculum", "Expert instructors"],
  },
  {
    slug: "college-workshops",
    title: "College Workshops",
    summary: "Technical workshops conducted for college students.",
    offerings: ["Hands-on sessions", "Conducted at colleges"],
  },
  {
    slug: "cybersecurity-services",
    title: "Cybersecurity Services",
    summary:
      "Cybersecurity solutions for diverse organizations, addressing security needs with expertise and precision.",
    offerings: [
      "Vulnerability assessment",
      "Security architecture design",
      "Threat monitoring",
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    summary:
      "Cost-effective solutions for premium web designs, featuring aesthetically pleasing themes.",
    offerings: ["Premium web designs", "Aesthetically pleasing themes"],
  },
  {
    slug: "digital-marketing-solutions",
    title: "Digital Marketing Solutions",
    summary:
      "Cost-effective digital marketing services to enhance online presence and business performance.",
    offerings: ["SEO", "Social media marketing", "Online advertising"],
  },
  {
    slug: "network-infrastructure-building",
    title: "Network Infrastructure Building",
    summary: "Efficient network infrastructure building services for businesses.",
  },
  {
    slug: "logo-designing",
    title: "Logo Designing",
    summary: "Creative logo designing services that leave a lasting impression.",
  },
  {
    slug: "us-it-staffing",
    title: "US IT Staffing",
    summary: "IT staffing services for US requirements.",
  },
  {
    slug: "domestic-consultancy",
    title: "Domestic Consultancy",
    summary: "Consultancy services for domestic (India) opportunities.",
  },
  {
    slug: "abroad-consultancy",
    title: "Abroad Consultancy",
    summary: "Consultancy services for overseas opportunities.",
  },
];

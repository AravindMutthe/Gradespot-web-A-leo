// The 12 services exactly as listed on the live Services page.
// NOTE: on the live site every service card carries the same template-filler
// text instead of a real description, so no per-service descriptions exist
// to migrate. Detail pages present the published general services copy and
// an enquiry route. See DECISIONS.md.

export interface Service {
  slug: string;
  title: string;
}

export const services: Service[] = [
  {
    "slug": "corporate-trainings",
    "title": "Corporate Trainings"
  },
  {
    "slug": "internships",
    "title": "Internships"
  },
  {
    "slug": "industrial-trainings",
    "title": "Industrial Trainings"
  },
  {
    "slug": "college-workshops",
    "title": "College Workshops"
  },
  {
    "slug": "cybersecurity-services",
    "title": "Cybersecurity Services"
  },
  {
    "slug": "web-development",
    "title": "Web Development"
  },
  {
    "slug": "digital-marketing-solutions",
    "title": "Digital Marketing Solutions"
  },
  {
    "slug": "network-infrastructure-building",
    "title": "Network Infrastructure Building"
  },
  {
    "slug": "logo-designing",
    "title": "Logo Designing"
  },
  {
    "slug": "us-it-staffing",
    "title": "US IT Staffing"
  },
  {
    "slug": "domestic-consultancy",
    "title": "Domestic Consultancy"
  },
  {
    "slug": "abroad-consultancy",
    "title": "Abroad Consultancy"
  }
];

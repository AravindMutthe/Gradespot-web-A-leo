# NAV JOB MAPPING — D2 (2026-10-28)

Owner decision, 2026-10-28 (on Muse's recommendation): the six Nexus nav groups are PRESENTED under three visitor jobs. This document is the route-preservation record. It was generated from `src/data/nexus-nav.ts` as committed at 831484b, before the full-redesign code change; the redesign changed presentation only, so the mapping below still holds for the new tip (verified by the URL-preservation check in the redesign report).

Rules: grouping is presentation only. No destination was deleted, renamed or added. A destination's old group is its group in `nexus-nav.ts`; its job is the job that group belongs to under `src/data/nav-jobs.ts`. Anchors (`/trainings#category-…`) count as distinct hrefs, exactly as in earlier URL-preservation checks. Parsed from the file: 86 link href occurrences across the six groups (plus 6 featured-CTA hrefs, all pointing at destinations already in the link set).

## Jobs

| Job | Job href | Old groups |
|---|---|---|
| Training | /trainings | Academy, Certifications, Career Pathways, Labs & Projects |
| IT Solutions | /services | IT Solutions |
| Company & Resources | /about-us | Company & Resources |

## Training

### Old group: Academy

- All Programs → `/trainings`
- Cybersecurity → `/trainings#category-cybersecurity`
- Cloud — AWS → `/trainings#category-aws`
- Cloud — Microsoft Azure → `/trainings#category-microsoft-azure`
- Networking — Cisco → `/trainings#category-cisco`
- Networking & Infrastructure → `/trainings#category-networking`
- Software Engineering → `/trainings#category-programming-data`
- Medical Coding → `/trainings#category-medical-coding`
- Design & CAD → `/trainings#category-design-cad`
- Digital Marketing → `/trainings#category-digital-marketing`
- Foundation → `/trainings`
- Professional → `/trainings`
- Advanced / Specialist → `/trainings`
- Linux & Infrastructure → `/trainings`
- DevOps & SRE → `/trainings#category-microsoft-azure`
- AI & Data → `/trainings#category-programming-data`
- Course Comparisons → `/compare`
- Search Programs → `/trainings#course-search`

### Old group: Certifications

- AWS Training → `/trainings#category-aws`
- Microsoft Training → `/trainings#category-microsoft-azure`
- Cisco Training → `/trainings#category-cisco`
- CompTIA Training → `/trainings#category-comptia`
- EC-Council Training — CEH → `/trainings/certified-ethical-hacker-ceh`
- Red Hat → `/trainings`
- Kubernetes → `/trainings`
- CompTIA Security+ → `/trainings/comptia-security-plus`
- Azure AZ-900 → `/trainings/azure-fundamentals-az-900`
- AWS Cloud Practitioner → `/trainings/aws-cloud-practitioner`
- Student Certifications → `/student-certifications`
- Certificate Verification → `/certificate-verification`

### Old group: Career Pathways

- SOC Analyst → `/trainings/soc-analyst`
- Security Engineer → `/trainings#category-cybersecurity`
- Cloud Engineer → `/trainings#category-aws`
- DevOps Engineer → `/trainings/microsoft-devops-az-400`
- Systems Engineer → `/trainings/computer-hardware-and-networking`
- Software Engineer → `/trainings#category-programming-data`
- Frontend / Backend / Full-Stack Engineer → `/career-support`
- SRE / Infrastructure Engineer → `/career-support`
- AI / LLM Engineer → `/career-support`
- Career Support → `/career-support`
- Skill Matrices & Prerequisites → `/career-support`
- Readiness Assessments → `/career-support`
- Talk to an Advisor → `/contact-us`

### Old group: Labs & Projects

- CEH v13 — Live Labs → `/trainings/certified-ethical-hacker-ceh`
- CCNA 200-301 — Packet Tracer Labs → `/trainings/ccna-200-301`
- Azure AZ-104 — Hands-on Labs → `/trainings/azure-administrator-az-104`
- SOC Analyst — Practical Labs → `/trainings/soc-analyst`
- Vulnerability Assessment & Penetration Testing → `/trainings/vapt`
- All Training Programs → `/trainings`
- Career Support → `/career-support`
- Student Certifications → `/student-certifications`
- Ask about a standalone labs portal → `/contact-us`
- Ask about capstones & portfolios → `/contact-us`
- Ask about quizzes & challenges → `/contact-us`

## IT Solutions

### Old group: IT Solutions

- Cybersecurity Services → `/services/cybersecurity-services`
- Cloud & Infrastructure → `/services/network-infrastructure-building`
- Software Engineering → `/services/web-development`
- Digital Solutions → `/services/digital-marketing-solutions`
- Logo Designing → `/services/logo-designing`
- Corporate Trainings → `/services/corporate-trainings`
- Industrial Trainings → `/services/industrial-trainings`
- College Workshops → `/services/college-workshops`
- Internships → `/services/internships`
- US IT Staffing → `/services/us-it-staffing`
- Domestic Consultancy → `/services/domestic-consultancy`
- Abroad Consultancy → `/services/abroad-consultancy`

## Company & Resources

### Old group: Company & Resources

- About Us → `/about-us`
- Why Choose Us → `/why-choose-us`
- Team Members → `/team-members`
- Careers → `/careers`
- Local Institute Page → `/training-institute-in-dilsukhnagar-hyderabad`
- For Colleges → `/for-colleges`
- For Institutes → `/for-institutes`
- Corporate & International → `/corporate-and-international`
- Partner With Us → `/partner-with-us`
- Learning Articles → `/blog`
- Resources → `/resources`
- Help & FAQs → `/faq`
- Course Comparisons → `/compare`
- Testimonials → `/testimonials`
- Student Certifications → `/student-certifications`
- Certificate Verification → `/certificate-verification`
- Career Support → `/career-support`
- Pricing Information → `/pricing`
- Accessibility → `/accessibility`
- Contact & Advisory → `/contact-us`

## Counts

- Nav link href occurrences: 86 (group hrefs excluded from this count; see method note).
- Unique nav link hrefs: 54.
- Unique destinations including group hrefs: 55.
- Destinations added by the full redesign: 0. Destinations deleted or renamed: 0.
- /careers is present in the Company & Resources group (added 2026-10-28, commit 831484b) and therefore under Company & Resources in this mapping.

## Ambiguous placements (recorded, not hidden)

- DevOps & SRE, AI & Data, Linux & Infrastructure: no standalone catalogue category exists; they point at the closest real category views (Azure / Programming & Data / /trainings) with a 'Coming soon — ask us' or explanatory note, exactly as in `nexus-nav.ts`. The job (Training) follows the old group (Academy), not the topic name.
- Red Hat / Kubernetes: no catalogue courses; they point at /trainings with 'Coming soon — ask us'. Job follows the old group (Certifications → Training).
- EC-Council Training — CEH: points at the CEH course page only, labelled training toward CEH, not the exam itself. Job follows the old group (Certifications → Training).
- Corporate Trainings / College Workshops / Industrial Trainings / Internships: these are services under the IT Solutions group (Enterprise Training column), so their job is IT Solutions — even though they are training-shaped. This follows the old group, not a topic judgement.
- Career Support (/career-support) appears in two old groups (Career Pathways and Company & Resources); it is listed under both, and its job is Training in the first listing and Company & Resources in the second. One URL, two menu homes — no second URL was created.
- Student Certifications and Certificate Verification appear in two old groups (Certifications and Company & Resources); same treatment as Career Support above.
- Course Comparisons (/compare) appears in Academy and Company & Resources; same treatment.

## Footer mapping (same jobs, footer link set)

- Training column: Trainings + the six popular training links + Student Certifications + Certificate Verification.
- IT Solutions column: Services + Corporate & International + Partner With Us.
- Company & Resources column: About, Team, Why, Testimonials, Career Support, Careers, For Colleges, For Institutes, Institute in Dilsukhnagar, Help & FAQs, Contact Us, Pricing, Terms and Conditions, Accessibility. (Pricing / For Institutes / Institute in Dilsukhnagar moved here from the old bottom strip — moved, not deleted.)
- Visit Us column unchanged. Privacy Policy and Refund Policy stay deliberately unlinked (drafts, owner + lawyer block) — unchanged by this redesign.

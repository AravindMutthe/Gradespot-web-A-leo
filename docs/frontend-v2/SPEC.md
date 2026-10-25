# GradeSpot Frontend 2.0 — Specification (DRAFT)

Status: DRAFT, on branch `feat/frontend-v2-platform` only.
Not approved, not merged, not deployed. `main` and the live Leo site are untouched.
This spec is the source of truth for Frontend 2.0 work in this branch.
No UI change in this branch may contradict this spec without an updated spec first.

Source: the Final Website, Business Platform & Migration Blueprint shared
2026-10-25, grounded the same day against the actual Leo codebase
(`Gradespot-web-A-leo`, formerly `gradespot-leo-build-app`, `main` 289fe2b).
Where the blueprint and an earlier standing rule disagree, the disagreement is
listed under Open decisions — it is not silently resolved here.

## 1. Final direction — Leo 2.0 + Axon

- Primary frontend: Leo's Next.js architecture, upgraded visually and structurally.
- Rebuild (`Gradespot-web-B-replica` site) is an alternative design and
  reusable-component reference only. Do not copy its pages wholesale, and do
  not claim a visual winner over Leo without a real screenshot comparison
  (see §11).
- Operating model: frontend first, backend progressively. Launch the new
  design safely, then activate administration and business services in stages.
- Delivery: iterative, small releases, feature flags, rollback. Not waterfall.
- Production rule: replace the WordPress frontend (gsitssolutions.com) only
  after migration and acceptance testing, with the previous site and a tested
  rollback path retained. Until then, the official WordPress site is untouched.

Business positioning (proposed, in priority order):

1. Cybersecurity, cloud, networking and certification training — students,
   professionals, corporate teams.
2. Advanced infrastructure, Linux, DevOps, SRE, Docker, Kubernetes — IT
   professionals and enterprise teams.
3. Hands-on labs, technical assessments and real-world projects — learners,
   companies, institutions.
4. Cybersecurity and IT infrastructure services — SMEs, enterprises, institutes.
5. Software development and digital solutions — businesses and institutions.
6. Corporate training, staffing and consulting — B2B clients.
7. Other existing training categories — relevant learners and partners.

This positioning does NOT delete medical coding, digital marketing, or other
existing offerings. It reorders emphasis only. Hyderabad differentiation must
come from real labs, documented projects, verifiable instructors,
professional assessment and credible certification preparation.
Never advertise guaranteed jobs or guaranteed external certifications.

## 2. Navigation — six menus, two actions

Top bar: location line "Hyderabad, India · Online & Classroom Training",
plus Contact and Student Support links.

Primary menus:

| Menu | Purpose |
| ---- | ------- |
| Training | All courses, domains, learning pathways, beginner-to-advanced programs |
| Certifications | Vendor certification preparation and exam-aligned programs |
| Labs & Projects | Practical labs, assessments, portfolios and advanced programs |
| IT Solutions | Professional technical services and consulting |
| For Organizations | Corporate training, colleges, institutes, staffing and partnerships |
| Explore | About, resources, articles, careers, testimonials, verification, support |

Primary CTA: "Talk to an Advisor". Secondary action: "Explore Programs"
in the hero and on training pages. Registration is contextual, not an
equally prominent button on every page.

### Merge / move map (labels, not URLs)

| Existing options | Final treatment |
| ---------------- | --------------- |
| Trainings + scattered certification links | Training and Certifications |
| Courses + course comparisons | Training discovery; comparisons under Resources |
| Career Support + Testimonials + Student Certifications | Student Outcomes & Support; individual pages retained where useful |
| For Colleges + For Institutes + Partner With Us | For Organizations mega menu |
| Corporate Trainings + Industrial Trainings + Workshops | Enterprise & Institutional Training |
| Cybersecurity Services + Network Infrastructure | IT Solutions, distinct service categories |
| Web Development + Digital Marketing Solutions + Logo Designing | Digital & Software Solutions |
| Domestic Consultancy + Abroad Consultancy + US IT Staffing | Talent & Consulting |
| About Us + Why Choose Us + Team Members | About GradeSpot hub |
| Blog + Resources + FAQ + DigiDefense Blog | Knowledge & Resources |
| Contact Us + Request Callback + Counselling | Contact & Advisory flow |
| Register | Contextual enrollment / application action |
| Pricing | Course-specific pricing, plus a pricing information page where applicable |

Rule: merging a navigation label does NOT merge every URL. Existing indexed
URLs stay live, or get a carefully planned permanent redirect to equivalent
content. A full URL inventory of the official site is required before any
production switch (see §9).

### Mega-menu shape

Desktop: three structured columns plus an optional featured panel.
Mobile: one level of accordion navigation plus a dedicated search experience.
Search: "Search courses, services, certifications..." — available from the header.

Training mega menu, as proposed:

- By Domain: Cybersecurity, Cloud Computing, Networking & Infrastructure,
  Linux & System Administration, DevOps & SRE, Software & Data, Other Programs.
- By Experience: Foundation, Intermediate, Advanced, Professional Upskilling.
- Discover: All Training Programs, Upcoming Batches, Free Demo, Training Modes.

New items such as advanced cohorts, labs and certification roadmaps become
public links only when the corresponding offering actually exists.

## 3. Route map — grounded in the Leo codebase at 289fe2b

Existing Leo routes checked 2026-10-25 (under `src/app`):

- Training: `/trainings`, `/trainings/[slug]`, `/compare`, `/compare/[pair]`,
  `/lp/[slug]`.
- Services: `/services`, `/services/[slug]`.
- Organizations: `/for-colleges`, `/for-institutes`, `/partner-with-us`,
  `/corporate-and-international`.
- Explore / trust: `/about-us`, `/why-choose-us`, `/team-members`,
  `/testimonials`, `/student-certifications`, `/career-support`, `/blog`,
  `/blog/[slug]`, `/resources`, `/faq`, `/certificate-verification`,
  `/accessibility`, `/pricing`, `/contact-us`, `/register`.
- Legal (drafts, facts still open): `/privacy-policy`, `/refund-policy`,
  `/terms-and-conditions`.
- Local SEO: `/training-institute-in-dilsukhnagar-hyderabad`.
- APIs in the repo today: `/api/leads`, `/api/verify`.

Gaps this spec creates (new work, not existing routes):

- No `/certifications` route exists today; Certifications must be built as
  its own pages or as clearly labelled filtered Training views, and vendor
  names (AWS, Azure, Cisco, CompTIA, etc.) may appear only for programs
  genuinely offered — verify against `src/data/certifications.ts` and the
  course catalogue before publishing any vendor pathway.
- No labs/projects route exists today. Labs & Projects pages are new and
  must not be published until labs, assessments or projects exist.
- Data today: `src/data/courses.ts`, `course-details.ts`, `services.ts`,
  `certifications.ts`, `catalogue-nav.ts`, `promotions.ts`, plus
  `src/lib/supabase.ts`, `lead-validation.ts`, `metadata.ts`, `schema.ts`,
  `aeo.ts`, `wa.ts`. The shared Supabase project is `yrbpolqhipwfmvwdgtvc`
  (same project/tables as the replica) — any catalogue change must account
  for production copy coming from live Supabase rows, not just repo data.

## 4. Homepage — eleven sections, replacing the current hierarchy

Replace the current section hierarchy; reuse existing content and components
where practical instead of adding repetitive blocks. The current Leo homepage
already has a split hero, three audience cards, an answer-first summary and a
ticker — those are inputs, not the final structure.

1. Hero — technology training + IT solutions, two clear customer pathways.
   The hero must represent GradeSpot's full offering, not a single course.
   CEH belongs as a featured cybersecurity program card, not as the visual
   for the whole business.
2. Choose Your Path — Students · Professionals · Businesses · Institutions.
3. Explore Technology Domains — Cybersecurity, Cloud, Networking, DevOps,
   Software and other programs.
4. Certification Pathways — genuinely offered programs only (see §3).
5. Hands-on Learning — labs, real projects, assessments, instructor-guided learning.
6. Professional IT Solutions — security, infrastructure, software, digital
   and consulting services.
7. Why GradeSpot — real differentiators, teaching approach, expertise and
   verifiable evidence.
8. Enterprise & Institutional Programs — corporate training, colleges,
   institutes and partnerships.
9. Success & Trust — verified testimonials, certificate verification and
   documented outcomes.
10. Insights & Resources — technical articles, certification guides,
    comparisons and FAQs.
11. Speak With GradeSpot — training enquiry, service consultation, location,
    contact and footer.

## 5. Customer journey and page templates

Journey: Discover (search, navigation, guides) → Evaluate (syllabus, labs,
pricing, FAQs) → Engage (demo, consultation, application) → Deliver
(training, labs, service projects).

Every course page must answer: what students will learn, who it is suitable
for, prerequisites, duration, learning mode, lab requirements, certification
relationship, assessment methods, fees or quotation process, and the next
available action. Do not force registration before viewing useful information;
registration is needed only for applications, protected assessments,
purchases and student access.

Every business service page must answer: what problem GradeSpot solves, what
is included, how engagement works, what the client must provide, expected
deliverables, support arrangements, and how to request a proposal.

## 6. Forms — short and progressive, one purpose each

No generic form for everything, and no long application form for someone who
only wants a brochure. Every production CTA must have a working destination;
never launch a form that pretends to submit successfully. Submitted data must
be stored or delivered reliably (today: `/api/leads` with shared
client+server validation in `src/lib/lead-validation.ts`).

| Form | Essential fields | Later-stage / optional |
| ---- | ---------------- | ---------------------- |
| Quick enquiry | Name, phone or email, interest, preferred contact method | Message |
| Free demo | Name, contact, course, preferred mode | Preferred date |
| Course application | Name, verified contact, selected program, education/experience, prerequisites acknowledgement | Assessment after application |
| Advanced cohort | Course, verified identity/contact, relevant experience, skills assessment, learning objectives | Portfolio/GitHub, interview |
| Service consultation | Name, work email, organization, service category, problem summary | Budget range, timeline |
| Request for proposal | Organization, authorized contact, scope, requirements, timeline | Supporting documents, budget |
| College/institute partnership | Institution name, authorized representative, official contact, collaboration type | Student count, dates |
| Support request | Verified contact or account, category, issue | Attachments |
| Certificate verification | Certificate code | Additional verification only when necessary |

Existing standing rules still apply: `/register` is lead only, no accounts;
`/partner-with-us` is a discussion invitation only; promotions only via the
`getPromotions()` seam (migration 0005), no invented offers; zero B2B prices
until real prices are supplied.

## 7. Learning levels and advanced selection (proposed)

Three levels, with assessment-based placement, not arbitrary exclusion:

- Level 1 — Foundation / Regular: computing, networking, operating systems,
  Linux, scripting and security fundamentals as appropriate.
- Level 2 — Professional / Applied: structured projects, troubleshooting,
  cloud administration, defensive security and certification-aligned labs.
- Level 3 — Advanced / Selective Cohort: complex infrastructure scenarios,
  incident response, advanced cloud/security engineering, supervised
  penetration-testing labs and capstone projects.

Proposed advanced admission weights (a proposal, not an industry standard):

| Criterion | Weight |
| --------- | ------ |
| Foundational knowledge | 25% |
| Practical lab assessment | 35% |
| Troubleshooting ability | 20% |
| Project evidence | 10% |
| Learning objectives and readiness | 10% |

Starting policy (proposed): 75/100 direct advanced admission; 60–74
conditional admission with bridging modules; below 60, a foundation pathway.
Require separate minimum scores for safety-critical labs. Domain assessments:
cybersecurity (TCP/IP, Linux, authentication, security fundamentals, log
analysis, incident handling, authorization boundaries); cloud (networking,
IAM, compute, storage, troubleshooting, infrastructure fundamentals);
DevOps/SRE (Linux, Git, CI/CD, containers, observability, incident response);
networking (subnetting, routing, switching, troubleshooting); software
(programming, debugging, testing, Git, application design).

Advanced cybersecurity access additionally requires: a signed acceptable-use
agreement, isolated lab environments, scoped permissions, supervised practical
work, and a prohibition on testing third-party systems without explicit
authorization. Outcomes must be explainable, retakes and reasonable
accommodations allowed, bridging programs provided. Placement, not labelling
beginners as inferior.

## 8. Anti-fraud and spam — layered, server-side

Frontend validation is usability only; it is not a security boundary.
Attackers can call APIs directly.

| Risk | Controls |
| ---- | -------- |
| Spam enquiries | Rate limiting, honeypots, bot-risk challenges, server-side validation |
| Fake email/phone | Email verification or OTP where justified |
| Fake company enquiries | Business-domain verification, manual qualification, company evidence for high-value engagements |
| Dummy registrations | Verified accounts, enrollment limits, duplicate detection |
| Malicious form content | Strict schema validation, length limits, output encoding, parameterized SQL |
| File-upload abuse | Type/size validation, malware scanning, private storage |
| Credential attacks | MFA for staff, rate limits, secure sessions, breached-password screening |
| Payment fraud | Hosted checkout, signed webhook verification, idempotency, reconciliation |
| Fake certificates | Random non-guessable verification IDs, minimal public disclosure, rate limits |
| Advanced lab misuse | Isolated environments, authorization, quotas, monitoring, automatic teardown |

Workflow: new enquiry → automated checks → verified contact → lead
qualification → human review when necessary → accepted / follow-up / rejected.
Do not treat a personal email, limited technical knowledge, or a missing
company website as proof of fraud. Store fraud-risk indicators carefully,
with short retention and a route to correct false positives. For high-value
B2B contracts, verify legal entity details, authority to sign, scope and
payment terms before work begins. Collect GST information only when required
for invoicing or relevant verification.

## 9. Migration — frontend first, backend later

Stage 1 — Frontend redesign: Leo 2.0 navigation, pages, forms and content,
using stable local or existing approved data sources.
Stage 2 — Production readiness: SEO migration, redirects, working lead
capture, legal pages, analytics, security, backups, rollback testing.
Stage 3 — Replace official frontend: deploy Leo to the official domain only
after acceptance; retain the previous production site and a tested rollback path.
Stage 4 — Connect Axon iteratively: catalog and content publishing, then
enquiries, identity, admissions, assessments, bookings and payments.
Stage 5 — Advanced platform: student portal, labs, projects, quizzes,
enterprise workflows, AI search and AI-assisted support.

Compatibility rule: public components must talk to business data through
stable interfaces, so a later backend swap does not force a redesign:

```ts
interface CatalogRepository {
  getCourses(): Promise<Course[]>;
  getCourse(slug: string): Promise<Course | null>;
}

interface LeadService {
  submitEnquiry(input: EnquiryInput): Promise<EnquiryResult>;
}
```

Initially these use existing approved data and the functional `/api/leads`
endpoint. Axon later replaces the adapters.

Deployment workflow: feature branch → PR → automated tests → preview
deployment → accessibility/security review → staging → founder approval →
production → monitoring. For this repo, note the correction to the blueprint's
assumption: Leo's Vercel project is not git-connected, so a branch push does
not auto-create a preview; previews are API-upload deployments and do not
draw on the same path as a git push. No preview or production deploy happens
from this branch without explicit approval.

## 10. Admin configuration and future AI (Axon, staged)

Admin modules (capabilities, not arbitrary code execution):

| Module | Capabilities |
| ------ | ------------ |
| Navigation Studio | Menus, mega-menu groups, order, links, featured cards |
| Page Studio | Homepage sections, landing pages, templates, visibility |
| Design System | Approved themes, fonts, colors, buttons, spacing |
| Training Catalog | Courses, levels, prerequisites, syllabi, batches |
| Certification Catalog | Exam relationships, vendor details, roadmaps |
| Lab & Assessment Manager | Quizzes, lab assignments, grading rules, access |
| Services Manager | Capabilities, deliverables, service enquiries |
| CRM | Leads, qualification, follow-up, pipeline |
| Admissions | Applications, assessment scores, cohort decisions |
| Publishing | Drafts, previews, approvals, scheduled release, rollback |
| Compliance | Consent records, policies, data requests, audit logs |
| Integrations | Email, payments, WhatsApp, CRM, AI providers |

AI boundaries: separate services for search, recommendations, document
retrieval and conversational assistance; model providers replaceable. AI must
not directly modify grades, admission decisions, payments or published
content without an explicit authorized workflow.

## 11. Design tokens — start from approved Leo v1

Leo v1 (approved 2026-10-24) is the foundation: Prospectus design, Fraunces +
Instrument Sans + IBM Plex Mono, self-hosted fonts, paper `#FAF6EE`,
ink `#201913`, vermilion `#B23A0A`. Direction for 2.0: keep that editorial
foundation and move toward a premium technology-enterprise appearance —
disciplined typography, excellent spacing, strong real-world imagery,
restrained motion, clear service categories, polished forms.

Hard guards, unchanged by this spec unless explicitly overridden by the user:

- The approved Leo logo plate (original luminous parchment + halo,
  per-theme logo swap) stays untouched.
- All assets local in the repo, never hotlinked.
- Official GradeSpot logo unmodified; content-truth layer stays; no invented
  fees, dates, trainers, stats, ratings, prices or placement claims.
- No vendor logos or partner badges without proof of partner status.
- The `package.json` name is still `gradespot-leo-build-app` locally; the
  GitHub rename to `Gradespot-web-A-leo` does not by itself rename the
  package or the Vercel project.

## 12. Compliance — targets, not claims

Targets: WCAG 2.2 AA for accessibility; OWASP ASVS / OWASP Top 10 for web
security; dependency and secret scanning, signed releases where practical;
ISO/IEC 27001-aligned controls (alignment only — do not claim certification
unless independently achieved); India's DPDP Act and applicable Rules;
GDPR or other local privacy laws when they actually apply to a customer;
PCI DSS obligations appropriate to the payment model, preferring hosted
gateways; documented learning outcomes and fair assessment.

Policy pages to publish (only when they reflect actual practice):
Privacy Policy (purposes, processors, retention, rights, contact); Terms of
Website Use; Training Enrollment Terms (fees, attendance, assessment,
completion); Refund, Cancellation and Rescheduling Policy; IT Services Terms
with separate statements of work; Acceptable Use Policy for portals, labs
and cybersecurity training; Cookie Notice and preferences where applicable;
Intellectual Property and Training Materials Policy; Grievance and Privacy
Contact; Accessibility Statement.

Still open (do not invent): grievance officer, privacy/refund text details,
CIN and registered office, refund terms, data practices. These are the same
gaps already in the policy drafts and in Axon `DECISIONS-NEEDED.md`.
Do not promise automatic refunds, certification eligibility or 24/7 support
unless GradeSpot can deliver them.

External claims in the blueprint (DSCI September 2026 research, DPDP Rules
notified November 2025 with duties phasing through 13 May 2027, OWASP
bot-management guidance, Google AI-search guidance) are recorded here as
blueprint citations only. They were not independently verified for this spec
and must not be published as GradeSpot facts until sourced.

## 13. Screenshot limitation — do not claim what was not seen

The blueprint's author could not retrieve the live Leo or Rebuild deployments
for inspection and presented proposed layouts, not live screenshots. This
spec likewise makes no visual score and no claim that Leo definitively looks
better than Rebuild. A proper comparison, if wanted later, captures desktop
homepage, open mega menu, mobile homepage, mobile drawer, course page and
service page for both sites at identical viewport sizes, in a clean render —
not from memory or from proposed layouts.

## 14. Open decisions — confirm before building beyond this spec

1. Navigation merge: the blueprint changes the earlier rule (preserve every
   existing menu item) to "preserve business meaning, merge redundant
   navigation". Confirm this supersedes the old rule.
2. Backend stack: the blueprint proposes a NestJS modular monolith (Axon)
   with PostgreSQL and reconciliation of existing Supabase data. This
   conflicts with the earlier Axon v1 decision (a single Next.js + Route
   Handlers + Supabase app, Supabase recommended over Firebase, monorepo
   only when deployables genuinely split). Confirm before any backend change.
3. Pricing Set A vs Set B: still unanswered, parked in Axon
   `DECISIONS-NEEDED.md`. Do not nag; do not invent prices.
4. Certification vendors actually offered: verify against the catalogue
   before publishing AWS/Azure/Cisco/CompTIA pathways.
5. Labs, projects and advanced cohorts: publish only when the offering exists.
6. Future organization `gradespot-official/gradespot-web-leo` and the
   backend/admin/contracts/infrastructure repos: later, not now. Current
   personal repos and live deployments stay untouched during planning.
7. Vercel preview path for this branch: API-upload preview, not git-triggered,
   and only on explicit approval.

## 15. Phased backlog (from this spec, in order)

1. This spec, reviewed and corrected by the user.
2. Route inventory + redirect plan for the official site (before any switch).
3. Navigation 2.0: six menus, mega menus, mobile accordion, search.
4. Homepage 2.0: the eleven sections in §4, reusing existing components.
5. Training discovery + course/service page templates (§5).
6. Progressive forms (§6) with working `/api/leads` destinations only.
7. CMS configuration contracts (Navigation/Page/Design/Catalog modules, §10)
   — contracts first, admin UI later.
8. SEO/security/accessibility acceptance pass (WCAG 2.2 AA target, OWASP,
   structured data, validation, spam controls).
9. Preview → accessibility/security review → staging → founder approval →
   production, with rollback tested. Production switch is a separate decision.
10. Axon integration in the §9 order, starting with catalog/content, only
    after Open decision 2 is settled.

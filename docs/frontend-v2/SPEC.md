# GradeSpot Frontend 2.0 — Specification (v2, LOCKED DIRECTION)

Status: v2 DRAFT, on branch `feat/frontend-v2-platform` only.
Not approved as a built redesign, not merged, not deployed to production.
`main` and all live sites are untouched.
This spec is the single versioned source of truth for Frontend 2.0 work in
this branch. No UI change in this branch may contradict this spec without
an updated spec first.

## Changelog — what this version supersedes, and why

- v1 spec (commit c6a97a0) and its implementation (commit f584ee5, preview
  dpl_FkroYxCmFmayZTHFsNF2ov7cpQCu) are SUPERSEDED and are NOT the final
  redesign. v1 improved information architecture, but it kept almost the
  same homepage, card placements, hero and section structure, only
  reorganizing Leo's existing components. That is not a genuine GradeSpot 2.0.
- v1 implementation must NOT be merged. The Nexus build below replaces it,
  in staged releases, on this same branch. The v1 preview is not a Nexus
  preview. Its SSO-open / delete-preview cleanup is still pending the user's
  word (see §14).
- v2 (this file, 2026-10-25) settles the direction from the user's two
  verdicts of 2026-10-25: (a) the Academy / Technology Solutions / Labs &
  Career Pathways direction, and (b) the final GradeSpot Nexus verdict.
  Where those verdicts correct v1, v2 follows the verdicts, not v1.

## 0. Identity — GradeSpot Nexus (internal) / GradeSpot IT Solutions (public)

- Public brand, unchanged: **GradeSpot IT Solutions**.
- Internal name for the redesigned experience: **GradeSpot Nexus**.
- Tagline: Technology Academy · Certifications · Applied Labs ·
  Enterprise IT Solutions.
- Design philosophy: IBM Carbon's engineering discipline + GradeSpot's
  existing visual identity + modern technology-product storytelling.
- Three clearly differentiated experiences:
  1. **Academy** — education and certifications.
  2. **Technology Solutions** — business clients, professional services and
     enterprise delivery.
  3. **Labs & Career Pathways** — practical learning and professional
     development.

### Non-negotiable brand rule

- Preserve the original GradeSpot logo, its proportions, and its existing
  brand colors. The logo is the source of truth for the brand palette.
- Do NOT replace the logo with a generic gradient symbol, and do NOT
  replace the brand with a navy-and-purple identity from a concept image.
  That concept identity is NOT approved.
- Prior verified live-site tokens (Oct 2026 audit of gsitssolutions.com)
  were primary orange #F7631B, secondary orange #F98238, heading navy
  #0E2B3D, black footer, Inter / Roboto Slab. Those are prior audit values,
  not a substitute for the pre-implementation sampling step below.
- **Pre-implementation step, mandatory:** sample the actual brand tokens
  from the repository's original logo files (`public/images/logo.png`,
  `public/images/logo-light.png`) and the current approved CSS before any
  Nexus implementation. Until that sampling is done, no Nexus palette is
  final. The illustrative token hexes in §3 are NOT a verified logo
  extraction.

## 1. Direction — frontend first, staged, production preserved

- Primary frontend: Next.js (see §7 for the full stack), on this branch.
- Rebuild (`Gradespot-web-B-replica`) remains a reference only, not a
  source to copy wholesale. No visual winner is claimed over it without a
  real, clean-render screenshot comparison.
- Operating model: frontend first, backend progressively. Launch the new
  public experience safely, then connect Axon module by module.
- Delivery: iterative DevOps delivery, not waterfall. Four releases (§12),
  staged pull requests, feature flags where useful, rollback available.
- Production rule: replace the WordPress frontend (gsitssolutions.com)
  only after migration and acceptance testing, with the previous site and
  a tested rollback path retained. Until then, the official WordPress site,
  the Leo production site and the replica production site are untouched.
- Proof that `main` is unaffected is NOT a preview URL alone. It is the
  Git branch + deployment settings together: branch tip vs `main` tip,
  deployment target (preview, not production), and aliases (empty for a
  preview). Every Nexus preview report must state all three.

## 2. Navigation and business structure — six top-level groups

| Navigation | What belongs inside |
| ---------- | ------------------- |
| Academy | All Programs, Cybersecurity, Cloud, Networking, Linux & Infrastructure, DevOps & SRE, Software Engineering, AI & Data, other existing disciplines |
| Certifications | AWS, Microsoft, Cisco, CompTIA, EC-Council, Red Hat, Kubernetes and other supported certification pathways |
| Career Pathways | Job-role roadmaps, skill matrices, prerequisites, tools, projects, readiness assessments |
| Labs & Projects | Practice environments, guided labs, capstones, quizzes, portfolios, challenges |
| IT Solutions | Cybersecurity, cloud and infrastructure, software engineering, digital solutions, IT consulting |
| Company & Resources | About, enterprise training, institutional partnerships, articles, student outcomes, verification, support, policies |

- For enterprise clients, make **For Business** a prominent utility link
  or mega-menu feature within IT Solutions — do not bury the entire B2B
  offering inside the Academy.
- Remove duplicate calls to action, repetitive promotional banners and
  redundant navigation labels. Content may be rewritten in professional
  language while preserving the underlying service promises and factual
  meaning. Merging a label does not delete a URL: existing indexed URLs
  stay live or get a planned permanent redirect to equivalent content.
- Brand vocabulary, kept distinct everywhere:
  - **Academy:** learning programs, cohorts, curricula, learning outcomes,
    assessments, faculty, certification preparation.
  - **Professional Services:** discovery, technical consultation, solution
    architecture, implementation, managed operations, support agreements.
  - **Enterprise Solutions:** organizational capability building, workforce
    enablement, infrastructure modernization, cybersecurity readiness and
    technology delivery.

## 3. Visual system — custom public system, Carbon-inspired rigor

### What Carbon is, and is not, for Nexus

- IBM Carbon is an excellent design-system reference and is particularly
  suitable for dense administrative interfaces, tables, enterprise forms,
  filters, workflows and dashboards. Carbon v11 supports React and Web
  Components, with tokens, icons, grids and accessibility guidance.
- Carbon is NOT the visual foundation for the entire public-facing
  GradeSpot website. A public EdTech site also needs editorial
  storytelling, course discovery, immersive labs and conversion-focused
  landing pages, which Carbon's enterprise components alone do not give.
- Preferred direction — hybrid: preserve GradeSpot's brand, build a
  **custom public design system inspired by Carbon's rigor**, and use
  Carbon more directly where appropriate in future administration and
  student-management interfaces.

| GradeSpot surface | Choice |
| ----------------- | ------ |
| Marketing homepage | Custom GradeSpot design |
| Academy catalog | Custom design + accessible component primitives |
| Course details | Custom learning-focused layout |
| Career roadmaps | Custom interactive visualizations |
| Labs and student portal | Carbon-inspired application UI |
| Admin dashboard | Carbon React, after compatibility testing |
| CRM and reporting | Carbon tables, filters and forms |
| Enterprise client portal | Carbon-inspired or Carbon React |

- Do NOT mix Carbon and another full UI library indiscriminately on the
  same screen. That creates inconsistent spacing, typography, focus states
  and styling.

### 40-token color system — tokens, not 40 competing accents

- Use **40 design tokens, not 40 equally prominent colors**. An interface
  with 40 competing accents would be visually noisy and less professional.
- In actual use, most pages rely on neutral surfaces, two or three brand
  accents, and a limited set of semantic colors. The 40 tokens provide
  depth for hover states, charts, light/dark themes, category badges,
  diagrams and feedback.
- The token architecture below is ILLUSTRATIVE only. It is not a verified
  extraction of the existing logo. Brand accents in it must be replaced or
  confirmed by the §0 sampling step before implementation. Do not ship
  these hexes as GradeSpot brand colors on the strength of this spec alone.
  - Brand & interaction (illustrative): #0C57B7, #F5A477
  - Backgrounds (illustrative): #FFFFFF, #EEF5FF
  - Text & surfaces (illustrative): #111827, #E2E8F0
  - Feedback & data (illustrative): #166534, #F87171
  - Technical accents (illustrative): #7C3AED, #CCFBF1
- The earlier v1 direction (Prospectus paper/ink/vermilion, and the
  navy/graphite/ivory/electric-blue concept) is superseded for Nexus by
  this section: the public palette is logo-derived, with a custom system
  built on top of it. The Leo v1 production tokens are unchanged on `main`
  and live; they are not the Nexus palette.

### Page compositions — genuinely different, not repeated card rows

- The homepage must be visually different: alternating editorial,
  technical and application-style sections, not repeated rows of identical
  cards.
- Hero direction (conceptual copy, colors per §0): "Engineering Skills.
  Real-World Solutions." — professional technology education, certification
  preparation, hands-on labs and enterprise IT services — with Explore
  Academy and IT Solutions actions, plus Cybersecurity Academy, Cloud &
  Infrastructure, Career Pathways and Enterprise Solutions blocks.
- Distinct visual grammar per major page type:
  - Academy: structured discovery.
  - Course pages: curriculum and learning-outcome layouts.
  - Career pathways: skill graphs.
  - Labs: technical workspaces.
  - IT Solutions: case-study and service-delivery layouts.
  - Enterprise pages: solution briefs and proposal workflows.

## 4. Course catalog — decisions, not identical cards

Do not present every course as an identical card. Each program needs a
clear classification:

| Level | Audience | Curriculum | Access model |
| ----- | -------- | ---------- | ------------ |
| Foundation | Beginners and career starters | Fundamentals, guided exercises, basic quizzes | Open enrollment |
| Professional | Learners with basic knowledge | Tools, troubleshooting, projects, certification objectives | Recommended prerequisites and optional assessment |
| Advanced / Specialist | Experienced learners | Architecture, complex labs, case studies, capstones | Prerequisite verification and technical assessment |

- "Premium" describes depth, instructor access, lab resources and
  specialized delivery — not that everyone who pays more is automatically
  technically qualified.
- Catalog filters: category, level, delivery mode, duration, prerequisite
  level, certification alignment, price visibility, lab availability.
- Syllabus access: a public curriculum preview, with protected material
  behind a paid enrollment entitlement. Do not hide basic course
  objectives or essential purchase information behind payment.
- Free demos are a per-program setting:
  `demo_policy = none | free_intro | scheduled_demo | paid_orientation | consultation_only`
  A specialist cohort may offer an application discussion or paid
  orientation instead of a free technical demo; a beginner course may
  offer a free introductory class.
- Program status, mandatory on every listing: `Available | Planned |
  Waitlist | Not Offered`. Only published, deliverable programs are promoted
  as enrollable.

### Target domain taxonomy — target, not a claim of current teaching

| Domain | Example offerings |
| ------ | ----------------- |
| Cybersecurity | Security fundamentals, SOC, SIEM, incident response, ethical hacking, cloud security, digital forensics |
| Cloud & Platforms | AWS, Azure, GCP, cloud architecture, IaaS/PaaS/SaaS fundamentals, cloud networking |
| Networking | TCP/IP, Cisco, routing, switching, firewalls, network automation |
| Linux & Infrastructure | Linux administration, Windows Server, virtualization, storage, backup, infrastructure engineering |
| DevOps, SRE & Platform Engineering | Git, CI/CD, Docker, Kubernetes, Terraform, Ansible, monitoring, GitOps |
| Software Engineering | Frontend, backend, full-stack, APIs, testing, architecture, databases |
| AI, Data & Automation | Python, data engineering, ML, LLM applications, RAG, agentic AI, MLOps |
| Enterprise Applications | SaaS administration, identity, collaboration, ITSM and business platforms |
| Other existing programs | Medical coding, digital marketing and other current offerings |

- This taxonomy is a TARGET, not a claim that GradeSpot already teaches
  every listed course. Local relevance (a Dilsukhnagar provider marketing
  AWS, DevOps, Linux, cybersecurity, Azure DevOps, multi-cloud, data and
  AI training) supports category relevance locally; it does not establish
  demand volumes or justify launching all of them immediately.
- Grounding gap, carried forward: the current Leo catalogue has no Linux
  or DevOps category, and no standalone labs offering. Those domains are
  therefore `Planned` / `Waitlist` until real courses exist — never
  presented as available.

## 5. Career pathways — a major differentiator, interactive

Each career roadmap connects job responsibilities, prerequisite skills,
tools, certifications, projects and relevant GradeSpot programs. Pathways
are interactive — a visitor selects a role, inspects required skills,
compares current knowledge and finds appropriate programs — not merely
long blog articles.

| Career pathway | Skills and tools to cover |
| -------------- | ------------------------- |
| Frontend Engineer | HTML, CSS, TypeScript, React, Next.js, accessibility, testing, Git, browser tooling |
| Backend Engineer | Node.js, NestJS, REST, SQL, PostgreSQL, authentication, caching, testing, observability |
| Full-Stack Engineer | Frontend + backend + databases + deployment + application security |
| Software Engineer | Data structures, algorithms, software design, testing, Git, CI/CD |
| Systems Engineer | Linux, Windows, networking, virtualization, scripting, identity, backups |
| Cloud Engineer | AWS/Azure/GCP, IAM, VPC/VNet, compute, storage, infrastructure as code |
| DevOps Engineer | Linux, Git, Docker, Kubernetes, Terraform, CI/CD, Helm, GitOps |
| SRE | SLIs/SLOs, monitoring, incident response, automation, reliability, capacity planning |
| Infrastructure Engineer | Networking, servers, storage, virtualization, automation, resilience |
| SOC Analyst | SIEM, log analysis, detection, triage, incident response, threat intelligence |
| Security Engineer | Secure architecture, IAM, vulnerability management, cloud security, defensive engineering |
| AI/LLM Engineer | Python, APIs, embeddings, retrieval, evaluation, model deployment, guardrails |

## 6. Forms, qualification and security

Avoid collecting excessive data before trust is established. Progressive
disclosure throughout.

| Customer action | Collect initially | Collect later if needed |
| --------------- | ----------------- | ----------------------- |
| Training enquiry | Name, verified contact method, program, preferred mode | Experience, learning goals |
| Program application | Contact, program, education/experience, prerequisites | Assessment, portfolio |
| Advanced cohort admission | Verified applicant, skill test, lab exercise, objectives | Interview, identity checks when justified |
| Business consultation | Contact, company, business email, service need | Scope, timeline, budget |
| Service proposal | Authorized contact, requirements, expected deliverables | Contract and billing details |
| Enterprise training | Company, team size, skills needed, preferred delivery | Learner roster and scheduling |
| Support | Ticket category, verified contact, issue | Secure attachments |

- A person asking about AWS training must not have to provide employment
  history, home address and identity documents.

### 6A. Billing-style form pattern — agreement, payment and partnership ONLY

- Use the structured billing-address form pattern (as in the reference
  screenshot shared 2026-10-25) ONLY for agreement, payment and
  partnership forms — the forms where a contract, invoice or authorized
  organizational relationship is actually being created. Do NOT use this
  pattern on enquiry forms; enquiries stay short and progressive per the
  table above.
- Field structure for those three form types (grouped, labelled, with
  inline validation and clear required/optional marking):
  - Billing / legal contact: first name, last name (separate fields, not
    a single name field).
  - Country (selector), address line 1, address line 2 (optional).
  - City, state/region (selector), ZIP/postal code.
  - Organization name (optional, except where the agreement or invoice
    legally requires it — then required and labelled as such).
  - Account type (selector: e.g. individual / business, as applicable to
    the form), VAT/GST number (optional, except where invoicing requires
    it).
  - A separate "Change payment method" action, kept distinct from the
    address block — changing a payment method is never bundled silently
    into submitting an agreement or partnership form.
- Validation and behaviour: country/state selectors with clear/remove
  controls; ZIP/postal format validated per country where known, never
  assumed to be Indian format for international clients; organization
  and VAT/GST fields validated only when supplied (or when required by
  the agreement type); field-level error states, not a generic failure
  banner; no pre-filled personal or billing values from a screenshot or
  from another user's session — values in the reference screenshot are
  a design example only, not GradeSpot data and not to be copied into the
  forms as defaults.
- Placement: this pattern belongs to Release 3 (IT Solutions and
  conversion workflows) in §12, not to Release 1 (design system +
  navigation) and not to enquiry flows. If a prototype of these three
  forms is built before a Release 1 preview push, it must still follow
  this section and must not widen enquiry forms.
- No payment is submitted, no payment method is changed, and no agreement
  is signed by building this pattern — those actions remain separate,
  explicitly authorized steps with their own confirmation.
- Advanced courses: weighted assessment emphasizing foundational
  knowledge, hands-on tasks and troubleshooting, with a bridging route
  for learners who need preparation. Sensitive cybersecurity labs require
  acceptable-use commitments and isolated, authorized environments.
- Security baseline: client-side Zod validation for feedback;
  server-side schema validation for enforcement; rate limits; bot
  protection; email/phone verification when justified; upload scanning;
  secure authentication; staff MFA; role-based access; audit logs;
  verified payment webhooks. Use OWASP ASVS 5.0 as the application-security
  verification baseline (risk-based controls — see §10).
- Never publish student private data, assessment scores, certificates or
  client information by default. Public certificate verification discloses
  only the minimum information necessary.

## 7. Frontend technology stack (Nexus)

| Layer | Recommended technology |
| ----- | ---------------------- |
| Framework | Next.js 16 App Router |
| UI language | TypeScript 5 |
| Rendering | React Server Components, SSR and static generation |
| Styling | Tailwind CSS 4 + CSS custom properties |
| Component foundations | Radix UI primitives + custom GradeSpot components |
| Enterprise components | IBM Carbon React where appropriate (see §3) |
| Icons | Lucide React; Carbon icons where Carbon is used |
| Forms | React Hook Form + Zod |
| Animations | Motion, selectively and with reduced-motion support |
| Search | Meilisearch or Typesense when catalog scale justifies it |
| Data visualization | Recharts for standard charts; React Flow for career roadmaps |
| Data access | Typed repository interfaces and generated API clients |
| Content configuration | Versioned JSON schemas, later served by Axon |
| Testing | Vitest, React Testing Library, Playwright, axe-core |
| Monitoring | OpenTelemetry-compatible telemetry and error reporting |
| CI/CD | GitHub Actions + Vercel previews |
| Future backend | NestJS Axon + PostgreSQL |

- Next.js recommends Server Components by default and selective Client
  Components to reduce client-side JavaScript — especially important for
  fast public pages and search-engine crawlability.
- React Compiler is an EVALUATED optimization, not enabled blindly.
  Next.js 16 supports it, but build and compatibility testing come first.
- Existing Leo stack (Next.js 16.4.3, React 19, Tailwind 4, Zod) is
  compatible in direction; the stack table above is the Nexus target, not
  a claim that every item is already in the repo.
- Future backend note: NestJS Axon + PostgreSQL is the verdict's future
  direction. It still conflicts with the earlier Axon v1 decision (a
  single Next.js + Route Handlers + Supabase app). That conflict is OPEN
  and is not settled by this spec — frontend work must not depend on a
  backend swap, and no backend migration happens on the strength of this
  spec alone.

## 8. AI integration — discovery first, not a decorative chatbot

AI is a genuine product feature in Nexus, starting with AI-assisted
discovery — not a generic chatbot on every page.

- **AI Program Finder:** a visitor describes background and goals; the
  assistant suggests appropriate published courses, prerequisites, levels
  and career pathways, with links to the actual catalog.
- **AI Career Roadmap Assistant:** generates a personalized sequence of
  skills, tools, certifications and projects for a selected role.
- **AI Learning Assistant:** explains authorized course material, offers
  practice questions and hints. It must NOT disclose protected premium
  content to unenrolled visitors.
- **AI Solutions Advisor:** helps business visitors clarify service
  requirements and prepare a structured consultation request, without
  inventing prices or commitments.

Architecture:

```text
Next.js public frontend
       |
       v
Authenticated / rate-limited AI gateway
       |
       +-- Catalog and career-pathway retrieval
       +-- Knowledge-base retrieval
       +-- Entitlement and permission checks
       +-- Safety and abuse controls
       +-- Model provider adapter
       |
       v
Grounded answer with source links
```

- Do not expose model API keys in the browser.
- Do not let the model independently authorize course purchases, change
  assessment scores or grant access to labs.
- AI can start with a protected Next.js server endpoint and later move
  behind Axon without changing the public interface.

## 9. CMS-ready frontend

Every important design choice is configuration-driven from the beginning,
even before Axon is fully operational. Use typed component schemas, never
arbitrary HTML/JavaScript injection by administrators.

| Configuration | What admins can control |
| ------------- | ----------------------- |
| Navigation | Menu labels, grouping, order, icons, visibility, destinations |
| Homepage | Section order, layouts, featured programs, campaigns, CTAs |
| Design | Approved themes, typography presets, colors, spacing, component variants |
| Academy | Courses, levels, curriculum previews, prices, batches, demo eligibility |
| Career Pathways | Roles, skill maps, tools, roadmaps, assessments |
| Services | Offerings, consultation types, deliverables, engagement models |
| Forms | Approved fields, validation rules, routing, consent text |
| Publishing | Draft, preview, approval, scheduling, rollback |
| AI readiness | Search provider, retrieval sources, recommendation features, safety settings |

## 10. Measurable quality gates — success is not visual appearance alone

| Metric | Target |
| ------ | ------ |
| Lighthouse performance | 90+ on representative public pages |
| Accessibility | WCAG 2.2 AA |
| LCP | ≤2.5 seconds at the 75th percentile |
| INP | ≤200 ms at the 75th percentile |
| CLS | ≤0.1 at the 75th percentile |
| Security verification | OWASP ASVS 5.0 risk-based controls |
| Mobile usability | No horizontal overflow; usable touch targets and navigation |
| Navigation success | Users can find a course or service without unnecessary detours |
| Forms | Clear validation, reliable delivery, spam resistance |
| SEO | Crawlable pages, correct canonical URLs, redirects and structured data |

- WCAG 2.2 provides testable accessibility requirements; OWASP ASVS 5.0
  provides a security verification framework. Neither is automatically
  satisfied by choosing Carbon or Next.js.
- Legal baseline, publish only what reflects actual practice: Privacy
  Policy, Website Terms, Training Terms, Refund and Cancellation Policy,
  IT Services Terms, Acceptable Use Policy, Cookie Notice where
  applicable, Accessibility Statement, grievance/contact process.
  India's DPDP Rules have a phased implementation timeline, so
  privacy-by-design matters now. Still open, do not invent: grievance
  officer, CIN and registered office, refund terms, data practices.

## 11. Customer journey, page templates and existing-route grounding

- Journey: Discover (search, navigation, guides) → Evaluate (syllabus,
  labs, pricing, FAQs) → Engage (demo, consultation, application) →
  Deliver (training, labs, service projects).
- Course pages answer: what students learn, suitability, prerequisites,
  duration, mode, lab requirements, certification relationship, assessment,
  fees or quotation process, next action. Do not force registration before
  useful information; registration only for applications, protected
  assessments, purchases and student access.
- Service pages answer: problem solved, what is included, engagement
  model, client inputs, deliverables, support, how to request a proposal.
- Existing Leo routes at `main` 289fe2b (under `src/app`): `/trainings`,
  `/trainings/[slug]`, `/compare`, `/services`, `/services/[slug]`,
  `/for-colleges`, `/for-institutes`, `/partner-with-us`,
  `/corporate-and-international`, `/about-us`, `/why-choose-us`,
  `/team-members`, `/testimonials`, `/student-certifications`,
  `/career-support`, `/blog`, `/resources`, `/faq`,
  `/certificate-verification`, `/accessibility`, `/pricing`,
  `/contact-us`, `/register` (lead only), `/api/leads`, `/api/verify`.
  No `/certifications` route and no standalone labs route exist today.
  The shared Supabase project is `yrbpolqhipwfmvwdgtvc` (same
  project/tables as the replica) — production copy can come from live rows,
  not just repo data.
- Compatibility rule: public components talk to business data through
  stable typed interfaces (e.g. `CatalogRepository.getCourses() /
  getCourse(slug)`, `LeadService.submitEnquiry()`). Initially these use
  existing approved data and `/api/leads`; Axon later replaces the
  adapters without a public redesign. Never launch a form that pretends
  to submit successfully.

## 12. Rollout — four releases, staged PRs, on this branch

1. **Release 1 — Design system and navigation:** logo-sampled 40-token
   system, custom public components (Carbon-inspired rigor, Carbon only
   where §3 says so), six-group navigation, homepage composition.
2. **Release 2 — Academy and career discovery:** catalog with levels,
   filters, curriculum previews, `demo_policy`, program status, and
   interactive career pathways.
3. **Release 3 — IT Solutions and conversion workflows:** service and
   enterprise pages with case-study / solution-brief grammars, For
   Business prominence, progressive forms and consultation/proposal flows.
4. **Release 4 — AI integration and CMS configuration readiness:** the
   four AI products behind the §8 gateway, plus versioned JSON
   configuration schemas for navigation, homepage, design, Academy,
   pathways, services, forms and publishing.

- After the releases: test all official URLs and forms, migrate the
  official site with rollback available, then connect Axon module by
  module — content, catalog, enquiries, CRM, enrollment, assessments,
  labs and payments. Iterative DevOps delivery, not waterfall.
- Merge only after visual review, functional testing and production
  approval. Until then, work stays on `feat/frontend-v2-platform`, in
  staged pull requests, with `main` untouched.
- Vercel previews for this branch are API-upload previews (the Leo
  project is not git-connected), preview target only, no alias, and a
  preview report must state branch tip, `main` tip, target and aliases.

## 13. Illustrative material and screenshot limitation — do not misuse

- Any design-preview statistics, course prices, ratings, named offerings
  and UI claims in concept material are ILLUSTRATIVE PLACEHOLDERS, not
  verified GradeSpot facts or live-site measurements. Do not publish them
  as facts.
- Simulated "current site" panels in concept material are NOT actual
  screenshots of `gradespot-leo-build-app.vercel.app`,
  `gradespot-app.vercel.app`, or the official site, and must not be used
  as evidence of their present designs.
- Likewise, no visual score or claim that Nexus definitively looks better
  than any live site is valid without a real, clean-render comparison at
  identical viewports.

## 14. Open decisions and pending cleanup — confirm before building beyond this spec

1. Logo token sampling (§0) must be completed before Nexus implementation.
   Exact Nexus palette values are not in this spec.
2. Navigation merge vs preserve-every-menu-item: the Nexus six groups
   merge redundant labels; the old preserve-every-item rule is superseded
   for Nexus by this spec, but no URL is deleted without a redirect plan.
3. Backend: NestJS Axon + PostgreSQL (future verdict) vs earlier Axon v1
   Next.js + Supabase — OPEN, not settled here.
4. Pricing Set A vs Set B: still unanswered, parked in Axon
   `DECISIONS-NEEDED.md`. Do not invent prices.
5. Certification vendors actually offered, labs actually offered, and
   Linux/DevOps courses actually offered: verify against the catalogue
   before publishing; otherwise mark `Planned` / `Waitlist`.
6. Search provider (Meilisearch vs Typesense) only when catalog scale
   justifies it; React Compiler only after build/compatibility testing.
7. Future organization `gradespot-official/gradespot-web-leo` and
   backend/admin/contracts/infra repos: later, not now.
8. **Pending cleanup, unchanged by this revision:** Leo Vercel SSO is
   temporarily null for the v1 preview, and preview
   dpl_FkroYxCmFmayZTHFsNF2ov7cpQCu still exists. Restore SSO to
   `all_except_custom_domains` and delete that preview when the user says
   he is done reviewing it. Do not confuse that v1 preview with Nexus.

## 15. Phased backlog (from this spec, in order)

1. This spec (v2), reviewed and corrected by the user. ← current step
2. Logo token sampling (§0) + 40-token system, Release 1 design system.
3. Navigation (§2) + homepage composition (§3), Release 1.
4. Academy catalog + career pathways (§4–§5), Release 2.
5. IT Solutions + enterprise conversion workflows (§2, §6), Release 3.
6. AI gateway + four AI products (§8) and CMS configuration schemas
   (§9), Release 4.
7. SEO/security/accessibility acceptance pass against §10 gates.
8. Preview → visual review → functional testing → staging → founder
   approval → production, with rollback tested. Production switch is a
   separate decision.
9. Axon integration in §12 order, only after Open decision 3 is settled.

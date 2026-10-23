# DECISIONS.md — content conflicts & judgement calls for Aravind

Everything below was found while migrating content from the live
gsitssolutions.com (crawl 2026-10-23) into this rebuild. **No conflict was
silently resolved by guessing.** Where the site must display something, the
most widely published variant is used and the conflict is recorded here for
a final decision.

---

## 1. Three different phone numbers are published — which is primary?

Published on the live site:

- Header top bar + footer of **every** page: `+91 88866 60597` and `+91 91826 54056`
- "Call Us" block on the Contact page: `Call Us +91 91826 54056 | +91 76600 43217`
- "Call Us" block on the Services page: `Call Us +91 9182654056 | +91 76600 43217`
- "Call Us" blocks on Testimonials / Why Choose Us / Student Certifications
  pages: `Call Us +91 91826 54056 | +91 76600 43217`
- FAQ answer: "You may reach us by phone at +91 91826 54056"

**Rebuild behaviour:** header/footer use the sitewide pair
(+91 88866 60597, +91 91826 54056); the Contact page lists all three numbers
with working `tel:` links. **Decision needed:** confirm which numbers are
current (is +91 76600 43217 live? is +91 88866 60597?) and whether one should
be labelled (e.g. admissions vs office).

**RESOLVED 2026-10-23 (Aravind):** "use only any one phn number." The single
number used sitewide is **+91 91826 54056** — the most widely published of
the three (header/footer pair, the FAQ answer, and most Call Us blocks).
+91 88866 60597 and +91 76600 43217 no longer appear anywhere on the
rebuild. Applied in `src/data/site.ts` + `src/data/pages.ts`, deployed and
verified live the same morning.

## 2. "Certified Learners" is published as both 1200 and 1500

Quoted from the live site's counter strips:

- Homepage: `1200 Certified Learners` (shown twice) alongside
  `1500 Students Enrolled`, `250 Interns`, `12 Web Projects`
- About page counter strip: `1200 Certified Learners` **and**
  `1500 Certified Learners` on the same page
- Trainings page: `1500 Certified Learners`
- Most course pages (AZ-900, AZ-104, SOC ×4, Network+, PenTest+, Security+,
  Hardware & Networking, Digital Marketing): `1200 Certified Learners`
- CCNA, CCNP and CEH course pages: `1500 Certified Learners`

Other figures are consistent everywhere: `1,500+ Happy Learners`,
`1500 Students Enrolled`, `250 Interns`, `12 Web Projects`.

**Rebuild behaviour:** the stats ribbon shows the four consistent figures
and omits "Certified Learners" entirely. **Decision needed:** the correct
certified-learners total; then it can be added back in one place (the data
file) and will be consistent sitewide.

**RESOLVED 2026-10-23 (Aravind):** Certified Learners = **1250**. Added to
the stats ribbon in `src/data/site.ts`; deployed and verified live the same
morning. (Distinct from the separate published figures "1,500+ Happy
Learners" and "1500 Students Enrolled", which were consistent and stay.)

## 3. Claims carried as published — not independently verified

The following appear on the live site and are carried verbatim. The
2026-10-21 audit noted these are publisher claims, not verified credentials:

- "An ISO Certified Company — GradeSpot IT Solutions holds the prestigious
  certification of ISO 9001:2015 Quality Management System"
- "AICTE Internships Approved — official approval from AICTE for internships"
- "9 years of experience" (homepage)
- "100% Student Satisfaction" (homepage/trainings banner text)
- "Trusted by 1,500+ Happy Learners"

**Decision needed:** confirm the ISO certificate and AICTE approval
documents exist before launch; if either has lapsed, remove before go-live.

## 4. Copied content inside course pages (audit P2)

- The CCNP 350-401 page body repeatedly says "CCNA 200-301"
  (e.g. "By the conclusion of our CCNA 200-301 course, students will emerge
  equipped…", "well-prepared to tackle the CCNA 200-301 certificat…").
- The Computer Hardware and Networking page also contains CCNA 200-301
  headings and "cybersecurity" copy pasted from other courses.

**Rebuild behaviour:** migrated as published (facts were not rewritten).
**Decision needed:** supply or approve corrected CCNP / Hardware copy.

## 5. 25 catalogue courses have no published detail content

The live Trainings catalogue lists 36 courses, but only 11 have real
detail pages. These 25 are advertised with **no published curriculum,
duration or fees anywhere on the live site**: AZ-500, AZ-400, SC-900,
SC-200, Microsoft Sentinel, AWS Cloud Practitioner, AWS Solutions
Architect – Associate, AWS DevOps Engineer – Professional, CompTIA A+
Core 1, CompTIA A+ Core 2, Program in Cybersecurity Technologies, VA PT,
Core Java, Java Full Stack, Power BI, MySQL, Data Analytics, Data Science,
CPC, HCC, IP-DRG, E&M, Radiology – Medical Coding, Anesthesia – Medical
Coding, AutoCAD.

**Rebuild behaviour:** each gets its own detail page (fixing the live
site's misdirected/# links) carrying its published catalogue title,
category and an enquiry CTA — nothing invented. **Decision needed:**
provide curricula for these, or trim the catalogue to courses actually
delivered.

## 6. The 12 services have no real descriptions on the live site

Every one of the 12 service cards on the live Services page uses the
identical template-filler text: *"Pianoforte solicitude so decisively
particular mention diminution the particular. Real he me fond."*

**Rebuild behaviour:** filler dropped; each service gets a real detail
page presenting the published general services copy (the site's own FAQ
answers about its trainings/services) plus an enquiry CTA. **Decision
needed:** write or approve one real paragraph per service.

## 7. Misdirected links on the live site — how they were fixed

From the audit + crawl evidence (live Trainings catalogue):

- `SC-900` card → pointed to the AWS Solutions Architect URL (which itself
  404s). Now → its own page `/trainings/sc-900`.
- `CompTIA A+ Core 1` card → pointed to the Security+ page. Now → its own page.
- `CompTIA A+ Core 2`, `CompTIA PenTest+`, `VA PT`, `Complete Digital
  Marketing`, `Core Java`, `MySQL`, `Data Analytics`, `CPC`, `HCC`, `E&M`,
  `Radiology`, `AutoCAD` cards → pointed to the SOC Analyst page or `#`.
  Now → each course's own page.
- `CompTIA Network+` card → pointed to `/cyber-security-professioanl-training/`
  (404). Now → the real Network+ page.
- `Power BI`, `Data Science`, `IP-DRG`, `Anesthesia` cards → pointed to the
  (404) Microsoft Sentinel URL. Now → their own pages.
- `CCNP` card → `/ccnp-training/` (404) although a real CCNP page exists.
  Now → the real CCNP page.
- `CEH` card → `/practical-ethical-hacking-training/` (404). Now → the real
  CEH content page (published under the Web Application Penetration Testing
  URL — see §9).
- The 10 dead (404) catalogue URLs themselves redirect to the corresponding
  new course pages (see next.config.ts).

## 8. Legacy junk URLs — deliberate handling

The live sitemap publishes 11 `home-version-*` pages, a `dummy` page,
`services-version-one/two/three`, `case-studies-version-one/three`, and
`elementor-494` ("Case Studies Version Two"). None are migrated. Their
URLs redirect: home versions / dummy / case studies → `/`; services
versions → `/services`. Footer entries for them are gone — the new footer
links only to real pages (fixing the audit's footer mismatch; the old
footer "Home" pointed to `/index.php/home-version-one/`).

## 9. Odd pages — judgement calls to confirm

- `/swapna-reddy/` — shows clothing-brand content under the browser title
  "SOC Analyst Training | Job-Ready in 90 Days". Content NOT migrated;
  URL redirects to the SOC Analyst course (matching its own title).
  **Confirm:** was this page ever intentional?
- The CEH course's real content is published under the slug
  `web-application-penetration-testing-gradespot-it-solutions` while the
  page itself is titled "Certified Ethical Hacking Training". Rebuild
  keeps the content at `/trainings/certified-ethical-hacker-ceh` and
  redirects the old URL there.
- Four near-identical SOC pages exist (`soc-analyst-training`,
  `best-soc-analyst-training`, `soc-analyst-training-in-india`,
  `security-operations-center-analyst-training-online`). One canonical SOC
  course page in the rebuild; the other three URLs redirect to it.
- `/certification-exam-support/` is a real page not present in any menu.
  Its URL redirects to `/student-certifications`. **Confirm** if it should
  instead become its own page/service.
- `/cyber-security/` (the old footer's "Our Services" target) redirects to
  the Cybersecurity Services detail page; `/it-management/` (theme-vendor
  slug also linked from homepage cards to wpriverthemes.com) redirects to
  `/services`. The theme-vendor links themselves are gone.

## 10. Team page duplicates and a name spelling

- The live team page shows **Prudhvi Sai Gariga's card four times** —
  deduplicated to one entry.
- The co-founder's name is published as **"Aravindh Mutthe"** on the team
  page (elsewhere the name appears as "Aravind Mutthe"). Carried as
  published. **Confirm** preferred spelling.

## 11. Certificate verification starts empty — by design

No certificate records (codes, student names) are published anywhere on
the live site, so the `certificates` table seed is empty and verification
honestly reports "not found" until real issued certificates are loaded.
**Decision/process needed:** who loads certificate records, and from what
register, before this feature is promoted.

## 12. Employer logos not reproduced

Course pages carry an "Our Students works with" logo wall (XCube Labs,
Cloud4C, Persistent, Astreya, Movate, etc.). The published text claim is
carried; the logo wall is **not** reproduced, because the audit noted that
displaying logos does not establish a formal partnership. **Confirm**
which companies may be shown as logos, if any.

## 13. Testimonials provenance

The 8 testimonials are Google reviews displayed on the live Testimonials
page via Trustindex, each labelled "Posted on Google". Carried verbatim
with that attribution. Star ratings were not republished (the widget's
per-review stars were not reliably extractable, and no rating is claimed).

## 14. Menu improvements made under the 2026-10-23 scope update

- **Resources** is now a real page (`/resources`) that indexes its six
  children — on the live site it is a `#` placeholder.
- **Help & FAQs** (footer on the live site) is a real page (`/faq`) with
  the site's three real published FAQs. The live `/faq/` page's own
  questions ("Do I need a business plan", "How long should a business plan
  be?", "Where do I start?") are unrelated template filler and were dropped.
- Footer junk removed: Services V1/V2/V3, Case Studies V1/V2, alternate
  homepage link.
- Blog stays external (digidefense.in) and Digital stays external
  (digital.gsitssolutions.com), exactly as the live menu has them.
- Core menu order/labels unchanged: Home, About Us, Trainings, Resources,
  Digital, Services, Contact Us.

## 15. Live-vs-rebuild gap audit closed — 2026-10-23

Aravind asked for an exact comparison with the official site and to add
everything missing. Audit (22 gaps, full register in the goal workspace)
and additions were completed and verified live the same day:

- Student Certifications gallery now shows all **30** photos (18 added).
- "Common Job Roles" card sections added to 9 courses; "Our Pricing"
  cards (₹13,000 / ₹37,500 / ₹28,000, filler bullets dropped) on CCNA +
  CCNP; CEH "Tools Covered" (12) + "Why Choose GradeSpot" (8 points);
  Digital Marketing "Skills Covered" (8, incl. Lead Generation + Digital
  Ads) and its FAQs restructured (8 Q&As as published).
- Blog cards (2FA / Information Warfare / Golden Ticket) on Trainings +
  CCNA/CCNP/SOC/CEH; counters ribbon on Trainings + course pages; course
  images for CCNP, PenTest+, Hardware & Networking, Digital Marketing.
- §12 employer logo wall: ADDED per Aravind's instruction — the 10
  identified logos (XCube Labs, Cloud4C, Persistent, Diligient, Wipro,
  Astreya, Tericsoft, EY, Movate, PurpleTalk) on Trainings, Services,
  About, Why Choose Us, Testimonials, Student Certifications, Certificate
  Verification and course pages. The 2 unidentified sample SVGs
  ("Company112", "client logo 33") were skipped — flag if they are real.
- Also: 9-years badge, founder signature block, feature trio strip,
  LinkedIn/YouTube links, Why-Choose-Us highlight cards, Nikhil profile
  page (/team-members/nikhil-duth-d — no filler bio, no retired phone),
  Video Showcase on Trainings, Services contact strip, "Pay after you
  Pass" line on Student Certifications, Trainings hero copy.
- Contact map: added pointing at the REAL Dilsukhnagar address — the live
  site's embed points at Rajkot, Gujarat (theme demo) and was not copied.

## 16. Research-compliance pass — 2026-10-23

Full-corpus research audit (all four research_notes folders) applied to
this build. Fixed in code: schema stack (EducationalOrganization, Course
with real pricing offers only, FAQPage, BreadcrumbList, Service),
llms.txt, visible breadcrumbs, course-page enquiry rail (form + course
WhatsApp + B2B strip), trainings catalogue search, lead source
attribution + WhatsApp opt-in (migration 0004 — APPLY to the shared
Supabase project; the code degrades gracefully until then), outcome CTA
wording ("Request a Callback"), pre-filled WhatsApp everywhere, footer
Popular Trainings cluster + Maps link.

Still BLOCKED-ON-DATA (never fabricate):
- Privacy policy page: the form carries a no-spam microcopy line, but a
  real /privacy-policy page needs business-approved policy text.
- AggregateRating / star ratings: the 8 testimonials are individual
  Google reviews with no verified aggregate value in the record.
- Batch dates / countdown: no real batch schedule exists in the record
  (a fake countdown would also violate Google Ads policy).
- Course durations/levels for cards: not published for the catalogue.
- Brochure PDF / free-demo offer: no such asset or offer is published.

## 17. Legacy harvest — 2026-10-23

Aravind authorized harvesting ideas/concepts/services/menus from the
legacy gradespot/axon builds (inventory:
goals/axon-gradespot-site-rebuild/hidden_files/legacy-asset-inventory-2026-10-23.md)
into this build where the business needs them. Applied:

- **Two new pages — an authorized exception to the replica menu/content
  sameness rule** (recorded here per that rule): `/for-institutes`
  (pain → his three real products — WhatsApp Lead Engine, Secure
  Learning Hub, Resilient Linux Lab, per gradespot-axon/docs/PRODUCTS.md
  → 5-step process → factual proof → demo form + FAQ) and `/pricing`
  (three audiences: students / businesses / institutes). **No prices
  were harvested**: the only amounts anywhere are the real published
  CCNA/CCNP course fees rendered from the course data itself. Institute
  tiers are described by contents only — Set A vs Set B pricing is
  still undecided. Proof copy carries NO metrics, case studies or
  outcome promises.
- **Nav**: "Pricing" added as a plain item; "For Institutes" added as
  a visually distinct orange pill (the Stage-1 approved sitemap's
  highlighted-CTA treatment), desktop + mobile + footer. All existing
  menu options/destinations and the unified "Request a Callback" CTA
  are unchanged.
- **Service summaries + offerings (partially answers §6)**: harvested
  for all 12 services from the business's own live-site scrape
  (~/workspace/gradespot-planning/gsitssolutions-content.json,
  2026-10-02) and rendered on service cards and detail pages.
  **Pending Aravind's accuracy confirmation** — this is the business's
  own published marketing copy, not independently verified.
  Accreditation lines in the scrape (the Internships "AICTE-approved"
  offering and the AICTE clause in its summary) were deliberately NOT
  carried; they stay flagged per §3.
- **Course durations (partially resolves §16's blocked item)**: for
  the full courses, harvested from the same planning JSON —
  CCNA 45 days, CCNP 45 days, Network+ 30 days, Security+ 30 days,
  PenTest+ 60 hours, SOC Analyst 90 days, CEH 45 days, Digital
  Marketing 45 days. The JSON publishes NO duration for AZ-900, AZ-104
  or Hardware & Networking, so those three show none — never invented.
  The gsits-platform scaffold's hour figures (e.g. SOC "80+ hours",
  CCNA "70+ hours") conflict with the scrape and were NOT used.
  **Pending Aravind's re-confirmation** that the scraped durations are
  still current.
- **Verify form hint**: the legacy serial-format guidance (GS-2026-XXXX)
  added as placeholder + hint text on the certificate verification form.
  UX alignment only — the underlying certificates schema is unchanged.
- **Home B2B band**: a For Institutes band on the home page (pattern
  from gsits-platform's B2BBand, rebuilt in this build's idiom) linking
  to /for-institutes. The band's tier prices and its "installed in
  7 days" line were NOT carried; no testimonials were harvested from
  anywhere.
- **Not harvested** (per inventory's NOT-recommended list + scope):
  AI chat (deferred — keys/backend decision), PPC landing pages,
  DB schema changes (the lead status pipeline / demo_bookings /
  quote_requests model stays an admin-phase design note), legacy stats
  beyond the resolved set, placeholder testimonials, the /placements
  guarantee claim.

## 18. Research expansion pack — 2026-10-23

Aravind's call: the §17 harvest added only 2 pages from four deep
research reports (training-institute strategies; global similar
business models; nav/IA patterns; PPC/AEO/local) — too thin. This pack
mines the research corpus itself (all 4 reports + notes), the
research-demo, the planning scrape, and the Oct-6 content engine
(GitHub `gradespot-frontend-website` `src/lib/mock-data.ts` @
e54a51c — read via the official GitHub connector; the local clone is a
stale initial commit and was NOT used, and its stored-credential API
route returns 401) and builds every recommendation that stands on
real data only. Standalone mapping:
goals/axon-gradespot-site-rebuild/hidden_files/leo-research-expansion-map-2026-10-23.md

**Built:**

- **City×course landing pages — `/lp/<course>-in-hyderabad` × 11**
  (ppc report tactics 1–5; folder-1 tactic 8 city×course matrix;
  research-demo lp-ceh pattern): nav-free chrome (a `Chrome` switch
  in the root layout drops the global header/footer/floating actions
  on `/lp/*` only), message-matched H1 (course + city), ONE primary
  CTA in identical words ("Get My Free Counselling Call") repeated
  3×, a 3-field form above the fold (name, phone, one qualifying
  "when can you start?" select riding in the message; email optional),
  per-course pre-filled WhatsApp (chat + syllabus variants), a sticky
  mobile Call/WhatsApp/Free-Counselling bar, a verbatim Google
  testimonial beside the form, and content strictly from real course
  data. No batch dates — none exist in the record.
- **Local institute page — `/training-institute-in-dilsukhnagar-hyderabad`**
  (folder-1 tactic 8; ppc §2.2/§2.4/§2.5): answer-first intro, real
  address/phone/email/hours, Google Maps query link, the 11 full
  courses, verbatim testimonials, LP cross-links, local FAQ block +
  FAQPage schema + `LocalBusiness` schema (new `localBusinessSchema`:
  same restraint as the org schema — no geo, no opening-hours days,
  none are published).
- **`/for-colleges`** (nav report Part A2 — third audience gets its
  own door, not a separate site; business-models report —
  Algoritma/Supertype university-partnership bridge): mirrors the
  /for-institutes anatomy; stands only on the three real services
  (College Workshops, Industrial Trainings, Internships — summaries +
  offerings from data); enquiry form with product interest options,
  source `website:/for-colleges`. No college names/counts/outcomes —
  none exist in the record.
- **`/career-support`** (replaces the banned /placements idea):
  published job roles for the 9 courses that publish them, the
  employer logo wall as the live site publishes it, the 5
  career-oriented services among the real 12, certificate
  verification links, verbatim testimonials, and an explicit
  no-guarantee position. "Till You Get Hired" and every placement
  percentage/salary figure stay banned — none appear.
- **Book-a-Free-Demo as a first-class path** (folder-1 tactic 6;
  ppc §1.10): a DemoBand on EVERY course page (full + catalogue) —
  form through `/api/leads` with interest `Demo: <course>` +
  WhatsApp demo/syllabus buttons; EnquiryRail gains "Get the
  Syllabus on WhatsApp" (the research's per-course WhatsApp syllabus
  pattern) and a "Book a Free Demo Class" anchor. Demo FAQ added to
  every course's generated FAQs.
- **Course comparisons — `/compare` + 3 pairs** (ppc §2.2:
  comparison queries trigger AI answers 95.4% of the time):
  CEH vs Security+, CCNA vs Network+, SOC Analyst vs CEH. Tables
  render ONLY from real fields (focus, who, duration, mode, level,
  certification, published fees — CCNA's plans appear; unpublished
  fees read "Confirmed on enquiry" — topics, outcomes, job roles);
  the only authored text is the focus lines and "which is for you"
  guidance, both derived from those fields. Cross-linked from both
  course pages of each pair.
- **Course-level factual FAQs on every course page** (folder-1 Q5 /
  ppc §2.2 answer-first): generated ONLY from real fields (who,
  duration, published fees, online/offline mode, certification, job
  roles, topics, demo availability); unknowns answer "confirmed on
  enquiry". Rendered as a visible FAQ section and merged into the
  FAQPage schema alongside the courses' published FAQ sections.
- **Blog — `/blog` + 3 articles.** The Oct-6 BLOG_POSTS are stubs
  ("[Pending: article body]") on GitHub too, so per the fallback rule
  these are **original Leo-authored articles** (marked here as such):
  "How to Start a Cybersecurity Career" (the stub's own title/topic),
  "CEH vs Security+: Which Certification Should You Do First?",
  "What Does a SOC Analyst Actually Do?". Every fact traces to
  published course topics/durations/certifications/roles; no stats,
  quotes or salary claims. The external DigiDefense blog stays linked
  as its own section, as the live site presents it.
- **Enrichment data — `src/data/course-details.ts`**: the Oct-6
  content engine's published per-course fields (short name, who,
  outcome, topics, level, certification) for the 11 full courses,
  powering the LPs, comparisons and FAQs. AZ-900/AZ-104/Hardware have
  no duration in ANY source — durations stay absent there.
- **llms.txt depth**: key-pages entries for all new routes + a
  "Hyderabad course landing pages" section (hygiene per the
  evidence — shipped, never sold as an AEO lever).

**API change:** `/api/leads` email is now optional (validated when
present). The LP form is phone-first per the ppc research; the main
LeadForm still requires email in its UI. Verified: LP-shaped and
demo-shaped POSTs return 201 with `stored: "supabase"` and correct
source/interest; test leads deleted; table left clean.

**Nav changes (every one, per the sameness rule):** desktop + mobile
nav gain **For Colleges** (plain item beside the For Institutes
pill); the Resources dropdown gains **Career Support**, **Learning
Articles** (/blog) and **Course Comparisons** (/compare); the footer
Company column gains Career Support + For Colleges; the footer
bottom row gains **Institute in Dilsukhnagar**; the Resources page
gains 4 cards (Career Support, Learning Articles, Course
Comparisons, For Colleges). All pre-existing items/destinations
unchanged; the "Request a Callback" CTA unchanged.

**Skipped, with reasons:**
- **Batch dates / countdowns / batch cards** — every legacy source
  marks dates `[Pending]`; inventing them is fabrication and fake
  scarcity violates Google Ads policy. (Unchanged from §16.)
- **Brochure PDF download** — no brochure asset exists in the record;
  the WhatsApp syllabus message is the deliverable instead.
- **"Pay after you Pass" page** — a payment-method promise; same
  decision class as pricing (Set A vs Set B still open). The line
  stays only where the replica already carried it (Student
  Certifications, §15).
- **Oct-6 TESTIMONIALS set** — not the verbatim Google set Aravind
  resolved; it also carries a placement claim ("placed at Wipro").
  The 8 Google testimonials govern everywhere.
- **Oct-6 STATS** — 1200 certified contradicts the resolved 1250;
  "100% Student Satisfaction" as a stat is an unverified claim.
- **Competitor "vs" pages** (Interakt-vs-Wati play; Vacademy
  switch-math) — those target B2B SaaS rivals for the Axon products;
  they belong to the gradespot-axon phase and need Aravind's pricing
  decision first.
- **Industry landing pages for the automation products** — same
  Axon-phase dependency.
- **AI chat assistant** — unchanged: needs API keys + a
  serving-backend decision (Aravind's call).
- **Free mini-courses / lead magnets beyond the demo** — no such
  asset exists; the free demo class + free counselling call are the
  real offers.
- **AggregateRating / review stars** — no verified aggregate exists
  (§16); testimonials are shown verbatim with source named instead.
- **City pages beyond Hyderabad** — the business has one published
  location (Dilsukhnagar, Hyderabad); other-city pages would invent
  a presence.

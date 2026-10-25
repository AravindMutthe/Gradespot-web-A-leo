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

## 19. Leo redesign v1 — "Prospectus" — 2026-10-23

Aravind's mandate (13:46 IST, superseding the v1 "palette from the
logo" narrowing): full creative control — forget the original site's
theme, style, design, layouts, structure, fonts, colors, effects and
buttons; design to India + international standards; the original
menu options stay (removals/merges allowed with research confidence,
each logged); the official logo artwork stays unmodified; the
content truth layer (all routes and their content, MD signature,
management photos, 8 verbatim Google testimonials, one phone, 1250
learners, published CCNA/CCNP prices only) is untouchable. Added the
same day: rich Salon-style cards/boards/promo banners (§19.4–19.5),
a named web-standards checklist (§19.6), and a legal-compliance
layer (§19.7).

### 19.1 Concept — "Prospectus"

The site reads like a world-class institute prospectus crossed with
a course-code ledger. Rationale from the research corpus: SANS and
OffSec win authority with code-led course identity (SEC504, PEN-200)
and mono-spaced technical labels; EC-Council/Simplilearn convert with
visible proof and one clear CTA per surface; premium international
ed-tech (and the world-class UX corpus) uses editorial serif display
type, warm paper canvases and generous rhythm. GradeSpot's catalogue
is literally a list of codes (AZ-900, CCNA 200-301, CEH v13) — so the
system gives it a "ledger voice": Fraunces serif for display,
Instrument Sans for text, IBM Plex Mono for codes, eyebrows, stats
and board lines. The Indian conversion layer the research demands
(callback-first forms, WhatsApp, free demo) stays exactly as built in
§16–§18, wearing the new language.

### 19.2 Tokens and fonts

Palette (harmonizes with the logo; no longer derived from it — the
logo's wordmark charcoal and vermilion sit naturally on warm ink and
paper):
- paper #FAF6EE · parchment #FFFDF8 · cream #F2EADA · ink #201913 ·
  ink-deep #171208 · line #E0D4BE · body text #5A4B38
- signal vermilion #B23A0A — the logo orange's family, deepened one
  step so text and touch targets pass WCAG 2.2 AA (the raw logo
  orange measures 2.95:1 and fails): 5.56:1 on paper, 5.01:1 on
  cream, 6.0:1 under white button text.
- brand-bright #F7631B = the true logo orange, reserved for display
  accents on ink (6.0:1) and graphic moments; brand-dark #9A3412
  (hover/pressed, chip text 6.2:1); brand-soft #FBEADA.
- WhatsApp #0B7A43 (white on it 5.41:1) / #4ADE80 on ink (10.7:1).
- Measured pairs: body on paper 7.80:1 · body on cream 7.03:1 ·
  ink headings 16.1:1 · footer text on ink-deep 10.31:1 ·
  paper on ink-deep 17.29:1.
Legacy token names (navy, heading, surface-light…) were remapped to
the new values so all 86 routes restyled coherently; hardcoded v1
hexes were migrated (24 files) and hero gradients replaced by the
panel-ink / hero-paper treatments.
Fonts (self-hosted variable woff2 in public/fonts/, preloaded, zero
hotlinking): Fraunces 100–900 + italic (display), Instrument Sans
400–700 (text/UI), IBM Plex Mono 400/500/600 (index voice). The v1
Inter/Jakarta files were deleted.

### 19.3 Structure and motion

Light paper header (dark logo) under an ink mono utility strip;
mega-menu and dropdowns as paper panels with serif course titles;
buttons moved from pills to a 12px "ticket" radius, ≥48px tall, warm
shadows, 1px hover lift; heroes are paper (dot-grid texture, serif
display, italic signal word on Home) or ink panels with a signal
glow; cards are layered parchment with warm shadows and hover lift;
section rhythm widened (84/116px) with alternating paper/cream/ink
bands; footer is deep ink with serif column heads. Motion: a
RevealFX IntersectionObserver adds staggered fade-rise reveals —
pure progressive enhancement (no JS or reduced-motion ⇒ everything
simply visible), ticker pauses on hover. LP pages keep their §18
conversion anatomy exactly (nav-free, message-matched H1, one CTA
×3, 3-field form, sticky bar) in the new language.

### 19.4 Menu changes (the only ones)

1. "Home" removed from the top bar — the logo is the home link
   (universal convention; NN/g menu guidance in the nav research).
   Route, logo link and footer Home links unchanged.
2. "Contact Us" removed from the top bar — it duplicated the
   persistent "Request a Callback" CTA (same destination), the
   floating Enquire action and the footer contact column. The page
   stays one tap away via the CTA, and "Contact Us" was ADDED to
   the footer Quick Links so a plain-text path exists.
3. "Digital ↗" moved from the top bar into the Resources dropdown —
   external properties (Blog ↗, Digital ↗) cluster together instead
   of spending a primary slot on an outbound link (research sweet
   spot: 4–6 core items + audience doors + one CTA).
Resulting bar: Trainings ▾ · Services · Pricing · About Us ·
Resources ▾ · For Colleges · For Institutes (pill) · Register (§20)
· Request a Callback. Mobile menu mirrors it.

### 19.5 Rich layer and the promotions system

- Ticker (components/Ticker.tsx): a salon-style scrolling board —
  "Featured" chip + CSS marquee of featured course titles (catalogue
  data) interleaved with free-service lines (promotions data).
  "Featured", not "Trending": no view analytics exist to
  substantiate "trending" (ASCI). Reduced-motion ⇒ static board.
- PromoBanner: layered ink panel, serif headline, real course
  imagery, floating fact chip; renders the first active "banner"
  promotion; hides when none is active.
- OfferCards: ghost-numeral rich cards rendering active "card"
  promotions; hides when none are active.
- Rich cards: course cards gained an image gradient, a "Free Demo"
  badge and a duration chip (both true — the demo path exists on
  every course page); service and offer cards carry ghost index
  numerals.
- PROMOTIONS ARCHITECTURE (Aravind's decision, 13:54 IST): promo
  content is never hardcoded. One data layer —
  lib/data.ts getPromotions(kind) — shaped exactly like the future
  Supabase table site_promotions (slug, kind banner/card/ticker,
  title, body, cta_label, cta_href, image, active, sort, starts_at,
  ends_at; anon read of active rows only). Supabase DDL is blocked
  from the build sandbox, so today the seam is the typed config
  src/data/promotions.ts with identical shape and seed; migration
  supabase/migrations/0005_site_promotions.sql ships the table + RLS
  + the same seed for the admin phase to apply. Admin CRUD belongs
  to gradespot-axon (Phase 3) per the integration contract — no
  admin UI was built here.
- PROMO CONTENT RULE: only offers actually true today are seeded —
  Book a Free Demo, Free Counselling Call, Syllabus on WhatsApp,
  Free Certificate Verification. No invented discounts, percentages,
  strike-through prices, deadlines or festival offers; an empty slot
  hides rather than faking a deal. (A repo scan for discount/urgency
  language hits only this rule's own statement in the config
  comments.)

### 19.6 Web & internet standards checklist (verified 2026-10-23)

- Semantic HTML5 + landmarks + heading order — PASS (header/nav/
  main/footer landmarks via Chrome; exactly one <h1> per page on
  every sampled route incl. dynamic, LP and new pages; skip-to-
  content link is the first focusable element).
- WCAG 2.2 AA — PASS (contrast table §19.2, all pairs ≥ AA; visible
  :focus-visible outline + scroll-margin so the sticky header never
  obscures focus; nav/sticky targets ≥44px, buttons ≥48px; alt text
  on informative images, decorative marked; prefers-reduced-motion
  disables reveals, smooth scroll and the ticker animation; form
  fields labelled with correct input types incl. tel).
- Open Graph + Twitter cards + canonical URLs — PASS (metadataBase
  https://gsitssolutions.com matching sitemap/robots; OG/Twitter
  defaults in the root layout; a canonical on every page — all 26
  page files: 20 static metadata objects, 5 generateMetadata
  returns, home page export added; verified live in rendered HTML).
- robots.txt / sitemap.xml / llms.txt hygiene — PASS (all serve
  200; sitemap carries 89 URLs after §20–§21 additions; every one
  returns 200; llms.txt lists the new pages).
- OWASP security headers via next.config — PASS (verified in live
  response headers: Content-Security-Policy, X-Content-Type-Options
  nosniff, X-Frame-Options DENY + frame-ancestors 'none',
  Referrer-Policy strict-origin-when-cross-origin,
  Permissions-Policy (camera/microphone/geolocation/payment/usb/
  browsing-topics off), Strict-Transport-Security. CSP allows no
  external script/style/font origins; 'unsafe-inline' remains for
  the Next.js runtime's inline bootstrap — recorded honestly; the
  233 legacy redirects are untouched).
- HTTPS-only external links + rel hygiene — PASS (all outbound
  links are https and open with rel="noreferrer"; the only external
  destinations are the business's own properties + WhatsApp).
- Responsive, mobile-first — PASS (layouts grid from mobile up;
  sticky mobile action bars retained; ticker wraps statically on
  small screens under reduced motion).
- Performance budget — PASS (shared First Load JS 103 kB; fonts
  self-hosted + preloaded, no render-blocking third-party requests;
  images via next/image with dimensions everywhere except the LP/
  banner heroes, which use fill + sizes inside fixed-aspect frames
  — no CLS either way; motion is CSS/IntersectionObserver only, no
  animation libraries).
- schema.org markup — RETAINED (Organization, Course, FAQPage,
  BreadcrumbList, LocalBusiness JSON-LD unchanged from §16–§18).

### 19.7 Legal-compliance layer

- DPDP Act 2023: forms state what details are used for ("used only
  to respond to this enquiry"); the WhatsApp opt-in is an explicit,
  unticked checkbox everywhere, and the register form (§20) carries
  a fuller consent line (contact purpose + never sold). No data is
  collected beyond the enquiry fields.
- IT Act / IT Rules 2021: a grievance/contact path exists via the
  published email, phone and contact page. The named Grievance
  Officer is Aravind's data — blocked below.
- Consumer Protection Act 2019 + E-Commerce Rules + ASCI code:
  all new v1 copy (promo system, register, partner, accessibility)
  was audited against the honesty rules — no misleading claims, no
  fake scarcity/urgency (no countdowns, no "limited period"), no
  unsubstantiated superlatives, no invented figures; "Featured" is
  used instead of "Trending". LP pages keep the §18 ads-policy-safe
  anatomy (message-matched, no fake offers).
- GDPR / ePrivacy posture: the site runs no ad trackers and no
  analytics; the application sets no cookies of its own (strictly-
  necessary hosting behaviour aside), so no consent banner is
  required today. Any future embed/tracker triggers consent
  handling first — noted as a standing rule.
- Existing legal pages audited: /terms-and-conditions is present
  and carried into the new design language (PageHero + tokens).
  A privacy policy page does NOT exist (already blocked in §16) —
  see blocked-on-data below; it was not invented here.
- Accessibility statement: /accessibility added, written only from
  measures this build actually implements and verified (§19.6),
  with a human contact route for barriers.

BLOCKED-ON-DATA (legal — Aravind to supply; nothing was invented):
1. Grievance Officer name, designation and direct contact for the
   IT Rules 2021 grievance page/section.
2. Privacy notice text for a /privacy-policy page: what personal
   data the forms/WhatsApp collect, purposes, retention period, and
   the data-principal request route under DPDP Act 2023.
3. Refund/cancellation policy for course fees (Consumer Protection
   (E-Commerce) Rules) — needed before any fee is ever taken
   online; today's pages take no payment.
4. Company registration details (CIN and registered office address,
   if different from the published institute address) for the legal
   pages and any future franchise documentation.
5. Confirmation of the salon-style board claim set if promotions
   ever grow beyond the four true offers — each new offer needs his
   approval before seeding (the data layer makes it a config
   change, not a code change).

### 19.8 Verification (2026-10-23, local production build)

- npm run build: PASS (96 static pages generated; /register dynamic
  by design for its ?course= prefill).
- Crawl: 89/89 sitemap URLs return 200; 93 unique internal links
  found across all pages, 0 bad.
- Lead flows against live Supabase, all 201 + stored, then deleted
  (leads table left empty): demo (source website:/trainings/…),
  LP (website:/lp/…), register (website:/register, §20), partner
  (website:/partner-with-us, §21); invalid payload → 422.
- Security headers: all six present in live responses (§19.6).
- Content integrity vs the pre-v1 baseline: signature alt present;
  8 testimonials with "Posted on Google" ×8; one phone everywhere;
  published prices ₹13,000 / ₹28,000 / ₹37,500 render on /pricing;
  Set A/Set B figures: 0 anywhere; ISO/AICTE claim instances
  byte-identical to baseline (the strict-grep delta of +2 during
  the pass was two "// ISO 8601" code comments in the new config
  file, reworded — claims neither added nor removed); logo,
  signature and team photo files hash-identical to the replica.

## 20. Registration — 2026-10-23

Aravind's decision (13:56 IST): "put Registration on the site."
Confirmed by his option tap the same minute: "Keep demo signup
only — no accounts for now." Implementation follows that ruling
exactly: /register is course/demo LEAD registration on the existing
/api/leads pipeline — NOT password user accounts, no login, no
account creation anywhere in this build. Student accounts are
noted for the LMS phase only (gradespot-axon), if he ever asks.

- Page: /register (v1 design) — how-it-works steps, a registration
  form (name, phone, optional email, course select from the real
  catalogue, type select: Course Registration / Free Demo, WhatsApp
  opt-in with a DPDP consent line), and the free-first-steps offer
  board. Copy states plainly that registering is an enquiry, not a
  payment or an account.
- Lead shape: source "website:/register" (path-derived, like every
  form); interest names type + course — "Registration: <course>" or
  "Demo: <course>", reusing the existing Demo convention.
- Entry points (menu options unchanged): a distinct Register action
  in the header CTA area (desktop + mobile), the home hero's
  secondary CTA (was "Our Services"; Services remains in the menu
  and sections), and a Register strip beside the Demo band on every
  course page linking to /register?course=<slug> with the course
  pre-selected. LP anatomy deliberately untouched (one CTA ×3).
- Thank-you state follows the established pattern (confirmation +
  Continue on WhatsApp with the registration pre-filled).
- Verified: register POST → 201, stored with source
  website:/register and interest "Registration: CCNA 200-301";
  test lead deleted (§19.8).

## 21. Partner With Us — 2026-10-23

Aravind's decision (13:57 IST): the site should openly welcome
collaborations and franchise discussions.

- Page: /partner-with-us (v1 design) — hero carrying his line
  ("Collaborations & franchise discussions are welcome"), two
  tracks (Collaborations: institutes, colleges, trainers, content/
  community partners · Franchise discussions: new-centre
  conversations), a four-step discussion process (Talk → Understand
  → Pilot → Decide), proof limited to facts (GradeSpot is Pilot
  Customer #1; the products are real and inspectable on this site),
  and an enquiry form with a type select posting to /api/leads —
  source "website:/partner-with-us", interest "Collaboration" or
  "Franchise Discussion".
- Entry points (menu options unchanged): a partner band at the end
  of /for-institutes, a "Partner With Us" link in the home B2B band,
  and a footer Company link.
- LEGAL LINE: the page is an invitation to discuss, NOT a franchise
  offer — and says so on the page itself. No investment figures, no
  ROI/earnings claims, no territory promises, no franchise terms
  appear anywhere (a repo scan hits only this disclaimer's own
  wording). Franchise documentation, if discussions ever mature, is
  blocked on Aravind's data and legal drafting (§19.7 list).
- Verified: partner POST → 201 stored with source
  website:/partner-with-us (§19.8); page in sitemap + llms.txt.

### 19.9 Market-pattern sources for v1 choices (mandate confirmed 14:00 IST)

Aravind confirmed free hands for domain/market choices on current
global + India training-institute/ed-tech practice, with the
research corpus as evidence. The v1 choices and the pattern each
follows:
- Ledger/code identity (mono course codes, index numerals, board
  lines) — SANS code-led course pages (SEC504) and OffSec course
  codes (PEN-200); training-institute research Q1/Q5.
- Visible desktop nav, 4–6 core items + catalogue mega-menu —
  NN/g menu guidance and Simplilearn's "All Courses" mega-menu;
  research Q3. (Drove the §19.4 trims.)
- Separate audience doors instead of hiding B2B behind "Services" —
  SANS "For Organizations", OffSec Individuals/Teams, EC-Council
  "Enterprise", Simplilearn's secondary-nav "For Business";
  research Q3/Q7. (For Institutes pill, For Colleges, Partner.)
- Split hero with dual doors (Explore Trainings / Register) —
  SANS + OffSec split-audience heroes; research Q4. The published
  headline is untouched (truth layer); only the door pairing is new.
- Callback-first ≤4-field forms, WhatsApp as a primary channel,
  floating WhatsApp + sticky mobile action bar — Hacker School
  ("GET A CALL BACK", floating call/WhatsApp) and Simplilearn's
  4-field course form; research Q6. Retained from §16–§18.
- Scrolling board/ticker — the announcement-board pattern from
  Aravind's own Royal Salon build, crossed with Indian ed-tech's
  cohort strips (Simplilearn cards, research Q1) — minus scarcity:
  no countdowns, because no real batch dates exist (research Q4/Q6
  describe the countdown pattern; the honesty rules veto faking it).
- Free-offer cards as the promo system (demo, counselling, syllabus,
  verification) — the lead-magnet inventory in research Q6 (free
  demo class at Hacker School, "Talk to Advisor" at Simplilearn,
  gated brochure/syllabus) instead of discount-led promotion, which
  the corpus shows belongs to funded marketplaces, not institutes.
- Published student fees + gated B2B quotes on /pricing — EC-Council
  tiered price transparency, Interakt's published SaaS pricing and
  FATbit's productized packages; research Q2/Q7 (page from §17).
- Course comparison pages — Interakt's "vs" SEO play, adapted to
  course-vs-course on real data; research Q2/Q5 (pages from §18).
- llms.txt + FAQ/Course/LocalBusiness schema — research Q5 (even
  Hacker School ships llms.txt; SANS/OffSec don't — the leapfrog
  opening for a small institute).
- "This site runs on our stack" as the B2B proof — the dogfooding
  tactic, research Q7 tactic 10 / Interakt Academy mirror (used on
  /for-institutes §17 and /partner-with-us §21).
- Editorial serif + paper as the premium register — the corpus's
  premium benchmarks (SANS/EC-Council authority presentation) over
  the discount-marketplace visual language; India institutes that
  present as premium (Hacker School's award-led trust blocks) sell
  trust, not offers.

## 22. Engagement + menu-effectiveness pass (2026-10-23, Aravind's acceptance bar)

Bar as stated: the site must be attractive, students AND clients
must engage, the menu must be most effective; design/layout/style/
fonts/colours judged on attractive AND effective together; a RICH
mega menu; every part rich and advanced; dedupe of redundant
content/pages/courses/services/options; logo brighter by
presentation; glass + gradients in the Royal Salon manner; final
look = professional corporate (Simplilearn/NIIT/SANS register).

### 22.1 Version ruling (Aravind, 14:04 IST)
THIS build is **Leo v1**. The earlier `9f08845` corporate draft is
superseded history, not a version. v2 = the next commissioned
feature wave (AI chat, admin-side promo configuration going live,
LMS-phase student accounts, batch system). All repo copy/docs
calling this build "v2" corrected to v1 in this pass.

### 22.2 Student journey — findings
- PASS: hero hook (H1 value line + phone-first form + ticker),
  course→demo anchor flow, LP one-CTA pattern, comparison pages,
  verify page, floating WhatsApp (desktop).
- FIXED: course/service cards were image-rich but inert — card
  image + title now link to the course/service; every course card
  carries a Free Demo chip to its `#demo` block.
- FIXED: testimonial proof sat only on its own page — a
  TestimonialSpotlight (3 verbatim reviews + Register CTA) now
  sits on Home directly before the final CTA band.
- FIXED: LeadForm demanded an email (friction) — email is now
  optional, matching the API; a "Phone-first · Email optional ·
  No spam, ever" microline sets the promise under the form.
- FIXED: Trainings index buried the catalogue below stats +
  showcase — catalogue + search now immediately follow the hero;
  category chips with counts deep-link to anchored sections.
- FIXED: mobile sticky bar duplicated the floating WhatsApp and
  pointed its third slot at a generic contact page — third action
  is now Register; floating WhatsApp is desktop-only.
- FIXED: dead ends closed — CtaBand added to blog index, compare
  pages, /faq, /resources, /student-certifications, local page.

### 22.3 Client journey — findings
- PASS: /for-institutes carries demo + plans + partner doors;
  partner page is discussion-only per §21 (no terms/ROI).
- FIXED: the three client doors were not one click from anywhere —
  the Services mega menu now carries an ink "For Business" rail
  (For Institutes / For Colleges / Partner With Us + Pricing),
  and Home's hero gained an audience-doors strip (Students /
  Institute Owners / Colleges & Partners).
- FIXED: B2B pages opened with prose before any action — first-
  screen action strips added (Book a Live Demo / See Institute
  Plans / Partner With Us; colleges: Start the Conversation /
  Partner With Us), plus a form-side reassurance checklist built
  only from copy already on the page.
- FIXED: partner track cards were inert — each now carries its
  own CTA anchoring to the discussion form.

### 22.4 Menu verdicts
| Change | Verdict | Rationale |
|---|---|---|
| Home removed from the bar (v1 §19) | KEEP | Logo-is-home is the NN/g convention; the mega menu carries depth, the bar stays lean. |
| Contact Us removed from desktop bar | KEEP | Request a Callback (same destination, stronger verb) is the single solid CTA; Contact remains in footer, mobile sheet and Resources. |
| Digital moved into Resources | KEEP | External properties cluster under Resources; relabelled "GradeSpot Digital" (and "DigiDefense Blog") so the destination is unambiguous. |
| Rich mega menu (§22) | ADOPTED as primary instrument | Nav-IA corpus: with a 36-course catalogue a mega menu beats deep dropdowns; hover + click + keyboard, grouped columns with code·duration, featured CEH rail + Free Demo promo card inside Trainings; grouped services + B2B rail inside Services. |
| CTA hierarchy | RESTACKED | One vermilion solid only (Request a Callback); Register = outline; For Institutes demoted vermilion-solid → ink pill (an audience door, not a competing conversion CTA). |
| Top level | UNCHANGED (5 + actions) | Trainings / Services / Why GradeSpot / Verify / Resources — inside the corpus's ≤5–6 guidance because the mega panels carry the depth. |

### 22.5 Attractive-AND-effective polish (each judged on both axes)
- FeatureTrio: three bare labels read as filler → an ink ledger
  band with real entries + a built-in Talk to a Trainer CTA
  (richer AND converts).
- Home "What We Do" + Trainings showcase cards: image + index
  chips (visual rhythm, scannable).
- Terms page: wall of text → numbered ledger cards + closing
  contact panel (same published text).
- About story: bare prose → ledger panel with a lead paragraph;
  testimonials page: quote marks + mono source line.
- Blanket: every flat `bg-surface-light` card gained a `border-line`
  edge so cards read as layered stock, not grey boxes.
- Corporate register firmed up: the floating WhatsApp button's
  playful scale-on-hover replaced with a lift + shadow deepen;
  no emojis, no bouncy motion anywhere in the build.

### 22.6 Rich-and-advanced blanket (§22 directive)
Every component class was audited; thin sections were enriched
from content already on the site (imagery, mono-code detailing,
index chips, service numbering, hover depth). Sections that
cannot be made rich without inventing content: NONE padded — the
grievance/legal facts remain blocked-on-data per §19.7 and were
left plain rather than decorated with invented substance.

### 22.7 Glass + gradient system (Royal Salon treatment, §22)
- `.glass-panel` (parchment 88% + blur 18px + saturate) on: sticky
  header bar, all three mega-menu panels, LP chrome, hero fact
  chip. `.glass-ink` (ink 88% + blur 14px) on: mobile sticky bar.
- Gradients: primary button brand→brand-dark (both stops AA with
  white text); hero accent bar brand-dark→brand→brand-bright;
  ticker label brand→brand-dark; `panel-ink` already carries the
  ink ground + vermilion radial glow (hero, CTA bands, demo card).
- Discipline: blur on three surface classes only (performance
  budget held — shared JS unchanged at 103 kB); text always on
  ≥85%-opaque stock so §19 contrast stands; under
  `prefers-reduced-transparency` glass resolves to opaque stock.

### 22.8 Logo brightening (presentation only)
Treatment: a luminous parchment plate (white→cream radial) with a
warm vermilion halo shadow + ring behind the lockup, artwork at a
stronger size (h-12). Footer: light artwork on a translucent
plate with the same halo on the ink ground. LP chrome matches the
header. Applies to: main header, LP chrome, footer. The artwork
files are byte-identical to the replica (hash-verified in this
pass); NO CSS filter, recolor or file edit was applied anywhere.

### 22.9 Dedupe log
| Removal | Evidence | Preservation |
|---|---|---|
| Free Demo OfferCard dropped from Home only (`excludeSlug`) | The PromoBanner already carries Free Demo on Home; the same card rendered twice on one page. Pricing/Register keep it (no banner there). | Same content, one canonical instance per page. |
| siteFaqs FaqList removed from About + Why Choose Us | The identical 3-item FAQ set repeated verbatim on three pages. | Cross-link card to canonical /faq on both pages. |
| Generic "What We Offer / How We Support You" articles removed from all 12 service pages | Same two generated answer blocks verbatim on every service page. | Cross-link line to /services + /faq; service-specific summaries/offerings (the harvest content) untouched. |
| "24/7 Customer Support" + "Smart Solutions" cards removed from Contact | Duplicated the canonical instances on /services. | Canonical instances remain on /services (verified single occurrence). |
| Footer bottom strip trimmed (Home/Testimonials/Services/Terms links) | Each duplicated a footer column directly above it. | Columns remain; strip keeps Pricing / For Institutes / local page. |
| Resources "Blog" card renamed "DigiDefense Blog" | Label collided with the internal /blog ("Blog (DigiDefense)" ambiguity). | Destination unchanged; label now names the property. |

- Routes: NO page removed — the page-merge audit found no two
  pages serving the same purpose, so no new 301s were needed.
- Borderline pair listed for Aravind's word: About vs Why Choose
  Us (company story vs differentiators — purposes differ, both
  are original routes; kept).
- Courses: NO true duplicates among the 36. Borderline overlaps
  listed for his word: CCNA vs Network+; SOC Analyst vs SC-200;
  Cybersecurity Technologies vs CEH/SOC; Data Analytics vs Data
  Science vs Power BI.
- Services: no true duplicates among the 12; Corporate Trainings /
  Industrial Trainings / College Workshops are audience variants
  of one delivery capability — listed, kept.
- NOT touched (researched intentional repetition): LP one-CTA ×3,
  WhatsApp/demo presence across pages, testimonial proof beside
  forms.

## 23. Desktop nav fix + services order (2026-10-23, Aravind's phone review)

Aravind reviewed Leo v1 on his phone (screenshots of /services, mobile
menu open and closed) and ruled: **the mobile menu is fine — do not
touch it — but the desktop view menu must be "salon style"**: a full,
rich, always-visible horizontal nav bar like the Royal Salon site,
not a logo + "☰ Menu" button with a plain list panel.

### 23.1 Root cause
The Header alone switched at `xl` (1280px): the inline bar was
`hidden xl:flex`, all three mega panels were `hidden xl:block`, the
hamburger was `xl:hidden` and the mobile sheet was `xl:hidden`. Every
other piece of chrome (FloatingActions sticky bar / desktop WhatsApp,
the body bottom-padding rule in globals.css) already switches at
`lg` (1024px). So at 1024–1279px widths the site presented the
hamburger + mobile sheet — a mobile menu on a desktop-width screen —
and the rich mega menu was unreachable below 1280px.

### 23.2 What changed (Header.tsx only; mobile untouched)
- Inline primary bar: `hidden lg:flex`; hamburger: `lg:hidden`;
  mobile sheet: `lg:hidden`; all three mega panels: `hidden lg:block`.
  The desktop bar now renders at ≥1024px: logo lockup (brighter plate
  unchanged) + Trainings ▾, Services ▾, Pricing, About Us,
  Resources ▾, For Colleges, For Institutes pill + Register (outline)
  + Request a Callback (solid).
- To fit the full bar inside the 1024–1279px measure, the lg step
  runs a compact measure — logo h-10 (plate/halo identical), tighter
  link padding/type (12.5px), narrower chevrons, slimmer pill/
  Register/Callback — and every value restores to the previous full
  measure at xl. No item was dropped, renamed or reordered.
- Mobile (<lg) markup, classes and behaviour are byte-identical:
  the hamburger, accordion sheet and sticky bar were not edited.
- Verification is by code inspection + grep proof of the responsive
  classes (no headless browser in the sandbox); the parent redeploy
  + Aravind's own desktop check are the visual verdict.

### 23.3 Services index order — bug, fixed
His screenshot showed /services leading with "Service 12 — Abroad
Consultancy" in a shuffled-looking 12, 04, 01, 05… sequence. Cause:
`queryServices()` read Supabase with `.order("title")` (alphabetical)
while `ServiceCard` numbers cards by the canonical local array order
(the published Services-page order, identical in the replica). Fix in
`src/lib/data.ts`: the DB rows are re-sorted by the canonical local
index before mapping; unknown slugs (none today) fall after the
canonical ones in DB order. /services now leads with Service 01 —
Corporate Trainings and runs 01→12 in the published order.

## 24. Nav threshold fix #2 — one chrome breakpoint at 960px (2026-10-23, Aravind's desktop-mode review)

### 24.1 Cause
The §23 fix is verified working in a real desktop browser (full
inline bar + both mega menus at ≥1024px). But Aravind tests
"desktop view" from his phone browser's desktop mode (Edge/Copilot
app), which renders at ~980 CSS px — below Tailwind's lg (1024px) —
so he still got the hamburger and (reasonably) reported "its not
working". The lesson: the chrome threshold must sit below the
narrowest width at which he will ever judge the desktop view.

### 24.2 The single-threshold rule
ONE custom breakpoint now governs ALL site chrome: `nav` = 60rem
(960px), defined once as `--breakpoint-nav` in the @theme block of
globals.css. Everything that presents as "desktop vs mobile chrome"
switches there, and nowhere else:
- Header: inline bar + all three mega panels at ≥960; hamburger +
  mobile sheet below 960.
- FloatingActions: desktop WhatsApp float at ≥960; mobile sticky
  Call/WhatsApp/Register bar below 960.
- LP chrome: the landing pages' own sticky action bar hides at
  ≥960 and its footer bottom padding releases at ≥960 (the LP
  content grids are unchanged — they are content, not chrome).
- globals.css: the body bottom-padding for the sticky bar now
  applies at max-width 959px (was 1023px).
Content grids (footer columns, stats, card layouts) still use the
standard breakpoints — they are layout, not chrome, and were never
part of the complaint.

### 24.3 Compact measure extended to 960 — fit verified
The §23 compact measure (previously the lg step) is now the nav
step, tightened slightly so the full bar genuinely fits the
narrower band: links 12px with px-1, chevrons w-4, logo plate
px-1.5, pill/Register/Callback padding and margins trimmed. Full
measure restores at xl (1280px) exactly as before. No item was
dropped, renamed, reordered or wrapped.
Fit proof (measured, not eyeballed): text widths were computed
from the actual Instrument Sans variable font file (fontTools,
instanced at wght 600/700) at the compact sizes, plus each item's
padding/margins/border and the h-10 logo plate at its intrinsic
193:60 ratio. Total bar = 864px (logo 143 + items 722) against
912px available inside the .wrap container at a 960px viewport —
~48px of slack on a single nowrap line.

### 24.4 Mobile untouched
Below 960px the markup, classes and behaviour of the hamburger,
accordion sheet, sticky bars and LP bar are exactly as Aravind
approved in his screenshots — only the visibility threshold moved
(lg → nav, and the body padding media 1023px → 959px).

### 24.5 Verification
- `npm run build` passes (shared JS still 103 kB).
- Grep proof: no `lg:` remains in Header.tsx or
  FloatingActions.tsx; no `lg:hidden`/`lg:flex`/`lg:block`
  visibility switching remains in any component; the compiled CSS
  carries .nav\:flex/.nav\:block/.nav\:hidden inside
  `@media (min-width:60rem)`.
- Crawl of the built site: 89/89 sitemap URLs return 200.

## 25. Dark theme — light/dark toggle (2026-10-23, Aravind's "one thing missing in v1")

### 25.1 Mandate and mechanism
Aravind approved the §24 nav fix and named the missing piece: a
light/dark theme toggle like the Royal Salon site has. Mechanism:
a `.dark` class on `<html>` (Tailwind v4 `@custom-variant dark`),
set **before first paint** by a tiny inline script in `layout.tsx`
head — stored choice (`localStorage["gradespot-theme"]`) wins, a
first visit follows `prefers-color-scheme`; no flash of the wrong
theme. `suppressHydrationWarning` on `<html>` covers the class the
script adds. The toggle (`src/components/ThemeToggle.tsx`) flips
the class, sets `color-scheme`, and persists the choice; its icon
is CSS-driven by the root class, so it is correct pre-hydration.

### 25.2 Toggle placement (salon-style)
- **Header utility strip** (on ink, right side) — icon button,
  sun/moon, visible at **every width**, 44×44, native `<button>`
  (keyboard-accessible), `aria-label` "Switch to dark/light theme",
  `aria-pressed` state.
- **Mobile sheet** — a labelled "Theme — Light/Dark theme is on"
  row under the Register/Callback grid.
- **LP chrome** — LPs are nav-free, so a slim utility strip
  (location + toggle) was added above the logo+phone bar; the LP
  anatomy (one CTA, no navigation) is unchanged.
- Switching cross-fades colours for ~400ms via a temporary
  `theme-anim` class — **never** under `prefers-reduced-motion`
  (checked in JS and in the CSS media query).

### 25.3 THE RULE — dark is the light palette INVERTED (Aravind, 15:11 IST)
No separate dark palette was invented. Each dark token is the
light token inverted, Royal-Salon style — surfaces ↔ ink pole,
ink text ↔ paper text, muted shades inverted likewise:
- `canvas` = exact HSL lightness-inversion of `paper`
  (#FAF6EE → **#110D05**); `body` of `body` (#5A4B38 → **#C7B8A5**);
  `line` of `line` (#E0D4BE → **#41351F**); `heading` = `paper`
  itself (#FAF6EE); `nav` from the cream pole (#EEE1C8).
- Card/band/raised surfaces step up from the ink pole in the same
  elevation order light uses: band `surface-light` #1E150B,
  card `parchment` #251B10, raised `cream`/`navy` #2E2113,
  tinted chip `brand-soft` #3D2110.
- Elements already at the dark pole in light (ink panels, footer,
  ticker, utility strip) stay ink, deepened one step
  (`ink-deep` #0B0803).
- The **vermilion signal stays the signal**: all brand
  backgrounds/borders/gradients keep #B23A0A/#9A3412. The single
  contrast-forced adjustment the rule allows: brand **as text**
  (#B23A0A ≈ 3:1 on dark) lifts within the same family —
  `signal` #FF8A4C, `signal-strong` #FFB287 (7.2–9.6:1 on dark
  surfaces). In light, `signal`/`signal-strong` are exactly
  brand/brand-dark, so light is untouched.

### 25.4 Token strategy
- New tokens: `canvas` (page background — split from `paper`,
  whose text-on-ink role forbids inverting it), `signal`,
  `signal-strong`, and a form-status set (`success/error/warning`
  surface+text, `field-error`) replacing the hardcoded Tailwind
  green/red/amber utilities in the four forms (light values =
  the exact old hexes).
- Class migration (33 files): `text-brand`→`text-signal`,
  `text-brand-dark`→`text-signal-strong`, `accent-brand`→
  `accent-signal`; foreground uses of `text-ink`/`border-ink` →
  `text-heading`/`border-heading` (same #201913 in light, paper
  in dark). Background uses of ink/paper/brand do not move.
- The course-page hero `bg-heading` → `bg-ink` (identical hex in
  light) so it stays a dark hero in both themes.

### 25.5 Contrast — WCAG 2.2 AA spot-checks (measured, both themes)
Light (unchanged, §19.2 values reproduced): body/paper **7.80**,
body/cream **7.03**, heading/paper **16.10**, signal/paper **5.56**,
white on brand gradient **6.00/7.31**, footer **10.31**,
nav on glass **11.59**, brand-bright on ink **6.00**.
Dark: heading/canvas **17.98**, heading/card **15.67**,
body/canvas **9.99**, body/card **8.71**, body/brand-soft **7.61**,
signal/canvas **8.30**, signal/card **7.23**, signal/raised
**6.69**, signal-strong/card **9.63**, white on brand **6.00/7.31**
(buttons unchanged), nav on glass-panel **13.34**, body on
glass-panel **8.89**, paper on glass-ink **17.98**, paper on
panel-ink **17.69**, footer **11.06**, dark btn-navy (ink on
paper) **16.10**, status texts **11.20–11.77**, field-error
**8.90**, form placeholders (body @70%) **4.95**. Every content
pair passes AA in both themes.

### 25.6 Special handling
- **Logo**: header + LP render BOTH official artworks; CSS shows
  `logo.png` in light and the official `logo-light.png` in dark —
  no filters/recolors, files untouched (hashes unchanged). The
  §22 brighter plate moved to a `.logo-plate` class with the exact
  light gradient values + an ink-glow dark variant. The footer
  already used `logo-light` on ink — correct in both themes.
- **Signature block**: the MD signature is dark ink on
  transparency; in dark it gains a pale plate (`.signature-art`)
  so it stays legible exactly as printed.
- **Employer LogoWall**: wordmarks are dark-ink art; tiles get
  pale stock in dark (`.logo-tile`).
- **Glass/ink panels**: `.glass-panel`/`.glass-ink`/`.panel-ink`
  have `.dark` variants (warm ink glass, deepened ink gradient);
  reduced-transparency still resolves them to opaque stock.
- **Buttons**: `btn-navy` inverts (parchment button, ink text);
  `btn-outline-navy` gets a paper outline in dark; the focus ring
  follows `signal` in dark. `btn-primary` is unchanged.
- **Accessibility page**: statement updated — both-theme contrast
  figures and the theme-choice measure, from what this build
  actually implements, as before.

### 25.7 Light theme — pixel-identical
Every light token value is unchanged; the renames are
value-preserving (canvas = paper hex, signal = brand hex, status
tokens = the old Tailwind hexes, `.logo-plate` = the exact §22
gradient/shadow values). Light-system visitors see the approved
v1 exactly; dark is an addition, not a restyle.

### 25.8 Verification
- `npm run build` passes; shared JS still **103 kB**.
- Crawl of the production build: **89/89 sitemap URLs return 200**.
- Compiled-CSS audit: the `.dark` block carries every override
  (canvas #110D05, body #C7B8A5, line #41351F, signal #FF8A4C…);
  `dark:` variant compiles to `:where(.dark, .dark *)` selectors;
  `.dark .glass-panel/.logo-plate/.btn-navy` rules present.
- Served-HTML audit on key pages (home, /trainings, a course
  page, an LP, footer): theme script + toggle (aria-label,
  aria-pressed) + both logo artworks present; LP carries the
  toggle in its slim utility strip.
- NO deploy in this step — commit only; the parent redeploys.

### 25.9 CORRECTION — floating toggle, bottom of screen (2026-10-24)
Aravind's ruling, the day after §25 shipped: the toggle "shouldn't
be like that — it should be like on screen floating toggle in
bottom side for dark/light". The §25.2 placements were REMOVED in
full: the header utility-strip icon, the mobile-sheet labelled
row, and the LP slim-strip toggle are all gone — the LP strip
itself stays as a location line only, so the LP chrome is
otherwise unchanged. There is now exactly ONE toggle:
`src/components/ThemeToggle.tsx` rewritten as a single floating
button, rendered by `Chrome.tsx` on every page (global chrome and
nav-free LP chrome alike), fixed at the bottom-right of the
viewport in both themes — ink button with parchment icon on
light, parchment button with ink icon on dark, 48×48 (above the
44px minimum), `aria-label` + `aria-pressed` unchanged.
- **Mobile (< nav 960px):** bottom
  `calc(68px + env(safe-area-inset-bottom))`, right 16px. The
  sticky Call/WhatsApp/Register bar is 52px tall (global bar
  min-h 52px; LP bar ~46px), so the button clears it by 16px.
- **Desktop (>= nav 960px):** bottom
  `calc(96px + env(safe-area-inset-bottom))`, right 24px — the
  floating WhatsApp bubble is 56px tall at bottom 24px (top edge
  80px), so the button stacks above it with 16px clearance, on
  the same right edge. No overlap with footer content beyond the
  normal floating-action overlay behaviour.
- Mechanism, persistence, pre-paint script, inverted palette,
  logo swap, reduced-motion handling: all untouched from §25.
- Light theme pixel-identical except the removed strip toggle;
  dark tokens untouched. Verified by build + 89/89 crawl +
  served-HTML audit counting exactly one toggle instance per
  page (home, a course page, an LP) before commit. NO deploy —
  commit only; the parent redeploys. NOTHING is merged to main:
  this stays on `leo-build-v1`.

### 25.10 Asset-locality audit — every image/asset local (2026-10-24)
Aravind's rule, same commit batch: nothing fetched from a remote
URL at page-load time, because remote assets are slow to appear.
Audit method: grepped all of `src/` for `http(s)://`, CDN/image
hosts (Pexels/Unsplash/Cloudinary/Supabase storage), `<img>` /
`<script>` / `<link>` / `<iframe>` remote sources, and font
`@import`s; checked `next.config.ts` (no `images.remotePatterns`)
and the built output.
- **Already local — no change needed:** all 85 images in
  `public/images/` (8.5 MB total, largest single file 224 KB —
  `cert-16.jpg`; no oversized file needed recompression, and no
  photo was recompressed); all 7 font files self-hosted in
  `public/fonts/` with `@font-face` + preloads in `layout.tsx`
  (no Google Fonts fetch); OG/Twitter image is the local
  `/images/courses/ceh.jpg`; the only inline script is the local
  theme bootstrap; CSP already enforces it
  (`img-src 'self' data: blob:`, no external script/style/font
  origin allowed). Loading was already near-right: home hero +
  header/LP logos + course hero + profile hero carry `priority`
  with width/height; everything below the fold lazy-loads by
  Next.js default. This pass added `sizes` to every card/grid
  image (course cards, blog cards, trainings index, management,
  team, certifications) so browsers fetch the right srcset
  candidate, and `priority` + `sizes` to the course hero and the
  Nikhil profile hero.
- **The one remote page-load asset — FIXED:** `/contact-us`
  embedded Google Maps (`output=embed` iframe). It was not only
  remote — it was dead: the site's own CSP (`default-src
  'self'`, no `frame-src`) blocks a google.com frame, so it
  rendered nothing. Replaced with a local map image,
  `public/images/map-dilsukhnagar.jpg` (1200×600, 231 KB,
  lazy-loaded below the fold), built at build time from
  OpenStreetMap tiles centred on the geocoded Dilsukhnagar point
  (17.36878, 78.52409) with a vermilion pin, captioned with the
  address + "© OpenStreetMap contributors" attribution; tapping
  it opens Google Maps. The official logo files were NOT
  touched (logo.png hash still 5669a470…).
- **New local asset:** `public/favicon.ico` (2.9 KB, 48/32/16px
  ICO derived from logo.png — the source file is untouched),
  so browsers stop 404ing the default favicon request.
- **Remaining remote references — all outbound links, NOT page
  loads (kept deliberately):** `wa.me` chat links, social
  profiles, `digital.gsitssolutions.com` / `digidefense.in`
  (Resources links), Google Maps links, `metadataBase` /
  sitemap / robots canonical URLs, and JSON-LD `sameAs` URLs.
  None of these is fetched until the visitor clicks or a
  crawler reads metadata. After this pass, built/served HTML
  contains ZERO remote asset loads: no remote `<img>` src, no
  remote `<script>` src, no remote stylesheet, no `<iframe>`
  (the single remote `<link>` found in served HTML is the
  canonical metadata URL, which browsers do not fetch as an
  asset).
- No photo was recompressed or resized: with a 224 KB maximum
  and lazy loading below the fold, nothing justified quality
  loss; the only new image is the 231 KB local map.

### 25.11 Utility strip is ONE row at every width (2026-10-24)
Aravind's screenshot of the live mobile top bar showed the bug:
the moon toggle sat on its own row in the dark utility strip,
adding a whole extra row and a visible gap on mobile, while
desktop showed one clean line. The floating toggle (§25.9)
removes the moon, but the strip itself could still wrap: it was
`flex-wrap` with location + email in a wrapping group, and at
~360px the two together overflow one line. Fixed in `Header.tsx`:
outer strip is now `flex-nowrap overflow-hidden` (no `gap-y`
anywhere, so no leftover row spacing), the location/email group
is `min-w-0 flex-1` with both items `truncate` (ellipsis on
narrow screens — email truncates rather than pushing a second
row), Office Hours stays `hidden md:inline`, and the
socials/phones group is `hidden sm:flex` on the wrapper itself
(zero footprint below sm, not an empty flex item). Strip height
is structurally identical on mobile and desktop: same `py-2`
and same 11px mono text at all widths, one line always — no
second row exists to measure. The LP slim strip (location line
only) was already nowrap single-row and is unchanged.

### 25.12 First-section top padding tightened (2026-10-24)
Aravind's ruling, same batch: too much dead space between the
logo nav bar and the top of page content — visible on the home
hero (dead band above the "Dilsukhnagar · Hyderabad" eyebrow /
"We Create Better IT Solutions" heading) and the same excess on
ALL menu pages. Root cause: the first section / hero top
padding in each page template. Fixed consistently, first
sections ONLY (interior `section-pad` rhythm, 84/116px, is
untouched): every first-section template now uses the SAME
tightened value — mobile `py-10` (40px), desktop `md:py-14`
(56px) — a modest breathing gap, not zero. Before → after:
- `PageHero` (one component, covers 26 pages: about, services,
  trainings index, why-choose-us, team, testimonials, resources,
  certifications, verification, contact, FAQ, terms,
  for-institutes, pricing, compare, Dilsukhnagar page,
  for-colleges, career-support, blog, accessibility, register,
  partner-with-us, service detail, compare pair, blog detail,
  Nikhil profile): `py-16 / md:py-[84px]` (64/84px) → `py-10 /
  md:py-14` (40/56px).
- Home hero grid: `py-16 / md:py-24` (64/96px) → `py-10 /
  md:py-14`.
- Course hero: `py-14 / md:py-20` (56/80px) → `py-10 /
  md:py-14`.
- LP hero panel: `py-12 / md:py-16` (48/64px) → `py-10 /
  md:py-14`.
Anchor offsets are unaffected: the sticky header height is
unchanged, and anchors clear it via the global
`scroll-margin-top: 96px` (globals.css) plus `scroll-mt-32`
utilities on `#enquire`/`#demo` — neither depends on hero
padding, and no `scroll-mt` value was touched. Verified by
build + 89/89 crawl + served-HTML class audit on home and an
inner page at both widths (same `py-10 md:py-14` first-section
classes in the markup; no `py-16/py-20/py-24` first-section
remains). NO deploy — commit only; the parent redeploys.
NOTHING merged to main: this stays on `leo-build-v1`.

### 25.13 Credential seal cards (2026-10-24)
Aravind's ruling, with screenshot: the "An ISO Certified Company"
and "AICTE Internships Approved" cards carry the most trust weight
on the site but were plain cards — they needed recognizable
credential design, a logo stamp on the RIGHT side of each card,
and the related government logos. Redesign (one shared component,
`CredentialCard` in `components/ui.tsx`, used on Home and
About Us — the only two places these cards render):
- Card: elevated seal treatment — 2px brand-tinted border,
  deep warm shadow, parchment ground — text on the left, stamp
  on the right.
- Stamp: fixed-size flex item (96px mobile / 112px desktop,
  `shrink-0`, `min-w-0` text column), so it is never cropped
  and never overlaps the text at any width; concentric stamp
  rings (solid + dashed + inner) with an arc label across the
  top and the claim's own acronym/standard centred.
- ISO seal: arc "ISO 9001:2015", centre "ISO / CERTIFIED".
- AICTE seal: arc "AICTE APPROVED", centre "AICTE /
  INTERNSHIPS".
- Copy is VERBATIM on both cards (same `homeParagraphs` /
  `aboutParagraphs` strings); no certificate numbers, dates, or
  issuing-body wording were added. Layout only.
- Both themes: the ring uses the `signal` token and the centre
  type uses `heading` — both invert under §25 rules, so the
  seals read on the parchment card in light and on the ink card
  in dark. No filter recolors anywhere (the seals are inline
  SVG, not artwork files).
- LOGO SOURCING — substitution, reported plainly: NO official
  emblem artwork is used on either card, because no genuine
  official logo file could be cleanly obtained from an official
  source. (1) AICTE: aicte-india.org was unreachable from the
  sandbox (browser fetch failed, network error, not retried);
  the Government of India NIC design page for AICTE carries
  descriptive text but no logo file; the only downloadable
  copies found were third-party sites, which are not an
  official source. (2) ISO: ISO's corporate logo must not be
  used to imply certification — certification marks are issued
  by the certifying body, not by ISO — so lifting the ISO logo
  would itself have been a misrepresentation. Drawing a
  lookalike government/ISO emblem was explicitly ruled out, so
  both seals are typographic, built only from the claim text.
  If Aravind supplies the genuine AICTE logo file or his
  certification body's ISO mark, either seal swaps to the real
  artwork with no layout change.
- Verified by local production build + crawl: build passes,
  shared JS still 103 kB, 89/89 URLs 200, served-HTML audit on
  Home and About Us confirms both seal aria-labels, both
  verbatim copy strings, and zero remote `<img>` on those
  pages. NO deploy — commit only; the parent redeploys.
  NOTHING merged to main: this stays on `leo-build-v1`.

### 25.14 Mobile strip scrolls away + tightened nav-to-content gap (2026-10-24)
Aravind's ruling, with annotated screenshot of the live mobile
home page (purple scratches on the strip and on the band below
the nav bar): (1) on mobile the dark utility strip must scroll
away — only the logo nav bar stays sticky; desktop keeps strip
+ nav sticky together, unchanged. (2) Below the nav bar there
is still a dead band of dotted paper before the hero eyebrow,
on home and on all menu pages — he asked whether that gap is
standard. Applied answer: a SMALL gap is standard (content must
never touch the bar); a large empty band is not. So the gap was
tightened, not removed.

1. MOBILE SCROLL / DESKTOP STICKY SPLIT (`components/Header.tsx`):
   the strip JSX is now a single `strip` const rendered twice —
   once in normal flow ABOVE the sticky header, wrapped in
   `nav:hidden` (mobile only: scrolls off the top, strip content
   still fully present at the top of the page before scrolling),
   and once INSIDE the sticky header, wrapped in `hidden
   nav:block` (desktop only: strip + nav stick together exactly
   as before). One instance is `display:none` at any width, so
   assistive tech sees only one strip and the content cannot
   drift between breakpoints. No JS, no hiding of content: the
   strip is not removed on mobile, it just stops sticking.
   Verified in served HTML: the strip markup appears with the
   `nav:hidden` (flow) and `hidden nav:block` (sticky) wrappers
   and the header itself remains `sticky top-0`. LP pages have
   no strip in their nav-free chrome, so no LP change was needed
   for this half.

2. NAV-TO-CONTENT GAP, SITEWIDE — first-section top padding,
   same unified set as §25.12, 40px mobile / 56px desktop →
   **24px mobile / 32px desktop** (`py-6 md:py-8`): `PageHero`
   (one component, 26 pages), home hero (`app/page.tsx`),
   course hero (`app/trainings/[slug]/page.tsx`), LP hero
   (`app/lp/[slug]/page.tsx`). NOT zero — the eyebrow keeps a
   real gap under the bar. Double-gap check: the nav bar's only
   bottom edge is its 1px `border-b`; `<main>` carries no top
   padding; `hero-paper` is background-only (dot grid, no
   padding); so the first-section padding was the sole gap and
   no stacked spacing remains. Interior `section-pad` rhythm
   (84/116px) untouched — first sections only.

3. ANCHOR OFFSETS, RECHECKED after the mobile sticky height
   shrank: mobile sticky header is now the nav bar alone —
   bar `py-2.5` (20px) + logo plate `py-1` (8px) + `h-12`
   artwork (48px) + 1px border = ~77px, comfortably under the
   global `section[id], div[id]` `scroll-margin-top: 96px`
   (`globals.css`), and `#enquire`/`#demo` carry `scroll-mt-32`
   (128px) — both clear the new mobile header. Desktop sticky
   height is UNCHANGED by this change (strip ~35px + nav ~69px
   ≈ 104px by class arithmetic); that desktop figure predates
   this change and is not a regression from it — the conversion
   anchors at 128px clear it on both widths. No `scroll-mt`
   value was touched.
- Both themes unaffected (no token or colour change; the strip
  keeps its ink background in both themes). NO deploy — commit
  only; the parent redeploys. NOTHING merged to main: this
  stays on `leo-build-v1`.

### 25.15 Official ISO + AICTE emblems — SUPERSEDES §25.13 (2026-10-24)
Aravind OVERRULED the §25.13 typographic seals: the cards must
use the OFFICIAL logos and seals from the bodies themselves,
designed in a government-recognizable way — NO custom seal
designs. The §25.13 seal rings are deleted entirely (no
`CredentialSeal` code remains); both cards now render one shared
`CredentialEmblem` component (`components/ui.tsx`), used on Home
and About Us — the only two places these cards render. Card
treatment is formal and restrained: parchment ground, formal
2px ink border, warm shadow, text on the left, the official
emblem on the RIGHT on a neutral WHITE plate (fixed 96px mobile
/ 112px desktop, `shrink-0`, `object-contain` — never cropped,
never over the text), so the artwork reads identically in light
and dark. NO filters, NO recolors, NO redraws of either artwork.
Copy is VERBATIM — no new claims, numbers, or dates.

SOURCES + AUTHENTICITY CHECKS (both files stored LOCALLY in
`public/images/`, never hotlinked):
- ISO — `public/images/iso-logo.svg` (4,952 bytes, SHA-256
  453e4cf3…f06724c08c968b). Route tried: iso.org first — not
  directly fetched; obtained via the Wikimedia Commons mirror
  file "ISO_Logo_(Red_square).svg"
  (commons.wikimedia.org/wiki/File:ISO_Logo_(Red_square).svg),
  described there as "The current logo of the International
  Organization for Standardization (ISO)", author: the
  organization itself, dated 13 March 2018, current revision
  8 June 2025. Checks passed: downloaded SVG dimensions
  1181×1087pt match the file page metadata exactly; file size
  ~5 KB matches; only two fills in the file — #e30613 (=
  RGB 227 6 19, the file page's stated red) and white — the
  ISO Red Square rendering.
- AICTE — `public/images/aicte-logo.png` (167,402 bytes,
  316×316, SHA-256 a790706e…f05f268). Route tried:
  aicte-india.org first — UNREACHABLE from the sandbox
  (browser fetch failed with a network error; a fetch failure
  is not proof the site is down, and it was not retried after
  the denial). Obtained via the verified mirror: the
  en.wikipedia.org file "All India Council for Technical
  Education logo.png", whose page states the source as "The
  logo may be obtained from All India Council for Technical
  Education". Checks passed: 316×316 matches the file's
  recorded dimensions; the image was visually inspected and
  is the genuine emblem — orange gear-wheel ring, "All India
  Council for Technical Education" around the edge, "AICTE" in
  red, motto "योगः कर्मसु कौशलम्", diya lamp in the blue
  roundel — matching the Government of India NIC description
  of the AICTE logo (stylised diya, flame of knowledge).
  Third-party copies (e.g. institute blogs) were NOT used.

TRADEMARK / CLAIM NOTE, kept on the record: both the ISO name
and logo are registered trademarks with restricted use, and
the ISO 9001:2015 / AICTE claims themselves remain on
Aravind's confirm-or-remove list — if either claim is
unconfirmed, its emblem comes off. This phase implements
Aravind's explicit overrule; it does not itself verify the
underlying claims.
- Verified by local production build + crawl (see commit
  verification): build passes, shared JS still 103 kB,
  89/89 URLs 200, served-HTML audit on Home and About Us
  confirms LOCAL paths `/images/iso-logo.svg` and
  `/images/aicte-logo.png` on both pages. NO deploy — commit
  only; the parent redeploys. NOTHING merged to main: this
  stays on `leo-build-v1`.

### 25.16 Sitewide dead-space pass (2026-10-24)
Aravind's order: deep-inspect the whole site for dead spaces —
"a lot of dead spaces across the website" — and fix them
systematically through shared values, not per-page hacks.
Audit method (no live browser in this pass): every route's
section structure was mapped from source — all 89 routes'
section open tags, component bands, and inner spacers — at
both widths via the shared values (mobile base vs `md:`
desktop step). Rendered-pixel confirmation is still owed on
the parent's visual pass after redeploy.

FINDING — one systematic cause, not scattered bugs: the
shared `section-pad` utility (84px mobile / 116px desktop,
top AND bottom) is used by 53+ sections sitewide, and sections
stack directly. Every junction between two sections was
168px mobile / 232px desktop of pure padding — that is the
dead band Aravind kept screenshotting: content ends, a long
empty field, next heading. Worst on Home, which runs seven
`section-pad` sections plus two more section-pad bands
(`TestimonialSpotlight`, `ForInstitutesBand`) in one scroll:
hero → courses → about → stats → trainings → services →
offers → institutes → features → testimonials → CTA, with a
232px desktop void at nearly every joint. Same stacking on
course pages (content sections + related-trainings section),
LP pages (two `section-pad` sections after the hero strip),
compare/blog/article pages, and all index pages.

FIX (one shared value, `globals.css` @utility section-pad):
padding-block 84px → **64px** mobile, 116px → **88px**
desktop. Junctions become 128px mobile / 176px desktop —
still generous breathing room, squarely standard section
rhythm, but no longer reading as empty. Applied sitewide by
the single change; no page was touched individually.

AUDIT LIST (before → after, why it was dead):
- Home, all section junctions (courses/about/trainings/
  services/offers/institutes/features/testimonials):
  168/232px → 128/176px. Dead because two full paddings
  stacked with no content between them.
- Home, StatsRibbon junction: section-pad bottom + ribbon
  `py-14` + section-pad top meant the thin stats strip sat
  between two voids; ribbon padding itself kept (56px is a
  band, not a gap) — the junction shrinks via section-pad.
- Home, TestimonialSpotlight → CtaBand junction:
  116 + 64 = 180px desktop → 88 + 64 = 152px; CtaBand
  `py-16` kept (CTA bands need their own air).
- Course pages, content → related-trainings junction and
  LP pages, hero-strip → content sections: same stacking,
  same fix; LP hero itself was already tightened in §25.14
  and is untouched here.
- Compare / blog / index / about / services / for-colleges /
  for-institutes / career-support / register / partner /
  legal pages: all `section-pad` sections inherit the fix;
  the one `section-pad pt-0` (for-colleges, top already
  removed) is unaffected in intent.
- Hero → first-section junctions (all pages): hero bottom
  24/32px (§25.14) + section-pad top 88px desktop = 120px
  desktop / 88px mobile — kept as breathing room (see open
  question 2).

KEPT DELIBERATELY (audited, not dead):
- Inner block gaps `mt-12` (21×), `mt-14` (5×), `mt-16`
  (9×), `space-y-10/12`: these separate distinct content
  blocks inside a section (services page intro → grid →
  split → CTA → grid; career-support blocks; catalogue
  search groups). 48–64px between major blocks is rhythm,
  not emptiness; tightening them would need per-page calls.
- Band paddings: StatsRibbon `py-14`, CtaBand `py-16`,
  footer grid `py-16` + bottom bar `py-5` — distinct zones
  (ink bands, footer) need their own air; junctions around
  them shrink via section-pad instead.
- Hero values from §25.14 (24/32px) and the floating toggle
  / sticky-header work: untouched.
- Card/grid gaps (`gap-6`, `gap-8`, `gap-10`, `gap-12` on
  hero grid): gaps between visible cards, not empty bands.

ANCHORS: no section was removed or reordered; `scroll-
margin-top: 96px` and `scroll-mt-32` on `#enquire`/`#demo`
are untouched and still clear the sticky header (mobile
~77px after §25.14; desktop unchanged). Both themes
untouched (no colour/token change).

OPEN QUESTIONS for Aravind (left as-is, not guessed):
1. Internal block rhythm: should the `mt-16` (64px) gaps
   between major blocks inside long pages (services,
   career-support, local page) also tighten, or is the
   current airy feel right once the section voids are gone?
2. Hero → first-section junction (120px desktop after
   this pass): is that tight enough, or should the first
   section after a hero sit closer still?
3. Alternating paper / surface-light section backgrounds
   make every junction visible as a colour change; with
   tighter padding the banding reads denser — confirm on
   his phone whether that look is right or whether some
   sections should lose the alternating tint.
- Verified by local production build + crawl (see commit
  verification): build passes, shared JS still 103 kB,
  89/89 URLs 200, compiled-CSS audit confirms the new
  `section-pad` values. NO deploy — commit only; the
  parent redeploys. NOTHING merged to main: this stays on
  `leo-build-v1`.

### 25.18 v1 hardening — tighter form validation, shared client + server (2026-10-24)
Aravind's pre-v2 gate, item 1. Before: the client sent with no
validation at all (noValidate forms, server errors only) and the
server's zod schema accepted weak phones (any 7–20 chars of digits)
and an empty course selection ("Registration: " passed its interest
check). After: ONE dependency-free module, `src/lib/lead-validation.ts`,
run by LeadForm, LpLeadForm and RegisterForm before sending AND by
`/api/leads` on receipt — the server never accepts what the client
rejects, and no invalid lead is stored or acknowledged as success.
- Name: required, 2–120 chars, letters/spaces/hyphen/apostrophe/dot
  only, at least two letters.
- Phone: required. Indian mobile (+91 / 91 / trunk-0 / bare 10-digit)
  must be 10 digits starting 6–9; other numbers must be plausible
  international (+country code, 7–15 digits, never 0-led). All-same-
  digit numbers and sequential runs (0123456789, 1234567890,
  9876543210) are rejected as obviously fake.
- Email: optional everywhere (phone-first), strictly format-checked
  when present (no "..", valid local/domain labels, TLD 2+ chars).
- Interest: required; "Registration:" / "Demo:" with an empty course
  is rejected. RegisterForm now sends a `course` field, required when
  present; the route strips it before storage (LeadInput unchanged).
- Message: optional, capped at 2000 chars. Double-submit prevented
  by disabled-while-sending plus a sending-state guard in all three
  forms. Inline per-field errors keep the existing error UI pattern;
  server failures return 400 (was 422) with `{ error, errors }`.
- DPDP consent lines and unticked WhatsApp opt-ins untouched.
- Verified against the local production build (all 400 + field
  errors, no storage): all-same-digit, sequential, short, and
  0-led phones; bad email; missing name; digit-bearing name; empty
  course; 2001-char message — each rejected with exactly its field
  error. Valid payload → 201, stored in Supabase, then deleted
  (test leads id 12 and 13 removed; table left clean). Two honest
  process notes: the first test run exposed a real bug of mine (the
  empty-email early return was dropped in an edit — fixed, then all
  tests re-run green); and a stale first server held port 3103, so
  one retest round hit the old build before the port was reclaimed
  by PID and re-run.

### 25.19 v1 hardening — dynamic course metadata, one data source (2026-10-24)
Aravind's pre-v2 gate, item 2. New `src/lib/metadata.ts`: every
dynamic route's metadata is GENERATED from the file-based course /
service / article objects — title, description, canonical, OG and
Twitter tags (including the per-route image, which previously fell
back to the layout default everywhere). Title/description strings
are byte-identical to the ones the routes previously inlined; the
only additions are OG/Twitter images and the trainings-index
description. No backend change: the catalogue stays file-based; a
Supabase/CMS-driven catalogue is an admin-phase (gradespot-axon)
decision, not this task. No course content, fee, duration or claim
changed — plumbing only.
- Refactored to builders: trainings/[slug] (coursePageMetadata),
  lp/[slug] (lpPageMetadata), services/[slug]
  (servicePageMetadata), compare/[pair] (comparisonPageMetadata),
  blog/[slug] (articlePageMetadata), trainings index
  (trainingsIndexMetadata — description derived from the live
  catalogue: count + categories actually present).
- Trainings index also gains an ItemList JSON-LD
  (trainingsIndexSchema in @/lib/schema) generated from the same
  catalogue; course/service JSON-LD and breadcrumbs were already
  data-driven and are unchanged.
- Static pages keep their hand-written metadata exports: those
  strings are page copy, not duplicated course/service data, so
  there is nothing to deduplicate them against (judgment call).
- Spot-checks on the local production build (title / description /
  canonical / OG / Twitter / JSON-LD all present and matching the
  data object): full course CCNA 200-301 (OG = ccna.jpg, Course
  schema); catalogue course AutoCAD (fallback description, OG =
  autocad.jpg, Course schema, catalogue template confirmed);
  LP azure-fundamentals-az-900-in-hyderabad (title/description
  from courseDetails outcome, OG = az-900.jpg); trainings index
  (36 trainings across the catalogue categories, ItemList schema);
  service corporate-trainings (title, canonical, default OG).

### 25.20 v1 hardening — one high-intent CTA hierarchy (2026-10-24)
Aravind's pre-v2 gate, item 3. The rule, applied sitewide in both
themes: exactly ONE primary high-intent action per context (the
vermilion solid) — Register / Request a Callback / Enquire, whichever
the context's goal is. Secondary actions (Free Demo, secondary
enquiry) are outlines; low-intent actions (Explore, WhatsApp chat,
Learn more) are links/chips, never competing solids. Labels and
destinations are unchanged everywhere; only hierarchy styling moved.
- Worst offender fixed — EnquiryRail: was solid-green WhatsApp +
  outline syllabus + solid-navy Demo stacked under the form. Now the
  form submit is the only solid; WhatsApp is a green outline
  (border-wa, text-wa / dark:text-wa-bright, identity kept, weight
  demoted) and Demo is btn-outline-navy.
- DemoBand (ink panel): syllabus solid green → green outline
  (border-wa, text-wa-bright on ink); the form submit stays the
  only solid; "Book the Demo on WhatsApp" was already an outline.
- Mobile sticky bar: keeps Call / WhatsApp / Register, but Register
  is now visually dominant (solid brand background, white text);
  Call and WhatsApp stay muted cells.
- Already compliant, unchanged: home hero (primary + outline),
  course heroes (primary + outline-light), header (§22 hierarchy),
  CtaBand / PromoBanner / TestimonialSpotlight /
  ForInstitutesBand (one primary + outlines/links each), LP pages
  (one CTA repeated ×3, per the standing LP rule), form submits
  (one primary per form).
- Judgment calls: choice contexts keep equal weight — compare-pair
  A-vs-B buttons and pricing-tier cards are alternatives the user
  must pick between, not competing conversions, so their equal
  primaries stand; the floating WhatsApp bubble stays as a
  persistent chat affordance (small, corner, not a page CTA).
- Verified: production build passes, shared JS still 103 kB,
  crawl 89/89 URLs 200. NO deploy — commit only; the parent
  redeploys. NOTHING merged to main: this stays on `leo-build-v1`.

### 25.21 SEO + AEO pass — canonical decision, technical audit (2026-10-24)

Goal (Aravind): the LEO build itself should compete for top 3 in
Hyderabad, top 5 in South India, first-page visibility in India and
worldwide — for its REAL training business. Honest framing, stated
up front: no on-site work can guarantee a ranking position. Rankings
depend on Google, competition, and domain authority accumulated over
time. Everything below is what is inside the site's control, done
thoroughly. What on-site work CANNOT do: outrank the official site
instantly, invent authority, or substitute for the off-site steps in
§25.26 (Search Console, GBP claim, real reviews, real backlinks).

**Canonical-base decision (the big one).** Before this pass, every
canonical, OG URL, sitemap URL, robots sitemap and llms.txt link
pointed at the OFFICIAL domain (`gsitssolutions.com`). That told
search engines the official site was the canonical copy. Switched,
everywhere, to SELF-REFERENTIAL Leo-domain URLs
(`https://gradespot-leo-build-app.vercel.app`): `metadataBase` in
`layout.tsx`, `SITE_URL` in `src/lib/schema.ts`, sitemap base,
robots sitemap, all llms.txt links, every page's canonical + OG +
Twitter + hreflang (via `src/lib/metadata.ts` helpers and
`staticPageMetadata`). **Duplicate-content implication, stated
plainly:** the Leo build and gsitssolutions.com carry the same
content. Search engines will treat them as duplicates, and the
self-canonical now tells them to prefer the LEO build. If the
official site is meant to stay the primary property, this decision
must be reversed — it is Aravind's call, and it is the one decision
in this pass with an external consequence.

**Technical audit — before/after.**

| Area | Before | After |
|---|---|---|
| Canonical base | Official domain everywhere | Leo domain, self-referential, all 89 pages |
| Sitemap | 89 URLs, official base | 89 URLs, Leo base; `lastmod` still deliberately omitted — no real per-page dates exist in the data, and inventing dates is worse than omitting them |
| robots.txt | Wildcard allow + official sitemap | Wildcard allow + explicit allow for GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, anthropic-ai, Google-Extended, PerplexityBot, Applebot-Extended, Meta-ExternalAgent, Meta-ExternalFetcher + Leo sitemap. No standing rule against AI crawlers was found |
| Titles/descriptions | Home absolute title had no location term; trainings index title was bare "Trainings"; 11 static pages inherited the layout default description (duplicates) | Home: "IT Training Institute in Hyderabad, Dilsukhnagar \| GradeSpot IT Solutions"; trainings index: "IT Trainings in Hyderabad" + description prefixed "IT courses and trainings in Hyderabad:" with live count + categories; all 11 description-less static pages got distinct descriptions from published copy (about-us, certificate-verification, contact-us, faq, resources, services, student-certifications, team-members, terms-and-conditions, testimonials, why-choose-us) |
| H1 | Single H1 by construction (hero / PageHero) | Unchanged; crawl asserts exactly 1 H1 on all 89 pages |
| Broken links / orphans | None found (89/89 crawl, sitemap reconciliation) | Unchanged; breadcrumbs, related courses, hub→LP→course paths all resolve |
| Internal duplication | None (36 courses, 12 services, no true duplicates) | Unchanged; no routes removed, no new 301s |

### 25.22 AEO — answer-first summaries + FAQ expansion (2026-10-24)

New shared component `AnswerLead` (`src/components/ui.tsx`): a
visible "In short:" box at the top of a page, answer first, detail
after. Summaries are factual page copy only; anything unpublished is
answered "confirmed on enquiry", never invented. Word counts
measured from served HTML:

| Page | Words | Source of facts |
|---|---|---|
| Home (`#answer-summary`, + WebPage speakable) | 47 | Published copy + live course count (36) |
| Trainings index | 45 | Live count + real categories |
| Career support | 49 | Page subtitle + no-guarantee line |
| For institutes | 42 | Page subtitle + partner-page flow |
| For colleges | 40 | Page hero subtitle + enquiry form |
| Course pages (full, generated `src/lib/aeo.ts`) | CCNA 64, others ~45–65 | Title, harvested duration, published outcome, certification, top 3 job roles, free demo + batch-on-enquiry |
| Course pages (catalogue, generated) | 45 | Catalogue membership, online/offline, labs, enquiry |
| Compare pairs (verdict) | 43 | Verbatim focus sentences of both courses |

CCNA at 64 words runs slightly over the 40–60 target because its
outcome + certification + roles are all published and all belong in
the answer; the target is a guideline, not a cut that would drop a
fact. FAQ coverage expanded: `siteFaqs` grew from 3 to 9 Q&As
(online/offline, batch schedule, free demo, fees only where
published, certification preparation, no placement guarantee —
answers paraphrased only from already-published template language,
verbatim-consistent with page copy). FAQPage schema now also covers
the services index (it rendered `siteFaqs` with no schema — fixed)
and the local page gained 2 location Q&As (how to reach/visit, free
counselling). FAQPage exists ONLY where the Q&As render visibly:
home, /faq, services index, local page, course pages (generated +
published), LP pages, compare pairs. Trainings index renders no
FAQs, so it correctly carries none.

### 25.23 Zero-click formatting — question headings + snippet structures (2026-10-24)

Formatting/ordering only; meaning, claims and CTAs unchanged. Data
files untouched — the heading mapping happens at render time in
`trainings/[slug]/page.tsx` (`questionHeading`, prefix-matched so
variants map identically: "Course Overview - CCNA 200-301 Training"
and "Common Job Roles After CCNA" both map):

| Published heading | Rendered question |
|---|---|
| Course Overview* | What is {short}? |
| Course Curriculum / Our Curriculum | What does the {short} curriculum cover? |
| Key Learning* | What will you learn in {short}? |
| Program* Features | What does the {short} program include? |
| Common Job Roles* | What jobs can you get after {short}? |
| Our Pricing | What does {short} cost? (only where the pricing section exists) |
| Our Students works for. | Where do our students work? |
| About This Course (catalogue) | What is {short}? |

Unchanged (not genuine questions, or published wording kept):
"FAQ's", "Visit our Blog", "Get a Course Completion Certificate",
certification-exam headings, skills headings. Snippet structures
reused from existing content, not rebuilt: compare pages already
render real-data tables (topics, outcomes, durations, fees where
published, job roles); service pages already render `offerings` as
`<ul>`; register already has an `<ol>`; partner steps grid converted
to `<ol>` with identical card visuals (Talk → Understand → Pilot →
Decide is a genuine published sequence). Verified in served HTML:
home (answer paragraph under no heading — it IS the page answer,
referenced by speakable), one course (answer box + question H2s),
one compare page (answer box + table + FAQ schema), one LP (FAQ
schema + Course schema; LPs carry no AnswerLead — their 3-field form
and single CTA are the page, and the linked full course page carries
the answer). Content gaps (facts missing, left absent, NOT filled):
fees for 25 catalogue courses and most full courses (answered
"confirmed on enquiry"); durations for 28 of 36 courses (only 8 in
the harvested map); batch schedules everywhere (confirmed on
enquiry). These are Aravind's content to publish, not ours to invent.

### 25.24 Dynamic metadata on every page (2026-10-24)

Rule now enforced: EVERY route exports its own metadata — no page
inherits title/description/canonical/OG silently from the layout.
Dynamic routes via `src/lib/metadata.ts` (`coursePageMetadata`,
`lpPageMetadata`, `servicePageMetadata`, `comparisonPageMetadata`,
`articlePageMetadata`, `trainingsIndexMetadata`); static routes via
new `staticPageMetadata({ title, description, path, image })`.
Course descriptions append "Training in Dilsukhnagar, Hyderabad
with online and offline classes." ONLY when the summary does not
already mention Hyderabad. Language: `html lang="en"` (layout),
`og:locale="en_IN"` on every page (English content, India audience),
hreflang carries ONLY self-referencing `en` — no Telugu/Hindi
targets, because no alternate-language pages exist and inventing
them would be false. No pagination exists (catalogue search is
client-side), so no paginated-canonical edge case arises.

OG image audit (served HTML, all 89 pages): every page declares an
explicit `og:image` + `twitter:image`, absolute Leo-domain URL,
local file underneath. Content images: 53 pages (36 course images,
11 LP images, home hero, contact + local map image, student
certification photo, team + Nikhil profile photos). Documented
fallback (the catalogue flagship `ceh.jpg`, because the page
genuinely has no image of its own): 36 pages — 17 static pages
(about-us, accessibility, blog, career-support,
certificate-verification, compare index, faq, for-colleges,
for-institutes, partner-with-us, pricing, register, resources,
services index, terms-and-conditions, testimonials, why-choose-us),
12 service detail pages (services have no images in the data),
3 blog articles (articles have no images in the data), 3 compare
pairs, trainings index (catalogue index; flagship image is the
honest fallback). The layout-default image is no longer the SOURCE
for any page — each page's export names its image explicitly, even
where that image is the shared fallback.

Verification (production build, local crawl of all 89 sitemap URLs):
canonical present + self-referential on 89/89 (home canonical is
the bare Leo domain, no trailing slash — Next.js normalisation,
still self-referential); og:title + og:description + og:image
present + Leo-domain on 89/89; twitter card on 89/89; lang on 89/89;
og:locale + hreflang en self-ref on 89/89; H1 exactly 1 on 89/89;
zero canonicals/OG URLs pointing at the official domain. The one
caveat from the previous round stands: course/service OG tags are
crawler-facing only, not page-load assets.

### 25.25 Strict schema + entity disambiguation + local SEO (2026-10-24)

**One canonical entity.** `src/lib/schema.ts` rewritten. The
Organization entity (`@id`
`https://gradespot-leo-build-app.vercel.app/#organization`,
`@type: ["EducationalOrganization", "LocalBusiness"]`) is defined
ONCE, in the layout, on every page. All Course/Service/WebPage/
AboutPage nodes reference it by `{"@id": ORG_ID}` — never redefined.
The old `localBusinessSchema()` spread (a second, @id-less org
definition on the local page) is DELETED; the local page now carries
only breadcrumb + FAQPage. WebSite node added to the layout
(`#website`, publisher = org @id, `inLanguage: "en"`). AboutPage
added to /about-us (`mainEntity` = org @id). WebPage + speakable
added to home (`#answer-summary`) and every course page.

**Entity identity block (used identically in footer, contact page,
schema, llms.txt).** Name: "GradeSpot IT Solutions". Legal name:
"GradeSpot IT Solutions Pvt. Ltd.". @id: above. Phone: +91 91826
54056 (single, sitewide; retired numbers 88866 60597 / 76600 43217
never appear). Locality: Dilsukhnagar, Hyderabad, Telangana 500060.
Street address (published on contact page + footer, NOT invented):
"16-126, 2nd Floor, Near Sai Baba Temple, Road No.1, Sri Krishna
Nagar, Dilsukhnagar". NAP check: footer, contact page, schema and
llms.txt agree (all read the shared `business` data; footer shows
full name, Dilsukhnagar/Hyderabad, tel link). Name-variant audit:
short "GradeSpot" in body copy is natural readable usage and stays;
"GSITS" appears only in the domain/emails, which are the business's
own. `disambiguatingDescription` (verbatim): "GradeSpot IT
Solutions is the IT training institute and services company based
in Dilsukhnagar, Hyderabad, Telangana, India, founded and led by
Founder & Managing Director Nikhil Duth D. It runs classroom and
online IT trainings, corporate trainings, internships and IT
services from its Dilsukhnagar institute and online across India.
This entity is identified by its Dilsukhnagar, Hyderabad location,
its founder, and its training-and-services business." No other
entity is named, described or disparaged.

**sameAs — verification status.** Kept (business's own web
properties from repo data): gsitssolutions.com, digital.
gsitssolutions.com, digidefense.in — plus the LinkedIn company page
`in.linkedin.com/company/gradespot-it-solutions`, which the site
itself links in its footer as its own profile (found during this
pass's served-HTML check — the earlier "no social links in footer"
note was wrong; the footer does carry LinkedIn/YouTube icons).
Omitted as GAP for Aravind to confirm: a YouTube channel URL — the
only YouTube URL on record is a single video
(`watch?v=owhuBrGIOsE`), not a channel, and sameAs must not point
at a video. No other company's page is ever linked.

**Local SEO fields (verified facts only).** `geo`: 17.368784,
78.524652 — the Dilsukhnagar locality centre per Wikipedia
(17°22′08″N 78°31′29″E); the contact map centre (17.36878,
78.52409) sits in the same locality. This is locality-level, NOT a
surveyed premises pin — stated so crawlers and Aravind both read it
honestly. `areaServed`: ["Dilsukhnagar, Hyderabad, Telangana,
India", "India"] — in-person area plus India-wide for the real
online-classes offering; NO invented branches in other cities.
`hasMap`: the real Google Maps query link for the business address,
same as the contact page uses. `openingHoursSpecification`:
opens 08:00, closes 21:00 — the site's published hours (utility
strip + local page). Days are NOT published anywhere, so NO
dayOfWeek is asserted; that is a gap (see below). Location content
audit: home (eyebrow + title + description), trainings index
(title + description + Hyderabad LPs), local page (title, address,
hours, FAQs) all carry natural Hyderabad/Dilsukhnagar targeting
without stuffing; contact page map + address + phone + hours agree
with schema (verified in served HTML). Local FAQ: 8 Q&As on the
local page (location, hours, courses, online mode, fees, demo,
reach/visit, counselling), all rendered visibly, all schema-backed.
**Reviews: NO AggregateRating added.** The site carries 8 verbatim
Google testimonials, but no aggregate star value or rating count is
published anywhere on the site, and none can be derived from 8
testimonials — inventing one would be false. If Aravind publishes
a real Google rating, it can be added then.

**Per-type validation table** (mechanical: every block parses as
JSON; types/properties are real schema.org; org @id consistent):

| Type | Pages | Required/recommended present | Fixed in this pass |
|---|---|---|---|
| EducationalOrganization + LocalBusiness | 89 (layout, once each) | name, legalName, url, logo, email, telephone, address, geo, areaServed, hasMap, sameAs, disambiguatingDescription, description, openingHoursSpecification (times only) | Was org-only, official-domain URLs, unverified sameAs set, no geo/areaServed/hasMap/disambiguatingDescription; duplicate @id-less LocalBusiness on local page removed |
| WebSite | 89 (layout) | url, name, publisher (@id), inLanguage | NEW |
| WebPage (+ speakable) | 37 (home + 36 courses) | url, name, isPartOf (@id), about (@id), inLanguage, speakable → visible answer | NEW |
| AboutPage | 1 (about-us) | url, name, isPartOf (@id), about + mainEntity (@id) | NEW |
| Course | 47 (36 courses + 11 LPs) | name, url, description, provider (@id) | Provider was a redefined object → @id ref; added url; courseMode lowercased to ["online","onsite"]; offers gained url |
| Offer (inside Course) | Only courses with a published pricing section | price, priceCurrency INR, category, url | Unchanged rule — offers ONLY where a real "Plan — ₹Price" paragraph exists; no invented fees |
| Service | 12 | name, url, provider (@id), areaServed | Provider → @id ref; added url |
| BreadcrumbList | 61 | position, name, item (absolute Leo URL) | Base switched to Leo domain |
| FAQPage | 55 (home, faq, services, local, courses, LPs, compare pairs) | Question + acceptedAnswer, matching visible answers | NEW on services index; +2 local Q&As; siteFaqs 3 → 9 |
| ItemList | 1 (trainings index) | name, numberOfItems, ListItem name + url | Unchanged (already data-driven) |
| Article | 3 (blog articles) | — | Unchanged; NOT in this pass's scope beyond metadata (see §25.24) |

Omitted deliberately, with reason: SearchAction (site has no search
function to describe — a placeholder would be invalid);
AggregateRating (above); opening-hours days (unpublished);
`priceRange` (the old sentence value was not a price-range format;
per-course fees live in Course offers); foundingDate (unverified);
any Telugu/Hindi hreflang (no such pages exist).

### 25.26 Local SEO — GBP-ready checklist + manual steps (2026-10-24)

NOT done, deliberately — these need Aravind's own account and
verification, and no outward-facing submission was made: no Google
Business Profile creation, no directory/citation submissions, no
Search Console verification codes (none in hand, none invented).

**GBP-ready NAP block (paste-ready):** GradeSpot IT Solutions |
16-126, 2nd Floor, Near Sai Baba Temple, Road No.1, Sri Krishna
Nagar, Dilsukhnagar, Hyderabad, Telangana - 500060 | +91 91826
54056 | Hours 8:00 AM – 9:00 PM (confirm days first — see gaps) |
Website: the Leo build URL once deployed (or the official site —
Aravind's call, see §25.21). **Categories to choose from the real
services** (pick from Google's list, don't invent): computer
training school / training centre (core), plus education-adjacent
categories matching corporate training, internships and IT services
only. **Photos already local, ready to upload:** logo
(`/images/logo-light.png`, `/images/logo-dark.png`), institute map
(`/images/map-dilsukhnagar.jpg`), team photos
(`/images/team/*.jpg`), student certification photos
(`/images/certifications/*.jpg`), course images
(`/images/courses/*.jpg`). **Content gaps for Aravind (do not
guess):** (1) office-hours DAYS (hours published without days);
(2) YouTube channel URL (only a video URL on record); (3) LinkedIn
page ownership confirmation (footer-linked, but confirm it is the
business's own before leaning on it); (4) a real Google aggregate
rating, if one is to be published; (5) fees/durations/batch
schedules for the courses that lack them (§25.23); (6) ISO 9001:2015
+ AICTE claims confirm-or-remove (standing, §3); (7) whether the
official site or the Leo build is the primary property (§25.21 —
the canonical decision cuts one way or the other).

**Manual steps left for Aravind after deploy:** submit the Leo
sitemap (`/sitemap.xml`) in Google Search Console; claim/verify the
GBP listing with the NAP block above; confirm the LinkedIn + YouTube
items; publish any missing fees/durations. **Performance notes
(build-time indicators only, no Lighthouse from the sandbox — none
fabricated):** hero images already `priority` (home, course, LP);
all `@font-face` use `font-display: swap`; fonts self-hosted with
preloads; Next.js Image width/height present (CLS-safe by
construction); shared JS still 103 kB (no regression from this
pass); build passes; crawl 89/89 200. **Commit only, NO deploy, NOT
merged to main** — the parent redeploys from `leo-build-v1`.

### 25.27 SEO/AEO quick-wins batch — audit reconciliation (2026-10-24)

The 2026-10-24 SEO/AEO audit of the 3 GradeSpot sites predates commit
ac775a5. Every finding was re-verified against the current code and
served HTML before acting. Status key: already-done (in ac775a5),
done-now (this batch), blocked (missing fact, listed not filled).

| Audit item | Status | Evidence / reason |
|---|---|---|
| Homepage title "generic" | Already-done (stale) | Home title is "IT Training Institute in Hyderabad, Dilsukhnagar \| GradeSpot IT Solutions" since ac775a5; not replaced |
| robots.txt AI-crawler allow (GPTBot, PerplexityBot, ClaudeBot…) | Already-done | src/app/robots.ts lists 10 AI/search crawlers + wildcard allow |
| Self-referential canonicals (Leo domain) | Already-done | All 89 (now 90) routes; zero official-domain canonicals/OG URLs |
| Strict schema, one org @id, answer-first content, llms.txt | Already-done | §25.21–25.25; this batch only adds the upgrades in §25.30 |
| Mobile LCP 2.3s, "57 script tags", aim <400 KiB | Unverifiable as stated | No Lighthouse from the sandbox (none fabricated). Measured instead: home served HTML 72 `<script>` tags (audit undercounted), CCNA 64 — see §25.28. No LCP score is claimed |
| Security headers / nonce CSP | Done-now with fallback | §25.29 — nonce tested, then reverted to the strictest working CSP (see experiment) |
| Organization geo / telephone / hours | Already-done | Geo locality-level, tel +91 91826 54056, hours 08:00–21:00 without days (§25.25) |
| Organization priceRange | Blocked — no defensible range | Per-course fees exist for 2 courses only; a coarse "₹₹" guess was rejected, not added |
| Organization dayOfWeek | Blocked — days unpublished | Hours are published without days anywhere on the site |
| Organization sameAs (GBP/YouTube/Instagram) | Blocked — unverified | Kept set is only verified own properties + footer LinkedIn; YouTube URL on record is a single video, not a channel |
| Course offers | Already-done | Only CCNA + CCNP, from real "Plan — ₹Price" sections; no other fee invented |
| Course hasCourseInstance (online/onsite) | Already-done | Non-catalogue courses only; catalogue courses carry no per-course mode claim |
| Course courseSchedule | Blocked — no schedule exists | Batches are "confirmed on enquiry" (site FAQ) — that is not a schedule, omitted |
| Course educationalCredentialAwarded | Done-now | §25.30 — only where course-details names a certification (11 courses) |
| Person schema | Done-now | §25.30 — Nikhil Duth D profile page only, real facts only |
| Article author + datePublished | Already-done | Real authoring dates (2026-10-23) + "By the GradeSpot team"; this batch only links author/publisher to the org @id |
| Review / AggregateRating | Blocked — no verifiable aggregate | 8 testimonials carry no aggregate star value or count; none invented |
| OG fallback (36 pages share ceh.jpg) | Done-now | §25.31 — 37 generated cards (36 fallback + home) |
| /llms-full.txt 404 | Done-now | §25.32 — generated from repo data only, linked from llms.txt |
| Sitemap lastmod missing | Done-now | §25.33 — real git dates only, file-touch caveat stated |
| Testimonial/FAQ lazy-loading | Not done — would not help / would harm | Both are server components (ui.tsx has no "use client"); they add zero client JS, and FAQ content + FAQPage schema must stay server-rendered for crawlers. Lazy-loading them would hide FAQ content behind client JS for no JS saving |
| 301 map, domain pointing, noindex of Vercel domains, migration | Parked — untouched | Owner's word pending; no canonical/noindex state changed anywhere in this batch |
| Rebuild site, official WordPress site | Untouched | Separate repo / live site; no edits, no access attempted beyond the read-only public homepage fetch in §25.38 |
| New comparison/career/area/Telugu pages, Google/Bing/GBP/directory submissions | Not done, EXCEPT one owner-authorized exception | The second (Gemini) batch, authorized by the owner after this batch started, explicitly asked for a CEH vs PenTest+ compare page if both courses have real data (§25.36). That one page is the only new route created; no career/area/Telugu pages, no submissions |

### 25.28 Performance — measured, then improved (2026-10-24)

Baseline (production build at ac775a5, local server, before this
batch): shared First Load JS 103 kB (unchanged after this batch —
see verification); home served HTML 226,569 bytes with 72 `<script>`
tags; CCNA page 158,252 bytes with 64 `<script>` tags. Of the home's
72, only 8 are external JS files (Next runtime + page chunk); 1 is
the theme bootstrap inline script; 4 are JSON-LD data blocks; the
remaining ~59 are Next's inline RSC flight-data payload. The audit's
"57" was an undercount, and the inline count cannot be reduced
without breaking hydration — it is Next's rendering mechanism, not
app code. No Lighthouse score is reported (sandbox cannot run it).

Changes (design untouched, logo plate untouched):
- `next.config.ts` `images.formats = ["image/avif", "image/webp"]`:
  the image optimizer now serves AVIF to AVIF-capable browsers, WebP
  otherwise, from the same local JPEG sources (no external service).
  Verified: `/_next/image` for ceh.jpg returns `image/avif` on
  `Accept: image/avif` and `image/webp` (30,886 bytes at w=1080,
  down from the 46,551-byte JPEG at the same width) on
  `Accept: image/webp`.
- Home hero and course hero `Image` components gained
  `fetchPriority="high"` alongside their existing `priority` (which
  already emits a preload link). No other image changed; non-priority
  images keep Next's default lazy loading (verified in served HTML:
  below-fold images carry `loading="lazy"`).
- No script was removed and no widget lazy-loaded (§25.27 explains
  why). Page weight beyond the HTML above is therefore unchanged in
  structure; the real transfer win is the AVIF/WebP hero path.

### 25.29 Security headers — nonce CSP tested, fallback adopted (2026-10-24)

What was tried first: `src/middleware.ts` generating a per-request
nonce, passing it to Next via the request `content-security-policy`
header (Next 15.5 reads the nonce from that header and stamps its
own scripts) and enforcing it via the response header, with the
theme script as the only app inline script left to cover. Result,
measured on the local production server:
- Dynamic route `/register`: 24 `nonce=` attributes — Next stamped
  its scripts, nonce CSP enforced, page intact.
- Static home page: 0 `nonce=` attributes — prerendered HTML is
  served byte-for-byte from the build, so a nonce CSP would BLOCK
  the page's inline RSC payload and break hydration (forms, search,
  theme toggle, reveal) on all 89 static/SSG pages. Making every page
  dynamic just to carry a nonce would be a far bigger regression
  than the header gain.

Fallback adopted (the strictest CSP that keeps the site working, as
the brief allows): ONE headers approach, no duplicates — middleware
owns CSP + Cross-Origin-Resource-Policy, `next.config.ts` keeps only
the remaining static headers (HSTS, X-Content-Type-Options,
X-Frame-Options, Referrer-Policy, Permissions-Policy); the old CSP
entry was removed from `next.config.ts` so the two sources cannot
disagree. Final CSP: `default-src 'self'; script-src 'self'
'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self'
data: blob:; font-src 'self' data:; connect-src 'self';
frame-ancestors 'none'; base-uri 'self'; form-action 'self';
object-src 'none'; worker-src 'none'; manifest-src 'self'`, plus
`Cross-Origin-Resource-Policy: same-origin` on page/API responses
(middleware matcher excludes `_next/static`, `_next/image` and
favicon, which keep the next.config headers). Why each
`'unsafe-inline'` survives: script — Next's prerendered inline RSC
payload (see §25.28); style — React style attributes (widths,
`--reveal-delay`) and Next inline styles. `worker-src 'none'` and
`manifest-src 'self'` are safe additions (codebase uses no web
workers, ships no manifest). No Observatory grade is claimed — no
grade was measured from the sandbox. The nonce experiment is kept
on record: if pages ever become dynamic, the middleware nonce path
is proven for dynamic routes and can be re-enabled then.

### 25.30 Schema upgrades (2026-10-24)

All additions omit what is unverified; nothing below invents a fact.
- Course `educationalCredentialAwarded`: added in `courseSchema`
  from `course-details` certification, for the 11 full courses that
  name one (e.g. CCNA → "Cisco CCNA 200-301", PenTest+ →
  "CompTIA PenTest+ (PT0-002)", Hardware/Digital Marketing →
  "Course completion certificate"). Catalogue courses get none.
  `hasCourseInstance` (online/onsite) and `offers` (CCNA/CCNP only)
  unchanged; `courseSchedule` deliberately absent (§25.27).
- Person: new `personSchema()` in `src/lib/schema.ts`, rendered only
  on `/team-members/nikhil-duth-d` — name, jobTitle "Founder &
  Managing Director", published email, team photo, profile URL,
  `worksFor` = org @id, `knowsAbout` = the profile page's two
  published skill bars (SOC Analysis, Technical Trainer). No other
  member gets a Person node (no profile page, no published detail);
  no personal LinkedIn is linked (the site links only the company's
  LinkedIn page). The "9 Years" experience line is NOT in the schema
  (no fitting schema.org property was forced).
- Article: author + datePublished were already real (§25.27). This
  batch links author and publisher to the canonical org @id instead
  of redefining the organization, and adds `image` = the article's
  own generated OG card (articles have no content image in data).
- Organization: verified unchanged — geo locality-level, telephone,
  hours without days; `priceRange` and `dayOfWeek` still omitted for
  the reasons in §25.27; sameAs still the verified set only.
- Review/AggregateRating: still omitted (no verifiable aggregate).

### 25.31 OG images — per-page cards, generated locally (2026-10-24)

`scripts/generate-og-cards.py` (PIL + system DejaVu fonts, no
external image service, no hotlinking) draws 1200×630 JPEG cards —
warm paper background, deep-gold brand line, navy serif page title,
"Dilsukhnagar, Hyderabad · +91 91826 54056" footer — into
`public/images/og/`. 38 cards total: the 36 fallback pages from
§25.24 (17 static, trainings index, 12 services, 3 articles, 3
compare pairs) + the homepage (brand card, replacing the CEH photo
as its OG image) + the new CEH vs PenTest+ compare card (§25.36).
Total 1,727 KiB; cards are crawler/social-facing metadata only, not
`<img>` page weight, so they do not affect page load. Wiring in
`src/lib/metadata.ts`: `staticPageMetadata` maps the 17 static
fallback paths to their cards (explicit `image` still wins for
contact/local/team/certification pages, which keep real content
images); service/article/compare/trainings helpers derive their
card from the slug; home + layout defaults now use
`/images/og/home.jpg`. The old shared `ceh.jpg` survives only as a
last-resort fallback for a future route added without an image.
Verified in served HTML from the local production build (home, one
course, one fallback page, trainings index): `og:image` +
`twitter:image` are absolute Leo-domain URLs pointing at the
page's own card/content image, never at ceh.jpg for fallback pages.

### 25.32 /llms-full.txt (2026-10-24)

New `public/llms-full.txt` (32 KiB), generated by committed
`scripts/generate-llms-full.py` from the repo's data files only
(courses + durations map + course-details + services + articles +
site FAQs + per-course published FAQs). Contents, all counts
verified at generation: 36 trainings with category, summary, URL
and — only where published — duration (8 courses), certification
(11), fee plans (CCNA + CCNP only, 3 plans each); 12 services; 3
articles with authoring dates; 9 site-wide FAQs; 55 per-course
published FAQs. The file's header states the rule explicitly: a
missing fee/duration/certification/schedule is unpublished
(confirmed on enquiry), never guessed. Linked from `llms.txt`
("Full catalogue — llms-full.txt" line). Re-run the script after
any data change; it is deterministic and overwrites the file.

### 25.33 Sitemap lastmod — real git dates only (2026-10-24)

`src/app/sitemap.ts` now carries `lastmod` on every route, from
committed `scripts/sitemap-lastmod.py`: static routes = last commit
touching that route's `page.tsx`; dynamic routes = last commit
changing that slug's occurrence count in its data file (the slug
also appears in the course's image path, so the date is the last
touch of the entry or its image reference — still a real touch of
that route's source); LP routes = their course's date. All 89
pre-existing routes resolved to a real date (2026-10-23 for most
data-driven routes, 2026-10-24 for pages whose metadata the SEO
pass touched). CAVEAT, stated in code and here: these are
FILE-TOUCH dates, not a claim that visible content changed that
day. The new compare pair carries its creation date 2026-10-24,
noted at its entry. No route gets a date its history does not
support; a route with no history would get no lastmod at all.

### 25.34 Gemini audit — marquee duplication (fixed, 2026-10-24)

Claim verified: the ticker (`src/components/Ticker.tsx`, on home
and trainings index) rendered each featured title THREE times in
source — visible row, aria-hidden duplicate row (the seamless-loop
technique), and an `sr-only` paragraph joining all titles. Fix,
visible design unchanged: the `sr-only` paragraph was REMOVED —
the visible row already exposes the text once to assistive tech,
so the hidden copy doubled it. The second scrolling row keeps
`aria-hidden` (it is visual-only by construction). Honest
remainder: raw HTML still contains the aria-hidden duplicate (the
loop requires two rows); what changed is the ACCESSIBLE text is
now a single copy, and the duplicate is explicitly marked
visual-only. Verified in served HTML after the change: ticker
titles appear once in accessible text (visible row) plus the
aria-hidden row, and the ticker still renders (CSS animation,
track and both rows intact).

### 25.35 Gemini audit — Network+ copy + Hardware contamination (fixed + gap, 2026-10-24)

Claim verified, and worse than stated: the sentence "Gain
hands-on expertise in cybersecurity with our Practical Ethical
Hacking Training…" was the summary AND first-section paragraph of
TWO courses — CompTIA Network+ and Computer Hardware and
Networking — neither of which is an ethical hacking course. (The
CEH course's own ethical-hacking copy is legitimate and untouched.)
Fix, real data only: each course's two occurrences were replaced
with a sentence built verbatim from that course's own
`course-details` topics/certification — Network+: networking
topics (components/topologies, OSI/TCP-IP, IP addressing/routing,
WANs/wireless/cloud/datacenter) + CompTIA Network+ (N10-008 /
N10-009) certification; Hardware: hardware fundamentals,
networking essentials, hands-on practical labs, live classes +
course completion certification. Network+ is now fully clean
(its remaining sections were already genuine networking copy; the
contamination was exactly those 2 occurrences). Hardware GAP left
for the owner: its deeper sections still carry wrong-template
copy (headings "Cisco Certified Network Associate", "Common Job
Roles for Ethical Hacking", "Skills To Measure In CCNA 200-301")
that cannot be repaired from any repo source without inventing a
hardware curriculum — summary/first paragraph fixed, sections
flagged, not rewritten. The same sentence no longer occurs
in the repo data file anywhere except the CEH course's own content
(verified by grep: 3 occurrences, all CEH). DATA-LAYER CAVEAT (see
§25.39): the repo fix alone does not change the deployed pages while
the Supabase courses table still seeds the old copy — the two DB
rows must be updated (follow-up, not done in this batch).

### 25.36 Gemini audit — compare page + Certified Learners stat (2026-10-24)

Compare page: no "CEH vs CompTIA PenTest+" page existed (3 pairs:
CEH/Security+, CCNA/Network+, SOC/CEH). Both courses have full
real data (full sections, course-details, durations, images), so
the page was BUILT following the existing compare template with
no new template code: one entry added to `src/data/comparisons.ts`
(slug `ceh-vs-comptia-pentest-plus`; focus/choose sentences reuse
the CEH pair's published CEH sentences verbatim and PenTest+
sentences built from its course-details topics/outcome). The
compare index, sitemap, OG card (§25.31) and "Still deciding?"
course-page links all pick it up from the data automatically; its
table renders duration, level, certification, outcome and fees
(CCNA-style fees do not exist for either course, so both cells
correctly read "Confirmed on enquiry"). Route count is now 90.
Certified Learners stat: grep over `src/` finds NO rendered 1200
for certified learners — `src/data/site.ts` carries 1250 (the
owner's 2026-10-23 ruling) and the only other "1200" hits are a
`min-width:1200px` breakpoint and an image width, plus a code
comment recording that 1200 was the historically published
variant. Nothing to align on Leo; the comment stays as history.
NOTE (owner awareness, not a Leo fix): the live official homepage
still publishes "1200, Certified Learners" (verified by a
read-only public fetch during this batch) — the official site is
excluded from edits, so that cross-site difference stands until
the owner decides it.

### 25.37 Gemini audit — course page facts (added where real, gaps listed, 2026-10-24)

Course pages already rendered: title, summary, duration pill (8
courses), pricing sections (CCNA/CCNP only), job-role sections,
answer summary (outcome + certification sentence), demo/enquiry
forms. NOT rendered anywhere, though present in `course-details`
for 11 full courses: audience ("who"), level, certification and
topic lists. Added: a "Course facts" block on full course pages,
rendered only when a detail entry exists, showing Who it's for,
Level, Certification and Topics covered — all verbatim from
`course-details`. Everything else stays a gap, listed not filled:
batch timings (no schedule published anywhere — pages say
"confirmed on enquiry", correctly); syllabus PDF (no PDF exists
anywhere in the repo — no link added); placement details (no
placement percentages or guarantees published — the site
explicitly publishes roles + employer names and no guarantee);
fees for 34 courses and durations for 28 (unchanged from §25.23);
eligibility/topics for the 25 catalogue-only courses (no detail
entry exists for them).

### 25.38 Gemini audit — redirect-map prep, Core Web Vitals basics, free resource, verification, parked list (2026-10-24)

Redirect-map prep (prep only — no domain pointed, no canonical or
noindex state changed): the repo ALREADY contains the map this
item asks to build. `next.config.ts` `redirects()` holds 233
entries over 59 distinct legacy base paths to 33 Leo destinations,
and every one of the 59 carries its `/index.php/` variants (plain,
trailing-slash, and both `/index.php/` forms) — verified by
counting the config, not by assumption. The three plain forms
that look "missing" (`/team-members`, `/contact-us`, `/faq`) are
the live Leo routes themselves and must not be redirect sources.
No new redirects were added: the only new route (CEH vs PenTest+)
has no old equivalent, and the live sitemap could not be
re-checked from here — the public homepage fetch surfaced no
sitemap link and search surfaced no sitemap URL, and a sitemap
URL must not be guessed or exec-scraped under this batch's rules.
Follow-up for a live-browser pass (not done here): open the
official site's WordPress sitemap and diff it against these 59
paths; anything beyond them is the unmapped list. Unmapped from
the known set: none.
Core Web Vitals basics (folded into §25.28, no duplicate effort):
fonts are self-hosted via `@font-face` in `globals.css` (NOT
next/font) with `font-display: swap`, served from
`/fonts/*.woff2` with preload links in the layout; image
dimensions are present (Next `Image` width/height on every
image); below-fold images lazy-load by Next default
(`loading="lazy"` verified in served HTML), heroes are
`priority` + `fetchPriority="high"`.
Free resource — ASSESSMENT ONLY, nothing published: buildable
purely from existing published data — (a) a "Cybersecurity career
roadmap" from the 3 articles + course topics/outcomes/durations;
(b) a "comparison cheat sheet" from the 4 comparison tables; (c)
a "SOC analyst day-in-the-life" guide from article 3 + the SOC
syllabus topics. NOT buildable without invention: salary figures,
placement rates, batch calendars, glossaries of terms the site
never defines. Any of (a)–(c) still needs the owner's content
approval before publishing; no file was created for this item.
Verification (this batch, local production builds — full numbers
in the handoff report): `npm run build` passes; shared First Load
JS still 103 kB; crawl of all 90 sitemap routes returns 200;
served-HTML spot checks (home, CCNA, a fallback page, trainings
index, llms-full.txt, robots.txt) for canonical, OG image, schema
types and CSP + CORP headers; leads API path tested with an
invalid POST (400 validation, no row written); register form
renders. The Network+/Hardware copy fix was verified in a
Supabase-free build (§25.39): heroes show the new summaries and
the old sentence count is 0. In the default local build (Supabase
configured via .env.local) those two pages still serve the old
copy from the database — that is the §25.39 follow-up, not a repo
regression. Parked / excluded, untouched:
Leo→noindex flip (contradicts the owner's explicit rank-Leo
order); paid Vercel plan or self-host migration; any official
WordPress edit; GBP/directory submissions; moving the blog off
digidefense.in; rebuild-site fixes; migration/301-map execution
beyond the prep above; domain pointing. Commit only, NO deploy,
NOT merged to main — the parent redeploys from `leo-build-v1`.

### 25.39 Data-layer caveat — Supabase overrides repo course content (2026-10-24)

Found during verification, and it changes how this batch's
course-content fixes must be read. `src/lib/data.ts` reads courses
from Supabase first when configured and falls back to the repo
files only when the tables are absent or unreachable — and course
pages are prerendered at BUILD time, so a build run with Supabase
env vars bakes the DATABASE rows into the static HTML. The local
production server (`.env.local` configured) therefore served the
OLD Network+/Hardware summaries even after `src/data/courses.ts`
was fixed, because `supabase/migrations/0001_init.sql` seeds those
two rows with the old ethical-hacking copy (and the Hardware row's
wrong-template sections). Proof: a second build with the Supabase
env vars blanked renders the new summaries with old-sentence count
0 on both pages, while the Supabase-backed build renders the old
copy. Consequences, stated plainly: (1) the repo fixes in §25.35
are correct but will NOT surface on a Supabase-backed deployment
until the two courses rows in the Leo Supabase project are
updated (summary + first-section paragraph at minimum; the
Hardware row's deeper wrong sections need the owner's content
decision from §25.35) — that DB update was NOT done in this batch
(no DB writes, no secrets used, and the first batch's "no
migration step" scope was read as covering deployment/migration
actions); it is the single required follow-up before the copy fix
is live. (2) The same override applies to any future repo edit
to a course's title/summary/sections/image while the DB is the
read source — edits to those fields need a matching DB update, or
a deliberate switch of the read source. (3) Everything else in
this batch is unaffected: comparisons, articles, services
summaries, course-details facts, schema helpers, OG cards,
llms-full (generated from repo files — the repo is the source of
truth there, and it now diverges from the two DB rows until they
are updated), sitemap, headers and the ticker are all local-only
or metadata-only paths.

## §25.40 Compliance-and-claims pass (2026-10-25, branch feature/compliance-fixes)

Scoped pass against a pasted generic audit answer, following the owner's
standing rules instead of that answer: no invented facts, no spending, no
backend switch (Axon stays), both frontends kept, no merges/deploys, no
finished-looking legal text without supplied facts.

Claim sweep (grep for guarantee / 100% / assured-job / placement-guarantee
plus a broader promise-word pass). Changed, all rewordings minimal:
- courses.ts Digital Marketing summary + first paragraph: "land a job
  with a guaranteed success rate" → "prepare for a career in digital
  marketing" (both occurrences; the job-outcome promise was
  unsubstantiated).
- courses.ts CEH "Why Choose" list: "100% Practical-Oriented
  Learning" → "Practical-Oriented Learning" (percentage dropped).
- ui.tsx FeatureTrio: "100% Student Satisfaction" → "Student
  Satisfaction" (unsubstantiated percentage dropped; qualitative label
  kept, owner may ask for full removal).
- student-certifications page: "'Pay after you Pass' methodology
  guarantees the attainment of your desired credentials" → "is
  designed to help you attain your desired credentials" (guarantee
  verb removed; the methodology mention itself is untouched).
Kept deliberately: the honest disclaimers (pages.ts "We do not
guarantee job placements…", ui.tsx "Do you guarantee placements? —
No…", course-faqs "does not guarantee placement", career-support
"no placement guarantees") and all "placement assistance" service
descriptions (assistance is a service, not a promise). Course
learning-objective language ("you will have mastered…") was reviewed
and kept: it describes course content, not a job/certification
outcome. Re-grep after the edits: zero remaining guarantee / 100%
hits outside the disclaimers.

Vendor / partner names and logos:
- No vendor logos exist in the repo (no Cisco / CompTIA / EC-Council /
  Microsoft logo files). Vendor names appear only as course and
  certification titles and syllabus references (CCNA, CompTIA
  Security+, CEH, Microsoft SC-200/SC-900, Azure), including the
  already-neutral "aligned to…" phrasing in articles.ts. Nothing
  removed, nothing re-labeled: no partnership or endorsement is
  claimed for any cert vendor, and no "official partner" /
  "authorized" claim exists anywhere.
- Employer logo wall (10 logos) kept: it is framed as alumni
  employment ("Our Students works with — Our students have been
  employed by some of the top companies"), NOT as a partnership.
  The underlying alumni-employment claim itself is the owner's to
  confirm, like ISO/AICTE below.
- ISO + AICTE emblem cards: UNTOUCHED per the owner's confirm-or-
  remove call. Flagged: they still need his proof before anyone
  claims them as verified.

Policy drafts (NOT finished legal text):
- New routes /privacy-policy and /refund-policy, each with a
  prominent DRAFT banner, a "do not treat as a published policy"
  notice, structured sections, and every fact slot as a visible
  TODO. Footer links + sitemap entries added following the existing
  conventions (footer link arrays; sitemap staticPaths + LASTMOD
  with the 2026-10-25 creation date, per the sitemap's own rule for
  routes without history). Facts the owner must supply are listed on
  each page's closing panel: legal entity name, registered address,
  CIN, contact email, complete data list, purposes, third parties,
  transfer safeguards, retention, rights process, grievance officer,
  refund scope/eligibility/timelines/process/mode/deductions.
- The one asserted technical fact in the privacy draft is the
  audit-verified one: the site runs no analytics or advertising
  trackers and sets no third-party cookies itself.

Tracker / cookie audit: zero hotlinks (all assets local). External
URLs in src/ are only canonical/social/contact links, wa.me, Google
Maps, OpenStreetMap attribution, schema.org, YouTube links, and
digidefense.in blog attribution. No analytics, no <Script> tags,
no third-party cookies. The only dangerouslySetInnerHTML usages are
the static JsonLd schema and the theme bootstrap script (both
previously audited as static/trusted). No analytics added.

Security headers: unchanged (CSP via proxy + CORP + nosniff/DENY/
HSTS). Verified on localhost after these changes: the home response
carries the full CSP (proxy active in build output); CORP/nosniff/
DENY/HSTS config untouched since the audit-fix verification.

Accessibility: skip link ("Skip to content", Header.tsx) intact;
:focus-visible is a visible 2px brand outline with 2px offset (dark:
signal color), intact; form inputs are labeled (LeadForm labels for
name/phone/email/interest/message/country). Token-pair contrast
(computed, not browser-measured): light body 7.80:1, heading
16.10:1, brand 5.56:1, brand-dark 6.78:1, body-on-cream 7.03:1; dark
body 9.28:1, heading 16.69:1, signal 7.70:1 — all pass WCAG 2.2 AA
(4.5:1) for normal text. No redesign, logo plate untouched.

Partner page: /partner-with-us has a form (LeadForm). Added an
OPTIONAL "Country (optional)" field behind a showCountry prop,
passed only by the partner page; no required-validation change, no
other copy change. Honest limitation, stated on the code: the value
travels with the payload but is NOT stored — validateLead ignores
unknown fields by design and the leads table has no country column.
Persisting it needs a DB migration + a createLead change (not done:
DDL is out of this branch's scope).

NOT done (needs the owner's word): course-finder quiz, live batch
calendar, Open Badges verifiable certificates, partner portal,
any backend switch (Axon stays), archiving either frontend, any
spending or hosting move, DB updates. Related deployment caveat:
course pages prerender from Supabase rows when env is configured,
so the courses.ts claim rewordings above will NOT surface on a
Supabase-backed deployment until the matching DB rows are updated
(see the §25.39-era note on DB override) — no DB writes were made
in this branch.

## Compliance finish (on feature/compliance-fixes, after 68d6740)

SOC "hiring partners" phrase (courses.ts, SOC Analyst long description):
"Get connected with hiring partners and job placement assistance."
reworded to "Get guidance on connecting with employers, plus job
placement assistance." — neutral wording implying no partnership.
No other "hiring partners" hit exists in src/.

Partner country, code side only (no DB change): LeadPayload and
LeadInput gained an optional `country` (free text, max 100 chars);
validateLead accepts it via validateCountry (absent/empty = fine);
createLead includes it in the full leads insert. The value persists
ONLY once the leads.country column exists (migration pending,
applied separately — do not deploy expecting country to be stored
until then; until then the full insert fails and the core-column
retry stores the lead without country). LeadForm comments updated
to match; no POST test was run with country, per the no-DB-change
scope (verification is build + page render only).

Policy published facts filled (drafts stay drafts): privacy
"Who we are" now states the published contact details — business
name GradeSpot IT Solutions, info@gsitssolutions.com,
+91 91826 54056, and the published full street address 16-126,
2nd Floor, Near Sai Baba Temple, Road No.1, Sri Krishna Nagar,
Dilsukhnagar, Hyderabad, Telangana - 500060 (replacing the partial
Dilsukhnagar location). Privacy "Sharing" now states the observed
processors: Supabase (data storage) and Vercel (web hosting).
Still TODO, not invented: CIN, registered-address confirmation,
grievance officer name/email, refund terms/eligibility/timelines,
retention periods, rights-request timelines, and whether any data
leaves India. The no-trackers statement is untouched (still
audit-verified). Refund contact email filled as
info@gsitssolutions.com (request + questions sections).

Font check: zero Google Fonts references in src/ — layout and
globals reference only self-hosted /fonts/*.woff2 files (Fraunces,
Instrument Sans, IBM Plex Mono); no googleapis/gstatic string
anywhere in src/. No change made.

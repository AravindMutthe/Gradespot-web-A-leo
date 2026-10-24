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

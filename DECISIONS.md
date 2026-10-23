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

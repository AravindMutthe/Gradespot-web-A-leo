# Canonical Content Decision Register (2026-10-28)

## Purpose

One shared register for the official website (WordPress,
https://gsitssolutions.com) and Leo — created after Das's review of
the official-sitemap understanding (2026-10-27). It records disputed
content items in one place so the same unresolved question is not
re-litigated separately across WordPress, Leo, Axon, and future
administration interfaces.

## What this register is NOT

- It does NOT connect the WordPress and Leo databases.
- It does NOT merge the WordPress and Leo repositories.
- It does NOT authorise any change: no WordPress edit, deletion,
  redirect, or unpublish; no live Supabase write; no merge; no
  production deployment; no payment integration; no paid
  infrastructure; no new public claim.
- Every row below is **PENDING** until a GradeSpot content-owner
  decision is recorded in it. Silence is not a decision. A row with
  no decision is not approval of either side's current wording.

## Columns

Each row records: current official-site claim; Leo's current
representation; evidence pointer; decision needed; approver;
affected URLs; implementation status.

Evidence pointers:
- SITEMAP = `docs/frontend-v2/OFFICIAL-SITEMAP-UNDERSTANDING-2026-10-27.md`
  (516 lines, 33 URLs, 18 contradictions, 16 open questions).
- DRIFT = `docs/frontend-v2/CATALOGUE-DRIFT-REPORT-2026-10-27.md`
  (MATCH 10 / CHANGED 26 / ADDED 0 / REMOVED 0; register empty at
  that run, so all divergences were unapproved).
- CONTRACT = `docs/frontend-v2/CATALOGUE-CONTRACT-V1.md` (v1.0.1)
  and `CATALOGUE-STATUS-DECISION-TABLE.md` (25 rows, all blank).

## Rows

### R1 — CCNA duration

- Official-site claim: the CCNA page itself states 45-day AND 90-day
  AND 45 hours (SITEMAP § contradictions; the conflict originates on
  the official site).
- Leo's current representation: repo text 45-day; live DB row 90-day
  (DRIFT: `ccna-200-301` sections diverge; live previews render the
  DB value because DB rows win at SSG build).
- Evidence: SITEMAP, DRIFT (CCNA sections[4] and sections[9]).
- Decision needed: confirm the actual current approved duration.
- Approver: GradeSpot content owner (owner).
- Affected URLs: official CCNA page; `/trainings/ccna-200-301`.
- Interim rule: **do not promote conflicting duration claims.**
- Status: PENDING.

### R2 — CCNP text

- Official-site claim: CCNP page carries CCNA copy under a CCNP
  title (SITEMAP; Leo inherited the defect).
- Leo's current representation: repo and DB agree exactly and both
  carry the CCNA copy (DRIFT: diff MATCH, content NOT VERIFIED).
- Evidence: SITEMAP, DRIFT (CCNP defect note).
- Decision needed: supply genuine CCNP ENCOR text (Course Overview,
  Key Learning/Objectives, Program Features, correct job roles), or
  approve a partial presentation (remove misattributed paragraphs,
  mark the page partial / under review).
- Approver: GradeSpot content owner (owner).
- Affected URLs: official CCNP page; `/trainings/ccnp-350-401-encor`.
- Interim rule: **no copied CCNA syllabus; do not paraphrase the
  incorrect material.**
- Status: PENDING.

### R3 — SOC offers and canonical URL

- Official-site claim: SOC lives at 4 URLs with 2 offers (internship
  certificate vs free C|SA voucher); CEH page mixes a C|SA offer that
  says C|EH and a "45-day SOC" line (SITEMAP).
- Leo's current representation: one SOC Analyst course page;
  catalog-only treatment is not the issue here — the offer itself is
  unpublished in Leo.
- Evidence: SITEMAP.
- Decision needed: identify the canonical SOC course and confirm
  the current offer and canonical URL.
- Approver: GradeSpot content owner (owner).
- Affected URLs: 4 official SOC URLs; `/trainings/soc-analyst`.
- Interim rule: **do not advertise either offer as confirmed.**
- Status: PENDING.

### R4 — Digital Marketing curriculum and guarantee

- Official-site claim: DM page carries an Azure curriculum under DM
  headings and a "guaranteed success rate" job promise (SITEMAP).
- Leo's current representation: DM is a full course in Leo with its
  own published sections; the Azure curriculum and the guarantee
  are NOT carried into Leo.
- Evidence: SITEMAP.
- Decision needed: supply the authentic DM curriculum; confirm or
  withdraw the guarantee claim (withdrawal is the expected outcome
  unless GradeSpot can substantiate it — the register records the
  decision, it does not presume it).
- Approver: GradeSpot content owner (owner).
- Affected URLs: official DM page; `/trainings/digital-marketing`.
- Interim rule: **quarantine the incorrect curriculum and the
  unsupported guarantee — neither is published as GradeSpot fact.**
- Status: PENDING.

### R5 — Hardware curriculum

- Official-site claim: hardware page is entirely
  ethical-hacking/CCNA/Azure content under a hardware title (SITEMAP).
- Leo's current representation: computer-hardware-and-networking is
  a full course in Leo; one of its published section sets is itself
  misattributed (CCNA headings on a hardware page — pre-existing
  catalogue defect, DRIFT context).
- Evidence: SITEMAP.
- Decision needed: supply the authentic hardware curriculum.
- Approver: GradeSpot content owner (owner).
- Affected URLs: official hardware page;
  `/trainings/computer-hardware-and-networking`.
- Interim rule: **no invented hardware curriculum; the defect stays
  labelled, not silently fixed.**
- Status: PENDING.

### R6 — Security+ / Network+ empty curricula

- Official-site claim: both pages title "30 Days" while stating
  60 hrs (Security+) and 75 hrs (Network+), and both have EMPTY
  "Course Curriculum" sections (SITEMAP). PenTest+, AZ-900, AZ-104
  have genuine, detailed curricula by contrast.
- Leo's current representation: both are full courses in Leo with
  their published sections as-is; no curriculum is invented for
  them.
- Evidence: SITEMAP.
- Decision needed: supply real curricula, or confirm the pages stay
  without a curriculum section (with the duration/title mismatch
  resolved as part of the same decision).
- Approver: GradeSpot content owner (owner).
- Affected URLs: official Security+ / Network+ pages;
  `/trainings/comptia-security-plus`,
  `/trainings/comptia-network-plus`.
- Interim rule: **preserve verified content only; do not invent
  missing modules.**
- Status: PENDING.

### R7 — ISO / AICTE proof and permitted wording

- Official-site claim: ISO and AICTE emblems/cards are published on
  the official site; proof was not found in Drive/Gmail searches
  (2026-10-25).
- Leo's current representation: emblem files exist in the repo and
  the site-settings toggles for ISO/AICTE are OFF by default; no
  verified claim is published.
- Evidence: SITEMAP (claims inventory); Leo `src/data/site-settings.ts`.
- Decision needed: provide evidence and the permitted wording, or
  confirm the emblems stay unpublished.
- Approver: GradeSpot content owner (owner).
- Affected URLs: official site emblem placements; Leo emblem cards.
- Interim rule: **no credential claims.**
- Status: PENDING.

### R8 — "Pay after you Pass" terms (exam-support)

- Official-site claim: exam-support page offers "Pay after you
  Pass" (SITEMAP); no terms are published alongside it in the
  sitemap record.
- Leo's current representation: no Leo counterpart page; nothing
  about this offer is published in Leo.
- Evidence: SITEMAP.
- Decision needed: confirm eligibility, conditions, and legal
  review before any Leo page or mention is created.
- Approver: GradeSpot content owner (owner) + lawyer review for
  terms.
- Affected URLs: official exam-support page; no Leo URL yet.
- Interim rule: **do not advertise.**
- Status: PENDING.

### R9 — Service descriptions

- Official-site claim: all 12 official service descriptions are
  identical template filler (SITEMAP) — no real service copy exists
  to carry over.
- Leo's current representation: 12 services grouped into 7 revenue
  divisions (Leo additions, not official); divisions carry outcome
  lines and "Coming soon — ask us" where no published offering
  exists; no price, timeline, or deliverable promise per division.
- Evidence: SITEMAP; Leo `src/data/revenue-divisions.ts`.
- Decision needed: approve original service-specific copy per
  division (outcome, audience, engagement mode, consultation
  free/paid — or explicitly defer each).
- Approver: GradeSpot content owner (owner).
- Affected URLs: official services pages; `/services` and
  `/services/[slug]`.
- Interim rule: **no generic filler presented as verified
  capabilities.**
- Status: PENDING.

### R10 — Per-logo permission (STILL OPEN)

- Official-site claim: two different employer walls (10-logo vs
  6-logo set) under the same "Our Students works for" claim
  (SITEMAP); certifications page titles "100+" vs ~30 images shown.
- Leo's current representation: 10 employer logo files exist in the
  repo; the employer wall is OFF by default (unverified placement
  claim); no vendor marks exist in the repo; vendor names appear as
  text only.
- Evidence: SITEMAP; Leo `src/data/site-settings.ts`,
  `docs/frontend-v2/SAFE-ASSETS-2026-10-27.md`.
- Decision needed: for EACH logo — organisation name, exact
  relationship, and permission/evidence. This row was NOT addressed
  by Das's sitemap review (no logo-permission row or statement in
  his reply); it must not be treated as answered by that review.
- Approver: owner (per logo).
- Affected URLs: official employer-wall placements; Leo employer
  wall (currently OFF).
- Interim rule: **no employer/vendor logo is published as a
  partner, client, or employer claim without per-logo permission;
  the wall stays OFF.**
- Status: PENDING — explicitly open.

### R11 — WordPress cleanup (dummy / demo / anomaly URLs)

- Official-site claim: sitemap indexes a dummy theme page, an
  unrelated ethnic-wear page under a SOC title, 8 home-version theme
  demos (lastmod 2024-01-23), and 3 extra SOC SEO URLs (SITEMAP).
- Leo's current representation: no counterpart pages; Leo does not
  link to these URLs.
- Evidence: SITEMAP (33-URL appendix).
- Decision needed: a separate, read-only cleanup proposal covering
  anomalous pages, demos, duplicate SOC URLs, internal links,
  redirects, canonical tags, and sitemap inclusion — prepared
  first, approved second, executed only on owner approval.
- Approver: owner.
- Affected URLs: dummy page, ethnic-wear/SOC-title page, 8
  home-version demos, 3 extra SOC URLs.
- Interim rule: **do not simply delete unwanted URLs.** First
  determine whether they receive traffic, have inbound links, or
  serve a business purpose. Approved replacements use appropriate
  redirects; pages that genuinely should disappear get an
  intentional HTTP and indexing outcome. Excluding a page from the
  XML sitemap is a different control from making it inaccessible
  or removing it from search results.
- Status: PENDING (proposal not yet written).

## Governance

- One row is closed only when: the decision is recorded here with
  the approver named, the affected pages are updated from the
  decision (not from either site's old wording), and the update is
  verified on preview before any production step.
- An expired or unreconciled row reverts to PENDING; it never
  becomes a permanent exception.
- This register strengthens the catalogue-release gate; it does not
  replace it. The catalogue gate (CCNA row, CCNP defect, 25
  divergences, migration 0006 unapplied) remains independently
  BLOCKED.
- The owner retains final authority and may overrule any
  recommendation recorded here.

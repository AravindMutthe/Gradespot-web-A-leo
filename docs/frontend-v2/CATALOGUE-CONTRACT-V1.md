# Courses / Catalogue Contract — Version 1.0.1 (amended 2026-10-27, Das B1 refinements)

**Status:** DESIGN ONLY. This document is a contract proposal for Phase 3A B1.
It does not change any live route, any Supabase row, or any published page.
No Axon server, admin UI, auth, payment, or live DB write is built by this
document. The matching draft migration
(`supabase/migrations/0006_catalogue_contract_fields.sql`) is DRAFT ONLY
and has NOT been applied.

**Version note — why 1.0.1, not a silent v1.0.0 rewrite:** v1.0.0 (2026-10-27)
is preserved as the initial version; the amendments below change a field
definition (`program_status` is nullable during migration, not
`NOT NULL DEFAULT 'Available'`), add normative governance sections (the
§4.1 diff specification and the §6.0 two-approval gate), and replace the
catalog-only backfill proposal with a blank GradeSpot decision table. That
is more than a documentation wording fix (so not a PATCH-only edit to
v1.0.0), but it removes no field, renames no slug, adds no category, and
publishes no price — so it is not a MAJOR version either. Hence v1.0.1:
an amendment, with every change listed in §7 (A1–A5), and the v1.0.0 text
superseded only by those listed amendments. Readers of v1.0.0 must treat
v1.0.1 as the current version; nothing in v1.0.1 retroactively rewrites
what v1.0.0 said at the time it was shared.

**Scope:** the public course catalogue only — the 36 courses in
`src/data/courses.ts` (11 full-detail, 25 catalog-only) as read by
`src/lib/data.ts` (`getCourses` / `getCourse`). Services, leads, verification,
team profiles, and site-settings are separate contracts and are NOT covered
here (they follow in Phase 3A B1 order: services → leads/CRM → verification →
team → site-settings).

**Evidence base (read, not assumed):**
- Current DB table (`supabase/migrations/0001_init.sql`, `public.courses`):
  `slug, title, category, image, summary, sections (jsonb), catalog_only`,
  plus `id, created_at`. Public read via anon key + RLS.
- Current local type (`src/data/courses.ts`, `Course`): the same fields plus
  `duration?` — but duration does NOT live in the DB. It lives only in the
  harvested local map `courseDurations` (e.g. `"ccna-200-301": "45 days"`,
  `"comptia-pentest-plus": "60 hours"`, `"soc-analyst": "90 days"`).
  `src/lib/data.ts` merges that map onto DB rows at read time.
- Gap analysis finding G-1 (`docs/frontend-v2/GAP-ANALYSIS.md`): the DB row
  wins silently at SSG build time (`src/lib/data.ts` queries Supabase first;
  local data is only the fallback). The local CCNA clean-up in `e1785fa`
  (90-day → 45-day, 19 ethical-hacking/SOC items removed) is therefore
  correct but live-ineffective until the Supabase `ccna-200-301` row is
  updated through an approved channel. The CCNP row
  (`ccnp-350-401-encor`) still carries a copy-pasted CCNA paragraph
  ("Our 90-day CCNA 200-301 Training…") against its own 45-day duration
  entry — changing the number would not fix the misattribution.
- SPEC §§4, 9, 12: levels Foundation / Professional / Advanced-Specialist;
  `demo_policy = none | free_intro | scheduled_demo | paid_orientation |
  consultation_only`; program status mandatory; filters by category, level,
  mode, duration, prerequisites, certification alignment, price visibility,
  lab availability; public curriculum preview with protected material behind
  paid enrollment entitlement (entitlement itself is NOT built here).
- Standing rules carried into this contract: zero budget; hosting/infra
  free-tier only until a cost is genuinely mandatory (e.g. domain renewal)
  — that exception authorises no payment now. Business services being paid
  is deferred/gated (pricing Set A vs Set B undecided, Razorpay stage not
  opened, no published price, no payment path) — not excluded, not built
  now. No invented prices, stats, syllabus, ratings, placement claims,
  trainers, dates, or entity/CIN/GST facts. No Atlas content is copied
  into Leo; Atlas integration, if it ever happens, is a separate,
  future-only, deep-link/API contract.

---

## 1. Field list — one course

Every field states WHY it exists. A field with no consumer (no page, filter,
or admin surface that will read it in Phase 3A or Release 2) does not belong
in v1. `null` means "not stated / not yet verified" — it must NEVER be
rendered as a promise, a price, a duration, or a level.

### 1a. Identity and publication (already exist — contract locks their rules)

| Field | Type | Required | Rule / why |
|---|---|---|---|
| `slug` | `text`, kebab-case, unique | yes | URL identity (`/trainings/{slug}`). **Immutable after first publication.** A rename is a new slug plus a redirect record — never a silent rename, because old links, sitemaps, and `llms-full.txt` entries point at the old slug. |
| `title` | `text` | yes | Published course title, verbatim from GradeSpot material. Never rewritten for SEO without GradeSpot approval. |
| `category` | `text` | yes | Catalogue category as rendered by `catalogue-nav.ts`. New categories are added only by a contract amendment (a new category changes navigation, filters, and sitemap), not by free-text typing in a row. |
| `image` | `text \| null` | no | Local path ONLY (`/images/courses/…`). No hotlinked image, ever. `null` = no image; the page renders without one rather than substituting a stock image and implying it is a GradeSpot photo. |
| `image_alt` | `text \| null` | required when `image` is set | Alt text for the image. A generic course image must NOT be alt-texted as a GradeSpot classroom, student, or trainer. |
| `summary` | `text` | yes for full courses; `""` allowed for catalog-only | Published summary, verbatim. Catalog-only courses carry `""` — no summary is invented for them. |
| `sections` | `jsonb` array of `{heading: string, paragraphs: string[], style?: "cards" \| "pricing" \| "faq"}` | yes for full courses; `[]` for catalog-only | Published detail-page content. The `style: "pricing"` variant renders legacy harvested "Name — ₹Price" paragraphs; it is NOT a structured price and must NOT be converted into a structured price without verification (see §1c). |
| `catalog_only` | `boolean` | yes, default `false` | `true` = listed in the catalogue without a published detail page. Catalog-only courses render "Course outline — not yet published", never invented modules. |
| `is_published` | `boolean` | yes, default `true` for existing slugs | Draft rows (`false`) never render on any public page, in search, or in sitemaps. This is the only visibility switch; it is separate from `program_status` (a published course can be Planned/Waitlist). |

### 1b. New contract fields (the gap this contract closes)

| Field | Type | Required in v1 | Rule / why |
|---|---|---|---|
| `duration_text` | `text \| null` | nullable during backfill; required before a course leaves backfill | The published duration string, verbatim, in its original unit ("45 days", "60 hours", "90 days"). Mixed units are preserved, not normalised, because normalising would invent comparability the source does not state. `null` = duration not published; the page shows no duration rather than a guessed one. Replaces the local-only `courseDurations` map as the single home for durations (see §3 for the migration path). |
| `duration_value` + `duration_unit` | `integer \| null` + `'days' \| 'hours' \| null` | optional, only when they parse cleanly from `duration_text` | Filter/sort helpers ONLY. They are derived from `duration_text`, never authored independently, and a course whose duration does not parse cleanly keeps both `null` — filtering simply skips it. |
| `level` | `'Foundation' \| 'Professional' \| 'Advanced-Specialist' \| null` | nullable during backfill | SPEC §4 level taxonomy. `null` = unclassified. It must NEVER default to Foundation: defaulting would misclassify advanced courses as beginner courses and mislead career starters. Level tags/filters (Release 2) read this field and nothing else. |
| `demo_policy` | `'none' \| 'free_intro' \| 'scheduled_demo' \| 'paid_orientation' \| 'consultation_only' \| null` | nullable during backfill | SPEC §4 per-program demo policy. `null` renders as "Ask about a demo" (an enquiry), NEVER as a free-demo promise and NEVER as a paid-demo price. `free_intro` means a free introductory session is actually offered for that program; `paid_orientation` is a policy label only — it carries no price in this contract (see §1c). |
| `program_status` | `'Available' \| 'Planned' \| 'Waitlist' \| 'Not Offered' \| null` | **nullable during migration; required (non-null) only after the §3.3 decision is recorded** | The single status a visitor sees. `Available` = enquiries open for this program. `Planned` = listed, not yet open. `Waitlist` = enquiries join a waitlist, nothing is sold. `Not Offered` = listed for reference only, no enquiry CTA for enrollment (a contact enquiry is still allowed). **`null` = PENDING — no GradeSpot status decision recorded yet. A null status must NEVER render as Available, Planned, or any other status, and must render no enrollment CTA; it renders at most "status to be confirmed" / a contact enquiry.** This nullability is amendment A1 (Das B1 refinement 1): a migration default of `'Available'` would imply a program is offered before GradeSpot confirms it. The column therefore starts nullable with NO default, and only the §3.3 backfill — after the two-approval gate (§6.0) and the decision table — may set a non-null value. A status change is a content decision with a review trail (§4), not a silent row edit. |
| `price_visibility` | `'hidden' \| 'confirmed_on_enquiry' \| 'fixed' \| 'starting_at' \| 'custom_quote'` | yes, default `'confirmed_on_enquiry'` for existing courses | WHY this field exists: it lets the site be honest about price without publishing one. `'hidden'` = no price mention at all. `'confirmed_on_enquiry'` is the default and the first-class honest value — the page says the price is confirmed on enquiry and shows no number. `'fixed'` / `'starting_at'` / `'custom_quote'` are FORWARD-ONLY: they may be used only after a pricing decision is recorded AND the amount (where applicable) is verified. See §1c. |
| `price_amount` + `price_currency` | `numeric \| null` + `text \| null` (currency always `'INR'` when an amount is set, until a multi-currency decision is recorded) | only with `fixed` / `starting_at` | Rendered ONLY when `price_visibility` is `fixed` or `starting_at` AND an amount is present. In every other combination the amount is ignored by readers and must not render. No amount is backfilled from legacy section text. |
| `certification_alignment` | `text[] \| null` | no | Vendor exam codes / certification names the course trains toward, ONLY where the published title or sections state them (e.g. a CCNA course may list `CCNA 200-301`). Never inferred from a category, never a guarantee of certification — certification is awarded by the vendor, not by this site, and every page that lists an alignment must keep that qualification. |
| `prerequisites` | `text[] \| null` | no | Published prerequisites, verbatim. `null` = none stated. Never invented from the level (e.g. an Advanced-Specialist course does not automatically gain prerequisites). |
| `mode` | `('online' \| 'offline' \| 'hybrid')[] \| null` | no | Delivery modes actually offered for that program. `null` = mode not stated. Never defaulted to online/offline. |
| `source_provenance` | `jsonb` `{source, source_detail, last_reviewed_at, reviewed_by_role}` | yes for new/changed rows; backfilled as below | WHY: this is the audit trail that makes §4 enforceable. `source` ∈ `live-site-crawl-2026-10-23 \| gradespot-provided \| repo-authored`. `reviewed_by_role` is a ROLE (`content-editor`, `content-approver`, `owner`), never a personal name in a public field. Rows whose provenance is still the 2026-10-23 crawl are marked as such — crawl-harvested copy is not GradeSpot-verified copy, and the CCNA/CCNP defects are exactly what happens when that distinction is lost. |

### 1c. Price rules (the part of this contract most likely to be misread)

1. **No price is published by this contract.** v1 adds the *fields* for price
   visibility; it does not add a single price. The default
   (`confirmed_on_enquiry`, no amount) is the honest state for every existing
   course until a pricing decision is recorded.
2. **Legacy `style: "pricing"` sections are NOT structured prices.** The
   harvested CCNA/CCNP-style sections that render "Name — ₹Price" paragraphs
   stay as legacy copy until GradeSpot verifies each figure. A future
   migration that converts them into `price_amount` values requires a
   per-figure verification list — it is explicitly OUT of v1.
3. **Published CCNA/CCNP fees on existing pages are untouched by v1.**
   Whatever those pages currently render stays as-is until the pricing
   decision and the DB-vs-local reconciliation (§5) are complete. v1 neither
   endorses nor removes them; it only stops new prices from appearing
   without a decision.
4. **Business services being paid is deferred/gated, not excluded.**
   (Owner correction, 2026-10-27: "no paid services" meant no paid
   *hosting/infra*, not no paid business.) A future pricing decision can
   therefore use `fixed` / `starting_at` / `custom_quote` — but only through
   the gate in rule 1, and only with Razorpay (or any payment path) opened
   separately, with sandbox/refund tests, signed webhooks, and published
   terms. Nothing in v1 builds, wires, or promises that path.

### 1d. TypeScript interfaces (draft — not wired into any route in this pass)

```ts
export type CourseLevel = "Foundation" | "Professional" | "Advanced-Specialist";
export type DemoPolicy =
  | "none" | "free_intro" | "scheduled_demo" | "paid_orientation" | "consultation_only";
export type ProgramStatus = "Available" | "Planned" | "Waitlist" | "Not Offered";
export type PriceVisibility =
  | "hidden" | "confirmed_on_enquiry" | "fixed" | "starting_at" | "custom_quote";
export type DeliveryMode = "online" | "offline" | "hybrid";
export type ProvenanceSource =
  | "live-site-crawl-2026-10-23" | "gradespot-provided" | "repo-authored";

export interface CourseSection {
  heading: string;
  paragraphs: string[];
  style?: "cards" | "pricing" | "faq";
}

export interface CourseProvenance {
  source: ProvenanceSource;
  source_detail: string; // e.g. "crawl 2026-10-23, CCNA page" or "GradeSpot text, 2026-11-01"
  last_reviewed_at: string | null; // ISO date, null = never reviewed since crawl
  reviewed_by_role: "content-editor" | "content-approver" | "owner" | null;
}

export interface CourseContractV1 {
  slug: string;
  title: string;
  category: string;
  image: string | null;
  image_alt: string | null;
  summary: string;
  sections: CourseSection[];
  catalog_only: boolean;
  is_published: boolean;
  duration_text: string | null;
  duration_value: number | null;
  duration_unit: "days" | "hours" | null;
  level: CourseLevel | null;
  demo_policy: DemoPolicy | null;
  // v1.0.1 amendment A1: nullable during migration (PENDING decision).
  // Non-null only after the §3.3 decision is recorded; readers must
  // treat null as "status to be confirmed", never as Available.
  program_status: ProgramStatus | null;
  price_visibility: PriceVisibility;
  price_amount: number | null;
  price_currency: string | null; // "INR" when price_amount is set
  certification_alignment: string[] | null;
  prerequisites: string[] | null;
  mode: DeliveryMode[] | null;
  source_provenance: CourseProvenance;
}
```

### 1e. Validation rules (Zod shapes, draft — not wired into live routes yet)

```ts
import { z } from "zod";

export const CourseSectionSchema = z.object({
  heading: z.string().min(1),
  paragraphs: z.array(z.string()),
  style: z.enum(["cards", "pricing", "faq"]).optional(),
});

export const CourseContractV1Schema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  category: z.string().min(1),
  image: z.string().startsWith("/images/").nullable(),
  image_alt: z.string().nullable(),
  summary: z.string(),
  sections: z.array(CourseSectionSchema),
  catalog_only: z.boolean(),
  is_published: z.boolean(),
  duration_text: z.string().nullable(),
  duration_value: z.number().int().positive().nullable(),
  duration_unit: z.enum(["days", "hours"]).nullable(),
  level: z.enum(["Foundation", "Professional", "Advanced-Specialist"]).nullable(),
  demo_policy: z.enum([
    "none", "free_intro", "scheduled_demo", "paid_orientation", "consultation_only",
  ]).nullable(),
  // v1.0.1 amendment A1: nullable during migration; see §3.3.
  program_status: z.enum(["Available", "Planned", "Waitlist", "Not Offered"]).nullable(),
  price_visibility: z.enum([
    "hidden", "confirmed_on_enquiry", "fixed", "starting_at", "custom_quote",
  ]),
  price_amount: z.number().positive().nullable(),
  price_currency: z.string().nullable(),
}).superRefine((c, ctx) => {
  if (c.image && !c.image_alt) ctx.addIssue({ code: "custom", message: "image_alt is required when image is set" });
  if ((c.price_visibility === "fixed" || c.price_visibility === "starting_at") && c.price_amount === null)
    ctx.addIssue({ code: "custom", message: "price_amount is required for fixed / starting_at" });
  if (c.price_amount !== null && c.price_visibility !== "fixed" && c.price_visibility !== "starting_at")
    ctx.addIssue({ code: "custom", message: "price_amount must not render unless price_visibility is fixed / starting_at" });
  if (c.duration_value === null && c.duration_unit !== null)
    ctx.addIssue({ code: "custom", message: "duration_unit requires duration_value" });
});
```

These shapes are DRAFT. They are not imported by `src/lib/data.ts` or any
route in this pass. Wiring them in is Phase 3A B1 step 2, after the
canonical-source decision (§3) is adopted and the draft migration (§6) is
applied — wiring validation before the DB has the columns would break the
build's DB read path, which is exactly the kind of half-wired API this pass
was asked not to produce.

---

## 2. What this contract does NOT do

- It does not create an Axon server, an admin UI, auth, MFA, RBAC, or audit
  logs. Those are Phase 3A B2 and the admin MVP, in that order.
- It does not change any published page, price, duration, level, or status.
  Backfill values in §3.3 are PROPOSED, flagged for GradeSpot confirmation,
  not applied.
- It does not settle the backend stack conflict (Next.js + Django paid model
  vs Axon Node.js/TypeScript modular monolith vs NestJS Axon + PostgreSQL
  vs Next.js + Supabase Axon v1). This contract is deliberately stack-neutral:
  it is a field + validation + governance contract that any of those
  backends must satisfy. The stack choice is recorded before Axon code is
  written, not by this document.
- It does not cover services, leads, verification, team, or site-settings.
  Those contracts follow the same pattern (field list → validation →
  governance) in B1 order.
- It does not claim any measured performance, accessibility, conversion, or
  usability number, and it does not upgrade the V2 8.1/10 rating.

---

## 3. Canonical source — DECISION PROPOSAL (not a silent assumption)

### 3.1 The problem, stated plainly

Today there are two sources of truth and no tie-breaker. The repo
(`src/data/courses.ts`) is versioned, reviewable, and diffable — but it is
only a fallback. The database (`public.courses`) is what the public site
actually renders at SSG build time — but it has no review trail, no
versioning, and no owner. A fix made in the repo (CCNA, `e1785fa`) can
therefore be correct and live-ineffective at the same time, and a bad row
(CCNP's copied CCNA paragraph) can survive indefinitely because nothing
compares the two sources. Any contract that does not settle this question
first will be violated silently by the next row edit.

### 3.2 Proposal: REPO is the canonical source of record; DB is the published cache

**Decision proposed:** the repository is canonical for course content.
The database is a derived, published cache of the repository — not an
independent editor.

Reasons, in order:
1. **No admin exists yet.** The DB has no login, no roles, no approval
   flow, and no audit log. Making it canonical now would make the least
   governed store the source of truth.
2. **The repo already has the governance the DB lacks.** Git history,
   branch review, build/lint/test gates, and rollback by revert. A content
   change in the repo is reviewable before it publishes; a dashboard row
   edit is not.
3. **Zero budget.** Repo-canonical needs no new service, no paid tier, and
   no admin build to be safe. DB-canonical with audit would need an audit
   table, an admin surface, and a backfill process before it could be
   trusted — all Phase 3A B2 work that does not exist yet.
4. **It matches the existing seams.** Promotions (`src/data/promotions.ts`)
   and site-settings (`src/data/site-settings.ts`) already follow this
   pattern: a typed repo seam is the shape, and Axon later serves the same
   shape. The catalogue should follow the same pattern, not invent a
   second one.

**What changes if this proposal is adopted (future work, not this pass):**
- `src/lib/data.ts` precedence flips in a controlled step: repo-first for
  content, DB read retained only as the published-cache path that must
  match the repo (see §4). Until that flip is made and verified on a
  preview, the CURRENT behaviour (DB wins) remains — this document does
  not pretend otherwise.
- A one-time reconciliation import (repo → DB, §5) makes the DB match the
  repo, so the flip changes nothing visible on day one. That is the point:
  the flip must be a no-op for visitors and a governance change only.
- If the proposal is REJECTED and DB-canonical is chosen instead, the
  minimum viable alternative is: an audit table (`course_audit`: who, what,
  when, previous value), a rule that no row is edited except through an
  approved change record, and the same diff report (§4) run in reverse
  (repo must match DB). That alternative is recorded here so the rejection
  is a real decision with a real cost, not a shrug.

### 3.3 Proposed backfill mapping (FLAGGED for GradeSpot confirmation — not applied)

**Amendment A4 (Das B1 refinement 4) replaces the v1.0.0 catalog-only
mapping in full.** A missing syllabus is NOT evidence of a program's
status, so no catalog-only course is automatically assigned `Planned`
(or any other status) merely because its syllabus is missing. Every
catalog-only course starts at `program_status = null` (PENDING) and
receives a status only from the GradeSpot decision table
(`docs/frontend-v2/CATALOGUE-STATUS-DECISION-TABLE.md`), where all 25
statuses are blank for GradeSpot to fill. Until a row in that table is
filled and the §6.0 two-approval gate passes, that course's status stays
null and renders no enrollment CTA (see §1b).

The same principle applies to the migration itself (amendment A1): the
column has NO default, so no row acquires a status by accident of
migration. A backfill value is an explicit, recorded decision, never a
schema default.

| Existing state | Proposed v1.0.1 backfill (all flagged for GradeSpot confirmation — not applied) |
|---|---|
| 11 full courses, published detail page, `catalog_only = false` | **Proposed, not automatic:** `program_status = Available` ONLY after GradeSpot confirms that mapping for full courses in the §6.0 gate; if it has not confirmed, these rows also stay `null` (PENDING). `price_visibility = confirmed_on_enquiry`, `price_amount = null`, `duration_text` = the `courseDurations` map value where one exists, else `null`, `level = null`, `demo_policy = null`, `mode = null`, `is_published = true`, `source_provenance.source = live-site-crawl-2026-10-23`, `last_reviewed_at = null` |
| 25 catalog-only courses, `catalog_only = true`, empty summary/sections | `program_status = null` (PENDING) until the decision table is filled — **no proposed status, no automatic `Planned`**. Other fields: `price_visibility = confirmed_on_enquiry`, `price_amount = null`, `duration_text = null`, `level = null`, `demo_policy = null`, `mode = null`, `is_published = true` (they are listed, so they stay listed — `is_published = false` would unlist them, which is a different decision), same crawl provenance. The decision table offers exactly four options per course — `Available` / `Planned` / `Waitlist` / `Not Offered` — all left blank. |
| CCNA (`ccna-200-301`) | As full courses above, PLUS the cleaned sections from `e1785fa` (45-day, no ethical-hacking/SOC items) as the repo source — see §5.1. Its status follows the full-course rule: proposed `Available` only after GradeSpot confirmation, else null. |
| CCNP (`ccnp-350-401-encor`) | Status follows the full-course rule above, but sections are NOT backfilled from the current repo copy until real CCNP text arrives — see §5.2. Backfilling the copied CCNA paragraph into the DB would canonise the defect. |

`Available` for full courses means "enquiries open for this program", not
"a batch is running this week" and not "a seat is guaranteed". Batch
schedules remain "confirmed on enquiry" until a batches contract exists.
`Planned`, when GradeSpot explicitly chooses it for a course, means
"listed, not yet open" — it is a catalogue state chosen by GradeSpot, not
a promise of a launch date, and never a default inferred from a missing
syllabus.

---

## 4. Governance rule — how a DB row may change, and how divergence is caught

This rule exists to end silent DB-wins. It applies from the moment the
reconciliation import (§5) is complete, whether or not the precedence flip
in §3.2 has landed yet.

**Roles (roles, not people, in every record):**
- **Content Editor** — proposes a content change as a repo change (PR /
  branch commit), with the source of the new text stated.
- **Content Approver** — reviews and merges. For public catalogue content,
  the approver is the owner (GradeSpot) or a role the owner has explicitly
  delegated in writing. No self-approval for a change that alters a
  published price, duration, level, status, or certification claim.
- **Publisher** — generates the DB seed/update from the merged repo and
  applies it through an approved channel (see §6), with the diff report
  attached. Publisher and Approver should not be the same person for a
  price or certification change, until an admin system enforces that
  separation — until then, the diff report is the separation.

**The rule, in one paragraph:** no course row is edited directly in the
database (dashboard, SQL editor, or script) except as the output of a
merged repo change, via a generated seed/update that carries a diff report.
An emergency direct edit (a live error that must be fixed before a repo
change can be reviewed) is allowed ONLY if it is back-ported to the repo
within one working day and the diff report for that edit is filed with the
back-port. An un-back-ported emergency edit is a governance breach, not a
shortcut, and the next diff run must flag it as one.

### 4.1 Diff script — NORMATIVE specification (amendment A2, Das B1 refinement 2)

Cache drift is a **release blocker**, not a warning. The diff script below
is specified normatively here; building it is Phase 3A B1 step 2, but no
publication step may claim "diff clean" without running a script that
satisfies every clause of this section. A vague "we compared the sources"
is not compliance.

**Inputs (both read-only — the script never writes to either source):**
1. The published `courses` rows, exported through a read-only query
   (anon/public read path only; no service-role credential in the script).
2. The repo snapshot at the branch/commit being published
   (`src/data/courses.ts` + the contract fields as they exist in that
   commit, including the §3.3 decision table state at that commit).
3. The approved-change register: change-record IDs + approver role for
   every divergence that is claimed to be approved (see "Approved vs
   unapproved" below). A divergence with no register entry is unapproved
   by definition.

**Fields compared (exact set, no others, no omissions):** `slug, title,
category, image, image_alt, summary, sections, catalog_only, is_published,
duration_text, level, demo_policy, program_status, price_visibility,
price_amount, certification_alignment, prerequisites, mode`.
`duration_value`/`duration_unit` are NOT compared independently — they are
derived from `duration_text` and are checked only for derivability.
`source_provenance` is reported for context but a provenance-only
difference (same content, newer review stamp) is classified as
`provenance-only`, not as a content divergence.

**Normalization rules (applied identically to both sides BEFORE
comparison, and nothing else is normalized):**
- Line endings unified to `\n`; leading/trailing whitespace trimmed per
  string and per paragraph; internal whitespace collapsed to single
  spaces; empty paragraph strings dropped.
- JSON objects compared by key/value, not by key order or serialization
  spacing; JSON arrays compared in order (section order and paragraph
  order are meaningful — reordering is a change, not a normalization).
- `null` vs `""` vs `[]` are DISTINCT values and are never normalized
  into each other (a null status is not an empty status; an empty
  sections array is not a null sections field).
- NO semantic normalization: `90 days` vs `45 days`, a CCNA paragraph vs
  a CCNP paragraph, `Available` vs `Planned`, and any price figure are
  never normalized away. If a normalization rule would hide one of those
  differences, the rule is wrong and the comparison must fail loudly.

**Output format (one report, machine-readable + human-readable, filed
with the change):** for each slug, one of `MATCH`, `ADDED` (in DB, not
in repo), `REMOVED` (in repo, not in DB), or `CHANGED`; for `CHANGED`,
one line per diverged field with: field name, repo value (or its hash
when the value is long — the hash alone is not sufficient; the full
value must be retrievable from the filed report or the repo commit),
DB value (same rule), and classification `approved` (with change-record
ID) or `unapproved`. A report that says only "3 courses differ" without
naming the fields is non-compliant.

**Failure mode (normative):**
- ANY `unapproved` divergence for a published slug (`is_published =
  true`) FAILS publication: the preview/CI build fails, the merge is
  blocked, and no deploy (preview or production) may proceed on that
  commit until the divergence is resolved through the roles in §4.
- `ADDED`/`REMOVED` rows are failures on the same terms — a row that
  exists in only one source is a divergence, not an addition to ignore.
- The script MUST NEVER automatically overwrite either source: no
  auto-sync DB → repo, no auto-sync repo → DB, no "fix" flag that writes.
  Resolution is always a human decision through §4 roles, recorded in
  the approved-change register, and re-verified by a clean re-run.
- A clean run (all published slugs `MATCH` or `provenance-only`) is the
  only state in which §5 reconciliation may be reported complete and a
  precedence flip (§3.2) may be considered.
- The script itself is zero-budget (a Node script over the existing
  Supabase JS client + the repo data, no new service).

**What this rule does NOT do:** it does not give Leo's public site an
admin login, it does not create an audit table (that belongs to Phase 3A
B2, where audit logs are specified as "every admin write with who/what/
when/previous value"), and it does not retroactively audit rows edited
before this contract. Pre-contract rows are handled by the one-time
reconciliation in §5, which establishes the baseline the rule then
protects.

---

## 5. Concrete remediation — CCNA and CCNP

### 5.1 CCNA (`ccna-200-301`) — repo is already correct; the DB is the work

1. Export the live `ccna-200-301` row (all columns) and file it as the
   pre-change baseline. This export IS the rollback (§6.3).
2. Diff the live row against the repo's cleaned sections (`e1785fa`):
   expect to find the 90-day Program-Features paragraph and the
   ethical-hacking/SOC curriculum items in the live row, absent in the
   repo. If the diff shows anything else, stop and report it — do not
   assume the only difference is the known defect.
3. Generate the DB update FROM the repo sections (45-day Program-Features,
   cleaned curriculum, first five curriculum items retained as in the
   repo). Do not hand-edit the row in the dashboard: a generated update
   is reviewable; a hand edit is not.
4. Apply through an approved channel (§6) on a preview/staging build
   first, and verify the built page renders 0 bad topics, 0× "90-day",
   and the 45-day duration — the same check the fix pass used with an
   unreachable Supabase URL (0 bad topics, 0× 90-day, 4× 45-day).
   Only then apply to the published build path.
5. Re-run the §4 diff: CCNA must report clean. If it does not, the
   reconciliation is not complete, whatever the page looks like.

### 5.2 CCNP (`ccnp-350-401-encor`) — do NOT fix by changing a number

1. **Do NOT change "90-day" to "45-day" in the CCNP paragraph and call it
   fixed.** The paragraph is a CCNA paragraph ("Our 90-day CCNA 200-301
   Training…", "By the conclusion of our CCNA 200-301 course…",
   "well-prepared to tackle the CCNA 200-301 certification exam…", "Common
   Job Roles After CCNA") sitting on a CCNP page. A number change leaves
   the misattribution intact and would canonise it in the DB.
2. **Input still needed from GradeSpot (recorded, not invented):** real
   CCNP Enterprise 350-401 ENCOR text — at minimum a Course Overview, Key
   Learning / Objectives, and Program Features written for ENCOR, plus
   the correct job roles after CCNP. Until that text arrives, the honest
   options are: (a) remove the misattributed paragraphs from the CCNP page
   and mark the page as partial (sections that remain are the ones that
   are actually CCNP), or (b) keep the page as-is with a qualification
   that the overview is under review. Option (a) is recommended; option
   (b) is the fallback if removing copy would break the page layout.
   Either option is a content decision for GradeSpot, not a silent edit.
3. The CCNP `courseDurations` entry ("45 days") is a duration for the
   program, not a fix for the paragraph. It becomes `duration_text` in
   the backfill (§3.3) and nothing more.
4. After real CCNP text arrives, it follows the same path as CCNA: repo
   change → review → generated DB update → diff clean → preview verify.
   The DB row must match the repo after that step, by the §4 rule.

### 5.3 All other courses (the part that is easy to forget)

The same one-time reconciliation applies to the other 9 full courses and
the 25 catalog-only courses: export, diff against the repo, generated
update, preview verify, diff clean. The CCNA/CCNP defects are the visible
symptoms; the governance gap is the disease, and reconciling only CCNA
would leave 34 other rows unbaselined. Catalog-only rows need no content
invention in reconciliation — their backfill is visibility/provenance
only, plus a status ONLY where the decision table has been filled and
the §6.0 gate has passed (§3.3, amendment A4); unfilled rows stay
`null` (PENDING), not `Planned`.

---

## 6. Draft migration — what applying it will require

**File:** `supabase/migrations/0006_catalogue_contract_fields.sql`
**Status:** DRAFT ONLY. NOT APPLIED. Do not run it from this sandbox.

### 6.0 Two-approval gate — NORMATIVE (amendment A3, Das B1 refinement 3)

Schema changes and editorial changes are **separate approvals**, and
BOTH are required before any migration apply. One approval does not
imply the other.

1. **Database-change approval** — approves the schema change itself:
   the exact migration file (by commit + file hash), the column list,
   the constraints, and the rollback procedure in §6.3. It is granted
   by the owner (or a role the owner has explicitly delegated for
   database changes) and recorded with the migration hash.
2. **Content approval** — approves the editorial content that will fill
   the new columns: the §3.3 backfill values and, for catalog-only
   courses, the filled decision table
   (`CATALOGUE-STATUS-DECISION-TABLE.md`). It is granted by GradeSpot
   content authority (the owner or an explicitly delegated content
   approver) and recorded with the decision-table state at approval
   time. A blank decision-table row is NOT content approval for that
   course — that course stays `program_status = null`.
3. **Restorable backup, verified before apply:** the full `courses`
   export (§6.2 step 3) must be confirmed restorable BEFORE the apply
   begins — row count + spot-check of CCNA/CCNP rows, and a restore
   rehearsal on a non-production target (preview/staging copy) where one
   is available. An export that has never been restore-tested is not a
   backup; it is a hope.
4. **Rollback procedure, verified before apply:** the §6.3 rollback
   (drop-column migration + row-export restore) must be drafted and
   reviewed before apply, not invented during an incident. If the
   rollback cannot be stated in advance, the apply does not proceed.
5. **Order:** database-change approval + content approval + verified
   backup + verified rollback, in that order, THEN apply (§6.2). An
   apply with only one approval, or with an untested backup, is an
   incomplete change and must be reported as one — the same rule as a
   half-applied migration.

### 6.1 What it does

Adds to `public.courses` (all nullable except where stated, so existing
rows are never broken by the migration itself):
`duration_text text`, `duration_value integer`, `duration_unit text`
(check `days | hours`), `level text` (check Foundation / Professional /
Advanced-Specialist), `demo_policy text` (check the five SPEC values),
`program_status text` — **nullable, NO default** (amendment A1; see the
caveat below), `price_visibility text NOT NULL DEFAULT 'confirmed_on_enquiry'`,
`price_amount numeric`, `price_currency text`,
`certification_alignment text[]`, `prerequisites text[]`,
`mode text[]` (check `online | offline | hybrid` per element — enforced
in the application validation in §1e, because Postgres array-element
checks are verbose and the Zod shape is the primary guard),
`image_alt text`, `is_published boolean NOT NULL DEFAULT true`,
`source_provenance jsonb NOT NULL DEFAULT
'{"source": "live-site-crawl-2026-10-23", "source_detail": "backfill: pre-contract crawl", "last_reviewed_at": null, "reviewed_by_role": null}'::jsonb`,
`updated_at timestamptz NOT NULL DEFAULT now()`,
plus indexes on `category`, `program_status`, and `level`.

**Caveat on `program_status` nullability (amendment A1, superseding the
v1.0.0 default caveat):** in v1.0.0 the column was
`NOT NULL DEFAULT 'Available'`; in v1.0.1 it is nullable with NO
default. There is therefore no migration-implied status at all: every
row starts at `null` (PENDING) until the §3.3 backfill sets it under the
§6.0 two-approval gate. A build that reads `program_status` before the
backfill is authoritative for nothing about status — null renders as
"status to be confirmed" with no enrollment CTA (§1b). If the backfill
cannot run in the same approved change as the migration, the migration
must NOT be applied yet — a half-applied migration (columns present,
statuses undecided but rendered as if decided) is worse than no
migration, because it looks complete.

### 6.2 How applying it works (approved channel only)

1. **Sandbox DDL is blocked.** Supabase DDL from this sandbox fails
   (egress proxy kills the Postgres SSL handshake — the same block that
   applies to migration 0005). Do not retry it from here.
2. **Execution channel — security correction (amendment A5, Das B1
   refinement 5):** `ssl:{rejectUnauthorized:false}` is NOT an approved
   security standard and must NOT be treated as one. The eventual
   execution channel MUST use certificate-verified TLS where supported
   (certificate chain verified against a trusted CA; any
   certificate-verification failure aborts the connection — it is never
   bypassed to "get the migration through"), with credentials handled
   securely (Secure Vault / environment variables, never embedded in a
   report, a script, a chat message, or a committed file) and the
   channel's credentials rotated/revoked after the change where the
   channel supports it. The earlier Termux pooler route (scratch dir +
   `npm i pg` + pooler host, with certificate verification disabled)
   is recorded here ONLY as a historical workaround that is NOT the
   approved channel until certificate verification is confirmed for
   it. **The execution channel itself remains an owner decision, not
   settled by this edit:** the owner approves a specific channel that
   satisfies the certificate-verified-TLS rule above (Termux with
   verification confirmed, Supabase dashboard SQL editor, or another
   channel the owner names) — the channel is part of the §6.0 approval,
   not a detail to improvise, and no channel that disables certificate
   verification may be approved under this contract.
3. **Before applying:** export the full `courses` table as the rollback
   baseline, and confirm the export is restorable (row count + spot-check
   of CCNA/CCNP rows) — see the §6.0 verified-backup requirement.
4. **Apply 0006, then the §3.3 backfill (only the values covered by
   the §6.0 content approval — blank decision-table rows stay null),
   then the §5 reconciliation (CCNA first, CCNP only when real text
   arrives, then the other 34 rows), then a preview build with the
   §4.1 diff clean.** In that order. Applying 0006 without the
   backfill, or the backfill without the diff, is an incomplete change
   and must be reported as one.
5. **Verify RLS after applying:** the existing `courses_public_read`
   policy (`select to anon, authenticated using (true)`) covers the new
   columns automatically, which is correct for public catalogue fields —
   but confirm no new column carries non-public data. `source_provenance`
   carries roles and source labels only, never personal names, secrets,
   or internal notes. If a future provenance field would carry anything
   non-public, it belongs in a separate, non-public table, not in
   `public.courses`.

### 6.3 Rollback

Rollback is a NEW migration that drops the added columns (a drop-column
migration, drafted at rollback time from the 0006 column list) PLUS a
restore of the pre-change row export from §6.2 step 3. Never edit applied
migration history, never edit 0006 after it has been applied, and never
roll back by deleting rows. If 0006 was applied but the backfill was not,
rollback is still the same procedure — the export restores the pre-change
state exactly, including the absence of the new columns' data.

---

## 7. Versioning and deprecation

- **Contract version:** 1.0.0. The version lives in this document's title
  and in the migration header. A future contract version is a new document
  (`CATALOGUE-CONTRACT-V2.md`) plus a changelog section in v1 pointing
  at it — v1 is never silently rewritten.
- **Semver for the contract:** MAJOR = a breaking change (removing or
  renaming a field, changing an enum's meaning, changing slug semantics,
  changing `price_visibility` defaults). MINOR = an additive, nullable
  field or a new enum value that old readers can safely ignore. PATCH =
  documentation, validation wording, or example corrections with no
  field change.
- **Backward compatibility:** readers MUST ignore unknown fields and MUST
  render an unknown enum value as its safe fallback (`level` unknown →
  unclassified, `demo_policy` unknown → "Ask about a demo",
  `program_status` unknown → do not render an enrollment CTA until the
  value is understood). Writers MUST NOT send fields outside the current
  contract version. A reader that crashes on an unknown enum value is a
  contract violation, not a data error.
- **Deprecation window:** a field or enum value is deprecated by a
  changelog entry in the current contract version, and is supported for
  at least one full release cycle AND at least 90 days after the
  deprecation notice, whichever is longer. Removal before that window
  requires a MAJOR version and an explicit owner decision recorded as a
  reversal of the deprecation promise — not a quiet edit.
- **Changelog (v1.0.0 — initial version):** initial contract. No prior
  version. Known open items carried into v1 (not resolved by it): backend
  stack choice; DB-vs-repo proposal adoption (§3.2); CCNP real text
  (§5.2); pricing decision (gates `fixed` / `starting_at` use); batches
  contract (batch schedules remain "confirmed on enquiry"); the §4 diff
  script (specified, not built); migration 0005 application status
  (promotions seam still reads local data until 0005 is applied through
  an approved channel — the same Termux/dashboard route as §6.2).
- **Changelog (v1.0.1 — amendment, 2026-10-27, Das B1 refinements):**
  **A1** — `program_status` is nullable with NO migration default
  (was `NOT NULL DEFAULT 'Available'`): a default would imply a program
  is offered before GradeSpot confirms it (§1b, §3.3, §6.1, migration
  0006). **A2** — §4.1 normative diff specification: normalized
  comparison, exact field set, per-field output format, and failure
  mode that blocks publication for any unapproved published-slug
  divergence and never auto-overwrites either source (was a specified-
  but-vague diff paragraph). **A3** — §6.0 two-approval gate:
  database-change approval AND content approval, verified restorable
  backup, verified rollback procedure, all before any apply (was a
  single "approved channel" step). **A4** — catalog-only backfill
  replaced: no automatic `Planned` from a missing syllabus; all 25
  catalog-only courses start `null` (PENDING) with statuses blank in
  `CATALOGUE-STATUS-DECISION-TABLE.md` for GradeSpot to fill (§3.3).
  **A5** — TLS security correction: `ssl:{rejectUnauthorized:false}`
  is NOT an approved standard; the execution channel must use
  certificate-verified TLS where supported, credentials via Secure
  Vault/env, never embedded in reports or scripts; the Termux pooler
  route is a historical workaround, NOT the approved channel until
  certificate verification is confirmed, and the channel itself remains
  an owner decision (§6.2, migration 0006 header). Open items carried
  forward unchanged: backend stack choice; DB-vs-repo proposal
  adoption; CCNP real text; pricing decision; batches contract; §4.1
  diff script (specified, not built); migration 0005 status; the
  §3.3 decision table (blank until GradeSpot fills it); the §6.0
  approvals (neither granted by this document).

---

## 8. Deliberately NOT built in this pass

- No Axon server, no admin UI, no auth/MFA/RBAC/audit, no API route
  (`/api/v1/courses` does not exist after this pass — the contract
  describes what it must return when it is built, it does not build it).
- No live DB write: no DDL applied, no row updated, no seed run, no lead
  POSTed to live Supabase.
- No `src/data/courses.ts` content change: no course text, duration,
  level, status, or price was added, removed, or altered in this pass.
  The only repo changes are this document and the draft migration file.
- No payment, pricing publication, Razorpay wiring, or published price.
- No paid hosting/infra introduced or implied (zero-budget rule; the
  mandatory-cost exception — e.g. domain renewal — authorises no payment
  now and is not invoked by this pass).
- No Atlas content copied into Leo, no Atlas repo touched, no Atlas
  endpoint probed.
- No URL deleted, no slug renamed, no category added or removed.
- No measured claim: no Lighthouse, axe, keyboard/screen-reader, or
  real-device result is claimed by this document, and the V2 8.1/10
  rating is unchanged by it.

-- 0006_catalogue_contract_fields.sql
--
-- DRAFT ONLY — NOT APPLIED. DO NOT RUN THIS FILE FROM THE SANDBOX.
--
-- Purpose: add the Phase 3A B1 courses/catalogue contract fields
-- (docs/frontend-v2/CATALOGUE-CONTRACT-V1.md, version 1.0.1, amended
-- 2026-10-27 per Das B1 refinements) to public.courses. This file
-- adds COLUMNS ONLY. It backfills nothing, publishes no price,
-- invents no duration/level/status, and changes no existing row's
-- title, category, summary, sections, or catalog_only value.
-- program_status is nullable with NO default (v1.0.1 amendment A1):
-- every row starts at NULL (PENDING) until the contract §3.3 backfill
-- sets it under the §6.0 two-approval gate. The remaining NOT NULL
-- defaults (price_visibility 'confirmed_on_enquiry', is_published
-- true for already-listed rows, crawl source_provenance) are
-- non-semantic honesty/listing defaults, not offering claims.
-- Applying this file without the approved backfill is an INCOMPLETE
-- change and must be reported as one.
--
-- STATUS: NOT YET APPLIED. Supabase DDL cannot run from the build
-- sandbox (egress proxy kills the Postgres SSL handshake — the same
-- block that applies to migration 0005).
--
-- SECURITY CORRECTION (v1.0.1 amendment A5 — read this before any
-- apply): ssl:{rejectUnauthorized:false} is NOT an approved security
-- standard and must NOT be used as the execution channel's TLS
-- setting. The eventual execution channel MUST use
-- certificate-verified TLS where supported (certificate chain
-- verified against a trusted CA; any verification failure aborts the
-- connection, never bypassed to "get the migration through"), with
-- credentials handled securely (Secure Vault / environment
-- variables, never embedded in a report, a script, a chat message, or
-- a committed file). The earlier Termux pooler route (scratch dir +
-- npm i pg + pooler host, with certificate verification disabled) is
-- recorded ONLY as a historical workaround that is NOT the approved
-- channel until certificate verification is confirmed for it. The
-- execution channel itself remains an OWNER DECISION, not settled by
-- this file: the owner approves a specific channel satisfying the
-- certificate-verified-TLS rule above (Termux with verification
-- confirmed, the Supabase dashboard SQL editor for project
-- yrbpolqhipwfmvwdgtvc, or another channel the owner names). The
-- channel is part of the contract §6.0 approval, not a detail to
-- improvise, and no channel that disables certificate verification
-- may be approved under this contract.
--
-- BEFORE APPLYING: export the full public.courses table as the rollback
-- baseline and confirm the export is restorable (row count + spot-check
-- of the ccna-200-301 and ccnp-350-401-encor rows).
--
-- TWO-APPROVAL GATE (contract §6.0, v1.0.1 amendment A3): BOTH a
-- database-change approval (exact file by commit + hash, column list,
-- constraints, rollback) AND a content approval (backfill values +
-- filled decision table) are required BEFORE any apply, together with
-- a verified restorable backup and a verified rollback procedure.
-- A blank decision-table row is NOT content approval for that course.
--
-- AFTER APPLYING, IN THE SAME APPROVED CHANGE, IN THIS ORDER:
--   1. Backfill per CATALOGUE-CONTRACT-V1.md §3.3 as amended in
--      v1.0.1 — ONLY the values covered by the §6.0 content
--      approval: full courses -> program_status 'Available' ONLY
--      after GradeSpot confirms that mapping (otherwise NULL);
--      catalog-only -> program_status ONLY as filled in
--      CATALOGUE-STATUS-DECISION-TABLE.md (all 25 blank until
--      GradeSpot fills them; unfilled rows STAY NULL, never
--      'Planned' by default); price_visibility
--      'confirmed_on_enquiry', price_amount NULL, duration_text
--      from the repo courseDurations map where one exists, else
--      NULL, level/demo_policy/mode NULL, provenance source
--      'live-site-crawl-2026-10-23'.
--   2. Reconcile CCNA first (repo cleaned sections, 45-day, no
--      ethical-hacking/SOC items), then the other full courses, then
--      catalog-only rows — generated updates from the repo only,
--      never hand edits, with a diff report (contract §4.1).
--   3. CCNP ONLY when real CCNP ENCOR text arrives from GradeSpot.
--      Do NOT backfill the copied CCNA paragraph into the DB, and do
--      NOT "fix" CCNP by changing 90-day to 45-day. See contract §5.2.
--   4. Preview build with the contract §4.1 diff clean, then verify
--      RLS (the existing courses_public_read policy covers the new
--      columns automatically — confirm no new column carries
--      non-public data; source_provenance carries roles and source
--      labels only, never personal names, secrets, or internal notes).
--
-- CAVEAT ON program_status NULLABILITY (v1.0.1 amendment A1,
-- superseding the v1.0.0 default caveat): there is NO migration
-- default for program_status. Every row starts at NULL (PENDING),
-- which must render as "status to be confirmed" with no enrollment
-- CTA, never as Available/Planned. If the approved backfill cannot
-- run in the same approved change, DO NOT APPLY this migration yet.
--
-- ROLLBACK (drafted at rollback time, never by editing applied
-- history): a NEW migration that drops the columns added below, PLUS
-- a restore of the pre-change row export. Never edit this file after
-- it has been applied. Rollback statements (for reference only —
-- do NOT run them as part of applying 0006):
--   alter table public.courses drop column if exists duration_text;
--   alter table public.courses drop column if exists duration_value;
--   alter table public.courses drop column if exists duration_unit;
--   alter table public.courses drop column if exists level;
--   alter table public.courses drop column if exists demo_policy;
--   alter table public.courses drop column if exists program_status;
--   alter table public.courses drop column if exists price_visibility;
--   alter table public.courses drop column if exists price_amount;
--   alter table public.courses drop column if exists price_currency;
--   alter table public.courses drop column if exists certification_alignment;
--   alter table public.courses drop column if exists prerequisites;
--   alter table public.courses drop column if exists mode;
--   alter table public.courses drop column if exists image_alt;
--   alter table public.courses drop column if exists is_published;
--   alter table public.courses drop column if exists source_provenance;
--   alter table public.courses drop column if exists updated_at;
--   drop index if exists public.courses_category_idx;
--   drop index if exists public.courses_program_status_idx;
--   drop index if exists public.courses_level_idx;
-- (Then restore the pre-change row export.)
--
-- Content rule (Consumer Protection Act 2019 / ASCI honesty standard,
-- same rule as migration 0005): only offers, prices, durations,
-- levels, and statuses that are actually true may be published — no
-- invented figures, deadlines, or guarantees. This migration publishes
-- nothing by itself; every value it makes room for still needs a
-- verified source and, for prices, a recorded pricing decision.

-- New contract fields. program_status is nullable with NO default
-- (v1.0.1 amendment A1). The remaining NOT NULL columns carry
-- non-semantic defaults (see header); they are not offering claims.
alter table public.courses
  add column if not exists duration_text text,
  add column if not exists duration_value integer,
  add column if not exists duration_unit text
    check (duration_unit in ('days', 'hours')),
  add column if not exists level text
    check (level in ('Foundation', 'Professional', 'Advanced-Specialist')),
  add column if not exists demo_policy text
    check (demo_policy in ('none', 'free_intro', 'scheduled_demo', 'paid_orientation', 'consultation_only')),
  add column if not exists program_status text
    check (program_status in ('Available', 'Planned', 'Waitlist', 'Not Offered')),
  add column if not exists price_visibility text not null default 'confirmed_on_enquiry'
    check (price_visibility in ('hidden', 'confirmed_on_enquiry', 'fixed', 'starting_at', 'custom_quote')),
  add column if not exists price_amount numeric,
  add column if not exists price_currency text,
  add column if not exists certification_alignment text[],
  add column if not exists prerequisites text[],
  add column if not exists mode text[],
  add column if not exists image_alt text,
  add column if not exists is_published boolean not null default true,
  add column if not exists source_provenance jsonb not null default
    '{"source": "live-site-crawl-2026-10-23", "source_detail": "backfill: pre-contract crawl", "last_reviewed_at": null, "reviewed_by_role": null}'::jsonb,
  add column if not exists updated_at timestamptz not null default now();

-- Guards that the application validation (contract §1e) also enforces.
-- These CHECKs are the database's last line of defence, not the primary
-- guard: the Zod shape in the contract is primary, because it carries
-- the cross-field rules (image_alt required with image; price_amount
-- only with fixed/starting_at; duration_unit requires duration_value).
alter table public.courses
  add constraint courses_price_amount_requires_visibility
    check (price_amount is null or price_visibility in ('fixed', 'starting_at')),
  add constraint courses_duration_unit_requires_value
    check (duration_unit is null or duration_value is not null),
  add constraint courses_price_currency_requires_amount
    check (price_currency is null or price_amount is not null);

-- Indexes for the Release 2 filters the contract enables (category,
-- level, status). No index is created for price: price is not a filter
-- in v1, and indexing it would imply a price-browsing feature that
-- does not exist.
create index if not exists courses_category_idx on public.courses (category);
create index if not exists courses_program_status_idx on public.courses (program_status);
create index if not exists courses_level_idx on public.courses (level);

-- NOTE: no seed/update statements are included in this file, on purpose.
-- Backfill and reconciliation updates are generated from the repo
-- (contract §3.3 and §5) at apply time, with a diff report — they are
-- not baked into a migration that could silently canonise the CCNA
-- defect, the CCNP copy, or any other pre-contract row error.

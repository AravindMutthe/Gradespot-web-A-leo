-- 0005_site_promotions.sql
-- Admin-configured promotional content (Aravind's architecture
-- decision, 2026-10-23; DECISIONS.md §19 in gradespot-leo-build-app).
--
-- STATUS: NOT YET APPLIED. Supabase DDL cannot run from the build
-- sandbox (egress-blocked Postgres path). Apply this file in the
-- Supabase dashboard SQL editor (or any direct Postgres route) for
-- project yrbpolqhipwfmvwdgtvc. Until then the frontend reads the
-- typed config seam src/data/promotions.ts, which carries the
-- IDENTICAL shape and the same seed rows; lib/data.ts getPromotions()
-- is the single swap point. Admin CRUD for this table belongs to
-- gradespot-axon (Phase 3) — the public site only reads.
--
-- Content rule for seed + all future rows (Consumer Protection Act
-- 2019 / ASCI honesty standard): only offers that are actually true
-- may be published — no invented discounts, percentages,
-- strike-through prices, deadlines or festival offers.

create table if not exists public.site_promotions (
  id bigint generated always as identity primary key,
  slug text not null unique,
  kind text not null check (kind in ('banner', 'card', 'ticker')),
  title text not null,
  body text,
  cta_label text,
  cta_href text,
  image text,
  active boolean not null default true,
  sort int not null default 0,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.site_promotions enable row level security;

-- Public (anon) reads see ACTIVE rows only; scheduling windows are
-- additionally enforced in the app layer.
drop policy if exists "site_promotions_public_read_active" on public.site_promotions;
create policy "site_promotions_public_read_active" on public.site_promotions
  for select to anon
  using (active = true);

-- Writes are service-role only (the gradespot-axon admin, Phase 3).
drop policy if exists "site_promotions_service_all" on public.site_promotions;
create policy "site_promotions_service_all" on public.site_promotions
  for all to service_role
  using (true)
  with check (true);

-- Seed: only today's true offers (mirrors src/data/promotions.ts).
insert into public.site_promotions (slug, kind, title, body, cta_label, cta_href, image, sort) values
  ('free-demo-banner', 'banner', 'Sit in on a real class — free.',
   'See the training before you join: attend an actual session, meet the trainer and check the lab, online or at our Dilsukhnagar institute. Pick a course and book your demo — the team confirms a timing that suits you.',
   'Book a Free Demo', '/trainings', '/images/courses/ceh.jpg', 1),
  ('free-demo-card', 'card', 'Book a Free Demo',
   'Attend a real session of any course before you enrol — online or at the Dilsukhnagar institute.',
   'Browse Trainings', '/trainings', null, 1),
  ('free-counselling-card', 'card', 'Free Counselling Call',
   'Talk to a counsellor about courses, batches, modes of training and certification paths — no charge.',
   'Request a Callback', '/contact-us', null, 2),
  ('syllabus-whatsapp-card', 'card', 'Syllabus on WhatsApp',
   'Get a course syllabus sent to your WhatsApp — open any course page and use its syllabus button.',
   'See the Courses', '/trainings', null, 3),
  ('certificate-verification-card', 'card', 'Free Certificate Verification',
   'Employers and students can verify any GradeSpot certificate by its code — free, on this site.',
   'Verify a Certificate', '/certificate-verification', null, 4),
  ('ticker-demo', 'ticker', 'Free Demo Classes', null, null, null, null, 1),
  ('ticker-counselling', 'ticker', 'Free Counselling Call', null, null, null, null, 2),
  ('ticker-syllabus', 'ticker', 'Syllabus on WhatsApp', null, null, null, null, 3),
  ('ticker-verify', 'ticker', 'Free Certificate Verification', null, null, null, null, 4),
  ('ticker-modes', 'ticker', 'Online & Offline Classes', null, null, null, null, 5),
  ('ticker-location', 'ticker', 'Dilsukhnagar · Hyderabad', null, null, null, null, 6)
on conflict (slug) do nothing;

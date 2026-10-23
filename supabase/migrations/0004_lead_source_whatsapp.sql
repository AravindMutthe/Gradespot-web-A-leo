-- 0004: lead attribution + WhatsApp consent.
-- Research compliance (2026-10-23): every lead must record where it came
-- from (source, e.g. "website:/trainings/ccna-200-301") and whether the
-- enquirer explicitly opted in to WhatsApp messaging (WhatsApp policy
-- requires opt-in before business-initiated messages).
-- The app code degrades gracefully until this is applied: it retries the
-- insert with the core columns only, so no lead is lost either way.

alter table public.leads add column if not exists source text;
alter table public.leads add column if not exists whatsapp_opt_in boolean not null default false;

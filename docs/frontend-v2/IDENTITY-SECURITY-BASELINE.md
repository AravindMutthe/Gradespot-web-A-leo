# Identity & Security Baseline — DESIGN NOTE ONLY (Das fraud + comms reviews, 2026-10-27)

**Status:** DESIGN NOTE ONLY. Recorded, NOT built. No auth server, no
OAuth wiring, no signup button, no account, no mailbox, no webhook,
and no paid service is created by this document. It records the
identity and security baseline that any future Phase 3A B2 (auth) and
admin-MVP work must satisfy, so that work is not designed from scratch
under time pressure later. Where this note and an earlier document
disagree, the stricter rule wins until a recorded decision resolves
the conflict.

**Standing rules carried in:** zero budget; hosting/infra free-tier
only until a cost is genuinely mandatory (e.g. domain renewal) — that
exception authorises no payment now. Business services being paid is
deferred/gated (pricing undecided, Razorpay stage not opened, no
published price, no payment path) — not excluded, not built now. No
invented prices, stats, syllabus, ratings, placement claims, trainers,
dates, or entity/CIN/GST facts. No secrets in chat or in committed
files. Project walls intact (portfolio, GradeSpot/Axon, Royal Salon
fully separate). Paid WAF / hosting upgrade: NOT authorised by this
note or by any Das review — it needs its own owner decision.

---

## (a) Identity model

- **Outside users — Google primary, GitHub secondary.** Google is the
  primary outside signup (lowest friction, no GradeSpot-stored
  password, built-in recovery, supported by managed auth free-tier).
  GitHub is an optional second button for technical users (dev /
  DevOps / security students, labs and projects identity) — never the
  only or primary option, because most general students, institute
  staff, and business visitors do not have GitHub.
- **Managed auth + Axon authorization, separated.** Authentication
  (who you are) is handled by a managed auth provider (the GSA record
  already prefers managed auth over Keycloak); authorization (what you
  may access) is owned by Axon, never by the frontend and never by
  the identity provider's claims alone. A token that says "signed in"
  is not a token that says "enrolled".
- **Stable internal user ID.** Every account gets a stable, internal,
  non-reassignable user ID at creation. **Email alone is NOT a
  permanent key:** emails change, are reissued, and are shared; a
  changed email must update a contact field, never re-key the account
  or merge two accounts. The same rule applies to phone numbers.
- **Secure authenticated account linking.** Linking a second provider
  (e.g. adding GitHub to a Google account, or vice versa) requires an
  authenticated session on the existing account PLUS proof of control
  of the new provider, in the same flow. No silent account merging, no
  merge on matching email alone, no merge by an admin without a
  recorded request and a verification step.
- **Public enquiries without mandatory signup.** Course/service
  enquiries (the current LeadForm / RegisterForm / LpLeadForm flows)
  remain available WITHOUT an account. Signup is for protected
  surfaces only (see §(d) default-deny). Forcing signup for a public
  enquiry would reduce lead capture and add an abuse surface for no
  access benefit.
- **Signup alone NEVER grants protected access.** Signup creates an
  identity, nothing more. Notes, labs, certificates, paid content,
  and any enrollment-gated surface require a separate, explicit
  entitlement (see §(c)). A signup button that opens protected
  content is a contract violation, not a feature.

## (b) Fraud order — what comes BEFORE public accounts

- **Shared-store rate limiting + durable lead-failure workflow come
  FIRST.** The current per-instance in-memory limiter (leads 30/600s,
  verify 60/600s) is TEMPORARY ONLY: on serverless it resets per
  instance and per cold start, so it cannot be the account-era abuse
  control. Before any public account surface launches, rate limiting
  must move to a shared store (the existing plan names an Upstash
  Redis free tier or an Axon-owned counting service — the choice is
  recorded at build time, and any free-tier limit must be stated, not
  assumed), and lead failures must have a durable workflow (below).
- **202 rule (lead stored = "log" only):** prefer DURABLE QUEUEING — a
  lead that cannot be inserted must land in a durable queue (not a
  server log alone) that a counsellor/admin can work from, with a
  retry path. If durable queueing is genuinely unavailable at launch,
  the ONLY honest fallback is a temporary failure + retry/alternative
  contact: tell the visitor the enquiry could not be saved, ask them
  to retry or contact GradeSpot directly, and give the direct contact
  route. NEVER imply a log-only lead will be processed, followed up,
  or held for the visitor — the current 202 "received but logged"
  wording is honest about receipt, but a log alone is not a lead
  management system, and the account era must not inherit that gap.
- **Account-era abuse controls (in order, cheapest first):**
  validation both sides → shared-store rate limiting → email/phone
  verification → device/velocity checks → admin review queues →
  CAPTCHA / managed bot protection ONLY if abuse actually appears.
  No paid bot-protection vendor by default.
- **Existing fraud controls stay in place and are not weakened by
  accounts:** Zod validation (400, never stored on invalid), honeypot
  + timing bot checks (dropped before validation/storage, never
  logged), strict CSP, honest 201/202 states, no IP/payload logging
  beyond what rate limiting and audit strictly require.

## (c) Student identity — portal ID, entitlements, and the mailbox question

- **Portal student ID, linked — not email as identity.** An enrolled
  student gets a portal student ID (format `GS-STU-…` is ILLUSTRATIVE
  ONLY in this note — the real format, length, and issuance process
  are decided at build time) that is linked to (i) their authenticated
  account (stable internal user ID, §(a)) and (ii) a VERIFIED
  enrollment record (counsellor/admin-created, not self-asserted).
  **Sequential identifiers are NOT secrets:** a student ID that can
  be guessed must never, by itself, grant access. Access requires the
  authenticated session + the entitlement check below.
- **Entitlements explicit and revocable.** Access to services, notes,
  labs, and any gated surface is granted by an explicit entitlement
  record (student ID + program + scope + valid-from / valid-to),
  checked server-side on every protected request. Entitlements are
  revocable in one action (graduation, withdrawal, non-payment where
  a payment decision exists, or staff action) and revocation must take
  effect without waiting for a token to expire — short-lived sessions
  and server-side entitlement checks, not long-lived client claims.
- **No full mailbox by default.** Enrolled students do NOT get a
  GradeSpot mailbox by default. Rationale, recorded: mailbox hosting
  cost (paid Workspace, limited free tiers), spam/abuse surface,
  phishing risk if SPF/DKIM/DMARC are misconfigured, support burden
  ("I can't log into my mail"), and DPDP/GDPR responsibility for mail
  content — plus the fact that students already have mail they check,
  so a forced second mailbox reduces access to notes rather than
  improving it. The mailbox decision is governed by the hosting rule
  (free until mandatory): mail hosting is not domain renewal, so it
  needs its own mandatory-cost decision, not a silent rollout.
- **Aliases optional only with real benefit.** A GradeSpot alias /
  login identity (e.g. a student ID or an alias that forwards to the
  student's real mail) may be offered ONLY where it gives a real
  benefit (professional identity for institute cohorts, a single
  login label across surfaces) — not as a default, and not as a
  mailbox in disguise. Forwarding must be explicit to the student,
  with a stated retention and offboarding rule.
- **Full mailbox only for a demonstrated institutional requirement,
  with separate approvals.** A full per-student mailbox requires ALL
  of: a demonstrated institutional requirement (a named institute
  cohort that requires it, not "it would look professional"),
  a separate cost approval (hosting tier, per-seat cost, total),
  a separate security approval (SPF/DKIM/DMARC, anti-spam, phishing
  controls, offboarding/deletion on exit), and owner approval. Until
  all four exist, the answer is no mailbox.

## (d) Signup launch gate — ALL must be true before ANY signup button is shown

1. **Managed OAuth/OIDC** (Google primary, GitHub secondary) via the
   managed auth provider, with no GradeSpot-stored passwords for
   OAuth accounts and no browser-exposed service credentials.
2. **Verified identity:** email (and phone, where phone is used for
   recovery or counsellor contact) verified before the account can
   use any protected surface. Unverified accounts are identity-only
   and gated exactly like signed-out visitors.
3. **Shared-store rate limiting** (§(b)) live and tested, not
   per-instance memory.
4. **Secure sessions:** short-lived, server-validated sessions;
   secure + HttpOnly cookies (or the managed provider's equivalent);
   no tokens in URLs, logs, or client-readable storage beyond what
   the provider requires; session revocation on demand.
5. **Default-deny:** every protected route/API defaults to DENIED
   unless an entitlement explicitly allows it. A missing entitlement
   record is a denial, never a fallback to "allow".
6. **Enrollment checks:** a verified enrollment record must exist
   before any enrollment-gated entitlement is granted, and the check
   is server-side (Axon), never a client-side flag.
7. **Admin MFA / RBAC / audit:** staff accounts require MFA; roles
   (content editor, counsellor, certificate admin, super-admin, at
   minimum) are enforced server-side; every admin write is audit-
   logged (who / what / when / previous value). No price-publishing
   role exists until a pricing decision is recorded.
8. **Privacy:** data minimisation (name / phone / interest / message
   only for enquiries, plus what enrollment genuinely needs);
   DPDP + GDPR/UK GDPR handling stated before launch, including a
   rights-request process and timelines — no compliance claim until
   then (full DPDP duties apply from 13 May 2027).
9. **Recovery:** a tested account-recovery path that does not rely on
   support inventing identity (verified email/phone + provider
   recovery, with a staff-verified fallback for genuine edge cases).
10. **Negative authorization tests:** tests that PROVE denial —
    signed-out user denied, signed-in-but-not-enrolled user denied,
    enrolled-for-course-A user denied course-B content, expired /
    revoked entitlement denied, tampered client role claim denied.
    A launch with only positive ("it works when allowed") tests is
    not a launch.

**Prohibitions (explicit — any one of these is a launch blocker):**
signup-alone access to notes, labs, certificates, or paid content;
email-domain or user-ID alone as proof of enrollment; client-side
role assignment (any role claim the client can set); exposed
service-role credentials (in browser, build log, or repo); silent
account merging (see §(a)); OAuth login presented as payment,
completion, or certification proof.

## (e) Communications & network baseline

### Headers + TLS — verified on actual deployed responses, never assumed

- Verify on the ACTUAL deployed response (preview, then production),
  not on framework defaults: HSTS, CSP, X-Content-Type-Options,
  Referrer-Policy, Permissions-Policy, frame-ancestors, and
  Cache-Control for authenticated/personal responses.
- **HSTS:** `max-age=31536000` ONLY after readiness is confirmed
  (all subdomains served over HTTPS, no mixed-content breakage).
  **NO preload immediately, and NO `includeSubDomains` without
  auditing EVERY subdomain first** — a preload or subdomain directive
  that breaks an un-audited subdomain is a self-inflicted outage
  that cannot be quickly undone.
- **CSP:** explicit directives, minimizing `unsafe-inline`
  (especially `script-src` and `style-src`); the current
  `default-src 'self'` posture is the starting point, and any
  addition (a new origin, a new inline allowance) is a reviewed
  change with a stated reason, not a convenience edit.
- **Other headers (normative):** `X-Content-Type-Options: nosniff`;
  `Referrer-Policy` set explicitly (not left to browser default);
  `Permissions-Policy` restricting unused powerful features;
  `frame-ancestors 'none'` unless a specific embedding is justified
  and recorded; `Cache-Control: no-store` for authenticated and
  personal responses (never cache a counsellor dashboard, a student
  record, or a lead list in a shared cache).
- **TLS:** TLS 1.2+ only, no legacy ciphers, on the deployed edge —
  verified by an actual TLS probe of the deployed domain, not by a
  framework version number. **Static-export header delivery must be
  tested:** if a future export/static host cannot set headers, the
  header baseline must be re-satisfied at the edge/CDN layer before
  launch, not waived.

### Webhooks — signed, idempotent, durable, honestly timed

- **Signed verification against the raw body + a stored secret**
  (Meta signature verification for WhatsApp, equivalent for any
  other provider). Verification reads the RAW body — a parsed body
  re-serialized for verification is a verification bug.
- **Idempotency + duplicate suppression + timestamp validation where
  supported.** A retried webhook must not create a second lead, a
  second message, or a second counsellor alert.
- **Signature alone is NOT replay protection.** A valid signature on
  an old, replayed payload must still be rejected (timestamp window
  and/or one-time delivery IDs, per provider support).
- **Durable events, bounded retries.** Webhook events are persisted
  before processing; retries are bounded with backoff, and a
  permanently failing event lands in a staff review queue — it does
  not vanish, and it does not retry forever.
- **Staff review queue for unresolved leads.** Any lead that cannot
  be delivered, matched, or acknowledged lands in a queue a
  counsellor can work from, with its failure reason attached.
- **60-second objective, measured in three parts, never promised
  before evidence:** (i) acknowledgement acceptance (the platform
  received the lead), (ii) counsellor dispatch (a counsellor was
  alerted), (iii) delivery (the visitor received a reply). The
  "within 60 seconds" claim in the Axon flow file is an objective to
  be measured per part on a real run — it is not a promise until
  measured evidence exists for each part.

### Email — authentication before any transactional mail

- **SPF / DKIM / DMARC alignment verified against the ACTUAL sending
  service before the first transactional send** (not against a
  generic guide, and not assumed from "we set DNS once"). Alignment
  means the sending domain, the DKIM signing domain, and the
  From-domain line up for the service actually sending.
- **DMARC rollout: monitor, then tighten.** Start at `p=none` with
  reporting, fix alignment failures from real reports, then move to
  quarantine/reject only on evidence. A strict DMARC policy on day
  one, before alignment is proven, rejects legitimate GradeSpot mail.
- **Unsubscribe / suppression / consent for marketing.** Marketing
  mail (as distinct from transactional mail) requires consent
  records, a working unsubscribe, and a suppression list that is
  honoured across services. **Transactional vs promotional
  separation:** different sending streams (and, where the provider
  supports it, different subdomains/senders), so a marketing
  complaint never blocks a password-reset or enquiry-confirmation
  mail.

### n8n / Oracle VM — webhook-only, never a public admin

- **Dedicated reverse proxy exposing ONLY approved webhook paths.**
  No other n8n path, no other service on that host, is reachable
  from the internet through the proxy.
- **n8n editor/admin NEVER public.** The editor, the admin UI, and
  any management endpoint are reachable only through private access
  (VPN / restricted network path), never by public URL, and never
  with a default or shared credential.
- **Default-deny inbound.** The host firewall allows only the proxy
  webhook path (and the private admin path); everything else inbound
  is denied. Outbound is limited to the services n8n actually calls
  (WhatsApp, Brevo, Supabase/Axon) — a compromised workflow must not
  be able to phone arbitrary hosts.
- **Private admin access:** VPN or restricted key-based SSH only;
  **no public password SSH, ever.** Keys are per-person, revocable,
  and never shared.
- **Patching, non-root, least-privilege:** the host and n8n are kept
  patched on a stated cadence; services run non-root with
  least-privilege credentials; workflow credentials are stored in
  the workflow platform's secret store, never in workflow JSON
  committed to a repo.
- **Encrypted + tested backups:** workflow definitions, credentials
  (in their secret store), and any queued state are backed up
  encrypted, and a restore is tested — an untested backup is not a
  backup (same rule as contract §6.0).
- **Monitoring:** webhook failures, queue depth, and host health are
  monitored with an alert path that does not depend on the same host
  being healthy.

### RLS is NOT a complete tenant story

- **RLS does NOT protect service-role queries.** A service-role key
  bypasses RLS by design. Any Axon code path that uses a privileged
  key must therefore enforce authorization in APPLICATION code BEFORE
  the query — the query is the second check, never the first.
- **Tenant isolation needs app + DB tests:** RLS policies per tenant
  AND application-level tenant scoping, proven by cross-tenant
  tests (tenant A's request for tenant B's data is denied at both
  layers) before any third-party institute's student data arrives.
  `institute_id` alone is not isolation.
- **Background-job isolation:** jobs, queues, and scheduled workflows
  carry the tenant context of the data they touch and are scoped the
  same way as interactive requests — a job that processes "all
  leads" without a tenant filter is a cross-tenant leak.
- **Storage policies:** any file/object storage (student documents,
  certificates, note attachments) needs per-tenant/object policies
  and signed, time-limited access — never public buckets with
  guessable URLs.
- **Incident response BEFORE third-party institute data.** A written,
  rehearsed incident-response plan (who is contacted, how affected
  students/institutes are notified, how access is revoked, how
  evidence is preserved) must exist before the first third-party
  institute's data is accepted. Accepting that data without a plan
  is a launch blocker.

### Staff channel gate — before ANY counsellor/admin channel goes live

Managed identity (no shared staff passwords) + phishing-resistant MFA
where supported (authenticator / security key preferred over SMS) +
RBAC with least-privilege roles + audited changes (who / what / when /
previous value) + secure sessions (short-lived, revocable) +
protected APIs (authenticated, rate-limited, default-deny) +
reliable backups + **immediate revocation on staff exit** (a single
action that disables identity, sessions, and API access — an exit
checklist that takes days is not revocation) + minimum-necessary data
exposure (a counsellor sees only the leads/students they need, not
the whole database) + **no sensitive details in broad WhatsApp
groups, email subjects, URLs, or logs** (a lead's phone number, a
student's enrollment status, or a payment reference never belongs in
a group message, a subject line, a URL query string, or an
application log).

### Open owner action — GitHub over-scoped token (recorded, NOT actioned here)

The retaken GitHub token carries broader scopes than the repo-only
scope requested, including delete and admin scopes. This note records
it as an **open owner action: review and reduce/revoke through the
approved process.** This pass does NOT revoke, rotate, or modify any
token itself — token actions are owner actions, and a mistaken
revocation could break the push relay. The action is: owner reviews
the token's scopes, reduces it to repo-only (or revokes and reissues
repo-only) through the approved process, and records the new scope.
Until then, the token's broader scope is a known, open risk, not a
closed item.

---

## Deliberately NOT built by this note

No Axon server, no auth provider configuration, no OAuth app, no
signup UI, no student-ID issuance, no entitlement table, no mailbox,
no alias, no webhook, no n8n host change, no DNS change (SPF/DKIM/
DMARC), no header change, no paid WAF/hosting, no token revocation,
no live DB write, and no payment/Razorpay wiring. This note is a
baseline for future build decisions; every item in it still needs its
own build step, its own verification, and (for the owner-gated items)
its own owner word.

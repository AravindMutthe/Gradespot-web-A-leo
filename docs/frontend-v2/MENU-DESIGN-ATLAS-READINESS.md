# Menu / Design / Atlas-readiness review — GradeSpot Leo (Web A)

Branch-only pass, 2026-10-27. Branch `feat/frontend-v2-platform`, before
`e1785fa`, after this pass committed locally (see parent report for the
new tip). No push, no merge, no preview, no deploy, no live Supabase
write, no Atlas content merged, no repo wall breached.

## 0. Owner-rule corrections that govern this pass — read first

The parent's first brief for this pass said "no paid services in Leo".
That was WRONG and was corrected by the owner, twice, during this pass:

- **Correction, 18:33 IST:** "No paid services" means **no paid hosting
  and infra services** — GradeSpot hosting/infra must stay free-tier
  only, zero budget. It does NOT mean GradeSpot's business services
  are free, and it does NOT exclude paid business services.
- **Refinement, 18:35 IST:** the hosting/infra rule is **"free hosting/
  infra until mandatory (e.g. domain renewal)"** — not "never pay
  anything ever" and not "paid tiers allowed". The mandatory exception
  is a future category exception only: it authorises NO paid tier,
  upgrade, new paid service, or payment now, and any mandatory cost,
  when it actually arises, is decided with the owner's word at that
  time. The basis as the owner stated it: his customers, users and
  visitors.

Consequences applied in this pass:
- Paid **business** services return to their previous status:
  DEFERRED/GATED — pricing Set A vs Set B undecided, Razorpay stage
  not opened, no published price added, no payment path built. They
  are NOT excluded, NOT built now, and NOT removed from the site on
  the grounds that they might one day be paid. Published course fees
  already on the site (CCNA/CCNP) and the institute-tier contents
  (no amounts) were therefore LEFT ALONE. The draft-only deal-brief
  path stays draft-only; it was never a paid service.
- Paid **hosting/infra** is enforced: no Vercel Pro upgrade, no paid
  Supabase tier, no paid third-party tracker/analytics/font/library/
  hosting service, no paid CAPTCHA vendor, no paid search/AI tier
  was introduced or implied by anything in this pass. Everything
  added here is zero-cost and free-tier (Vitest devDependency only,
  no runtime dependency added).
- **Open tension, flagged not solved:** Vercel Hobby is recorded as
  prohibiting commercial use, which sits in tension with free-only
  hosting for a commercial business. This pass does NOT solve it by
  proposing a paid tier, and does NOT claim Hobby is fine for
  commercial production. It is an open item for a later decision.

Grep evidence (after this pass, repo code, `src/`):
- No paid hosting/infra service introduced: no match for Vercel Pro,
  Supabase Pro, paid-tier, upgrade-plan, gtag/GA, Hotjar, Mixpanel
  or any paid tracker (only the word "upgrade" in unrelated course
  copy, e.g. "upgrade their networking skills").
- No published business price added and no payment path built:
  the only payment-related UI remains the pre-existing draft-only
  deal-brief payment-method placeholder, which submits nothing and
  collects no card/bank/UPI details, and the pre-existing published
  CCNA/CCNP fees, which were not touched.
- No Atlas content in Leo: `grep -rn Atlas src/` returns only
  `src/data/atlas-integration.ts` and the `site-settings.ts` flag
  (see §3). No Atlas chapter, image, text, or data was copied.

## 1. Menu / options / naming — ratings and changes

### Ratings (before → after, judgement with evidence)

| Area | Before | After | Evidence |
|---|---|---|---|
| Academy | 8.5 | 9.0 | All links are real routes/anchors; the two missing catalogue categories (Design & CAD, Digital Marketing) are now linked; the vague "Other Existing Programs" is now the accurate "Medical Coding". Drag: level links still go to /trainings (honestly noted, Release 2). |
| Certifications | 8.0 | 8.5 | Featured panel already says "training toward certification — never a guarantee" and "certification itself is awarded by the vendor". Column renamed "Planned Pathways" → "Planned Vendor Training" (the old title implied pathways that do not exist). Drag: no /certifications route exists; group click still lands on /trainings. |
| Career Pathways | 7.5 | 8.5 | Biggest naming fix: featured title "Role roadmaps, not blog articles" implied roadmaps exist — now "Role routes, starting with real courses"; column "Roles — Release 2 roadmaps" → "Roles — courses today, roadmaps in Release 2". Drag: interactive roadmaps, skill matrices and readiness assessments are still Release 2, honestly noted on every link. |
| Labs & Projects | 7.5 | 8.5 | Featured panel already says "No Standalone Labs Portal Yet". Planned links renamed from noun labels ("Standalone Labs Portal", "Capstones & Portfolios", "Quizzes & Challenges") to action labels ("Ask about a standalone labs portal", etc.) so the /contact-us destination matches the action instead of looking like a dead product link. Drag: no labs portal, capstone catalogue, or quiz product exists yet. |
| IT Solutions | 8.5 | 8.5 | Unchanged. "For Business" is prominent here, not buried in Academy; every link is a real service page; featured panel says services are quoted to scope and no prices are published there. Business services are deferred/gated (see §0), not excluded. |
| Company & Resources | 8.0 | 8.0 | Unchanged. All links real; "Partner With Us" is honestly noted "Discussion invitation only". Drag: 11 links in one column is the longest column in the menu; acceptable, but the column would benefit from a split if it grows further (recorded, not changed — a split would touch the mega-panel layout). |
| Naming system as a whole | 8.0 | 8.5 | Clear English throughout, no duplicated/stacked languages on any label (GradeSpot public pages are clear-English; the Royal Salon Telugu-gate was NOT imported). No label now promises a product that does not exist without a Planned/Release 2 note. Drag: six group labels are locked by SPEC, so "Certifications" and "Labs & Projects" still name categories that are only partially built — the qualification lives in panels/notes, not in the group label itself. |
| Footer + header CTAs | 8.5 | 8.5 | Footer links are all real routes; the bottom strip "Pricing" points at the real /pricing route. Header CTA trio (Book Free Demo → /register, Explore Programs → /trainings, Talk to an Advisor → /contact-us) is config-driven via site-settings and renders identically by default; "Book Free Demo" is a free demo enquiry, not a purchase. No URL was deleted or redirected to an unrelated page by any change in this pass. |

### Every label changed (all in `src/data/nexus-nav.ts` unless noted)

1. "Other Existing Programs" → "Medical Coding" — the anchor was
   `#category-medical-coding`; the old label hid the destination.
2. Added "Design & CAD" (`#category-design-cad`) and "Digital
   Marketing" (`#category-digital-marketing`) to Academy → Programs.
   Both are real catalogue categories (verified in `courses.ts`);
   they were previously unreachable from the mega menu. No URL
   invented: anchors are generated by `catalogue-nav.ts` from the
   category name.
3. Certifications column "Planned Pathways" → "Planned Vendor
   Training" — the entries are vendor trainings, not pathways.
4. Career Pathways featured title "Role roadmaps, not blog articles"
   → "Role routes, starting with real courses".
5. Career Pathways column "Roles — Release 2 roadmaps" → "Roles —
   courses today, roadmaps in Release 2".
6. Labs & Projects planned links → "Ask about a standalone labs
   portal" / "Ask about capstones & portfolios" / "Ask about
   quizzes & challenges" (hrefs unchanged, `/contact-us`; notes
   unchanged).

### Labels checked and deliberately NOT changed

- The six group labels (Academy; Certifications; Career Pathways;
  Labs & Projects; IT Solutions; Company & Resources) — locked by
  SPEC v2; qualification is in panels/notes, not in the label.
- "Pricing Information" (menu) and "Pricing" (footer strip, page
  title) — the `/pricing` route exists and the page's published
  fees/institute contents are pre-existing business content; under
  the corrected rule they are deferred/gated, not excluded, so no
  rename or removal was made.
- "Get a Quote" / "Book a Consultation" (services) — enquiries and
  draft-only deal briefs, not payment paths; unchanged.
- "Pay after you Pass" (student-certifications page) — pre-existing
  live-site copy describing a training methodology, not a paid
  service published by this pass; left alone and recorded here so
  it is not mistaken for a new claim. It is NOT verified by this
  pass and must not be quoted as a verified GradeSpot policy.

## 2. Design / layout / images / illustrations — findings and fixes

### What was already compliant (verified, not assumed)

- **Tokens:** logo-sampled orange #E57439 + charcoal #434140, AA
  derivatives #C24E1F (4.77:1 on white) / #B84A1E-family #9C3E18
  (5.20:1 class) for text/buttons, dark lift #FF8A4C for
  brand-bright on ink. #E57439 alone (3.05:1) is correctly
  restricted to large/graphic use. No one-off hardcoded colour
  was introduced by this pass; all fixes use the token system.
- **Focus / motion:** `:focus-visible` 2px brand outline with
  2px offset in light and dark; `prefers-reduced-motion: reduce`
  handling present; anchored sections clear the sticky header.
- **Buttons:** primary/outline buttons are 50px minimum height
  (above the 44px AAA target); application table rows are 44px
  minimum. The single chrome breakpoint is `nav` (960px) for all
  chrome, which is why the 960–1280px compact range does not
  overflow (only Talk to an Advisor shows there).
- **Assets:** all images are local in `public/`; no hotlinked
  image, font, or script was found (external links are only
  outbound hrefs: Google Maps, OpenStreetMap copyright, YouTube
  video, digidefense.in blog — none is an embedded asset). Fonts
  are self-hosted woff2. Largest images are 226KB (map) and
  223KB (one certification photo); course images are 18–207KB —
  none is oversized for a Next.js Image-served page, and every
  `<Image>` use found carries `sizes` or fixed dimensions.
  Logo files were NEVER edited, recoloured, or cropped.
- **Alt text:** every `<Image>` use found carries an `alt` (or
  `alt=""` where decorative, correctly, in PromoBanner — the
  banner image is a background-style illustration whose text is
  already in the panel). Certification gallery alt text is the
  student's name + certification from the published alt text
  (e.g. "Madhav Sai — eJPT"), not a placeholder.
- **Privacy presentation:** CSP is `default-src 'self'` with no
  third-party trackers; the privacy page records the no-tracker
  fact; lead forms collect only name/phone/interest/message with
  a "received, not saved" honesty state for the log path. No
  consent wording change was needed because no new data
  collection was added by this pass.

### Fixes made in this pass

1. **Unverified "100+" certifications claim removed** (`src/app/
   student-certifications/page.tsx`): hero title was "Our Students
   100+ Certifications" and the metadata description repeated
   "100+ certifications", but the gallery on the page shows 30
   images and no 100+ count is verified in the repo. Before:
   "Our Students 100+ Certifications". After: "Our Students'
   Certifications", metadata description without the count.
   The gallery captions (real names + certifications) are
   untouched. The 17–18KB size of cert-1..12 vs ~190KB for the
   rest is noted but NOT claimed as fakery — it is consistent
   with different compression, and no evidence of fabrication
   was found.
2. **Footer link touch targets lifted** (`src/components/Footer.
   tsx`): `linkCls` padding `py-1` → `py-2`, with an honest code
   comment. Before: ~22px-tall link rows (below even the 24px
   WCAG 2.2 AA target-size floor for adjacent targets). After:
   ~36px rows, above the 24px AA floor. This is NOT claimed as
   44px — the 44px AAA target for footer links remains open
   (see below).

### Design gaps recorded, NOT fixed (with reasons)

- **Header chevron buttons are 24px wide** (`w-6`, `w-4` at the
  nav breakpoint) with 44px height. That meets the WCAG 2.2 AA
  24×24 target-size minimum but not the 44px AAA target. Not
  widened in this pass: widening them changes mega-menu spacing
  at the already-tight 960–1280px breakpoint, and the chevron is
  a supplementary control next to the full-width label link.
  Recorded as open, not claimed as fixed.
- **Dark-theme token contrast re-measurement is NOT MEASURED.**
  Brand-bright on ink is plausibly AA from the token comments,
  but no measured dark-theme contrast table exists in this repo
  for the Nexus token set. Not claimed.
- **No Lighthouse, axe, keyboard/screen-reader, or real-device
  test was run in this pass.** All design scores below are
  code-evidence judgements, not measured results. The phone tap
  check is still owed.
- **Illustration honesty, one item left open:** the homepage and
  course images are generic stock-style course images (not
  verified GradeSpot classroom photos). They are not presented
  as "our classroom" or "our students" in copy, so no false
  claim was found — but they must not be captioned as real
  GradeSpot photos later without verification. No image was
  replaced, because no image was found to imply a service or
  credential that is not verified.
- **No new UI library, no PWA** (logo 1600×498, not square, must
  never be cropped), no payments/pricing added, no layout
  breakpoint change. The 960–1280px range and mobile accordion
  were checked in code (single `nav` breakpoint, one-level
  mobile accordion) but NOT on a real device — recorded as
  NOT MEASURED.

### Design / layout / image ratings (before → after)

| Area | Before | After | Why |
|---|---|---|---|
| Design / layout system | 8.0 | 8.0 | Tokens, focus, motion, buttons, single breakpoint are already strong; footer target lift is too small to move the score. Drag: dark-theme contrast unmeasured, chevron width at AA not AAA. |
| Images / illustrations | 7.5 | 8.0 | Local, sized, alt-complete, logo untouched; the unverified "100+" claim that sat over the certification gallery is removed. Drag: course images are generic (not verified GradeSpot photos), cert-1..12 compression difference unexplained, no measured LCP/image-weight numbers. |

## 3. Atlas-readiness seam (future only)

**Implemented, disabled by default, renders nothing:**

- `src/data/atlas-integration.ts` (new): `AtlasIntegrationConfig`
  `{ enabled: false, deepLinkBase: "" }`,
  `atlasIntegrationEnabled()` (requires BOTH the flag AND a
  non-empty base URL), `atlasDeepLink(slug)` (returns `null`
  while disabled; otherwise `{base}/chapters/{slug}`).
- `src/data/site-settings.ts`: `features.atlasIntegrationEnabled:
  false` added to the config seam, following the existing
  promotions/settings pattern, so a future Axon-served settings
  row can carry the same field with no component change.
- **Proof it renders nothing while OFF:** `grep -rn Atlas src/`
  returns only `atlas-integration.ts` and the `site-settings.ts`
  flag — no component, page, menu, or footer imports the seam
  or renders an Atlas link, title, chapter, or image. The two
  new unit tests assert `atlasIntegrationEnabled() === false`
  and `atlasDeepLink("example-chapter") === null` by default,
  plus the both-conditions-required rule and the link format
  when both are set (with an example.invalid base, never a real
  Atlas URL).

**What a future integration would need (documented, NOT built):**
a versioned, stable Atlas API or deep-link contract owned by
Atlas (e.g. `GET /api/atlas/chapters/{slug}` → `{slug, title,
url}`, deep links `{atlasBaseUrl}/chapters/{slug}`); Leo calls
or links to that contract at render time, never copies Atlas
content into Leo's repo, never reads an Atlas customer database,
and never presents Atlas chapters, reading modes, or research
as Leo's own content; Atlas stays a separate product with its
own repo, design, and release identifier; Leo shows at most a
clearly-labelled link ("Explore the Aravind Systems Atlas") to
the Atlas site; owner approval is required before the flag is
ever flipped on or any Atlas link renders; and the integration
itself must follow the hosting rule in §0 (free-tier until
mandatory, e.g. domain renewal — no paid tier introduced
through it).

**Atlas-readiness rating: 3.0 → 7.0.** Before: no seam existed
at all, so a future integration would have required ad-hoc
wiring. After: the seam, flag, contract shape, and tests exist
and are proven to render nothing while off. It is NOT 10/10
because no contract exists yet, no Atlas endpoint was probed,
and no link renders — readiness is the seam, not the
integration.

## 4. Overall Web A score after this pass

**Unchanged: 8.1/10 (V2).** The menu/naming (+0.5 on its own
pillar) and images (+0.5) gains are real but small, and they
sit inside pillars that were already strong; they do not move
the overall score, because the overall score is still capped
by the same unmeasured items (Lighthouse, CWV, axe,
keyboard/screen-reader, real-device/phone-tap evidence) and by
the still-open Phase 3A gaps (no Axon contract, DB-vs-local
governance, no webhook/60-second touch). Claiming 8.2 or higher
on label renames and one removed stat would be score inflation.
The menu, design, and image pillar scores above are the
movement; the overall stays 8.1 until measurement evidence
arrives.

## 5. What was deliberately NOT done, and why

- No published business price, institute tier, course fee, or
  deal-brief budget range was removed or qualified away — the
  corrected rule (§0) makes business services deferred/gated,
  not excluded. (The first brief's "paid services excluded"
  reading was wrong; this document supersedes it.)
- No paid hosting/infra tier, upgrade, tracker, font, library,
  CAPTCHA, search, or AI tier was added, proposed, or implied.
- No Atlas content, chapter, image, or data was copied into
  Leo; no Atlas repo, design, or release identifier was touched.
- No new full UI library, no PWA, no payments/pricing path, no
  logo/token/nav-group/project-wall change, no URL deleted or
  redirected to an unrelated page.
- No component/E2E coverage was faked: the only new tests are
  pure-logic tests for the Atlas seam (see §3).
- No measured claim was made: Lighthouse, CWV, axe, keyboard/
  screen-reader, and real-device results remain NOT MEASURED.

# Careers page — spec (2026-10-27)

Status: **DRAFT, new route only. Not linked, not committed, not deployed.**
Route: `/careers` — file `src/app/careers/page.tsx` (new file only).
Branch: `feat/frontend-v2-platform`. Created against tip `a2c3eee`
(the parallel fix-preview commit had already landed when this draft
was written; the task brief cited `9248d58`).

## What the page contains

- Metadata: “Careers at GradeSpot IT Solutions”, path `/careers`,
  using the repo's existing `staticPageMetadata` helper.
- Hero: “Careers — Work with GradeSpot”, with GradeSpot described
  only in already-published terms: IT training and IT services,
  Dilsukhnagar, Hyderabad, online and classroom classes.
- A disambiguation box at the top: learner career support is a
  different page (`/career-support`), linked from the box. This
  Careers page is for people interested in working at GradeSpot.
- An “About GradeSpot” section linking only to existing routes:
  `/about-us`, `/services`, `/trainings`.
- An “Individual openings” section that lists **no** opening. It
  states plainly that no role, location, work mode, salary,
  requirement, or closing date is stated, because none has been
  supplied for publication, and that a role will appear only once
  GradeSpot supplies its details and approves them for publication.
- Expression of interest only, via existing routes: `/contact-us`
  (primary CTA) and `/register` (the site's existing enquiry route).
  The page states explicitly that this is an expression of interest,
  not an application for a listed opening, and that it does not
  promise a response, an interview, or a role. It also states that
  the register route does not create a job application and does not
  collect a resume.
- Breadcrumb JSON-LD, following the `/career-support` pattern.

## What the page deliberately does NOT claim

- No “we are hiring”, “job opening”, “vacancy”, “urgent requirement”,
  or equivalent claim.
- No salary, benefit, perk, work-from-home/hybrid mode, interview
  step, deadline, headcount, or placement-partner claim.
- No fee, batch date, testimonial, trainer, or learner-count claim.
- No new email address, form endpoint, or resume-upload flow.
- No internal/spec language in customer copy: no “Release 2”,
  “Planned”, “invented”, “real catalogue”, or “TODO”.

## Facts GradeSpot must supply before ANY opening can be listed

For each role, all of the following (a missing item stays blank —
it is never guessed):

1. Role title (exact wording for publication).
2. Location (city / site, or “remote” only if GradeSpot confirms it).
3. Work mode (onsite / hybrid / remote — only if confirmed).
4. Salary or range — or an explicit “not disclosed” instruction.
5. Responsibilities (what the person will actually do).
6. Requirements (skills, experience, qualifications — only real ones).
7. Application route (which existing form, email, or process —
   must already exist or be built and approved separately; no route
   is invented here).
8. Closing date, if any (otherwise the listing must say none, or
   carry no date at all).
9. Who approves the listing for publication, and the date approved.

Until at least items 1–7 are supplied and approved, the openings
section must stay in its current “does not list individual openings”
form. A partially supplied role must not be published with the gaps
filled in by assumption.

## Follow-up integration — NOT done by this draft

Deliberately left to the parent, after the parallel fix preview
lands, so the fix preview stays clean:

1. Menu option in Company & Resources (in `src/data/nexus-nav.ts`).
2. Footer link (in `src/components/Footer.tsx`).
3. Sitemap entry (in `src/app/sitemap.ts`).
4. Header/menu/search index behaviour for the new route, if the
   header search derives from menu data.
5. Commit, push, and preview-only deploy — separate parent steps.
   No merge and no production deploy is authorised by this spec.

## Verification (recorded by the draft author)

- Build and local smoke results are reported in the parent handoff
  (see the subagent's final report), not in this file, so this spec
  never claims a result it did not run.
- Forbidden-claim grep on the new page must be 0 for salary /
  benefit / hiring / opening claims, except the honest “does not
  list individual openings” statement and the `/career-support`
  disambiguation.

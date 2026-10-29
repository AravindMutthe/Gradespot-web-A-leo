// Shared enquiry-form identity (forms redesign): ONE class set for
// LeadForm, LpLeadForm and RegisterForm, so the three forms read as a
// single modern system instead of three near-identical copies.
//
// THEME-ADAPTIVE BY CONSTRUCTION: every color below is a Tailwind
// utility built on a token from the @theme block in
// src/app/globals.css. There is deliberately NO hex value, NO rgba()
// literal, and NO arbitrary color in this file, so a later Gate 1
// token change restyles all three forms with zero form edits. The
// card shadow uses Tailwind's default shadow scale (no custom color).
//
// Contrast notes (measured pairs recorded in globals.css):
// - Card text on the white surface: heading/body at 14.63:1, muted
//   helper at 7.58:1 — AA normal PASS.
// - Eyebrow in signal-strong (brand-dark) on white: 6.74:1 — PASS.
// - Fields sit on the muted surface tint; field text (heading ink)
//   on that tint is well above AA; on focus the field returns to the
//   white surface with a brand border and brand ring.
// - Errors use the field-error token on white; success uses the
//   success tokens on their tint. Brand text is NEVER placed on the
//   brand tint, and the bright accent is NEVER body text on white —
//   both standing rules are honoured by simply not using those
//   combinations anywhere in this file.
export const leadFormCard =
  "rounded-3xl border border-line border-t-[3px] border-t-brand bg-surface p-6 shadow-xl sm:p-8";

export const leadFormEyebrow =
  "mb-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-signal-strong";

export const leadFormField =
  "w-full rounded-xl border border-line bg-surface-muted px-4 py-3 text-[15px] text-heading outline-none transition placeholder:text-muted focus:border-brand focus:bg-surface focus:ring-2 focus:ring-brand/20";

export const leadFormLabel = "block text-sm font-semibold text-heading";

export const leadFormErrorText = "mt-1 text-xs text-field-error";

export const leadFormHelper = "mt-3 text-center text-xs leading-5 text-body";

export const leadFormSuccess =
  "mt-4 rounded-lg bg-success-surface p-4 text-sm text-success-text";

export const leadFormErrorPanel =
  "mt-4 rounded-lg bg-error-surface p-4 text-sm text-error-text";

// Fast-submit confirm panel (Das recommendation): a human who submits
// faster than MIN_SUBMIT_MS is asked to confirm, never auto-rejected.
// Token-only, like every other constant in this file.
export const leadFormConfirm =
  "mt-4 rounded-lg border border-line bg-surface-muted p-4 text-sm text-body";

export const leadFormWaButton =
  "mt-3 inline-block rounded-xl bg-wa px-5 py-2.5 font-semibold text-white transition-transform hover:scale-[1.03]";

// Honeypot wrapper: visually hidden, and the input itself also carries
// aria-hidden, tabIndex -1 and autoComplete off in each form. The
// server rejects a filled honeypot with a generic error only.
export const leadFormHoneypot =
  "pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0";

// Deal-brief validation — Nexus deal/agreement/exchange forms ONLY.
//
// This schema is deliberately separate from @/lib/lead-validation and
// from /api/leads. The leads pipeline is an enquiry pipeline: its
// schema has no billing/legal-address or deal fields, and unknown
// fields are ignored by validateLead, so sending a deal brief through
// /api/leads would silently drop the address and deal terms the user
// thought they had submitted. The DealAgreementForm therefore does
// NOT post to /api/leads at all — it validates client-side with this
// Zod schema and produces a draft brief the user reviews and shares
// themselves (see the component). A future server endpoint
// (/api/deal-briefs, with its own storage, rate limits and auth) is
// still a gap; when it exists it must run this same schema
// server-side before accepting anything.
//
// What this is NOT: no payment is collected or changed, no card,
// bank or UPI details are accepted, and nothing here signs an
// agreement. Budget bands are the respondent's indicative budget,
// never GradeSpot prices — GradeSpot publishes no deal prices in
// this form, and the pricing Set A vs Set B decision is still open.

import { z } from "zod";

export const DEAL_TYPES = [
  "service-agreement",
  "partnership",
  "enterprise-training",
  "payment-arrangement",
  "other-exchange",
] as const;

export type DealType = (typeof DEAL_TYPES)[number];

export const DEAL_TYPE_LABELS: Record<DealType, string> = {
  "service-agreement": "Service agreement",
  partnership: "Partnership",
  "enterprise-training": "Enterprise training deal",
  "payment-arrangement": "Payment / billing arrangement",
  "other-exchange": "Other exchange of value or obligations",
};

export const ACCOUNT_TYPES = [
  "individual",
  "business",
  "institute",
  "other-organisation",
] as const;

export type AccountType = (typeof ACCOUNT_TYPES)[number];

export const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  individual: "Individual",
  business: "Business / company",
  institute: "Institute / college",
  "other-organisation": "Other organisation",
};

// Countries GradeSpot is published as serving, plus an explicit
// "Other" so international clients are never forced into an Indian
// address shape. State/region is a selector for India (the primary
// market) and free text elsewhere — see the component.
export const DEAL_COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "France",
  "Germany",
  "Other",
] as const;

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
] as const;

export const TIMELINES = [
  "within-2-weeks",
  "within-1-month",
  "1-3-months",
  "3-6-months",
  "flexible",
] as const;

export const TIMELINE_LABELS: Record<(typeof TIMELINES)[number], string> = {
  "within-2-weeks": "Within 2 weeks",
  "within-1-month": "Within 1 month",
  "1-3-months": "1–3 months",
  "3-6-months": "3–6 months",
  flexible: "Flexible / to be discussed",
};

// Indicative budget bands the respondent picks for themselves.
// These are NOT GradeSpot prices, fees or quotes.
export const BUDGET_RANGES = [
  "to-be-scoped",
  "up-to-25000",
  "25000-100000",
  "100000-500000",
  "above-500000",
  "prefer-not-to-say",
] as const;

export const BUDGET_RANGE_LABELS: Record<(typeof BUDGET_RANGES)[number], string> = {
  "to-be-scoped": "To be scoped / not sure yet",
  "up-to-25000": "Up to ₹25,000 (indicative)",
  "25000-100000": "₹25,000 – ₹1,00,000 (indicative)",
  "100000-500000": "₹1,00,000 – ₹5,00,000 (indicative)",
  "above-500000": "Above ₹5,00,000 (indicative)",
  "prefer-not-to-say": "Prefer not to say",
};

const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function postalError(country: string, value: string): string | null {
  const v = value.trim();
  if (country === "India") {
    if (!/^\d{6}$/.test(v)) return "Enter a 6-digit Indian PIN code";
  } else if (country === "United States") {
    if (!/^\d{5}(-\d{4})?$/.test(v)) return "Enter a US ZIP code (5 digits, or ZIP+4)";
  } else if (country === "United Kingdom") {
    if (!/^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/.test(v))
      return "Enter a UK postcode (e.g. SW1A 1AA)";
  } else if (v.length < 3 || v.length > 20 || !/^[A-Za-z0-9][A-Za-z0-9 -]*$/.test(v)) {
    return "Enter a postal code (3–20 letters, digits, spaces or hyphens)";
  }
  return null;
}

const baseSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "Enter a first name (at least 2 characters)")
    .max(60, "First name is too long (max 60 characters)")
    .refine((v) => NAME_PATTERN.test(v) && !/[-'.]$/.test(v), {
      message: "First name may only contain letters, spaces, hyphens, apostrophes and dots",
    }),
  lastName: z
    .string()
    .trim()
    .min(2, "Enter a last name (at least 2 characters)")
    .max(60, "Last name is too long (max 60 characters)")
    .refine((v) => NAME_PATTERN.test(v) && !/[-'.]$/.test(v), {
      message: "Last name may only contain letters, spaces, hyphens, apostrophes and dots",
    }),
  email: z
    .string()
    .trim()
    .min(1, "Enter the authorized contact's email")
    .max(160, "Email address is too long")
    .refine((v) => EMAIL_PATTERN.test(v), { message: "Enter a valid email address" }),
  phone: z
    .string()
    .trim()
    .refine(
      (v) => {
        const digits = v.replace(/[\s\-()]/g, "").replace(/^\+/, "");
        return /^\d{7,15}$/.test(digits) && !/^(\d)\1+$/.test(digits);
      },
      { message: "Enter a valid phone number (7–15 digits, optional + country code)" },
    ),
  organisation: z.string().trim().max(200, "Organisation name is too long (max 200 characters)"),
  accountType: z.enum(ACCOUNT_TYPES),
  dealType: z.enum(DEAL_TYPES),
  scope: z
    .string()
    .trim()
    .min(20, "Describe the scope in at least 20 characters so the brief is usable")
    .max(2000, "Scope is too long (max 2000 characters)"),
  deliverables: z
    .string()
    .trim()
    .min(10, "List the expected deliverables (at least 10 characters)")
    .max(2000, "Deliverables are too long (max 2000 characters)"),
  timeline: z.enum(TIMELINES),
  budgetRange: z.enum(BUDGET_RANGES),
  decisionMaker: z
    .string()
    .trim()
    .min(5, "Tell us who signs off on scope and payment (at least 5 characters)")
    .max(300, "Decision-maker details are too long (max 300 characters)"),
  successCriteria: z
    .string()
    .trim()
    .min(10, "Tell us how you will know this worked (at least 10 characters)")
    .max(2000, "Success criteria are too long (max 2000 characters)"),
  country: z.enum(DEAL_COUNTRIES),
  addressLine1: z
    .string()
    .trim()
    .min(3, "Enter address line 1")
    .max(200, "Address line 1 is too long (max 200 characters)"),
  addressLine2: z.string().trim().max(200, "Address line 2 is too long (max 200 characters)"),
  city: z.string().trim().min(2, "Enter a city").max(100, "City is too long (max 100 characters)"),
  stateRegion: z
    .string()
    .trim()
    .min(2, "Enter a state or region")
    .max(100, "State or region is too long (max 100 characters)"),
  postalCode: z.string().trim().min(1, "Enter a ZIP / postal code").max(20),
  vatGst: z.string().trim().max(50, "VAT / GST number is too long (max 50 characters)"),
});

export const dealBriefSchema = baseSchema.superRefine((data, ctx) => {
  // Organisation is the legal counterparty for a deal: required for
  // every account type except a private individual.
  if (data.accountType !== "individual" && data.organisation.trim().length < 2) {
    ctx.addIssue({
      code: "custom",
      path: ["organisation"],
      message: "Organisation is required for this account type",
    });
  }
  const err = postalError(data.country, data.postalCode);
  if (err) {
    ctx.addIssue({ code: "custom", path: ["postalCode"], message: err });
  }
});

export type DealBrief = z.infer<typeof dealBriefSchema>;

/** Client-side validation helper: returns field errors, or the
 *  cleaned brief when valid. Mirrors the shape of validateLead's
 *  return so form code reads the same way. */
export function validateDealBrief(
  body: unknown,
): { data: DealBrief; errors: Record<string, string> } | { data: null; errors: Record<string, string> } {
  const parsed = dealBriefSchema.safeParse(body);
  if (parsed.success) return { data: parsed.data, errors: {} };
  const errors: Record<string, string> = {};
  for (const issue of parsed.error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!errors[key]) errors[key] = issue.message;
  }
  return { data: null, errors };
}

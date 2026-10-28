// LP rebuild (Frontend 3.0, Das 7-step spine) — pins the rebuilt
// landing pages at the model + template-source level (the repo has
// no component-rendering test setup, so rendered output is pinned
// by the live fetch in the checkpoint, as with demo-fill):
//   1. exactly the 11 existing LP URLs, unchanged, one per
//      full-detail course; no new LP; every LP builds a model
//      (fail closed: catalogue-only / held / missing detail = null);
//   2. Das 7-step spine order in the template source (hero ->
//      overview -> enquiry -> syllabus -> audience -> outcomes ->
//      final enquiry), with proof only where matched and the
//      cross-link before the final enquiry;
//   3. Stage 7 lead honesty on the LP form: recorded panel carries
//      the recorded wording + WhatsApp continuation, no timing
//      promise; the 503 body `message` field is read (not only
//      `error`); no "sent" success state;
//   4. honesty removals: no FAQPage schema and no generated FAQ
//      set on LP; no free-demo assertion; no job-ready SOC
//      wording anywhere in LP model values; no CCNA copy on the
//      CCNP LP (zero shared topic/role strings); no gated
//      lesson probes ("iaas", "shodan") in LP model values,
//      metadata or schema; no legal-entity claim in the LP
//      footer source; no pricing/countdown/seat/salary/
//      instructor/batch-date/fee facts in LP model values;
//   5. vocabulary lock on LP model values: no Register, no
//      Enrol; certification courses carry preparation (not
//      award) wording; SOC carries aligned-not-certified;
//   6. two-tier gating: LP model exposes AREAS only — no
//      lesson-level detail in any LP value, metadata or schema;
//   7. demo-fill marking on LP: every sample LP renders the
//      Sample tag + DemoLegend + sample color; sample values
//      never appear in verified LP values; MERGE GATE: zero
//      sample markers before any production deploy;
//   8. vendor marks + variants: exactly the four demo-image
//      marks on their LPs (never "authorized partner" framing);
//      SOC carries the EC-Council mark as alignment only;
//      Hardware + Digital Marketing carry no vendor mark;
//      variant split 6/4/1, presentation only;
//   9. nav-free: the LP template source contains no site
//      header/footer/nav/search markup (only the simplified
//      logo + phone bar);
//  10. max-zoom structural preconditions: no fixed pixel widths,
//      no fixed-height cards, no nowrap in the LP template
//      source; hero heading wraps (max-w), enquiry panel stacks
//      (fractional grid), logo/phone bar wraps (flex-wrap).
// Visual verification (rendering, phone, max zoom) is owed by the
// parent — these tests pin structure, not pixels.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { courses } from "@/data/courses";
import { getSampleCourse } from "@/lib/demo-fill";
import {
  LP_VENDOR_MARKS,
  LP_VARIANT_BY_SLUG,
  buildLpModel,
  courseSlugForLpSlug,
  lpSlugFor,
} from "@/lib/lp-model";
import { lpPageMetadata } from "@/lib/metadata";
import { courseSchema } from "@/lib/schema";

const LP_PAGE = readFileSync("src/app/lp/[slug]/page.tsx", "utf8");
const LP_FORM = readFileSync("src/components/LpLeadForm.tsx", "utf8");

const EXPECTED_LP_SLUGS = [
  "azure-fundamentals-az-900",
  "azure-administrator-az-104",
  "ccna-200-301",
  "ccnp-350-401-encor",
  "certified-ethical-hacker-ceh",
  "comptia-network-plus",
  "comptia-pentest-plus",
  "comptia-security-plus",
  "computer-hardware-and-networking",
  "digital-marketing",
  "soc-analyst",
];

const SAMPLE_LP_SLUGS = ["ccna-200-301", "ccnp-350-401-encor", "digital-marketing"];

const FORBIDDEN_VALUE = /guarantee|job-ready|100% success|become certified|industry-approved|official partner|authorized partner|limited seats|countdown|salary|₹\s?\d|batch date|trainer:/i;

function lpValues(lp: ReturnType<typeof buildLpModel>) {
  if (!lp) throw new Error("expected an LP model");
  return [
    lp.h1,
    lp.displayTitle,
    lp.who,
    lp.level,
    lp.certification,
    lp.durationLabel,
    lp.mode,
    lp.outcomeLine,
    lp.metaDescription,
    ...lp.topics,
    ...lp.roles,
  ].join("\n");
}

describe("LP inventory: exactly the 11 existing LPs, URLs unchanged", () => {
  it("every full-detail course has exactly one LP and nothing else does", () => {
    const full = courses.filter((c) => !c.catalogOnly).map((c) => c.slug);
    expect(full.sort()).toEqual([...EXPECTED_LP_SLUGS].sort());
    for (const slug of EXPECTED_LP_SLUGS) {
      expect(buildLpModel(slug)).not.toBeNull();
      expect(lpSlugFor(slug)).toBe(`${slug}-in-hyderabad`);
    }
    // No Docker, Linux, finance, business-services or institutions LP.
    for (const slug of ["docker", "linux", "finance", "business-services", "institutions"]) {
      expect(buildLpModel(slug)).toBeNull();
    }
  });

  it("LP slugs round-trip to course slugs; bare course slugs never resolve as LPs", () => {
    for (const slug of EXPECTED_LP_SLUGS) {
      expect(courseSlugForLpSlug(lpSlugFor(slug))).toBe(slug);
    }
    expect(courseSlugForLpSlug("azure-administrator-az-104-in-hyderabad")).toBe(
      "azure-administrator-az-104",
    );
    expect(courseSlugForLpSlug("azure-administrator-az-104")).toBeNull();
    expect(courseSlugForLpSlug("in-hyderabad")).toBeNull();
  });

  it("catalogue-only courses and unknown slugs fail closed (no LP model)", () => {
    const catalogOnly = courses.filter((c) => c.catalogOnly);
    expect(catalogOnly.length).toBeGreaterThan(0);
    for (const c of catalogOnly) expect(buildLpModel(c.slug)).toBeNull();
    expect(buildLpModel("no-such-course")).toBeNull();
  });
});

describe("Das 7-step spine order in the LP template", () => {
  it("sections appear in spine order: hero, overview, enquiry, syllabus, audience, outcomes, final enquiry", () => {
    // Sequential search from each found step: the file header
    // comment names the steps too, so a plain indexOf would hit
    // the comment before the rendered section.
    const order = [
      '<section className="bg-ink text-white">', // step 1 hero
      "Learning overview", // step 2
      "Enquire about this course", // step 3
      "Syllabus and practical topics", // step 4
      "Who it", // step 5 (Who it's for)
      "Learning outcomes", // step 6
      "Ready to learn", // step 7 final enquiry
    ];
    let from = 0;
    for (const step of order) {
      const pos = LP_PAGE.indexOf(step, from);
      expect(pos, `missing spine step after position ${from}: ${step}`).toBeGreaterThan(-1);
      from = pos + 1;
    }
  });

  it("the enquiry form sits in step 3, not in the hero", () => {
    expect(LP_PAGE.indexOf("<LpLeadForm")).toBeGreaterThan(
      LP_PAGE.indexOf("Enquire about this course"),
    );
    const hero = LP_PAGE.slice(0, LP_PAGE.indexOf("Learning overview"));
    expect(hero).not.toContain("<LpLeadForm");
  });

  it("proof and cross-link sit between outcomes and final enquiry", () => {
    const outcomes = LP_PAGE.indexOf("Learning outcomes");
    const proof = LP_PAGE.indexOf("What students say");
    const cross = LP_PAGE.indexOf("See the full course page");
    const final = LP_PAGE.indexOf("Ready to learn");
    expect(proof).toBeGreaterThan(outcomes);
    expect(cross).toBeGreaterThan(proof);
    expect(final).toBeGreaterThan(cross);
  });
});

describe("Stage 7 lead honesty on the LP form", () => {
  it("recorded panel: recorded wording + WhatsApp continuation, no timing promise", () => {
    expect(LP_FORM).toContain("received and recorded");
    expect(LP_FORM).toContain("Continue on WhatsApp");
    expect(LP_FORM).not.toContain("will call shortly");
    expect(LP_FORM).not.toContain("keep your phone nearby");
  });

  it("the 503 body message field is read (not only error)", () => {
    expect(LP_FORM).toContain("body.message");
    expect(LP_FORM).toContain("body.error");
    // Distinctive branch checks: "body.errors" (the validation
    // branch) contains "body.error" as a prefix, so compare the
    // full branch conditions, not the bare substrings.
    expect(LP_FORM.indexOf('body.message === "string"')).toBeLessThan(
      LP_FORM.indexOf('body.error === "string"'),
    );
  });

  it("no sent success state remains on the LP form", () => {
    expect(LP_FORM).not.toContain('state === "sent"');
    expect(LP_FORM).not.toContain('setState("sent")');
    expect(LP_FORM).toContain('useState<"idle" | "sending" | "recorded" | "error">');
  });

  it("idempotency key is sent per attempt", () => {
    expect(LP_FORM).toContain("Idempotency-Key");
    expect(LP_FORM).toContain("newIdempotencyKey()");
  });
});

describe("LP honesty removals", () => {
  it("no FAQPage schema and no generated FAQ set on LP", () => {
    expect(LP_PAGE).not.toContain("faqSchema");
    expect(LP_PAGE).not.toContain("FAQPage");
    expect(LP_PAGE).not.toContain("generatedCourseFaqs");
    expect(LP_PAGE).not.toContain("FaqList");
  });

  it("no free-demo assertion anywhere on LP", () => {
    expect(LP_PAGE).not.toContain("Free demo class available");
    expect(LP_FORM).not.toContain("Free demo class available");
    for (const slug of EXPECTED_LP_SLUGS) {
      expect(lpValues(buildLpModel(slug))).not.toContain("Free demo class available");
    }
  });

  it("no job-ready SOC wording and no forbidden claims in any LP model value", () => {
    for (const slug of EXPECTED_LP_SLUGS) {
      const values = lpValues(buildLpModel(slug));
      expect(values).not.toMatch(/job-ready/i);
      expect(values).not.toMatch(FORBIDDEN_VALUE);
    }
    const soc = buildLpModel("soc-analyst")!;
    expect(soc.h1).not.toMatch(/job/i);
    expect(soc.durationLabel).toBe("Duration confirmed on enquiry");
  });

  it("CCNP LP carries no CCNA copy: zero shared topic or role strings", () => {
    const ccna = buildLpModel("ccna-200-301")!;
    const ccnp = buildLpModel("ccnp-350-401-encor")!;
    const sharedTopics = ccnp.topics.filter((t) => ccna.topics.includes(t));
    const sharedRoles = ccnp.roles.filter((r) => ccna.roles.includes(r));
    expect(sharedTopics).toEqual([]);
    expect(sharedRoles).toEqual([]);
    expect(ccnp.topics.length).toBeGreaterThan(0);
  });

  it("gated lesson probes never appear in LP values, metadata or schema", () => {
    for (const slug of EXPECTED_LP_SLUGS) {
      const lp = buildLpModel(slug)!;
      const course = courses.find((c) => c.slug === slug)!;
      const schema = JSON.stringify(
        courseSchema(course, {
          displayTitle: lp.displayTitle,
          suppressOffers: true,
          description: lp.metaDescription,
          credentialAwarded: lp.sample ? null : undefined,
        }),
      );
      const meta = lpPageMetadata(lp, `/lp/${lp.lpSlug}`);
      const haystack = `${lpValues(lp)}\n${schema}\n${JSON.stringify(meta)}`.toLowerCase();
      expect(haystack).not.toContain("iaas");
      expect(haystack).not.toContain("shodan");
    }
  });

  it("no legal-entity claim in the LP footer source", () => {
    expect(LP_PAGE).not.toContain("Pvt. Ltd.");
    expect(LP_PAGE).toContain("GradeSpot IT Solutions —");
  });

  it("no layout-break facts: no pricing table, countdown, seat, salary, batch date or fee figure", () => {
    for (const slug of EXPECTED_LP_SLUGS) {
      expect(lpValues(buildLpModel(slug))).not.toMatch(
        /₹|Rs\.?\s?\d|limited seats|seats left|batch starts|starting \d/i,
      );
    }
    expect(LP_PAGE).not.toContain("pricing");
    // Instructor BLOCKS are a template concern (a verified role
    // word like "instructor" in a roles list is not a block).
    expect(LP_PAGE).not.toMatch(/instructor/i);
  });
});

describe("LP vocabulary lock", () => {
  it("no Register / Enrol wording in any LP model value", () => {
    for (const slug of EXPECTED_LP_SLUGS) {
      expect(lpValues(buildLpModel(slug))).not.toMatch(/register|enrol/i);
    }
  });

  it("certification courses carry preparation wording, never award wording", () => {
    const az900 = buildLpModel("azure-fundamentals-az-900")!;
    expect(az900.outcomeLine).toMatch(/Prepares for .* — preparation for an examination, not the award of a certification/);
    const soc = buildLpModel("soc-analyst")!;
    expect(soc.outcomeLine).toMatch(/aligned, not certified/);
    const hw = buildLpModel("computer-hardware-and-networking")!;
    expect(hw.outcomeLine).toMatch(/course completion certificate/);
  });

  it("sample outcome lines claim no credential", () => {
    for (const slug of SAMPLE_LP_SLUGS) {
      const lp = buildLpModel(slug)!;
      expect(lp.outcomeLine).toMatch(/confirmed on enquiry/);
      expect(lp.outcomeLine).not.toMatch(/certified/i);
    }
  });
});

describe("LP two-tier gating + schema discipline", () => {
  it("LP schema carries Course only: no Offer, no AggregateRating, no JobPosting, no FAQPage", () => {
    for (const slug of EXPECTED_LP_SLUGS) {
      const lp = buildLpModel(slug)!;
      const course = courses.find((c) => c.slug === slug)!;
      const schema = courseSchema(course, {
        displayTitle: lp.displayTitle,
        suppressOffers: true,
        description: lp.metaDescription,
        credentialAwarded: lp.sample ? null : undefined,
      }) as Record<string, unknown>;
      expect(schema["@type"]).toBe("Course");
      expect(schema.offers).toBeUndefined();
      expect(schema.aggregateRating).toBeUndefined();
      expect(JSON.stringify(schema)).not.toContain("FAQPage");
      expect(JSON.stringify(schema)).not.toContain("JobPosting");
    }
  });

  it("sample LPs omit the awarded-credential field; verified LPs keep it", () => {
    for (const slug of SAMPLE_LP_SLUGS) {
      const lp = buildLpModel(slug)!;
      const course = courses.find((c) => c.slug === slug)!;
      const schema = courseSchema(course, {
        displayTitle: lp.displayTitle,
        suppressOffers: true,
        description: lp.metaDescription,
        credentialAwarded: null,
      }) as Record<string, unknown>;
      expect(schema.educationalCredentialAwarded).toBeUndefined();
    }
    const az = buildLpModel("azure-fundamentals-az-900")!;
    const azCourse = courses.find((c) => c.slug === az.slug)!;
    const azSchema = courseSchema(azCourse, {
      displayTitle: az.displayTitle,
      suppressOffers: true,
      description: az.metaDescription,
    }) as Record<string, unknown>;
    expect(azSchema.educationalCredentialAwarded).toBe("Microsoft AZ-900");
  });

  it("LP metadata is neutral: no Enroll tail, no job-ready title, self-referential canonical path", () => {
    for (const slug of EXPECTED_LP_SLUGS) {
      const lp = buildLpModel(slug)!;
      const meta = lpPageMetadata(lp, `/lp/${lp.lpSlug}`);
      const description = String(meta.description ?? "");
      expect(description).not.toMatch(/enroll today|enroll now|job-ready/i);
      expect(description).not.toContain("gsitssolutions.com");
      expect(String(meta.title)).toContain("Training in Hyderabad");
    }
  });
});

describe("LP demo-fill marking", () => {
  it("exactly the 3 held LPs are samples; all other LPs are verified", () => {
    for (const slug of EXPECTED_LP_SLUGS) {
      expect(buildLpModel(slug)!.sample).toBe(SAMPLE_LP_SLUGS.includes(slug));
    }
  });

  it("sample records carry roles + sample:true; sample values never leak into verified LPs", () => {
    for (const slug of SAMPLE_LP_SLUGS) {
      const sample = getSampleCourse(slug);
      expect(sample?.sample).toBe(true);
      expect(sample?.roles?.length).toBeGreaterThan(0);
      expect(buildLpModel(slug)!.roles).toEqual(sample!.roles);
    }
    const verifiedTopics = EXPECTED_LP_SLUGS.filter((s) => !SAMPLE_LP_SLUGS.includes(s)).flatMap(
      (s) => buildLpModel(s)!.topics,
    );
    for (const slug of SAMPLE_LP_SLUGS) {
      for (const topic of buildLpModel(slug)!.topics) {
        expect(verifiedTopics).not.toContain(topic);
      }
    }
  });

  it("the LP template renders SampleTag + DemoLegend on sample LPs", () => {
    expect(LP_PAGE).toContain("SampleTag");
    expect(LP_PAGE).toContain("DemoLegend");
    expect(LP_PAGE).toContain("lp.sample && <DemoLegend />");
    expect(LP_PAGE).toContain("text-sample");
    expect(LP_PAGE).toContain("border-sample");
  });

  it("sample LPs carry the sample summary; verified LPs carry no summary text", () => {
    for (const slug of SAMPLE_LP_SLUGS) {
      const lp = buildLpModel(slug)!;
      expect(lp.sampleSummary.length).toBeGreaterThan(0);
      expect(lp.sampleSummary).toBe(getSampleCourse(slug)!.summary);
    }
    for (const slug of EXPECTED_LP_SLUGS.filter((s) => !SAMPLE_LP_SLUGS.includes(s))) {
      expect(buildLpModel(slug)!.sampleSummary).toBe("");
    }
  });
});

describe("LP vendor marks + presentation variants", () => {
  it("exactly four demo-image marks, on the right LPs, never partner framing", () => {
    expect(Object.keys(LP_VENDOR_MARKS).sort()).toEqual(
      [
        "azure-administrator-az-104",
        "azure-fundamentals-az-900",
        "ccna-200-301",
        "ccnp-350-401-encor",
        "certified-ethical-hacker-ceh",
        "comptia-network-plus",
        "comptia-pentest-plus",
        "comptia-security-plus",
        "soc-analyst",
      ].sort(),
    );
    expect(LP_VENDOR_MARKS["azure-fundamentals-az-900"].vendor).toBe("Microsoft");
    expect(LP_VENDOR_MARKS["ccna-200-301"].vendor).toBe("Cisco");
    expect(LP_VENDOR_MARKS["comptia-network-plus"].vendor).toBe("CompTIA");
    expect(LP_VENDOR_MARKS["certified-ethical-hacker-ceh"].vendor).toBe("EC-Council");
    for (const mark of Object.values(LP_VENDOR_MARKS)) {
      expect(mark.image).toMatch(/^\/images\/vendors\//);
      expect(mark.imageWidth).toBeGreaterThan(0);
      expect(mark.imageHeight).toBeGreaterThan(0);
    }
    expect(LP_PAGE).toContain("Vendor alignment:");
    expect(LP_PAGE).not.toMatch(/authorized partner|official partner/i);
  });

  it("SOC carries the EC-Council mark as alignment only; Hardware + DM carry no mark", () => {
    expect(buildLpModel("soc-analyst")!.vendorMark?.vendor).toBe("EC-Council");
    expect(buildLpModel("computer-hardware-and-networking")!.vendorMark).toBeNull();
    expect(buildLpModel("digital-marketing")!.vendorMark).toBeNull();
  });

  it("variant split is 6 cloud-infra / 4 cybersecurity / 1 digital-marketing, presentation only", () => {
    const counts: Record<string, number> = {};
    for (const slug of EXPECTED_LP_SLUGS) {
      const variant = LP_VARIANT_BY_SLUG[slug];
      counts[variant] = (counts[variant] ?? 0) + 1;
      expect(buildLpModel(slug)!.variant).toBe(variant);
    }
    expect(counts).toEqual({ "cloud-infra": 6, cybersecurity: 4, "digital-marketing": 1 });
    // Variants do not rename courses or alter taxonomy: the LP
    // category matches the course category, and the H1 is built
    // from the model's own short title.
    for (const slug of EXPECTED_LP_SLUGS) {
      const lp = buildLpModel(slug)!;
      const course = courses.find((c) => c.slug === slug)!;
      expect(lp.category).toBe(course.category);
      expect(lp.h1).toBe(`${lp.short} Training in Hyderabad`);
      expect(lp.short.length).toBeGreaterThan(0);
    }
  });

  it("proof appears only for the two matched testimonials", () => {
    expect(buildLpModel("azure-administrator-az-104")!.testimonial?.name).toBe("Arif Syed");
    expect(buildLpModel("soc-analyst")!.testimonial?.name).toBe("M Vamsi");
    for (const slug of EXPECTED_LP_SLUGS.filter(
      (s) => !["azure-administrator-az-104", "soc-analyst"].includes(s),
    )) {
      expect(buildLpModel(slug)!.testimonial).toBeNull();
    }
    // The old CEH mapping (pallavi's SOC review on the CEH LP) is gone.
    expect(buildLpModel("certified-ethical-hacker-ceh")!.testimonial).toBeNull();
  });
});

describe("LP nav-free chrome", () => {
  it("the LP template has no site header/footer/nav/search markup", () => {
    expect(LP_PAGE).not.toContain("<Header");
    expect(LP_PAGE).not.toContain("<Footer");
    expect(LP_PAGE).not.toContain("<SearchBox");
    expect(LP_PAGE).not.toContain("site-nav");
    expect(LP_PAGE).toContain("logo-light.png");
    expect(LP_PAGE).toContain("Call:");
  });
});

describe("LP max-zoom structural preconditions", () => {
  it("no fixed pixel widths, no fixed-height cards, no nowrap in the LP template", () => {
    // Lookbehind excludes max-w-[...] (a cap, not a fixed width).
    expect(LP_PAGE).not.toMatch(/(?<![a-zA-Z-])w-\[\d+px\]/);
    expect(LP_PAGE).not.toMatch(/(?<![a-zA-Z-])h-\[\d+px\]/);
    expect(LP_PAGE).not.toContain("whitespace-nowrap");
    expect(LP_PAGE).not.toContain("min-w-[");
  });

  it("hero heading wraps, enquiry panel stacks, logo/phone bar wraps", () => {
    expect(LP_PAGE).toContain("max-w-4xl");
    expect(LP_PAGE).toContain("lg:grid-cols-[1fr_380px]");
    expect(LP_PAGE).toContain("lg:grid-cols-[1.6fr_1fr]");
    expect(LP_PAGE).toContain("flex-wrap items-center justify-between");
    expect(LP_PAGE).toContain("rounded-2xl");
  });
});

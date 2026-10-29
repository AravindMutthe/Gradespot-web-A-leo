// Gate 1 decisions + Das form decisions + Call/Enquire display swap
// (branch feat/main-finish-gates, 2026-10-29). Source-assertion style,
// matching the rest of this suite (no component renderer installed).
//
// Every decision here is owner-delegated with a logged rationale and
// may be overruled by the owner; this file pins what was built, not
// what must stay forever.
import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const read = (rel: string) =>
  readFileSync(new URL(rel, import.meta.url), "utf8");

const SRC_DIR = new URL("../src", import.meta.url).pathname;
function allSrc(): { file: string; src: string }[] {
  const out: { file: string; src: string }[] = [];
  const walk = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(tsx|ts)$/.test(e.name) && !/\.test\./.test(e.name))
        out.push({ file: p.replace(SRC_DIR + "/", ""), src: readFileSync(p, "utf8") });
    }
  };
  walk(SRC_DIR);
  return out;
}

const GLOBALS = read("../src/app/globals.css");
const FOOTER = read("../src/components/Footer.tsx");
const HEADER = read("../src/components/Header.tsx");
const STICKY = read("../src/components/SiteStickyBar.tsx");
const LP = read("../src/app/lp/[slug]/page.tsx");
const DETAIL = read("../src/app/trainings/[slug]/page.tsx");
const CONTACT = read("../src/app/contact-us/page.tsx");
const REGISTER_PAGE = read("../src/app/register/page.tsx");
const REGISTER_FORM = read("../src/components/RegisterForm.tsx");
const CONTRACT = read("../src/lib/lead-contract.ts");

// Relative-luminance contrast, same computation as the globals.css
// header comment (WCAG 2.2).
function luminance(hex: string): number {
  const c = [1, 3, 5].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

describe("Gate 1 items 2/3: Fraunces restricted to H1 + major H2", () => {
  it("base rules split: h1/h2 display, h3/h4 sans", () => {
    expect(GLOBALS).toMatch(/h1,\s*h2\s*\{\s*@apply font-display text-heading/);
    expect(GLOBALS).toMatch(/h3,\s*h4\s*\{\s*@apply font-sans text-heading/);
  });

  it("footer subheads carry an explicit font-sans class", () => {
    expect(FOOTER).toContain("font-sans font-semibold text-paper");
    expect(FOOTER).not.toContain("font-display");
  });

  it("no h3 anywhere still carries font-display", () => {
    for (const { file, src } of allSrc()) {
      expect(src, file).not.toMatch(/<h3[^>]*font-display/);
    }
  });

  it("h2 display uses and decorative display uses are retained", () => {
    // h2s keep Fraunces (23 explicit uses); decorative non-heading
    // uses (stat numerals, quote glyph, badges, table headers) are
    // display numerals, not heading hierarchy, so they stay.
    expect(GLOBALS).toMatch(/h1,\s*h2\s*\{\s*@apply font-display/);
    const decorative = allSrc().some(({ src }) =>
      /<(p|span|th)[^>]*font-display/.test(src),
    );
    expect(decorative).toBe(true);
  });
});

describe("Gate 1 item 4: blue content links", () => {
  it("action tokens exist and pass AA normal on white and canvas", () => {
    expect(GLOBALS).toContain("--color-action: #2563eb;");
    expect(GLOBALS).toContain("--color-action-dark: #1e40af;");
    expect(contrast("#2563eb", "#ffffff")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#2563eb", "#f8fafc")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#1e40af", "#ffffff")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#1e40af", "#f8fafc")).toBeGreaterThanOrEqual(4.5);
  });

  it("no content link still uses signal colours (nav + buttons excepted)", () => {
    for (const { file, src } of allSrc()) {
      if (file.endsWith("components/Breadcrumbs.tsx")) continue; // nav
      for (const tag of src.match(/<(Link|a)\b[^>]*>/g) ?? []) {
        if (tag.includes("btn-")) continue; // button treatment
        expect(tag, `${file}: ${tag.slice(0, 100)}`).not.toContain("text-signal");
      }
    }
  });

  it("a content page uses the blue link treatment", () => {
    expect(read("../src/app/about-us/page.tsx")).toContain("text-action");
  });
});

describe("Gate 1 items 1/5/7/8/9/10/11: adopted as built, prunes only", () => {
  it("door accents and button shape survive unchanged", () => {
    expect(GLOBALS).toContain("--color-door-training: #c24e1f;");
    expect(GLOBALS).toContain("--color-door-business: #0f766e;");
    expect(GLOBALS).toContain("@utility btn-primary");
  });

  it("only the proven zero-use tokens were pruned", () => {
    expect(GLOBALS).not.toContain("--color-charcoal:");
    expect(GLOBALS).not.toContain("--color-navy-deep:");
    for (const { file, src } of allSrc()) {
      expect(src, file).not.toMatch(/className="[^"]*(charcoal|navy-deep)/);
    }
  });

  it("no sample violet token exists (item 11 moot after the purge)", () => {
    expect(GLOBALS).not.toMatch(/violet|sample/i);
  });
});

describe("Das Part B(b): Register speaks enquiry language", () => {
  it("heading, button and success use the exact Das strings", () => {
    expect(REGISTER_PAGE).toContain('title="Register Your Interest"');
    expect(REGISTER_PAGE).toContain('title: "Register Your Interest"');
    expect(REGISTER_FORM).toContain('"Send Enquiry"');
    expect(REGISTER_FORM).toContain("Your enquiry has been recorded");
    expect(REGISTER_FORM).not.toContain('"Registering…"');
    expect(REGISTER_FORM).not.toContain(
      "Thank you — your registration enquiry has been received and recorded",
    );
  });

  it("the 503 state reads as clearly unconfirmed, never success", () => {
    expect(CONTRACT).toContain("We couldn't confirm your enquiry as recorded");
  });
});

describe("Call / Enquire display swap (owner order)", () => {
  it("no old Call/Enquire display string survives anywhere in src", () => {
    for (const { file, src } of allSrc()) {
      for (const old of ["Call {phone}", "Call: {phone}", "Call Now", "Enquire Now"]) {
        expect(src, `${file}: ${old}`).not.toContain(old);
      }
    }
  });

  it("Call controls read 📞 Call with an aria-hidden emoji", () => {
    for (const src of [HEADER, STICKY, FOOTER, LP, CONTACT]) {
      expect(src).toMatch(/aria-hidden="true">📞<\/span> Call/);
    }
    // tel: targets are untouched — only the displayed text changed.
    expect(HEADER).toContain("telHref(phone)");
    expect(STICKY).toContain("telHref(phone)");
    expect(FOOTER).toContain("telHref(phone)");
    expect(CONTACT).toContain("telHref(p)");
  });

  it("Enquire controls read ✉️ Enquire with an aria-hidden emoji", () => {
    for (const src of [STICKY, LP, DETAIL]) {
      expect(src).toMatch(/aria-hidden="true">✉️<\/span> Enquire/);
    }
    // Data-driven labels (nav, search/category rows) wrap the emoji
    // at render; the label data itself stays plain text.
    expect(HEADER).toContain('label: "✉️ Enquire"');
    expect(HEADER).toContain('link.label.startsWith("✉️")');
    expect(FOOTER).toContain('link.label.startsWith("✉️")');
  });

  it("WhatsApp, Free Counselling and the floating Register link are untouched", () => {
    expect(LP).toContain("WhatsApp");
    expect(LP).toContain("Free Counselling");
    expect(read("../src/components/FloatingActions.tsx")).toContain("WhatsApp");
    // The floating bar's third action still links to /register as
    // "Register" — Part C lists enquiry controls, not this link.
    expect(read("../src/components/FloatingActions.tsx")).toContain("Register");
  });

  it("the number survives ONLY in the flagged prose/data surfaces", () => {
    // Allowlist (each explained in the branch report): the data
    // definition itself, meta descriptions (not visible UI), and
    // prose mentions inside FAQ answers / policy body text — plain
    // strings that cannot host a Call control without restructuring
    // the FAQ/policy data model. No tel anchor displays a number.
    const allowed = new Set([
      "data/site.ts",
      "app/contact-us/page.tsx",
      "app/privacy-policy/page.tsx",
      "app/training-institute-in-dilsukhnagar-hyderabad/page.tsx",
      "components/ui.tsx",
      "data/pages.ts",
    ]);
    for (const { file, src } of allSrc()) {
      if (/(91826 54056|9182654056)/.test(src)) {
        expect(allowed.has(file), `${file} shows the number`).toBe(true);
      }
      // Inner content only: the opening tag itself legitimately
      // contains {p} (key) and telHref(p) (href).
      for (const m of src.matchAll(/<a\b[^>]*telHref\([^)]*\)[^>]*>([\s\S]*?)<\/a>/g)) {
        expect(m[1]).not.toMatch(/\{phone\}|\{p\}|54056/);
      }
    }
  });
});

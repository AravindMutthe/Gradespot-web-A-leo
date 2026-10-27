"use client";

import { useEffect, useState } from "react";
import { siteSettings } from "@/data/site-settings";

// Bot-check fields shared by ALL lead forms (LeadForm, RegisterForm,
// LpLeadForm). Server enforcement lives in lib/bot-check.ts and
// /api/leads — these fields only supply the signals; they never
// decide anything on the client.
//
// - Honeypot: plausible name ("website"), positioned off-screen with
//   a class-based position (never type="hidden", never inline
//   display:none), aria-hidden, tabindex -1, autocomplete off, so
//   screen readers, keyboard users and autofill never touch it.
// - Timing: formStartedAt is set on mount (after hydration), so the
//   server can reject submissions faster than a human could type
//   (siteSettings.botCheck.minSeconds). If JS is off, the field is
//   absent and the server fails open on timing — the honeypot and
//   rate limit still apply.
export default function BotFields() {
  const [startedAt, setStartedAt] = useState<number | null>(null);
  useEffect(() => {
    setStartedAt(Date.now());
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }}
      >
        <label htmlFor="bot-website">Website</label>
        <input
          id="bot-website"
          name={siteSettings.botCheck.honeypotField}
          type="text"
          autoComplete="off"
          tabIndex={-1}
          defaultValue=""
        />
      </div>
      <input type="hidden" name="formStartedAt" value={startedAt ?? ""} />
    </>
  );
}

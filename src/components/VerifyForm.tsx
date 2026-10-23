"use client";

import { useState } from "react";

interface VerifyResponse {
  found: boolean;
  certificate?: { code: string; studentName: string; course: string; issuedOn: string | null };
  message?: string;
}

export default function VerifyForm() {
  const [code, setCode] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [result, setResult] = useState<VerifyResponse | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setResult(null);
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = (await res.json()) as VerifyResponse;
      setResult(data);
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <form
        onSubmit={onSubmit}
        className="rounded-lg bg-white p-7 shadow-[0_5px_30px_rgba(214,215,216,0.57)]"
      >
        <label htmlFor="cert-code" className="text-sm font-semibold text-heading">
          Certificate Code
        </label>
        <input
          id="cert-code"
          type="text"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your certificate code"
          className="mt-2 w-full rounded border border-neutral-300 px-4 py-3 text-[15px] text-heading outline-none focus:border-brand"
        />
        <button type="submit" disabled={state === "loading"} className="btn-primary mt-4 w-full disabled:opacity-60">
          {state === "loading" ? "Verifying…" : "Verify Certificate"}
        </button>
      </form>

      {state === "error" && (
        <p className="mt-4 rounded bg-red-50 p-4 text-sm text-red-700">
          Something went wrong while verifying. Please try again or contact us.
        </p>
      )}
      {state === "done" && result && !result.found && (
        <p className="mt-4 rounded bg-amber-50 p-4 text-sm text-amber-800">
          No certificate was found for this code. Please check the code and try again — or
          contact us and we will help you verify it.
        </p>
      )}
      {state === "done" && result?.found && result.certificate && (
        <div className="mt-4 rounded bg-green-50 p-5 text-sm text-green-900">
          <p className="text-base font-semibold">✓ Certificate verified</p>
          <dl className="mt-2 space-y-1">
            <div>
              <dt className="inline font-semibold">Code: </dt>
              <dd className="inline">{result.certificate.code}</dd>
            </div>
            <div>
              <dt className="inline font-semibold">Student: </dt>
              <dd className="inline">{result.certificate.studentName}</dd>
            </div>
            <div>
              <dt className="inline font-semibold">Course: </dt>
              <dd className="inline">{result.certificate.course}</dd>
            </div>
            {result.certificate.issuedOn && (
              <div>
                <dt className="inline font-semibold">Issued: </dt>
                <dd className="inline">{result.certificate.issuedOn}</dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </div>
  );
}

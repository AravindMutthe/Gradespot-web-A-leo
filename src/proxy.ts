import { NextResponse } from "next/server";

// Security headers, single-sourced here (next.config.ts carries the
// remaining static headers only — see DECISIONS.md §25.29 for why the
// CSP is NOT nonce-based: a per-request nonce was implemented and
// tested, and it stamps dynamic routes only. Prerendered pages serve
// their build-time HTML unchanged, so a nonce CSP would block their
// inline Next.js RSC payload and break hydration. The policy below is
// therefore the strictest CSP that keeps the prerendered site working:
// script/style 'unsafe-inline' are required by Next's prerendered inline
// scripts and by React style attributes respectively. worker-src 'none'
// and manifest-src 'self' are safe additions: the codebase uses no web
// workers and ships no web app manifest.
export default function proxy() {
  const res = NextResponse.next();
  // 2026-10-27 audit fix: Vercel's preview feedback script
  // (vercel.live/feedback.js) was blocked by the CSP on previews,
  // logging a console error. Allow it ONLY on preview deployments;
  // production CSP is unchanged, and no new 'unsafe-inline' is added.
  const isPreview = process.env.VERCEL_ENV === "preview";
  const scriptSrc = `'self' 'unsafe-inline'${isPreview ? " https://vercel.live" : ""}`;
  res.headers.set(
    "Content-Security-Policy",
    `default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; worker-src 'none'; manifest-src 'self'`,
  );
  res.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

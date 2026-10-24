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
export function middleware() {
  const res = NextResponse.next();
  res.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; worker-src 'none'; manifest-src 'self'",
  );
  res.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

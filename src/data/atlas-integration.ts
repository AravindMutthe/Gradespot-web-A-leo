// Atlas integration seam — FUTURE ONLY (2026-10-27 menu/design/Atlas pass).
//
// Leo must be ABLE to take Atlas integration later, but NO Atlas content
// is merged into Leo now: no Atlas chapter, image, text, or data is copied
// into this repo, no repo wall is breached, and no public page renders
// anything Atlas-related while this seam is disabled (the default).
//
// FUTURE CONTRACT (what a real integration would need — NOT built here):
// - A stable Atlas API or deep-link contract owned by Atlas, versioned,
//   e.g. GET /api/atlas/chapters/{slug} returning { slug, title, url }
//   and deep links of the form {atlasBaseUrl}/chapters/{slug}.
// - Leo calls that contract (or links to it) at render time; it never
//   copies Atlas content into Leo's repo, never reads an Atlas customer
//   database, and never presents Atlas chapters, reading modes, or
//   research as Leo's own content.
// - Atlas stays a separate product with its own repo, design, and
//   release identifier; Leo shows at most a clearly-labelled link
//   ("Explore the Aravind Systems Atlas") to the Atlas site.
// - Owner approval is required before the flag below is ever flipped
//   on, and before any Atlas link renders on a public page.
// - Hosting/infra rule (corrected 2026-10-27, refined 18:35 IST):
//   free hosting/infra until mandatory (e.g. domain renewal).
//   That mandatory exception is a future category exception only:
//   it authorises NO paid tier, upgrade, or payment now, and any
//   mandatory cost, when it actually arises, is decided with the
//   owner's word at that time. Any future Atlas integration must
//   itself follow that rule — no paid hosting, search, or AI tier
//   may be introduced through it.
//
// This module is pure logic so it can be unit-tested without rendering
// anything. While `enabled` is false, every accessor returns the
// disabled result and no component should render an Atlas link.

export interface AtlasIntegrationConfig {
  /** Master switch. Default false. Flipping it on requires the future
   *  Atlas API/deep-link contract AND owner approval (see above). */
  enabled: boolean;
  /** Atlas site base URL, used ONLY to build deep links when enabled.
   *  Empty while disabled, so no link can be built by accident. */
  deepLinkBase: string;
}

export const atlasIntegrationConfig: AtlasIntegrationConfig = {
  enabled: false,
  deepLinkBase: "",
};

/** Returns true only when Atlas integration is enabled AND a deep-link
 *  base is configured. Both conditions are required. */
export function atlasIntegrationEnabled(
  config: AtlasIntegrationConfig = atlasIntegrationConfig,
): boolean {
  return config.enabled && config.deepLinkBase.trim().length > 0;
}

/** Builds a deep link to an Atlas chapter, or null while disabled.
 *  A null result means: render nothing Atlas-related. */
export function atlasDeepLink(
  slug: string,
  config: AtlasIntegrationConfig = atlasIntegrationConfig,
): string | null {
  if (!atlasIntegrationEnabled(config)) return null;
  const clean = slug.trim().replace(/^\/+/, "");
  if (!clean) return null;
  const base = config.deepLinkBase.replace(/\/+$/, "");
  return `${base}/chapters/${clean}`;
}

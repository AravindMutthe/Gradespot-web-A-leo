import type { MetadataRoute } from "next";

// Robots (§25.21): the Leo build is the ranking entity, so the sitemap
// is self-referential. No standing rule against AI crawlers was found,
// so AI/search crawlers are explicitly allowed alongside the wildcard
// allow — this is the AEO surface (llms.txt + FAQ/answer content).
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "PerplexityBot",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((agent) => ({ userAgent: agent, allow: "/" })),
    ],
    sitemap: "https://leo-web-a.vercel.app/sitemap.xml",
  };
}

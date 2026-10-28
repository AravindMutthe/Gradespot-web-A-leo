// Vitest-only alias config: mirrors the tsconfig "@/*" path mapping
// (src/*) so tests can import lib modules that use "@/..." imports.
// No app behaviour change; Next.js does not read this file.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.join(root, "src"),
    },
  },
});

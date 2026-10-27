import path from "node:path";
import { defineConfig } from "vitest/config";

// Minimal Vitest config: only maps the @/ alias from tsconfig.json.
// No test environment, no plugins — the suite is pure-logic only.
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    include: ["tests/**/*.test.ts"],
  },
});

import { defineConfig } from "vitest/config";

// No plugins here on purpose: the filter tests are plain TypeScript, and pulling the
// Solid/Tailwind plugins in clashes with the Vite copy that vitest bundles.
export default defineConfig({
  test: { environment: "node", include: ["src/**/*.test.ts"] },
});

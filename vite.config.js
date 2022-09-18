/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  test: {
    environment: "jsdom",
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
    // Solid needs to be inline to work around
    // a resolution issue in vitest:
    deps: {
      inline: [/solid-js/],
    },
    // If you have few tests, try commenting one
    // or both out to improve performance:
    // threads: false,
    // isolate: false,
  },
  plugins: [react()],
  resolve: {
    conditions: ["development", "browser"],
  },
});

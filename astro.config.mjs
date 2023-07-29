import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/edge";
import lit from "@astrojs/lit";
import { SITE_URL } from "./src/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({
    analytics: true,
  }),
  site: SITE_URL,
  integrations: [
    mdx({
      drafts: true,
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    lit(),
  ],
  markdown: {
    shikiConfig: {
      theme: "poimandres",
      wrap: true,
    },
  },
});

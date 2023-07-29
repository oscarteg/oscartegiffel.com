import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { SITE_URL } from "./src/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({
    analytics: true,
  }),
  build: {
    split: true,
  },
  site: SITE_URL,
  integrations: [
    mdx({
      drafts: true,
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => !page.includes("/api/"),
    }),
  ],

  markdown: {
    shikiConfig: {
      theme: "poimandres",
      wrap: true,
    },
  },
});

import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { SITE_URL } from "./src/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: "hybrid",
  adapter: vercel({
    webAnalytics: true,
    speedInsights: true,
  }),
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
    syntaxHighlight: "prism",
  },
  prefetch: true,
});

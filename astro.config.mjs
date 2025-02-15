import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/config";

import solidJs from "@astrojs/solid-js";
import { remarkModifiedTime } from "./src/utils";

export default defineConfig({
  site: SITE_URL,
  output: "server",
  adapter: vercel({
    webAnalytics: true,
    speedInsights: true,
    imageService: true,
  }),
  integrations: [
    mdx({
      drafts: true,
    }),
    sitemap(),
    solidJs(),
  ],
  markdown: {
    remarkPlugins: [remarkModifiedTime],
    syntaxHighlight: "prism",
  },
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
  },
});

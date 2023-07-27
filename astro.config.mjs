import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import serverless from "@astrojs/vercel/serverless";
import lit from "@astrojs/lit";
import image from "@astrojs/image";
import { SITE_URL } from "./src/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: serverless(),
  site: SITE_URL,

  integrations: [
    mdx(),
    tailwind({
      applyBaseStyles: false,
    }),
    lit(),
    image(),
  ],
  markdown: {
    shikiConfig: {
      theme: "poimandres",
      wrap: true,
    },
  },
});

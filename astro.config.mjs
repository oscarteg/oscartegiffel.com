import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import image from "@astrojs/image";
import vercel from "@astrojs/vercel/edge";

// https://astro.build/config
export default defineConfig({
  site: "https://oscartegiffel.com",
  integrations: [mdx(), sitemap(), tailwind(), react(), image()],
  output: "server",
  adapter: vercel(),
});

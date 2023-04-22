import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import vercel from "@astrojs/vercel/serverless";
import lit from "@astrojs/lit";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  site: "https://oscartegiffel.com",
  integrations: [mdx(), tailwind(), image(), lit()],
});

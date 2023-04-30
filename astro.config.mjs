import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import serverless from "@astrojs/vercel/serverless";
import lit from "@astrojs/lit";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: serverless(),
  site: "https://oscartegiffel.com",
  integrations: [mdx(), tailwind(), lit()],
});

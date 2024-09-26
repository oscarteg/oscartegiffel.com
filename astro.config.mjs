import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/config";

import solidJs from "@astrojs/solid-js";

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
		solidJs(),
	],
	markdown: {
		syntaxHighlight: "prism",
	},
	prefetch: true,
});

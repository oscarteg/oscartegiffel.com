import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/config";

import solidJs from "@astrojs/solid-js";
import { remarkModifiedTime } from "./src/utils";

export default defineConfig({
	site: SITE_URL,
	output: "hybrid",
	adapter: vercel({
		webAnalytics: true,
		speedInsights: true,
	}),
	integrations: [
		mdx({
			drafts: true,
		}),
		tailwind({
			applyBaseStyles: false,
		}),
		sitemap(),
		solidJs(),
	],
	markdown: {
		remarkPlugins: [remarkModifiedTime],
		syntaxHighlight: "prism",
	},
	prefetch: true,
});

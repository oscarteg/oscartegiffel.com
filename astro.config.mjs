import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";
import { SITE_URL } from "./src/config";

import { remarkModifiedTime } from "./src/utils";

export default defineConfig({
	site: SITE_URL,
	output: "static",
	server: {
		port: 8080,
		host: "0.0.0.0",
	},
	// /principles became /taste. Keep the old URL working, but keep it out of
	// the sitemap so crawlers only see the canonical one.
	redirects: {
		"/principles": "/taste",
	},
	integrations: [
		mdx({
			drafts: true,
		}),
		sitemap({ filter: (page) => !page.includes("/principles") }),
	],
	markdown: {
		remarkPlugins: [
			remarkModifiedTime,
			remarkMath,
			[remarkToc, { heading: "toc", maxDepth: 3 }],
		],
		rehypePlugins: [rehypeKatex],
		shikiConfig: {
			wrap: true,
			// A muted theme, so code doesn't compete with the single tan accent.
			// The background is overridden to bare paper in global.css.
			theme: "vitesse-light",
		},
	},
	prefetch: false,
	vite: {
		plugins: [tailwindcss()],
	},
});

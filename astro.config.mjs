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
	integrations: [
		mdx({
			drafts: true,
		}),
		sitemap(),
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
			// Muted themes, so code doesn't compete with the single Braun-orange
			// accent. Backgrounds are overridden to raised paper in global.css.
			themes: {
				light: "vitesse-light",
				dark: "vitesse-black",
			},
		},
	},
	prefetch: false,
	vite: {
		plugins: [tailwindcss()],
	},
});

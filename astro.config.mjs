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
			themes: {
				light: "gruvbox-light-hard",
				dark: "gruvbox-dark-hard",
			},
		},
	},
	prefetch: true,
	vite: {
		plugins: [tailwindcss()],
	},
});

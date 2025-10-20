import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkToc from "remark-toc";

import solidJs from "@astrojs/solid-js";
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
		solidJs(),
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
		},
	},
	prefetch: true,
	vite: {
		plugins: [tailwindcss()],
	},
});

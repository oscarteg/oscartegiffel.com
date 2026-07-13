import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
	schema: ({ image }) =>
		z.object({
			cover: image().optional(),
			description: z.string().optional(),
			draft: z.boolean().optional(),
			image: z.string().optional(),
			publishDate: z
				.date()
				.or(z.date())
				.transform((val) => new Date(val)),
			resources: z
				.array(
					z.object({
						title: z.string().optional(),
						url: z.string().url(),
					}),
				)
				.default([]),
			series: z.string().optional(),
			seriesOrder: z.number().optional(),
			showResources: z.boolean().optional().default(true),
			tags: z.array(z.string()).default([]),
			title: z.string(),
			toc: z.boolean().optional().default(true),
		}),
});

export const collections = { blog };

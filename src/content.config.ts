import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

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
			tags: z.array(z.string()).default([]),
			title: z.string(),
			toc: z.boolean().optional().default(true),
		}),
});

export const collections = { blog };

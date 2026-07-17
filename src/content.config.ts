import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
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

/**
 * Seeded once from a Goodreads CSV export and hand-maintained since —
 * Goodreads has had no API since 2020, so books.yaml is the source of truth.
 * Adding, removing or recategorising a book is an edit to that file.
 */
const books = defineCollection({
	loader: file("./src/content/books/books.yaml"),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			author: z.string(),
			status: z.enum(["read", "reading", "to-read"]),
			isbn: z.string().optional(),
			rating: z.number().int().min(1).max(5).optional(),
			/** Absent for a third of the shelf; those fall back to a type tile. */
			cover: image().optional(),
			featured: z.boolean().default(false),
		}),
});

export const collections = { blog, books };

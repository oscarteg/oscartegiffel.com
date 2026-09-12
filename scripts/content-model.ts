import { z } from "zod";

const mediaSchema = z.object({
	url: z.string().min(1),
	ext: z.string().regex(/^\.[a-z0-9]+$/i),
});

const resourceSchema = z.object({
	title: z.string().optional(),
	url: z.string().url(),
});

export const articleSchema = z.object({
	slug: z.string().min(1),
	title: z.string().min(1),
	description: z.string().nullable().optional(),
	publishDate: z.iso.date(),
	cover: mediaSchema.nullable().optional(),
	image: z.string().nullable().optional(),
	body: z.string(),
	tags: z
		.array(z.string())
		.nullable()
		.transform((tags) => tags ?? []),
	resources: z.array(resourceSchema).default([]),
	series: z.string().nullable().optional(),
	seriesOrder: z.number().int().nullable().optional(),
	showResources: z.boolean().default(true),
	toc: z.boolean().default(true),
});

export type Article = z.infer<typeof articleSchema>;

export const bookSchema = z.object({
	bookId: z.string().min(1),
	title: z.string().min(1),
	author: z.string().min(1),
	status: z.enum(["read", "reading", "to-read"]),
	isbn: z.string().nullable().optional(),
	rating: z.number().int().min(1).max(5).nullable().optional(),
	cover: mediaSchema.nullable().optional(),
	featured: z.boolean().default(false),
});

export type Book = z.infer<typeof bookSchema>;

export const paginationSchema = z.object({
	page: z.number().int().positive(),
	pageSize: z.number().int().positive(),
	pageCount: z.number().int().nonnegative(),
	total: z.number().int().nonnegative(),
});

export function pageSchema<T extends z.ZodType>(entrySchema: T) {
	return z.object({
		data: z.array(entrySchema),
		meta: z.object({ pagination: paginationSchema }),
	});
}

export type Page<T> = {
	readonly data: readonly T[];
	readonly meta: { readonly pagination: z.infer<typeof paginationSchema> };
};

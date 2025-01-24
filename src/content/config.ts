import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean().optional(),
    lastModified: z.string().pipe(z.coerce.date()).optional(),
    publishDate: z
      .date()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
});

const pages = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  blog,
  pages,
};

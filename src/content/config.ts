import { z, defineCollection } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    summary: z.string().optional(),
    publishDate: z
      .date()
      .or(z.date())
      .transform((val) => new Date(val)),
    draft: z.boolean().optional().default(false),
  }),
});

const pages = defineCollection({
  schema: z.object({
    title: z.string(),
    desciption: z.string().optional(),
  }),
});

export const collections = {
  blog,
  pages,
};
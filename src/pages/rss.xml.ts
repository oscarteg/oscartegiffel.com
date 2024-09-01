import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "../config";
import { isPublished, sortAsc } from "../utils";

export async function GET() {
  const posts = await getCollection("blog", isPublished);
  const sortedPosts = posts.sort(sortAsc);

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: SITE_URL,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.summary,
      link: `/blog/${post.slug}/`,
    })),

    customData: `<language>en-us</language>`,
  });
}

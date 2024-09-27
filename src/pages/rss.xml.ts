import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "../config";
import type { Post } from "../models";
import { isPublished, sortAsc } from "../utils";
const parser = new MarkdownIt();

export async function GET() {
	const posts = await getCollection("blog", isPublished);
	const sortedPosts: Post[] = posts.sort(sortAsc);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: SITE_URL,
		items: sortedPosts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.publishDate,
			description: post.data.description,
			link: `/blog/${post.slug}/`,
			content: sanitizeHtml(parser.render(post.body), {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
			}),
		})),

		customData: "<language>en-us</language>",
	});
}

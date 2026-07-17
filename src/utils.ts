import { execSync } from "node:child_process";
import type { RehypePlugin } from "@astrojs/markdown-remark";
import { siteMetadata } from "./config";
import type { Post } from "./models";

/** Why a post is — or isn't — public. Only `live` posts are built in production. */
export type PostVisibility =
	| { kind: "live" }
	| { kind: "draft" }
	| { kind: "scheduled"; publishDate: Date };

export function postVisibility(post: Post): PostVisibility {
	if (post.data.draft) {
		return { kind: "draft" };
	}

	const publishDate = new Date(post.data.publishDate);
	if (publishDate > new Date()) {
		return { kind: "scheduled", publishDate };
	}

	return { kind: "live" };
}

/**
 * The single gate on every `getCollection("blog")` — including `getStaticPaths`,
 * or drafts get built as reachable pages and land in the sitemap.
 */
export function filterPosts(post: Post) {
	if (postVisibility(post).kind === "live") {
		return true;
	}

	return !import.meta.env.PROD && siteMetadata.devMode.showDraftPages;
}

export function sortAsc(post1: Post, post2: Post) {
	if (isDateBefore(post1.data.publishDate, post2.data.publishDate)) {
		return 1;
	}

	return -1;
}

// helper function to check if date1 is before date2
export function isDateBefore(date1: Date, date2: Date) {
	return date1.getTime() < date2.getTime();
}

export const remarkModifiedTime: RehypePlugin = () => (_, file) => {
	const filepath = file.history[0];
	const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
	// biome-ignore lint/suspicious/noExplicitAny: The type of result is not explicitly defined.
	(file.data.astro as any).frontmatter.lastModified = result.toString();
};

type GroupBy<T> = {
	[key: string]: T[];
};

export function groupBy<T>(
	items: T[],
	keyExtractor: (item: T) => string,
): GroupBy<T> {
	return items.reduce((grouped: GroupBy<T>, item: T) => {
		const groupKey = keyExtractor(item); // Extract the grouping key
		if (!grouped[groupKey]) {
			grouped[groupKey] = [];
		}
		grouped[groupKey].push(item);
		return grouped;
	}, {});
}

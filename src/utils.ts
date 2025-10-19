import { execSync } from "node:child_process";
import type { RehypePlugin } from "@astrojs/markdown-remark";
import { Octokit } from "octokit";
import { siteMetadata } from "./config";
import type { File, Gist, Post } from "./models";

const octokit = new Octokit();

/**
 * Fetch contents of a file of a gist
 */
async function fetchFile(file?: File): Promise<File & { contents: string }> {
	if (!file?.raw_url) {
		return { ...file, contents: "" };
	}

	const contents = await fetch(file.raw_url).then((res) => res.text());

	return {
		...file,
		contents,
	};
}

async function fetchGists() {
	return octokit.request("GET /users/{username}/gists", {
		username: "oscarteg",
	});
}

export async function fetchSnippets() {
	const gists = await fetchGists();

	return Promise.all(
		gists.data.map((gist: Gist) =>
			Promise.all(Object.values(gist.files).map(fetchFile)).then((files) => ({
				...gist,
				files,
			})),
		),
	);
}

export function filterPosts(post: Post) {
	const currentDate = new Date();
	const publishDate = new Date(post.data.publishDate);

	const isPublishDateReached = publishDate <= currentDate;

	if (import.meta.env.PROD) {
		return !post.data.draft && isPublishDateReached;
	}

	return siteMetadata.devMode.showDraftPages
		? true
		: !post.data.draft && isPublishDateReached;
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

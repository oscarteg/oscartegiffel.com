import type { CollectionEntry } from "astro:content";
import type { Endpoints } from "@octokit/types";

export type Gist =
	Endpoints["GET /users/{username}/gists"]["response"]["data"][number];
export type File = Gist["files"][keyof Gist["files"]];
export type Snippet = Gist & { files: Array<File> };

export type Post = CollectionEntry<"blog">;

/** A row in the identity rail's numbered menu. */
export type RailNavItem = {
	label: string;
	href: string;
	/** Mono index or glyph shown on the right, e.g. "01" or "↗". */
	index?: string;
	active?: boolean;
};

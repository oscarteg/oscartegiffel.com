import type { CollectionEntry } from "astro:content";
import type { Endpoints } from "@octokit/types";

export type Gist =
  Endpoints["GET /users/{username}/gists"]["response"]["data"][number];
export type File = Gist["files"][keyof Gist["files"]];
export type Snippet = Gist & { files: Array<File> };

export type Post = CollectionEntry<"blog">;
export type Page = CollectionEntry<"pages">;

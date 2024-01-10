import type { File, Gist, Post } from "./models";
import { Octokit } from "octokit";
import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CollectionEntry } from "astro:content";
import { siteMetadata } from "./config";

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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isPublished(post: Post) {
  if (import.meta.env.PROD) {
    return !post.data.draft;
  }

  return siteMetadata.devMode.showDraftPages ? true : !post.data.draft;
}

export function sortAsc(post1: Post, post2: Post) {
  if (isDateBefore(post1.data.publishDate, post2.data.publishDate)) {
    return 1;
  } else {
    return -1;
  }
}

export function getPublishedAndSortedPosts(allPosts: CollectionEntry<"blog">[]) {
  return allPosts.filter(isPublished).sort(sortAsc);
}

// helper function to check if date1 is before date2
export const isDateBefore = (date1: Date, date2: Date) => date1.getTime() < date2.getTime();

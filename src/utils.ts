import type { File, Gist } from "./models";
import { Octokit } from "octokit";
import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const octokit = new Octokit();

/**
 * Fetch contents of a file of a gist
 */
async function fetchFile(file?: File): Promise<string> {
  if (!file?.raw_url) return "";
  return fetch(file.raw_url).then((res) => res.text());
}

/**
 * Fetch all gists of a specific user
 */
function fetchGists() {
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

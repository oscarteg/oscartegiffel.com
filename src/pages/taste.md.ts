import type { APIRoute } from "astro";
import { SITE_URL } from "../config";
import raw from "./taste.mdx?raw";

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
const EDITION = /^edition:\s*"?([^"\n]+?)"?\s*$/m;
const DESCRIPTION = /^description:\s*(.+?)\s*$/m;
const PREFACE = /^preface:\r?\n((?: {2}- .+\r?\n?)+)/m;

/**
 * The machine-readable edition of The Taste Bible: the same prose as
 * `/taste`, stripped of Astro's frontmatter and pointed at absolute URLs so
 * the text stands on its own once it leaves this site.
 */
export const GET: APIRoute = () => {
	const frontmatter = raw.match(FRONTMATTER);
	const block = frontmatter?.[1];
	if (!frontmatter || !block) {
		throw new Error("taste.mdx missing frontmatter");
	}

	const edition = block.match(EDITION)?.[1];
	if (!edition) {
		throw new Error("taste.mdx frontmatter needs edition");
	}

	const description = block.match(DESCRIPTION)?.[1] ?? "";

	// The preface lives in frontmatter so the HTML edition can set it on the
	// title page; here it goes back where a reader expects it.
	const preface = (block.match(PREFACE)?.[1] ?? "")
		.split(/\r?\n/)
		.filter((line) => line.startsWith("  - "))
		.map((line) => line.slice(4))
		.join("\n\n");

	// Cross-verse anchors are relative to the HTML edition, which lives at a
	// different URL than this file.
	const body = raw
		.slice(frontmatter[0].length)
		.trimStart()
		.replaceAll("](#", `](${SITE_URL}/taste#`);

	const text = `---
title: The Taste Bible
description: ${description}
canonical_url: ${SITE_URL}/taste
md_url: ${SITE_URL}/taste.md
updated: ${edition}
---

# The Taste Bible

## Preface

${preface}

This book is also available as plain markdown at ${SITE_URL}/taste.md and indexed in ${SITE_URL}/llms.txt for machine readers.

${body}`;

	return new Response(text, {
		// Static builds drop this header; kept for the dev server and as a
		// statement of intent.
		headers: { "Content-Type": "text/markdown; charset=utf-8" },
	});
};

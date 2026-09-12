import { describe, expect, test } from "bun:test";
import {
	type Article,
	type Book,
	collectPaginated,
	serializeArticle,
	serializeBooks,
} from "./fetch-content";

const article: Article = {
	slug: "typed-content",
	title: "Typed: Content",
	description: "Build-time content without browser CMS calls.",
	publishDate: "2026-09-13",
	cover: { url: "/uploads/typed_content.webp", ext: ".webp" },
	image: "/images/social/typed-content.png",
	body: "First line.\n\n<Component value={1} />\n",
	tags: ["typescript", "astro"],
	resources: [
		{ title: "Strapi docs", url: "https://docs.strapi.io/cms/api/rest" },
		{ url: "https://astro.build" },
	],
	series: "Static sites",
	seriesOrder: 2,
	showResources: false,
	toc: true,
};

describe("serializeArticle", () => {
	test("writes schema-compatible frontmatter followed by the verbatim MDX body", () => {
		// Given an article containing every supported frontmatter field.
		const expected = `---
title: "Typed: Content"
description: "Build-time content without browser CMS calls."
publishDate: 2026-09-13
cover: "./images/typed-content.webp"
image: "/images/social/typed-content.png"
tags:
  - "typescript"
  - "astro"
draft: false
resources:
  - title: "Strapi docs"
    url: "https://docs.strapi.io/cms/api/rest"
  - url: "https://astro.build"
series: "Static sites"
seriesOrder: 2
showResources: false
toc: true
---

First line.

<Component value={1} />
`;

		// When it is serialized for Astro's glob loader.
		const output = serializeArticle(article);

		// Then frontmatter is valid YAML and the body is byte-for-byte unchanged.
		expect(output).toBe(expected);
		expect(output.slice(output.indexOf("---\n\n") + 5)).toBe(article.body);
	});

	test("writes empty tags and resources as arrays", () => {
		// Given an article with no tags or resources.
		const minimalArticle: Article = {
			slug: "minimal",
			title: "Minimal",
			publishDate: "2026-09-13",
			body: "Body",
			tags: [],
			resources: [],
			showResources: true,
			toc: true,
		};

		// When it is serialized.
		const output = serializeArticle(minimalArticle);

		// Then Astro receives arrays instead of YAML null values.
		expect(output).toContain("tags: []\n");
		expect(output).toContain("resources: []\n");
	});
});

describe("serializeBooks", () => {
	test("writes the existing books YAML format and omits optional values", () => {
		// Given books with and without optional fields.
		const books: readonly Book[] = [
			{
				bookId: "a-book",
				title: "A Book: With Punctuation",
				author: "A. Writer",
				status: "read",
				isbn: "9780000000001",
				rating: 5,
				cover: { url: "/uploads/a_book.jpg", ext: ".jpg" },
				featured: true,
			},
			{
				bookId: "next-book",
				title: "Next Book",
				author: "B. Writer",
				status: "to-read",
				featured: false,
			},
		];
		const expected = `# Generated from Strapi. Run \`bun run fetch-content\` to refresh.

- id: "a-book"
  title: "A Book: With Punctuation"
  author: "A. Writer"
  status: "read"
  isbn: "9780000000001"
  rating: 5
  cover: "./covers/a-book.jpg"
  featured: true
- id: "next-book"
  title: "Next Book"
  author: "B. Writer"
  status: "to-read"
`;

		// When they are serialized for Astro's file loader.
		const output = serializeBooks(books);

		// Then the output matches the local collection shape.
		expect(output).toBe(expected);
	});
});

describe("collectPaginated", () => {
	test("requests every page so collections larger than Strapi's default are complete", async () => {
		// Given 245 entries spread across three Strapi pages.
		const requestedPages: number[] = [];
		const loadPage = async (page: number) => {
			requestedPages.push(page);
			const pageSize = page === 3 ? 45 : 100;
			return {
				data: Array.from(
					{ length: pageSize },
					(_, index) => `${page}-${index}`,
				),
				meta: { pagination: { page, pageSize: 100, pageCount: 3, total: 245 } },
			};
		};

		// When all pages are collected.
		const result = await collectPaginated(loadPage);

		// Then no entry is silently truncated at the first page.
		expect(requestedPages).toEqual([1, 2, 3]);
		expect(result).toHaveLength(245);
	});
});

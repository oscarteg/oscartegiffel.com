import { afterEach, describe, expect, test } from "bun:test";
import {
	access,
	mkdir,
	mkdtemp,
	readFile,
	rm,
	writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { type Article, type Book, regenerateContent } from "./fetch-content";

const temporaryRoots: string[] = [];

afterEach(async () => {
	await Promise.all(
		temporaryRoots
			.splice(0)
			.map((root) => rm(root, { recursive: true, force: true })),
	);
});

describe("regenerateContent", () => {
	test("leaves existing content intact when CMS credentials are absent", async () => {
		// Given existing local content and no Strapi configuration.
		const root = await makeTemporaryRoot();
		const blogFile = join(root, "src/content/blog/existing.mdx");
		await writeFile(blogFile, "existing article");

		// When regeneration is requested.
		const result = await regenerateContent({ root });

		// Then the script skips without changing the file.
		expect(result).toEqual({ kind: "skipped" });
		expect(await readFile(blogFile, "utf8")).toBe("existing article");
	});

	test("writes a complete fixture response and downloads local images", async () => {
		// Given 15 articles and 245 books from a fixture-backed Strapi client.
		const root = await makeTemporaryRoot();
		const fetchPage = createFixturePageLoader();
		const download = async (_url: URL) => new Uint8Array([1, 2, 3]);

		// When content regeneration succeeds.
		const result = await regenerateContent({
			root,
			url: "https://content.example.test",
			token: "fixture-token",
			fetchPage,
			download,
		});

		// Then all content and referenced images exist in Astro's current local paths.
		expect(result).toEqual({
			kind: "written",
			articles: 15,
			books: 245,
			images: 2,
		});
		expect(
			await readFile(join(root, "src/content/blog/article-14.mdx"), "utf8"),
		).toContain("Body 14\n");
		expect(
			(
				await readFile(join(root, "src/content/books/books.yaml"), "utf8")
			).match(/^- id:/gm),
		).toHaveLength(245);
		expect(
			await access(join(root, "src/content/blog/images/article-0.webp")),
		).toBeNull();
		expect(
			await access(join(root, "src/content/books/covers/book-0.jpg")),
		).toBeNull();
	});

	test("keeps existing content when a media download fails", async () => {
		// Given existing content and a complete response whose media cannot download.
		const root = await makeTemporaryRoot();
		const blogFile = join(root, "src/content/blog/existing.mdx");
		await writeFile(blogFile, "existing article");
		const download = async (_url: URL): Promise<Uint8Array> => {
			throw new Error("fixture download failed");
		};

		// When regeneration fails before replacement.
		const operation = regenerateContent({
			root,
			url: "https://content.example.test",
			token: "fixture-token",
			fetchPage: createFixturePageLoader(),
			download,
		});

		// Then the failure propagates and existing local content remains untouched.
		await expect(operation).rejects.toThrow("fixture download failed");
		expect(await readFile(blogFile, "utf8")).toBe("existing article");
	});

	test("keeps existing content when Strapi returns an empty collection", async () => {
		// Given existing content and empty successful Strapi responses.
		const root = await makeTemporaryRoot();
		const blogFile = join(root, "src/content/blog/existing.mdx");
		await writeFile(blogFile, "existing article");
		const fetchPage = async () => ({
			data: [],
			meta: { pagination: { page: 1, pageSize: 100, pageCount: 0, total: 0 } },
		});

		// When regeneration receives no entries.
		const operation = regenerateContent({
			root,
			url: "https://content.example.test",
			token: "fixture-token",
			fetchPage,
		});

		// Then replacement is rejected and existing local content remains untouched.
		await expect(operation).rejects.toThrow("empty");
		expect(await readFile(blogFile, "utf8")).toBe("existing article");
	});
});

async function makeTemporaryRoot(): Promise<string> {
	const root = await mkdtemp(join(tmpdir(), "fetch-content-"));
	await mkdir(join(root, "src/content/blog"), { recursive: true });
	temporaryRoots.push(root);
	return root;
}

function createFixturePageLoader() {
	return async (collection: "articles" | "books", page: number) => {
		const entries = collection === "articles" ? fixtureArticles : fixtureBooks;
		const start = (page - 1) * 100;
		return {
			data: entries.slice(start, start + 100),
			meta: {
				pagination: {
					page,
					pageSize: 100,
					pageCount: Math.ceil(entries.length / 100),
					total: entries.length,
				},
			},
		};
	};
}

const fixtureArticles: readonly Article[] = Array.from(
	{ length: 15 },
	(_, index) => ({
		slug: `article-${index}`,
		title: `Article ${index}`,
		publishDate: "2026-09-13",
		cover:
			index === 0 ? { url: "/uploads/article.webp", ext: ".webp" } : undefined,
		body: `Body ${index}\n`,
		tags: [],
		resources: [],
		showResources: true,
		toc: true,
	}),
);

const fixtureBooks: readonly Book[] = Array.from(
	{ length: 245 },
	(_, index) => ({
		bookId: `book-${index}`,
		title: `Book ${index}`,
		author: "Writer",
		status: "to-read",
		cover: index === 0 ? { url: "/uploads/book.jpg", ext: ".jpg" } : undefined,
		featured: false,
	}),
);

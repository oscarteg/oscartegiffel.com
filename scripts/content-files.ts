import { mkdir, mkdtemp, rename, rm, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import type { Article, Book } from "./content-model";
import { serializeArticle, serializeBooks } from "./content-serializers";

type Content = {
	readonly articles: readonly Article[];
	readonly books: readonly Book[];
};

type Download = (url: URL) => Promise<Uint8Array>;

export async function writeContent(
	root: string,
	cmsUrl: string,
	content: Content,
	download: Download,
): Promise<number> {
	const contentRoot = join(root, "src/content");
	await mkdir(contentRoot, { recursive: true });
	const stageRoot = await mkdtemp(
		join(dirname(contentRoot), ".content-stage-"),
	);
	try {
		const blogRoot = join(stageRoot, "blog");
		const bookRoot = join(stageRoot, "books");
		await Promise.all([
			mkdir(join(blogRoot, "images"), { recursive: true }),
			mkdir(join(bookRoot, "covers"), { recursive: true }),
		]);

		await Promise.all(
			content.articles.map((article) =>
				writeFile(
					join(blogRoot, `${article.slug}.mdx`),
					serializeArticle(article),
				),
			),
		);
		await writeFile(
			join(bookRoot, "books.yaml"),
			serializeBooks(content.books),
		);

		const articleImages = content.articles.flatMap((article) =>
			article.cover
				? [
						{
							source: article.cover.url,
							target: join(
								blogRoot,
								"images",
								`${article.slug}${article.cover.ext}`,
							),
						},
					]
				: [],
		);
		const bookImages = content.books.flatMap((book) =>
			book.cover
				? [
						{
							source: book.cover.url,
							target: join(
								bookRoot,
								"covers",
								`${book.bookId}${book.cover.ext}`,
							),
						},
					]
				: [],
		);
		const images = [...articleImages, ...bookImages];
		await Promise.all(
			images.map(async ({ source, target }) =>
				writeFile(target, await download(new URL(source, cmsUrl))),
			),
		);

		await replaceContent(contentRoot, blogRoot, bookRoot);
		return images.length;
	} finally {
		await rm(stageRoot, { recursive: true, force: true });
	}
}

async function replaceContent(
	contentRoot: string,
	stagedBlog: string,
	stagedBooks: string,
): Promise<void> {
	const targets = [
		join(contentRoot, "blog"),
		join(contentRoot, "books"),
	] as const;
	const staged = [stagedBlog, stagedBooks] as const;
	const backups = targets.map((target) =>
		join(dirname(target), `.${basename(target)}-backup`),
	);
	await Promise.all(
		backups.map((backup) => rm(backup, { recursive: true, force: true })),
	);
	const movedBackups: string[] = [];
	for (let index = 0; index < targets.length; index += 1) {
		const target = targets[index];
		const backup = backups[index];
		if (!target || !backup)
			throw new ContentFilesystemError("missing replacement path");
		await rename(target, backup).catch((error: unknown) => {
			if (
				!(error instanceof Error && "code" in error && error.code === "ENOENT")
			)
				throw error;
		});
		movedBackups.push(backup);
	}
	try {
		for (let index = 0; index < targets.length; index += 1) {
			const target = targets[index];
			const source = staged[index];
			if (!target || !source)
				throw new ContentFilesystemError("missing staged path");
			await rename(source, target);
		}
		await Promise.all(
			backups.map((backup) => rm(backup, { recursive: true, force: true })),
		);
	} catch (error) {
		await Promise.all(
			targets.map(async (target, index) => {
				await rm(target, { recursive: true, force: true });
				const backup = movedBackups[index];
				if (backup) await rename(backup, target);
			}),
		);
		throw error;
	}
}

class ContentFilesystemError extends Error {
	override readonly name = "ContentFilesystemError";
}

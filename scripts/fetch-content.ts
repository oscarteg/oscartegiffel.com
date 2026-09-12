import wretch from "wretch";
import { writeContent } from "./content-files";
import {
	type Article,
	articleSchema,
	type Book,
	bookSchema,
	type Page,
	pageSchema,
} from "./content-model";

export type { Article, Book } from "./content-model";
export { serializeArticle, serializeBooks } from "./content-serializers";

type Collection = "articles" | "books";
type PageLoader = (
	collection: Collection,
	page: number,
) => Promise<Page<Article | Book>>;
type RegenerateOptions = {
	readonly root: string;
	readonly url?: string | undefined;
	readonly token?: string | undefined;
	readonly fetchPage?: PageLoader;
	readonly download?: (url: URL) => Promise<Uint8Array>;
};
type RegenerateResult =
	| { readonly kind: "skipped" }
	| {
			readonly kind: "written";
			readonly articles: number;
			readonly books: number;
			readonly images: number;
	  };

export async function collectPaginated<T>(
	loadPage: (page: number) => Promise<Page<T>>,
): Promise<readonly T[]> {
	const firstPage = await loadPage(1);
	const pages = [firstPage];
	for (let page = 2; page <= firstPage.meta.pagination.pageCount; page += 1)
		pages.push(await loadPage(page));
	const entries = pages.flatMap(({ data }) => data);
	if (entries.length !== firstPage.meta.pagination.total)
		throw new IncompleteCollectionError(
			entries.length,
			firstPage.meta.pagination.total,
		);
	return entries;
}

export async function regenerateContent(
	options: RegenerateOptions,
): Promise<RegenerateResult> {
	if (!options.url || !options.token) return { kind: "skipped" };
	const loadPage =
		options.fetchPage ?? createPageLoader(options.url, options.token);
	const [articleEntries, bookEntries] = await Promise.all([
		collectPaginated((page) => loadPage("articles", page)),
		collectPaginated((page) => loadPage("books", page)),
	]);
	if (articleEntries.length === 0 || bookEntries.length === 0)
		throw new EmptyCollectionError();
	const articles = articleSchema.array().parse(articleEntries);
	const books = bookSchema.array().parse(bookEntries);
	const download = options.download ?? downloadMedia;
	const images = await writeContent(
		options.root,
		options.url,
		{ articles, books },
		download,
	);
	return {
		kind: "written",
		articles: articles.length,
		books: books.length,
		images,
	};
}

function createPageLoader(url: string, token: string): PageLoader {
	const api = wretch(url)
		.auth(`Bearer ${token}`)
		.headers({ Accept: "application/json" });
	return async (collection, page) => {
		const endpoint = `/api/${collection}?populate=*&status=published&pagination[pageSize]=100&pagination[page]=${page}`;
		const input: unknown = await api.get(endpoint).json();
		switch (collection) {
			case "articles":
				return pageSchema(articleSchema).parse(input);
			case "books":
				return pageSchema(bookSchema).parse(input);
			default:
				return assertNever(collection);
		}
	};
}

function assertNever(value: never): never {
	throw new UnexpectedCollectionError(value);
}

async function downloadMedia(url: URL): Promise<Uint8Array> {
	const buffer = await wretch(url.toString()).get().arrayBuffer();
	return new Uint8Array(buffer);
}

class IncompleteCollectionError extends Error {
	override readonly name = "IncompleteCollectionError";
	constructor(
		readonly actual: number,
		readonly expected: number,
	) {
		super(`Strapi returned ${actual} of ${expected} entries`);
	}
}

class EmptyCollectionError extends Error {
	override readonly name = "EmptyCollectionError";
	constructor() {
		super("Strapi returned an empty content collection");
	}
}

class UnexpectedCollectionError extends Error {
	override readonly name = "UnexpectedCollectionError";
	constructor(readonly collection: never) {
		super(`Unexpected content collection: ${collection}`);
	}
}

if (import.meta.main) {
	const result = await regenerateContent({
		root: process.cwd(),
		url: process.env.STRAPI_URL,
		token: process.env.STRAPI_API_TOKEN,
	});
	if (result.kind === "skipped")
		console.log(
			"Skipping content regeneration: STRAPI_URL or STRAPI_API_TOKEN is missing.",
		);
	else
		console.log(
			`Wrote ${result.articles} articles, ${result.books} books, and ${result.images} images.`,
		);
}

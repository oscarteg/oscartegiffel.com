import type { Article, Book } from "./content-model";

export function serializeArticle(article: Article): string {
	const lines = [
		"---",
		`title: ${quote(article.title)}`,
		...(article.description
			? [`description: ${quote(article.description)}`]
			: []),
		`publishDate: ${article.publishDate}`,
		...(article.cover
			? [`cover: ${quote(`./images/${article.slug}${article.cover.ext}`)}`]
			: []),
		...(article.image ? [`image: ${quote(article.image)}`] : []),
		...(article.tags.length === 0
			? ["tags: []"]
			: ["tags:", ...article.tags.map((tag) => `  - ${quote(tag)}`)]),
		"draft: false",
		...(article.resources.length === 0
			? ["resources: []"]
			: [
					"resources:",
					...article.resources.flatMap((resource) =>
						resource.title
							? [
									`  - title: ${quote(resource.title)}`,
									`    url: ${quote(resource.url)}`,
								]
							: [`  - url: ${quote(resource.url)}`],
					),
				]),
		...(article.series ? [`series: ${quote(article.series)}`] : []),
		...(article.seriesOrder == null
			? []
			: [`seriesOrder: ${article.seriesOrder}`]),
		`showResources: ${article.showResources}`,
		`toc: ${article.toc}`,
		"---",
		"",
	];
	return `${lines.join("\n")}\n${article.body}`;
}

export function serializeBooks(books: readonly Book[]): string {
	const entries = books.flatMap((book) => [
		`- id: ${quote(book.bookId)}`,
		`  title: ${quote(book.title)}`,
		`  author: ${quote(book.author)}`,
		`  status: ${quote(book.status)}`,
		...(book.isbn ? [`  isbn: ${quote(book.isbn)}`] : []),
		...(book.rating == null ? [] : [`  rating: ${book.rating}`]),
		...(book.cover
			? [`  cover: ${quote(`./covers/${book.bookId}${book.cover.ext}`)}`]
			: []),
		...(book.featured ? ["  featured: true"] : []),
	]);
	return `# Generated from Strapi. Run \`bun run fetch-content\` to refresh.\n\n${entries.join("\n")}\n`;
}

function quote(value: string): string {
	return JSON.stringify(value);
}

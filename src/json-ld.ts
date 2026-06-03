/**
 * JSON-LD structured data builders for search engines and LLM crawlers.
 *
 * The graph is a labelled, directed set of nodes referenced by @id. Shared
 * nodes (Person, WebSite) keep stable IDs so crawlers can merge knowledge
 * across pages. Page-specific nodes (WebPage, BlogPosting, BreadcrumbList)
 * link back via @id references.
 *
 * Not JavaScript: the browser never executes <script type="application/ld+json">.
 * Crawlers (Google, Bing, LLM scrapers) parse the contents as data.
 */

import { SITE_URL, siteMetadata } from "./config";
import type { Post } from "./models";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const BLOG_ID = `${SITE_URL}/blog/#blog`;
const PERSON_IMAGE_ID = `${SITE_URL}/#person-image`;

/**
 * The canonical Person node. Referenced by every page via @id.
 * Edit this to refine your bio, languages, or social profiles.
 */
export const personNode = {
	"@type": "Person",
	"@id": PERSON_ID,
	url: SITE_URL,
	name: "Oscar te Giffel",
	givenName: "Oscar",
	familyName: "te Giffel",
	jobTitle: "Senior Frontend Developer",
	description:
		"Senior Frontend Developer based in the Netherlands. Writes about software engineering, design, and the craft of building things with code.",
	knowsLanguage: ["en", "nl"],
	nationality: {
		"@type": "Country",
		name: "Netherlands",
	},
	homeLocation: {
		"@type": "Place",
		address: {
			"@type": "PostalAddress",
			addressCountry: "NL",
		},
	},
	image: {
		"@type": "ImageObject",
		"@id": PERSON_IMAGE_ID,
		url: `${SITE_URL}/logo.png`,
		caption: "Oscar te Giffel",
	},
	sameAs: siteMetadata.socials.map((s) => s.url),
} as const;

/** Full WebSite node — use on the homepage. */
export const websiteNode = {
	"@type": "WebSite",
	"@id": WEBSITE_ID,
	url: `${SITE_URL}/`,
	name: siteMetadata.title,
	description: siteMetadata.description,
	inLanguage: "en",
	publisher: { "@id": PERSON_ID },
} as const;

/** Slim WebSite node — sufficient context for single-page crawlers on inner pages. */
export const websiteSlimNode = {
	"@type": "WebSite",
	"@id": WEBSITE_ID,
	url: `${SITE_URL}/`,
	name: siteMetadata.title,
} as const;

/** Blog index node — describes the collection of posts. */
export const blogNode = {
	"@type": "Blog",
	"@id": BLOG_ID,
	isPartOf: { "@id": WEBSITE_ID },
	mainEntityOfPage: { "@id": `${SITE_URL}/blog/#webpage` },
	name: `${siteMetadata.title}'s Blog`,
	description: siteMetadata.description,
	inLanguage: "en",
	publisher: { "@id": PERSON_ID },
} as const;

type BreadcrumbStep = { url: string; name: string };

export function buildBreadcrumb(pageUrl: string, steps: BreadcrumbStep[]) {
	return {
		"@type": "BreadcrumbList",
		"@id": `${pageUrl}#breadcrumb`,
		itemListElement: steps.map((step, index) => ({
			"@type": "ListItem",
			position: index + 1,
			item: step.url,
			name: step.name,
		})),
	};
}

export function buildWebPage(args: {
	url: string;
	name: string;
	breadcrumbId?: string;
}) {
	const node: Record<string, unknown> = {
		"@type": "WebPage",
		"@id": `${args.url}#webpage`,
		url: args.url,
		isPartOf: { "@id": WEBSITE_ID },
		name: args.name,
		inLanguage: "en",
	};
	if (args.breadcrumbId) {
		node.breadcrumb = { "@id": args.breadcrumbId };
	}
	return node;
}

export function buildProfilePage(args: { url: string; name: string }) {
	return {
		"@type": "ProfilePage",
		"@id": `${args.url}#webpage`,
		url: args.url,
		isPartOf: { "@id": WEBSITE_ID },
		name: args.name,
		inLanguage: "en",
		mainEntity: { "@id": PERSON_ID },
	};
}

export function buildCollectionPage(args: {
	url: string;
	name: string;
	description?: string;
	breadcrumbId?: string;
}) {
	const node: Record<string, unknown> = {
		"@type": "CollectionPage",
		"@id": `${args.url}#webpage`,
		url: args.url,
		isPartOf: { "@id": WEBSITE_ID },
		name: args.name,
		inLanguage: "en",
		about: { "@id": PERSON_ID },
	};
	if (args.description) node.description = args.description;
	if (args.breadcrumbId) node.breadcrumb = { "@id": args.breadcrumbId };
	return node;
}

export function buildBlogPosting(args: { url: string; post: Post }) {
	const { url, post } = args;
	const node: Record<string, unknown> = {
		"@type": "BlogPosting",
		"@id": `${url}#blogposting`,
		url,
		mainEntityOfPage: { "@id": `${url}#webpage` },
		isPartOf: { "@id": BLOG_ID },
		headline: post.data.title,
		inLanguage: "en",
		datePublished: post.data.publishDate.toISOString(),
		author: { "@id": PERSON_ID },
		publisher: { "@id": PERSON_ID },
	};
	if (post.data.description) node.description = post.data.description;
	if (post.data.tags?.length) node.keywords = post.data.tags.join(", ");
	return node;
}

type PageGraphContext =
	| { type: "home" }
	| { type: "blog-index" }
	| { type: "blog-post"; post: Post; url: string }
	| { type: "page"; url: string; name: string };

/**
 * Builds the full JSON-LD @graph for a page. Includes the shared Person and
 * WebSite nodes plus page-specific nodes.
 */
export function buildGraph(context: PageGraphContext) {
	const graph: object[] = [];

	switch (context.type) {
		case "home": {
			graph.push(personNode);
			graph.push(websiteNode);
			graph.push(
				buildProfilePage({ url: `${SITE_URL}/`, name: siteMetadata.title }),
			);
			break;
		}
		case "blog-index": {
			const url = `${SITE_URL}/blog/`;
			const breadcrumb = buildBreadcrumb(url, [
				{ url: `${SITE_URL}/`, name: "Home" },
				{ url, name: "Blog" },
			]);
			graph.push(personNode);
			graph.push(websiteSlimNode);
			graph.push(blogNode);
			graph.push(
				buildCollectionPage({
					url,
					name: `${siteMetadata.title}'s Blog`,
					description: siteMetadata.description,
					breadcrumbId: breadcrumb["@id"] as string,
				}),
			);
			graph.push(breadcrumb);
			break;
		}
		case "blog-post": {
			const { post, url } = context;
			const breadcrumb = buildBreadcrumb(url, [
				{ url: `${SITE_URL}/`, name: "Home" },
				{ url: `${SITE_URL}/blog/`, name: "Blog" },
				{ url, name: post.data.title },
			]);
			graph.push(personNode);
			graph.push(websiteSlimNode);
			graph.push(
				buildWebPage({
					url,
					name: post.data.title,
					breadcrumbId: breadcrumb["@id"] as string,
				}),
			);
			graph.push(buildBlogPosting({ url, post }));
			graph.push(breadcrumb);
			break;
		}
		case "page": {
			const { url, name } = context;
			const breadcrumb = buildBreadcrumb(url, [
				{ url: `${SITE_URL}/`, name: "Home" },
				{ url, name },
			]);
			graph.push(personNode);
			graph.push(websiteSlimNode);
			graph.push(
				buildWebPage({
					url,
					name,
					breadcrumbId: breadcrumb["@id"] as string,
				}),
			);
			graph.push(breadcrumb);
			break;
		}
	}

	return graph;
}

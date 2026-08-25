import { getCollection } from "astro:content";
import type { APIRoute, GetStaticPaths } from "astro";
import dayjs from "dayjs";
import { type OgCard, renderOgCard } from "../../og";
import { filterPosts } from "../../utils";
import raw from "../taste.mdx?raw";

/**
 * One PNG per shareable page: /og/home.png, /og/taste.png, and one per post
 * at /og/<post id>.png. Pre-rendered so nothing runs at request time.
 */
export const prerender = true;

const EDITION = /^edition:\s*"?([^"\n]+?)"?\s*$/m;

export const getStaticPaths = (async () => {
	const posts = await getCollection("blog", filterPosts);
	const edition = raw.match(EDITION)?.[1] ?? "";
	const chapters = (raw.match(/^## Chapter \d+/gm) ?? []).length;
	const verses = (raw.match(/^### \d+:\d+/gm) ?? []).length;

	const cards: { slug: string; card: OgCard }[] = [
		{ slug: "home", card: { kind: "home" } },
		{
			slug: "taste",
			card: {
				kind: "taste",
				edition,
				verses: `${chapters} CHAPTERS · ${verses} VERSES`,
			},
		},
		...posts.map((post) => ({
			slug: post.id,
			card: {
				kind: "post" as const,
				title: post.data.title,
				description: post.data.description ?? "",
				date: dayjs(post.data.publishDate).format("DD MMM YYYY").toUpperCase(),
			},
		})),
	];

	return cards.map(({ slug, card }) => ({ params: { slug }, props: { card } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ card: OgCard }> = async ({ props }) => {
	const png = await renderOgCard(props.card);
	return new Response(new Uint8Array(png), {
		headers: { "Content-Type": "image/png" },
	});
};

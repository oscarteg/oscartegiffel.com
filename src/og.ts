/**
 * Open Graph cards, rendered at build time from the same tokens as the site:
 * paper, ink, the tan full stop. Three voices — the home card, a post card
 * with its title and blurb, and the inverted taste card. Satori lays out a
 * small JSX-free element tree and outlines the type; sharp rasterises it.
 */
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import satori from "satori";
import sharp from "sharp";

export type OgCard =
	| { kind: "home" }
	| { kind: "post"; title: string; description: string; date: string }
	| { kind: "taste"; edition: string; verses: string };

const WIDTH = 1200;
const HEIGHT = 630;

const paper = "#f4f3f0";
const ink = "#1a1a19";
const body = "#55544f";
const muted = "#6b6a66";
const faint = "#8f8e89";
const rule = "#dedcd6";
const accent = "#a08b74";

/* Satori's element shape: a plain object tree, no JSX runtime needed. */
type Node = {
	type: string;
	props: {
		style?: Record<string, string | number>;
		children?: Node | Node[] | string;
	};
};

function el(
	type: string,
	style: Record<string, string | number>,
	children?: Node | Node[] | string,
): Node {
	return {
		type,
		props: children === undefined ? { style } : { style, children },
	};
}

/* Satori wants explicit flex on anything with more than one child, so a
   line of type is a wrapping row of words. The last word and the tan full
   stop share one item so they never split. Widths are px — it has no idea
   what a `ch` is. */
const wordmark = (color: string) =>
	el(
		"div",
		{
			display: "flex",
			alignItems: "flex-start",
			fontSize: 16,
			fontWeight: 600,
			letterSpacing: "0.08em",
			color,
		},
		[
			el("span", {}, "OSCAR TE GIFFEL"),
			el("span", { fontSize: 11, marginTop: -4, marginLeft: 1 }, "®"),
		],
	);

const label = (text: string, color: string, tracking = "0.12em") =>
	el(
		"div",
		{ fontSize: 15, fontWeight: 500, letterSpacing: tracking, color },
		text,
	);

const headline = (
	text: string,
	size: number,
	color: string,
	maxWidth: number,
) => {
	const words = text.split(" ");
	const last = words.length - 1;
	return el(
		"div",
		{
			display: "flex",
			flexWrap: "wrap",
			columnGap: size * 0.24,
			fontSize: size,
			lineHeight: 1.04,
			letterSpacing: "-0.03em",
			fontWeight: 500,
			color,
			maxWidth,
		},
		words.map((word, index) =>
			index < last
				? el("span", {}, word)
				: el("span", { display: "flex" }, [
						el("span", {}, word),
						el("span", { color: accent }, "."),
					]),
		),
	);
};

const footer = (
	left: string,
	right: string | undefined,
	color: string,
	line: string,
) =>
	el(
		"div",
		{
			display: "flex",
			marginTop: 48,
			paddingTop: 22,
			borderTop: `1px solid ${line}`,
			fontSize: 14,
			fontWeight: 500,
			letterSpacing: "0.1em",
			color,
		},
		[
			el("span", {}, left),
			...(right ? [el("span", { marginLeft: "auto" }, right)] : []),
		],
	);

const frame = (background: string, color: string, children: Node[]) =>
	el(
		"div",
		{
			display: "flex",
			flexDirection: "column",
			width: WIDTH,
			height: HEIGHT,
			padding: "64px 72px",
			background,
			color,
			fontFamily: "Archivo",
		},
		children,
	);

function tree(card: OgCard): Node {
	switch (card.kind) {
		case "home":
			return frame(paper, ink, [
				wordmark(ink),
				el(
					"div",
					{ display: "flex", flexDirection: "column", marginTop: "auto" },
					[
						el(
							"div",
							{ marginBottom: 28, display: "flex" },
							label("FREELANCE · SENIOR FULLSTACK ENGINEER", faint),
						),
						headline("Finding meaning in code, life and humans", 76, ink, 1000),
					],
				),
				footer("OSCARTEGIFFEL.COM", "AMERSFOORT · WORLDWIDE", muted, rule),
			]);
		case "post":
			return frame(paper, ink, [
				el("div", { display: "flex", alignItems: "baseline" }, [
					wordmark(ink),
					el(
						"div",
						{ marginLeft: "auto", display: "flex" },
						label("WRITING", faint),
					),
				]),
				el(
					"div",
					{ display: "flex", flexDirection: "column", marginTop: "auto" },
					[
						el(
							"div",
							{ marginBottom: 28, display: "flex" },
							label(`${card.date} · ESSAY`, faint),
						),
						headline(card.title, card.title.length > 28 ? 64 : 84, ink, 1000),
						...(card.description
							? [
									el(
										"div",
										{
											fontSize: 26,
											lineHeight: 1.45,
											color: body,
											marginTop: 24,
											maxWidth: 900,
										},
										card.description,
									),
								]
							: []),
					],
				),
				footer("OSCARTEGIFFEL.COM", undefined, muted, rule),
			]);
		case "taste":
			return frame(ink, paper, [
				el("div", { display: "flex", alignItems: "baseline" }, [
					wordmark(paper),
					el(
						"div",
						{ marginLeft: "auto", display: "flex" },
						label(`EDITION ${card.edition}`, faint),
					),
				]),
				el(
					"div",
					{ display: "flex", flexDirection: "column", marginTop: "auto" },
					[
						el(
							"div",
							{ marginBottom: 28, display: "flex" },
							label(card.verses, accent),
						),
						headline("The Taste Bible", 84, paper, 1000),
						el(
							"div",
							{
								fontSize: 26,
								lineHeight: 1.45,
								color: "#a3a19b",
								marginTop: 24,
								maxWidth: 860,
							},
							"Not rules, a compass. Positions arrived at by building software and getting it wrong first.",
						),
					],
				),
				footer("OSCARTEGIFFEL.COM/TASTE", undefined, faint, "#3a3936"),
			]);
	}
}

let fonts:
	| Promise<{ name: string; data: Buffer; weight: 500 | 600 }[]>
	| undefined;

function loadFonts() {
	fonts ??= Promise.all(
		([500, 600] as const).map(async (weight) => ({
			name: "Archivo",
			weight,
			// Resolved from the project root: the build bundles this module into a
			// chunk, so a URL relative to import.meta.url points nowhere.
			data: await readFile(
				resolve(process.cwd(), `src/assets/fonts/Archivo-${weight}.ttf`),
			),
		})),
	);
	return fonts;
}

export async function renderOgCard(card: OgCard): Promise<Buffer> {
	const svg = await satori(tree(card) as never, {
		width: WIDTH,
		height: HEIGHT,
		fonts: await loadFonts(),
	});
	return sharp(Buffer.from(svg), { density: 144 })
		.resize(WIDTH, HEIGHT)
		.png()
		.toBuffer();
}

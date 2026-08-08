import type { APIRoute } from "astro";
import { SITE_URL } from "../config";

const body = `# Oscar te Giffel

> Personal site of Oscar te Giffel, senior fullstack engineer. The Taste Bible is his personal code taste — engineering principles and concrete preferences — maintained as a single markdown book.

## Taste

- [The Taste Bible](${SITE_URL}/taste.md): the full book as one markdown file

## Optional

- [Website](${SITE_URL}/): HTML edition and other pages
`;

// Static builds emit this as a flat dist/llms.txt and drop the Content-Type
// header — the header is kept for dev and for documentation of intent.
export const GET: APIRoute = () =>
	new Response(body, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});

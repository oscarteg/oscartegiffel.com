# Village Map

Personal site for tracking small villages I have visited in the Netherlands
on my motorcycle. SolidJS + MapLibre, static-first (no production backend).

## Develop

```
bun install
bun run dev          # http://localhost:5173
```

Routes:
- `/` — public map
- `/v/:id` — deep link to a single village

## Regenerate village list

```
bun run fetch-villages   # re-runs the Overpass query, writes data/villages.json
```

## Other scripts

- `bun run build` — production build
- `bun run preview` — serve the production bundle locally
- `bun run typecheck`
- `bun run check` — Biome format + lint + organize imports

## Layout

- `data/villages.json` — generated, all NL villages + hamlets
- `data/visits.json` — visit data retained as the Strapi migration source
- `src/` — SolidJS app
- `scripts/` — one-off data-generation tools

The app fetches both JSON files at runtime from `/data/*.json`. Vite serves the
source directory during development and copies it to `dist/data` during builds.

## Deploy (Cloudflare Pages)

The whole site is static, so it builds and serves from a CDN.

1. Push the repo to GitHub.
2. In Cloudflare Pages, create a new project connected to the repo.
3. Build command: `bun install --frozen-lockfile && bun run build`
4. Output directory: `dist`
5. Node/Bun runtime: use the latest Bun option in Pages settings.
6. (Optional) Add a custom domain.

No environment variables are needed in production. Visit management is handled
by Strapi outside this standalone SPA.

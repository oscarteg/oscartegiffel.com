# Repository guide

Generated: 2026-11-04
Base commit: `a7e59f8eb865`.
Branch/bookmark: `docs/init-deep`; default is `main` (colocated jj repository).
Mode: committed guidance.

## Overview

Oscar's static Astro site: portfolio, MDX writing, resume, and two client-only
Solid/MapLibre experiences. Tailwind 4 and semantic CSS tokens style the site.
Use Node and pnpm from `mise.toml`; package scripts are the command contract.

## Structure

```text
src/
  pages/           Astro routes, RSS, llms.txt, generated blog/map routes
  layouts/         Default, blog-post, and bare standalone shells
  components/      Shared Astro presentation
  content/         Blog MDX, resume data, retained reading-list source
  content.config.ts  Blog collection loader and schema
  config.ts        Site metadata, projects, work experience, uses
  styles/          Shared tokens, typography, and local fonts
  features/
    mountain-map/  Solid climbing map; scoped AGENTS.md
    village-map/   Solid village map; scoped AGENTS.md
scripts/           Map generators, optional CMS refresh, and transformation tests
public/            Static assets and map JSON
```

## Where to look

| Task | Start here |
| --- | --- |
| Homepage composition | `src/pages/index.astro` |
| Navigation | `src/components/SiteHeader.astro` |
| Site metadata and portfolio content | `src/config.ts` |
| Shared document shell and metadata | `src/layouts/default.astro` |
| Blog schema and source | `src/content.config.ts`, `src/content/blog/` |
| Blog routing and rendering | `src/pages/blog/[id].astro`, `src/layouts/blog-post.astro` |
| RSS and machine-readable site summary | `src/pages/rss.xml.ts`, `src/pages/llms.txt.ts` |
| Resume content | `src/content/resume.ts` |
| Full-viewport map shell | `src/layouts/standalone.astro` |
| Redirects and sitemap rules | `astro.config.mjs`, `public/_redirects` |

## Code map

AST-verified feature symbols; cross-reference centrality is unmeasured because
the LSP symbol/reference requests were unavailable during discovery.

| Symbol | Location | Role |
| --- | --- | --- |
| `loadData` | `src/features/mountain-map/lib/data.ts` | Validated peak/ascent loading |
| `bandOf`, `stateOf`, `applyFilters` | `src/features/mountain-map/lib/filters.ts` | Pure filter rules |
| `toFeatureCollection` | `src/features/mountain-map/lib/geojson.ts` | Map geometry |
| `createFilterStore` | `src/features/mountain-map/stores/filters.ts` | Local filter state |
| `useFilterStore` | `src/features/village-map/stores/filters.ts` | URL-backed filter state |

## Conventions and constraints

- Routes are file-based and output is static; blog pages use `getStaticPaths`.
- Blog content is local MDX. Change its schema in `src/content.config.ts`.
- The committed build runs an optional CMS refresh first; it skips when
  `STRAPI_URL` or `STRAPI_API_TOKEN` is missing.
- `src/content/books/` is retained source data, not an active collection or route.
- Shared styling uses semantic variables from `src/styles/global.css`, with
  fonts in `src/styles/fonts.css`. Match the existing warm-paper, ruled layout.
- Map routes use `client:only="solid-js"` and their own CSS. The standalone
  layout deliberately omits site navigation, footer, fonts, and global styles.
- Match each feature's existing naming style; the two map domains differ.
- TypeScript extends Astro's strictest configuration with Solid JSX.
- Biome excludes Astro files. `pnpm build` supplies Astro and TypeScript checks.
- Tests are colocated `*.test.ts` files in map libraries and generator code.
- `/principles` redirects to `/taste`; individual village routes stay out of
  the sitemap. Keep Astro and static-host redirect rules consistent.

## Commands

| Command | Effect |
| --- | --- |
| `mise install` / `pnpm install` | Install configured tools/dependencies |
| `pnpm dev` | Local Astro server; configured port 8080 |
| `pnpm exec biome check src` | Read-only formatter, lint, and import checks |
| `pnpm check` | Same checks with writes; do not use on unrelated dirty work |
| `pnpm test` | Full Vitest suite |
| `pnpm build` | Optional CMS refresh, Astro/TypeScript checks, static build |
| `pnpm preview` | Serve the built site |
| `pnpm fetch-peaks` / `pnpm fetch-villages` | Live fetches that overwrite generated map data |

## Workflow and gotchas

- Use jj, not direct Git, while `.jj/` is present. `README.md` documents the
  trunk-based `main` bookmark workflow and Conventional Commit messages.
- Keep unrelated working-copy changes out of scoped commits.
- Regenerate peaks/villages only for data work; ascents/visits are authored logs.
- Do not edit generated `.astro/`, `dist/`, dependency files, or build artifacts.
- Infrastructure and deployment configuration belong in the separate citadel
  repository. Personal feature specs belong in the Homepage Linear project.
- Follow the scoped map guides instead of duplicating their contracts here.

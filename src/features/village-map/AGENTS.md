# Village map

## Overview

Solid island for Dutch village visits, mounted at `/village-map` and statically
generated `/village-map/v/<id>` deep links. Paths below are relative to this
directory unless prefixed with `src/`, `scripts/`, or `public/`.

Conservative score 11: 25 source files 3, eight descendant directories 2,
code density 2, app boundary 2, and more than 30 AST declarations 2.
URL state, wrapped datasets, and deep links justify separate domain guidance.

## Where to look

| Task | Location |
| --- | --- |
| Initial village selection | `app.tsx` |
| Main composition and nearest-unvisited action | `routes/public-map.tsx` |
| MapLibre canvas and worker setup | `components/map/map-canvas.tsx` |
| Village, visit, province and file contracts | `lib/schemas.ts` |
| Loading, hamlet exclusion, indexes | `lib/data.ts` |
| Visited/province/tag filtering | `lib/filters.ts` |
| Query parsing and browser history | `stores/filters.ts` |
| Shared selected village | `stores/selection.ts` |
| Distance and nearest-unvisited calculation | `lib/geo.ts` |
| Filter regression tests | `lib/filters.test.ts` |

## Domain conventions

- Use lowercase/kebab-case filenames and named function components.
- Dataset shapes are `{ generatedAt, source, villages }` and `{ visits }`,
  not the mountain map's top-level arrays. Keep Valibot validation at loading.
- Hamlet exclusion must agree between `lib/data.ts` and
  `src/pages/village-map/v/[id].astro`.
- Filters use `visited`, `province`, and `tags` query parameters. Preserve
  comma-separated values, normalized tags, and back/forward synchronization.
- The store reads `location` at module scope. Its Astro mounts must remain
  `client:only="solid-js"`; it cannot be imported as a server-side store.
- `app.tsx` receives the deep-link village ID; selection is separate from filters.
- Preserve the feature's own styles and standalone layout, not the site shell.

## Data and checks

- `pnpm fetch-villages` overwrites `public/village-map/data/villages.json` using
  Overpass and province polygons; preserve the generator's Fryslân/Friesland alias.
- `public/village-map/data/visits.json` is authored history, not generator output.
- Run `pnpm test` and `pnpm build`; the build also verifies static deep links.
  For URL-state changes, exercise a shared URL and browser back/forward.

# Mountain map

## Overview

Solid island mounted by `src/pages/mountain-map.astro`, with its own CSS and
the bare `src/layouts/standalone.astro` shell. Paths below are relative to this
directory unless prefixed with `src/`, `scripts/`, or `public/`.

This distinct domain scores 8: code density 2, app boundary 2, more than
30 AST declarations 2, and more than 10 exports 2. It has 13 source files.

## Where to look

| Task | Location |
| --- | --- |
| Loading, selection, derived statistics | `App.tsx` |
| MapLibre lifecycle and layers | `components/MapView.tsx` |
| Peak/ascent runtime contracts | `lib/schemas.ts` |
| Fetching and ascent index | `lib/data.ts` |
| Elevation bands, state precedence, filters | `lib/filters.ts` |
| GeoJSON conversion | `lib/geojson.ts` |
| Per-instance signal state | `stores/filters.ts` |
| Filter regression tests | `lib/filters.test.ts` |
| Dataset producer and transformation tests | `scripts/mountain-map/` |

## Domain conventions

- Component filenames are PascalCase; match the existing exported arrow style.
- Peaks and ascents are separate top-level JSON arrays, validated with Valibot.
- `loadData` fetches `/mountain-map/data/peaks.json` and `ascents.json`.
- Keep filters local to `createFilterStore`; this feature does not use URL state.
- Empty band/state sets mean unrestricted; elevation bands include their lower
  bound and exclude their upper bound.
- `stateOf` prioritizes summited, attempted, then wishlist; no record is unclimbed.
- Preserve GeoJSON longitude/latitude order.
- The generator reuses `PeakSchema` through `scripts/mountain-map/schema.ts`.

## Data and checks

- `pnpm fetch-peaks` queries Wikidata and overwrites the generated peaks dataset.
  Do not run it for ordinary UI or filter changes.
- `public/mountain-map/data/ascents.json` is authored history, not generator output.
- Run `pnpm test` for filter and transformation coverage; use `pnpm build` to
  check the Astro mount and client bundle. Do not import browser-only map code
  into server-rendered paths.

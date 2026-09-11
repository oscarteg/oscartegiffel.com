# CRT-543 Result

## Outcome

- Converted the repository root to a Bun workspace with `apps/*` packages.
- Kept the Astro 6.3.5 site at the root with `output: "static"` and its existing routes and layouts.
- Copied the Village Map Solid SPA into `apps/village-map` with its own `index.html`, entry point, router, styles, Vite configuration, and `dist` output.
- Preserved runtime requests to `/data/villages.json` and `/data/visits.json`. The Vite plugin continues to serve `data/` during development and copy it to `dist/data` during builds.
- Preserved `apps/village-map/data/visits.json` as the Strapi migration source.
- Removed the local CMS: `/admin`, `src/routes/admin.tsx`, `src/components/admin/`, `scripts/dev-server/`, its R2 client and environment template, and `aws4fetch`.
- Retained `/`, `/v/:id`, and `@solidjs/router`.

## Dependency reconciliation

- Standardized Biome on **2.5.0** at the workspace root. It is the newer of the two existing versions and understands the Village Map configuration schema. The nested config uses `"root": false`; the root configuration excludes Astro files because Biome's experimental Astro parser rejects valid existing Astro TypeScript syntax. Astro files remain checked by `astro check` in the root build.
- Pinned root Vite to **7.3.3**, matching Astro 6.3.5's Vite dependency. Without this explicit root dependency Bun hoisted Village Map's Vite 8, causing Astro's Tailwind plugin to fail with `Missing field tsconfigPaths on BindingViteResolvePluginConfig.resolveOptions`.
- Kept **Vite 8** in `apps/village-map`, where the Solid SPA builds independently.
- Aligned `tailwindcss` and `@tailwindcss/vite` on **4.3.0** in both workspaces. Both apps remain on Tailwind v4 while avoiding two plugin versions.
- Removed the copied app-level `bun.lock`; the root `bun.lock` is now the sole workspace lockfile.

## Verification

All commands used Bun 1.4.0.

### Root Astro build

Command:

```sh
bun run build
```

Exit: `0`

Observed output (the repeated 664 cached image entries are omitted, with the start and final result retained):

```text
$ bunx --bun astro check && tsc --noEmit && bunx --bun astro build
13:13:40 [vite] Re-optimizing dependencies because lockfile has changed
13:13:40 [content] Syncing content
13:13:41 [content] Synced content
13:13:41 [types] Generated 348ms
13:13:41 [check] Getting diagnostics for Astro files in /Users/oscar/Developer/Personal/oscartegiffel.com...
src/content.config.ts:21:23 - hint ts(6385): '(params?: string | ...): ZodString' is deprecated.

Result (38 files):
- 0 errors
- 0 warnings
- 1 hint

13:13:44 [build] output: "static"
13:13:44 [build] mode: "static"
13:13:44 [build] directory: /Users/oscar/Developer/Personal/oscartegiffel.com/dist/
13:13:44 [build] Collecting build info...
13:13:44 [build] ✓ Completed in 191ms.
13:13:44 [build] Building static entrypoints...
13:13:45 [vite] ✓ built in 1.36s
13:13:45 [vite] ✓ built in 12ms
13:13:45 [build] Rearranging server assets...
...
13:13:46 ✓ Completed in 57ms.
13:13:46 [build] ✓ Completed in 2.13s.
13:13:46 [@astrojs/sitemap] `sitemap-index.xml` created at `dist`
13:13:46 [build] 25 page(s) built in 2.33s
13:13:46 [build] Complete!
```

### Village Map build

Command, run from `apps/village-map`:

```sh
bun run build
```

Exit: `0`

```text
$ vite build
vite v8.3.0 building client environment for production...
transforming...
✓ 53 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                     0.39 kB │ gzip:   0.26 kB
dist/assets/index-DfPCmZ_u.css     83.44 kB │ gzip:  13.74 kB
dist/assets/index-Di7FZyqx.js   1,084.51 kB │ gzip: 293.18 kB

✓ built in 334ms
[plugin builtin:vite-reporter]
(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rolldownOptions.output.codeSplitting to improve chunking: https://rolldown.rs/reference/OutputOptions.codeSplitting
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
```

### `applyFilters` tests

The copied source checkout contained no test file for `applyFilters`; a strict regression test was added for the existing behavior instead of claiming nonexistent tests passed.

Command, run from `apps/village-map`:

```sh
bun test src/lib/filters.test.ts
```

Exit: `0`

```text
bun test v1.4.0 (1381054db)

 2 pass
 0 fail
 3 expect() calls
Ran 2 tests across 1 file. [4.00ms]
```

### Root TypeScript

Command:

```sh
bunx tsc --noEmit
```

Exit: `0`

```text
(no output)
```

### Village Map TypeScript

Command, run from `apps/village-map`:

```sh
bunx tsc --noEmit
```

Exit: `0`

```text
(no output)
```

### Biome

Command:

```sh
bunx biome check .
```

Exit: `0`

```text
Checked 51 files in 12ms. No fixes applied.
```

### Deleted-module references

Command, run from `apps/village-map`:

```sh
if rg -n --hidden --glob '!RESULT.md' --glob '!bun.lock' 'aws4fetch|scripts/dev-server|components/admin|routes/admin|/admin|devApi|R2_|includeHamlets' .; then exit 1; else printf 'No references to deleted admin/dev-server modules found.\n'; fi
```

Exit: `0`

```text
No references to deleted admin/dev-server modules found.
```

## Tooling note

The harness refused `lsp_diagnostics` for these files because its request cwd is `/Users/oscar/Developer/Personal/mountain-map`, outside this target repository. Both strict `tsc --noEmit` commands passed and provide the compiler diagnostics evidence instead.

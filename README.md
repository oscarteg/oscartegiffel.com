# Homepage

Source for [oscartegiffel.com](https://oscartegiffel.com) — Astro + TailwindCSS.

## Development

```sh
mise install      # Node + pnpm from mise.toml
pnpm install
pnpm dev          # local dev server
pnpm build        # astro check + tsc + astro build
pnpm check        # biome format + lint + organize imports
pnpm test         # vitest
```

## Committing & pushing with jj

This repo is colocated (jj layered over git). Trunk-based — work directly on `main`, no feature branches. Remote is `origin` pointing at GitHub.

### Daily flow

```sh
# 1. Inspect state
jj st                                  # working-copy diff
jj log                                  # recent revisions

# 2. Describe the current change (Conventional Commit message)
jj describe -m "feat: add work experience section"

# 3. Run checks before publishing
pnpm check && pnpm build

# 4. Start a new empty change on top, advance main, push
jj new
jj bookmark move main --to @-          # @- = the change you just described
jj git push -b main
```

### Pulling remote changes / rebasing

```sh
jj git fetch                            # fetch refs from origin
jj rebase -d main@origin                # rebase local work onto latest origin/main
```

### Splitting a change that grew too big

```sh
jj split                                # interactively choose hunks for the first commit
```

### Undo

```sh
jj op log                               # operation history
jj undo                                 # revert the last op (safe; jj keeps everything)
```

### Conventional Commits

`feat`, `fix`, `chore`, `refactor`, `ci`, `revert`. Append `!` for breaking changes (`feat(api)!: ...`). Lowercase descriptions; explain the *why* in the body when it isn't obvious.

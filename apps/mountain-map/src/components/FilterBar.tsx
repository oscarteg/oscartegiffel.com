import { For } from "solid-js";
import { ELEVATION_BANDS } from "../lib/filters";
import type { PeakState } from "../lib/filters";
import type { FilterStore } from "../stores/filters";

const STATES: readonly { readonly id: PeakState; readonly label: string }[] = [
  { id: "summited", label: "Summited" },
  { id: "attempted", label: "Attempted" },
  { id: "wishlist", label: "Wishlist" },
  { id: "unclimbed", label: "Unclimbed" },
];

const chipClass = (active: boolean) =>
  [
    "rounded-full border px-3 py-1.5 text-sm transition-colors",
    active
      ? "border-glacier-300 bg-glacier-500/25 text-rock-50"
      : "border-rock-600 bg-rock-900 text-rock-200 hover:border-rock-400",
  ].join(" ");

type FilterBarProps = {
  readonly store: FilterStore;
  readonly shown: number;
  readonly total: number;
};

export const FilterBar = (props: FilterBarProps) => (
  <div class="flex flex-col gap-4 border-b border-rock-800 bg-rock-900/60 p-4">
    <div class="flex flex-wrap items-center gap-2">
      <h2 id="band-label" class="mr-1 text-xs font-medium uppercase tracking-wider text-rock-400">
        Elevation
      </h2>
      <div class="flex flex-wrap gap-2" role="group" aria-labelledby="band-label">
        <For each={ELEVATION_BANDS}>
          {(band) => (
            <button
              type="button"
              aria-pressed={props.store.filters().bands.has(band.id)}
              onClick={() => props.store.toggleBand(band.id)}
              class={chipClass(props.store.filters().bands.has(band.id))}
            >
              <span class="tabular">{band.label}</span>
              <span class="text-rock-400"> m</span>
            </button>
          )}
        </For>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <h2 id="state-label" class="mr-1 text-xs font-medium uppercase tracking-wider text-rock-400">
        Status
      </h2>
      <div class="flex flex-wrap gap-2" role="group" aria-labelledby="state-label">
        <For each={STATES}>
          {(state) => (
            <button
              type="button"
              aria-pressed={props.store.filters().states.has(state.id)}
              onClick={() => props.store.toggleState(state.id)}
              class={chipClass(props.store.filters().states.has(state.id))}
            >
              {state.label}
            </button>
          )}
        </For>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <label class="flex-1 min-w-48">
        <span class="sr-only">Search peaks by name</span>
        <input
          type="search"
          placeholder="Search peaks…"
          value={props.store.filters().search}
          onInput={(event) => props.store.setSearch(event.currentTarget.value)}
          class="w-full rounded-md border border-rock-600 bg-rock-950 px-3 py-1.5 text-sm text-rock-100 placeholder:text-rock-400"
        />
      </label>
      <p aria-live="polite" class="text-sm text-rock-400">
        <span class="tabular text-rock-100">{props.shown.toLocaleString("en-GB")}</span> of{" "}
        <span class="tabular">{props.total.toLocaleString("en-GB")}</span> peaks
      </p>
      <button
        type="button"
        onClick={() => props.store.reset()}
        class="rounded-md border border-rock-600 px-3 py-1.5 text-sm text-rock-300 transition-colors hover:border-rock-400 hover:text-rock-100"
      >
        Reset
      </button>
    </div>
  </div>
);

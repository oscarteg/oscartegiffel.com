import { createSignal } from "solid-js";
import { emptyFilterState } from "../lib/filters";
import type { BandId, FilterState, PeakState } from "../lib/filters";

const toggle = <T,>(set: ReadonlySet<T>, value: T): ReadonlySet<T> => {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
};

export const createFilterStore = () => {
  const [filters, setFilters] = createSignal<FilterState>(emptyFilterState);

  const toggleBand = (band: BandId) =>
    setFilters((current) => ({ ...current, bands: toggle(current.bands, band) }));

  const toggleState = (state: PeakState) =>
    setFilters((current) => ({ ...current, states: toggle(current.states, state) }));

  const setSearch = (search: string) => setFilters((current) => ({ ...current, search }));

  const reset = () => setFilters(emptyFilterState);

  return { filters, toggleBand, toggleState, setSearch, reset };
};

export type FilterStore = ReturnType<typeof createFilterStore>;

import type { Ascent, AscentStatus, Peak } from "./schemas";

export const ELEVATION_BANDS = [
  { id: "4000-5000", label: "4000–5000", min: 4000, max: 5000 },
  { id: "5000-6000", label: "5000–6000", min: 5000, max: 6000 },
  { id: "6000-7000", label: "6000–7000", min: 6000, max: 7000 },
  { id: "7000-8000", label: "7000–8000", min: 7000, max: 8000 },
  { id: "8000+", label: "8000+", min: 8000, max: Number.POSITIVE_INFINITY },
] as const;

export type BandId = (typeof ELEVATION_BANDS)[number]["id"];

/** A peak with no ascent record is "unclimbed". */
export type PeakState = AscentStatus | "unclimbed";

export type FilterState = {
  /** Empty means no band restriction. */
  readonly bands: ReadonlySet<BandId>;
  /** Empty means no state restriction. */
  readonly states: ReadonlySet<PeakState>;
  readonly search: string;
};

export const emptyFilterState: FilterState = {
  bands: new Set(),
  states: new Set(),
  search: "",
};

export const bandOf = (elevation: number): BandId | null =>
  ELEVATION_BANDS.find((band) => elevation >= band.min && elevation < band.max)?.id ?? null;

const STATE_PRECEDENCE: readonly PeakState[] = ["summited", "attempted", "wishlist"];

export const stateOf = (
  peakId: string,
  ascentsByPeak: ReadonlyMap<string, readonly Ascent[]>,
): PeakState => {
  const ascents = ascentsByPeak.get(peakId);
  if (ascents === undefined || ascents.length === 0) return "unclimbed";
  return (
    STATE_PRECEDENCE.find((state) => ascents.some((ascent) => ascent.status === state)) ??
    "unclimbed"
  );
};

export const applyFilters = (
  peaks: readonly Peak[],
  ascentsByPeak: ReadonlyMap<string, readonly Ascent[]>,
  filters: FilterState,
): Peak[] => {
  const search = filters.search.trim().toLowerCase();

  return peaks.filter((peak) => {
    if (filters.bands.size > 0) {
      const band = bandOf(peak.elevation);
      if (band === null || !filters.bands.has(band)) return false;
    }

    if (filters.states.size > 0 && !filters.states.has(stateOf(peak.id, ascentsByPeak))) {
      return false;
    }

    return search === "" || peak.name.toLowerCase().includes(search);
  });
};

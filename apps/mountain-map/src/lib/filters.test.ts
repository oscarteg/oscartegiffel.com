import { describe, expect, it } from "vitest";
import { applyFilters, bandOf, emptyFilterState, stateOf } from "./filters";
import type { BandId, FilterState, PeakState } from "./filters";
import type { Ascent, Peak } from "./schemas";

const peak = (id: string, name: string, elevation: number): Peak => ({
  id,
  name,
  elevation,
  lat: 46,
  lng: 8,
  prominence: null,
  country: null,
  range: null,
  wikipedia: null,
});

const ascent = (peakId: string, status: Ascent["status"], summited: boolean): Ascent => ({
  peakId,
  status,
  summited,
  date: null,
  route: null,
  alpineGrade: null,
  uiaaGrade: null,
  iceGrade: null,
  note: null,
  photos: [],
  partners: [],
  techniques: [],
});

const peaks: readonly Peak[] = [
  peak("Q1", "Low", 4000), // exact lower bound of 4000-5000
  peak("Q2", "Mid", 4500),
  peak("Q3", "Boundary", 5000), // exact bound: belongs to 5000-6000, NOT 4000-5000
  peak("Q4", "Six", 6500),
  peak("Q5", "Seven", 7200),
  peak("Q6", "Eight", 8000), // exact bound: belongs to 8000+
  peak("Q7", "Everest", 8849),
];

const ascentsByPeak = new Map<string, readonly Ascent[]>([
  ["Q1", [ascent("Q1", "summited", true)]],
  ["Q2", [ascent("Q2", "attempted", false)]], // failed attempt
  ["Q4", [ascent("Q4", "wishlist", false)]],
]);

const withBands = (...bands: BandId[]): FilterState => ({
  ...emptyFilterState,
  bands: new Set(bands),
});

const withStates = (...states: PeakState[]): FilterState => ({
  ...emptyFilterState,
  states: new Set(states),
});

const names = (result: readonly Peak[]) => result.map((p) => p.name).sort();

describe("bandOf", () => {
  it("puts an exact lower bound in its own band", () => {
    expect(bandOf(4000)).toBe("4000-5000");
  });

  it("treats the upper bound as exclusive, so 5000 lands in the next band", () => {
    expect(bandOf(5000)).toBe("5000-6000");
  });

  it("puts 8000 in the open-ended top band", () => {
    expect(bandOf(8000)).toBe("8000+");
    expect(bandOf(8849)).toBe("8000+");
  });

  it("returns null below the lowest band", () => {
    expect(bandOf(3999)).toBeNull();
  });
});

describe("stateOf", () => {
  it("reports unclimbed when there is no ascent record", () => {
    expect(stateOf("Q3", ascentsByPeak)).toBe("unclimbed");
  });

  it("reports the recorded status", () => {
    expect(stateOf("Q1", ascentsByPeak)).toBe("summited");
  });

  it("keeps a failed attempt as attempted, not summited", () => {
    expect(stateOf("Q2", ascentsByPeak)).toBe("attempted");
  });
});

describe("applyFilters", () => {
  it("returns every peak when no filters are set", () => {
    expect(applyFilters(peaks, ascentsByPeak, emptyFilterState)).toHaveLength(7);
  });

  it("filters to a single band, excluding the exclusive upper bound", () => {
    expect(names(applyFilters(peaks, ascentsByPeak, withBands("4000-5000")))).toEqual([
      "Low",
      "Mid",
    ]);
  });

  it("includes a peak sitting exactly on a lower bound", () => {
    expect(names(applyFilters(peaks, ascentsByPeak, withBands("5000-6000")))).toEqual([
      "Boundary",
    ]);
  });

  it("treats 8000+ as open ended", () => {
    expect(names(applyFilters(peaks, ascentsByPeak, withBands("8000+")))).toEqual([
      "Eight",
      "Everest",
    ]);
  });

  it("unions multiple selected bands", () => {
    const result = applyFilters(peaks, ascentsByPeak, withBands("4000-5000", "8000+"));
    expect(names(result)).toEqual(["Eight", "Everest", "Low", "Mid"]);
  });

  it("filters by state", () => {
    expect(names(applyFilters(peaks, ascentsByPeak, withStates("summited")))).toEqual(["Low"]);
  });

  it("treats peaks without records as unclimbed", () => {
    expect(names(applyFilters(peaks, ascentsByPeak, withStates("unclimbed")))).toEqual([
      "Boundary",
      "Eight",
      "Everest",
      "Seven",
    ]);
  });

  it("intersects band and state filters", () => {
    const filters: FilterState = {
      ...emptyFilterState,
      bands: new Set<BandId>(["4000-5000"]),
      states: new Set<PeakState>(["attempted"]),
    };
    expect(names(applyFilters(peaks, ascentsByPeak, filters))).toEqual(["Mid"]);
  });

  it("matches search case-insensitively", () => {
    const filters: FilterState = { ...emptyFilterState, search: "everest" };
    expect(names(applyFilters(peaks, ascentsByPeak, filters))).toEqual(["Everest"]);
  });
});

import * as v from "valibot";
import { AscentsSchema, PeaksSchema } from "./schemas";
import type { Ascent, Peak } from "./schemas";

export type LoadedData = {
  readonly peaks: readonly Peak[];
  readonly ascentsByPeak: ReadonlyMap<string, readonly Ascent[]>;
};

const fetchJson = async (url: string): Promise<unknown> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load ${url}: ${response.status}`);
  return response.json();
};

const groupByPeak = (ascents: readonly Ascent[]): ReadonlyMap<string, readonly Ascent[]> => {
  const grouped = new Map<string, Ascent[]>();
  for (const ascent of ascents) {
    const existing = grouped.get(ascent.peakId);
    if (existing === undefined) grouped.set(ascent.peakId, [ascent]);
    else existing.push(ascent);
  }
  return grouped;
};

export const loadData = async (): Promise<LoadedData> => {
  const [rawPeaks, rawAscents] = await Promise.all([
    fetchJson("/data/peaks.json"),
    fetchJson("/data/ascents.json"),
  ]);

  return {
    peaks: v.parse(PeaksSchema, rawPeaks),
    ascentsByPeak: groupByPeak(v.parse(AscentsSchema, rawAscents)),
  };
};

import { stateOf } from "./filters";
import type { PeakState } from "./filters";
import type { Ascent, Peak } from "./schemas";

export type PeakProperties = {
  readonly id: string;
  readonly name: string;
  readonly elevation: number;
  readonly state: PeakState;
};

export type PeakFeature = {
  type: "Feature";
  geometry: { type: "Point"; coordinates: [number, number] };
  properties: PeakProperties;
};

export type PeakCollection = {
  type: "FeatureCollection";
  features: PeakFeature[];
};

export const toFeatureCollection = (
  peaks: readonly Peak[],
  ascentsByPeak: ReadonlyMap<string, readonly Ascent[]>,
): PeakCollection => ({
  type: "FeatureCollection",
  features: peaks.map((peak) => ({
    type: "Feature",
    geometry: { type: "Point", coordinates: [peak.lng, peak.lat] },
    properties: {
      id: peak.id,
      name: peak.name,
      elevation: peak.elevation,
      state: stateOf(peak.id, ascentsByPeak),
    },
  })),
});

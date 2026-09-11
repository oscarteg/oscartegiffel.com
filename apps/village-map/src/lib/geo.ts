import type { LoadedData } from "./data";
import type { Village } from "./schemas";

const EARTH_RADIUS_KM = 6371;

export type LatLng = { lat: number; lng: number };

function toRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function haversineKm(a: LatLng, b: LatLng): number {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);

  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

export type NearestResult = { village: Village; distanceKm: number };

export function nearestUnvisited(origin: LatLng, data: LoadedData, n: number): NearestResult[] {
  const results: NearestResult[] = [];
  for (const village of data.villages) {
    if (data.visitByVillageId.has(village.id)) continue;
    results.push({
      village,
      distanceKm: haversineKm(origin, { lat: village.lat, lng: village.lng }),
    });
  }
  results.sort((a, b) => a.distanceKm - b.distanceKm);
  return results.slice(0, n);
}

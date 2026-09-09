import * as v from "valibot";
import { type Peak, PeakSchema, type SparqlRow } from "./schema";

const ENTITY_URI_PATTERN = /\/entity\/(Q\d+)$/;
const POINT_PATTERN = /^Point\((-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)\)$/;

export class InvalidSparqlValueError extends Error {
  override readonly name = "InvalidSparqlValueError";

  constructor(
    readonly field: string,
    readonly value: string,
  ) {
    super(`Invalid ${field} value: ${value}`);
  }
}

function requiredMatch(pattern: RegExp, value: string, field: string): RegExpExecArray {
  const match = pattern.exec(value);
  if (!match) throw new InvalidSparqlValueError(field, value);
  return match;
}

function requiredCapture(match: RegExpExecArray, index: number, field: string): string {
  const value = match[index];
  if (value === undefined) throw new InvalidSparqlValueError(field, match[0]);
  return value;
}

function parseNumber(value: string, field: string): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) throw new InvalidSparqlValueError(field, value);
  return parsed;
}

/** Converts one parsed WDQS binding into the static peak contract. */
export function transformRow(row: SparqlRow): Peak {
  const entityMatch = requiredMatch(ENTITY_URI_PATTERN, row.item.value, "item");
  const pointMatch = requiredMatch(POINT_PATTERN, row.coordinate.value, "coordinate");

  return v.parse(PeakSchema, {
    id: requiredCapture(entityMatch, 1, "item"),
    name: row.itemLabel.value,
    lng: parseNumber(requiredCapture(pointMatch, 1, "longitude"), "longitude"),
    lat: parseNumber(requiredCapture(pointMatch, 2, "latitude"), "latitude"),
    elevation: parseNumber(row.elevation.value, "elevation"),
    prominence: row.prominence ? parseNumber(row.prominence.value, "prominence") : null,
    country: row.countryLabel?.value ?? null,
    range: row.rangeLabel?.value ?? null,
    wikipedia: row.wikipedia?.value ?? null,
  });
}

/** Resolves repeated Wikidata ids by maximum elevation and returns stable output order. */
export function deduplicateAndSortPeaks(peaks: readonly Peak[]): Peak[] {
  const byId = new Map<string, Peak>();
  for (const peak of peaks) {
    const current = byId.get(peak.id);
    if (!current || peak.elevation > current.elevation) byId.set(peak.id, peak);
  }

  return [...byId.values()].sort(
    (left, right) => right.elevation - left.elevation || left.id.localeCompare(right.id),
  );
}

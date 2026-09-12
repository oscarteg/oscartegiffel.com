import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import wretch from "wretch";
import { retry } from "wretch/middlewares";
import * as v from "valibot";
import {
  type MetadataResponse,
  MetadataResponseSchema,
  type MetadataRow,
  type Peak,
  PeaksSchema,
  type SparqlResponse,
  SparqlResponseSchema,
} from "./schema";
import { deduplicateAndSortPeaks, transformRow } from "./transform";

const WDQS_URL = "https://query.wikidata.org/sparql";
const USER_AGENT = "peaks-pipeline/1.0 (https://github.com/oscarteg)";
const REQUEST_INTERVAL_MS = 1_100;
const METADATA_BATCH_SIZE = 100;
const OUTPUT_PATH = resolve(import.meta.dir, "../public/data/peaks.json");

const ELEVATION_BANDS = [
  { label: "4000-5000", minimum: 4_000, maximum: 5_000 },
  { label: "5000-6000", minimum: 5_000, maximum: 6_000 },
  { label: "6000-7000", minimum: 6_000, maximum: 7_000 },
  { label: "7000-8000", minimum: 7_000, maximum: 8_000 },
  { label: "8000+", minimum: 8_000, maximum: null },
] as const;

type ElevationBand = (typeof ELEVATION_BANDS)[number];

export class WikidataRequestError extends Error {
  override readonly name = "WikidataRequestError";

  constructor(
    readonly band: string,
    options?: ErrorOptions,
  ) {
    super(`Wikidata query failed for elevation band ${band}`, options);
  }
}

export function buildQuery(band: ElevationBand): string {
  const upperBound = band.maximum === null ? "" : `FILTER(?elevationAmount < ${band.maximum})`;

  return `
SELECT
  ?item
  (COALESCE(SAMPLE(?itemName), STRAFTER(STR(?item), "/entity/")) AS ?itemLabel)
  (SAMPLE(?location) AS ?coordinate)
  (MAX(?elevationAmount) AS ?elevation)
WHERE {
  ?item wdt:P31/wdt:P279* wd:Q8502;
        p:P625 ?coordinateStatement;
        p:P2044 ?elevationStatement.
  ?coordinateStatement a wikibase:BestRank;
                       ps:P625 ?location;
                       psv:P625 ?coordinateNode.
  ?coordinateNode wikibase:geoGlobe wd:Q2.
  ?elevationStatement a wikibase:BestRank;
                      psn:P2044 ?normalizedElevation.
  ?normalizedElevation wikibase:quantityAmount ?elevationAmount.
  FILTER(?elevationAmount >= ${band.minimum})
  ${upperBound}
  OPTIONAL { ?item rdfs:label ?itemName. FILTER(LANG(?itemName) = "en") }
}
GROUP BY ?item
ORDER BY ?item
`;
}

export function buildMetadataQuery(ids: readonly string[]): string {
  const values = ids.map((id) => `wd:${id}`).join(" ");
  return `
SELECT
  ?item
  (MAX(?prominenceAmount) AS ?prominence)
  (SAMPLE(?countryName) AS ?countryLabel)
  (SAMPLE(?rangeName) AS ?rangeLabel)
  (SAMPLE(?article) AS ?wikipedia)
WHERE {
  VALUES ?item { ${values} }
  OPTIONAL {
    ?item p:P2660 ?prominenceStatement.
    ?prominenceStatement a wikibase:BestRank;
                         psn:P2660 ?normalizedProminence.
    ?normalizedProminence wikibase:quantityAmount ?prominenceAmount.
  }
  OPTIONAL {
    ?item wdt:P17 ?country.
    ?country rdfs:label ?countryName.
    FILTER(LANG(?countryName) = "en")
  }
  OPTIONAL {
    ?item wdt:P4552 ?range.
    ?range rdfs:label ?rangeName.
    FILTER(LANG(?rangeName) = "en")
  }
  OPTIONAL {
    ?article schema:about ?item;
             schema:isPartOf <https://en.wikipedia.org/>.
  }
}
GROUP BY ?item
ORDER BY ?item
`;
}

// WDQS enforces a 60s query timeout and rate-limits aggressively, so stay just
// under it and back off on the statuses it uses to shed load.
const WDQS_TIMEOUT_MS = 59_000;
const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504]);

async function requestQuery(query: string): Promise<unknown> {
  return wretch(`${WDQS_URL}?${new URLSearchParams({ query })}`)
    .middlewares([
      retry({
        maxAttempts: 2,
        retryOnNetworkError: true,
        until: (response) => !!response && !RETRYABLE_STATUS.has(response.status),
      }),
    ])
    .headers({
      Accept: "application/sparql-results+json",
      "User-Agent": USER_AGENT,
    })
    .options({ signal: AbortSignal.timeout(WDQS_TIMEOUT_MS) })
    .get()
    .json<unknown>();
}

async function fetchBand(band: ElevationBand): Promise<SparqlResponse> {
  try {
    const response = await requestQuery(buildQuery(band));
    return v.parse(SparqlResponseSchema, response);
  } catch (error) {
    throw new WikidataRequestError(band.label, { cause: error });
  }
}

async function fetchMetadata(ids: readonly string[]): Promise<MetadataResponse> {
  try {
    const response = await requestQuery(buildMetadataQuery(ids));
    return v.parse(MetadataResponseSchema, response);
  } catch (error) {
    throw new WikidataRequestError(`metadata ${ids[0] ?? "empty"}`, { cause: error });
  }
}

async function waitForRateLimit(): Promise<void> {
  await Bun.sleep(REQUEST_INTERVAL_MS);
}

function metadataById(rows: readonly MetadataRow[]): Map<string, MetadataRow> {
  return new Map(
    rows.map((row) => [row.item.value.slice(row.item.value.lastIndexOf("/") + 1), row]),
  );
}

function addMetadata(peak: Peak, row: MetadataRow | undefined): Peak {
  if (!row) return peak;
  return {
    ...peak,
    prominence: row.prominence ? Number(row.prominence.value) : null,
    country: row.countryLabel?.value ?? null,
    range: row.rangeLabel?.value ?? null,
    wikipedia: row.wikipedia?.value ?? null,
  };
}

/** Fetches, validates, deduplicates, and writes the complete static peak dataset. */
export async function fetchPeaks(): Promise<Peak[]> {
  const corePeaks: Peak[] = [];

  for (const [index, band] of ELEVATION_BANDS.entries()) {
    console.log(`Fetching ${band.label} m peaks...`);
    const response = await fetchBand(band);
    const bandPeaks = response.results.bindings.map(transformRow);
    corePeaks.push(...bandPeaks);
    console.log(`  received ${bandPeaks.length} peaks`);

    if (index < ELEVATION_BANDS.length - 1) await waitForRateLimit();
  }

  const deduplicated = deduplicateAndSortPeaks(corePeaks);
  const metadata = new Map<string, MetadataRow>();
  for (let index = 0; index < deduplicated.length; index += METADATA_BATCH_SIZE) {
    await waitForRateLimit();
    const batch = deduplicated.slice(index, index + METADATA_BATCH_SIZE);
    console.log(`Fetching metadata ${index + 1}-${index + batch.length}...`);
    const response = await fetchMetadata(batch.map((peak) => peak.id));
    for (const [id, row] of metadataById(response.results.bindings)) metadata.set(id, row);
  }

  const enriched = deduplicated.map((peak) => addMetadata(peak, metadata.get(peak.id)));
  const output = v.parse(PeaksSchema, deduplicateAndSortPeaks(enriched));
  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Wrote ${output.length} peaks to ${OUTPUT_PATH}`);
  return output;
}

if (import.meta.main) {
  await fetchPeaks();
}

import { writeFile } from "node:fs/promises";
import path from "node:path";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point } from "@turf/helpers";
import type { Feature, FeatureCollection, MultiPolygon, Polygon } from "geojson";
import * as v from "valibot";
import wretch from "wretch";
import {
  type Province,
  ProvinceSchema,
  type Village,
  VillagesFileSchema,
} from "../src/lib/schemas";

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
const OVERPASS_QUERY = `
[out:json][timeout:180];
area["ISO3166-1"="NL"][admin_level=2]->.nl;
(
  node["place"="village"](area.nl);
  node["place"="hamlet"](area.nl);
  node["place"="town"](area.nl);
);
out body;
`;

// Cartomap province polygons (CBS 2024, EPSG:4326 GeoJSON).
// PDOK WFS endpoint returned 404 as of 2026-06-20; cartomap mirror uses same statnaam property.
const PROVINCE_GEOJSON_URL = "https://cartomap.github.io/nl/wgs84/provincie_2024.geojson";

type OverpassNode = {
  type: "node";
  id: number;
  lat: number;
  lon: number;
  tags?: Record<string, string>;
};

type OverpassResponse = {
  elements: OverpassNode[];
};

type ProvinceFeature = Feature<Polygon | MultiPolygon, { statnaam: string }>;

// Cartomap uses the official Frisian spelling; the schema uses the Dutch spelling.
const PROVINCE_NAME_ALIASES: Record<string, string> = {
  Fryslân: "Friesland",
};

async function fetchOverpass(): Promise<OverpassNode[]> {
  console.log("Fetching villages from Overpass...");
  const body = new URLSearchParams({ data: OVERPASS_QUERY }).toString();
  const res = await wretch(OVERPASS_URL)
    .headers({
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "*/*",
      "User-Agent": "village-map/1.0 (https://github.com/oscar/village-map)",
    })
    .body(body)
    .post()
    .json<OverpassResponse>();
  console.log(`  ${res.elements.length} place nodes`);
  return res.elements.filter((e) => e.type === "node");
}

async function fetchProvinces(): Promise<ProvinceFeature[]> {
  console.log("Fetching province polygons from PDOK...");
  const fc = await wretch(PROVINCE_GEOJSON_URL).get().json<FeatureCollection>();
  const features = fc.features as ProvinceFeature[];
  console.log(`  ${features.length} provinces`);
  return features;
}

function assignProvince(node: OverpassNode, provinces: ProvinceFeature[]): Province | null {
  const pt = point([node.lon, node.lat]);
  for (const prov of provinces) {
    if (booleanPointInPolygon(pt, prov)) {
      const name = PROVINCE_NAME_ALIASES[prov.properties.statnaam] ?? prov.properties.statnaam;
      const parsed = v.safeParse(ProvinceSchema, name);
      if (parsed.success) return parsed.output;
      console.warn(`  unknown province name from PDOK: "${name}"`);
      return null;
    }
  }
  return null;
}

function normalize(nodes: OverpassNode[], provinces: ProvinceFeature[]): Village[] {
  const villages: Village[] = [];
  let dropped = 0;

  for (const n of nodes) {
    const name = n.tags?.name;
    const placeTag = n.tags?.place;
    if (!name || (placeTag !== "village" && placeTag !== "hamlet" && placeTag !== "town")) {
      dropped++;
      continue;
    }

    const province = assignProvince(n, provinces);
    if (!province) {
      dropped++;
      continue;
    }

    const popStr = n.tags?.population;
    const population = popStr && /^\d+$/.test(popStr) ? Number(popStr) : undefined;

    villages.push({
      id: `n${n.id}`,
      name,
      lat: n.lat,
      lng: n.lon,
      province,
      type: placeTag,
      population,
    });
  }

  villages.sort((a, b) => a.id.localeCompare(b.id));
  console.log(`  ${villages.length} villages kept, ${dropped} dropped`);
  return villages;
}

async function main(): Promise<void> {
  const [nodes, provinces] = await Promise.all([fetchOverpass(), fetchProvinces()]);

  const villages = normalize(nodes, provinces);

  const file = {
    generatedAt: new Date().toISOString(),
    source: "osm-overpass" as const,
    villages,
  };

  v.parse(VillagesFileSchema, file);

  const outPath = path.resolve("data/villages.json");
  await writeFile(outPath, `${JSON.stringify(file, null, 2)}\n`, "utf8");
  console.log(`Wrote ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import * as v from "valibot";

export const ProvinceSchema = v.picklist([
  "Drenthe",
  "Flevoland",
  "Friesland",
  "Gelderland",
  "Groningen",
  "Limburg",
  "Noord-Brabant",
  "Noord-Holland",
  "Overijssel",
  "Utrecht",
  "Zeeland",
  "Zuid-Holland",
]);
export type Province = v.InferOutput<typeof ProvinceSchema>;

export const VillageSchema = v.object({
  id: v.pipe(v.string(), v.minLength(1)),
  name: v.pipe(v.string(), v.minLength(1)),
  lat: v.pipe(v.number(), v.minValue(-90), v.maxValue(90)),
  lng: v.pipe(v.number(), v.minValue(-180), v.maxValue(180)),
  province: ProvinceSchema,
  type: v.picklist(["village", "hamlet", "town"]),
  population: v.optional(v.pipe(v.number(), v.minValue(0))),
});
export type Village = v.InferOutput<typeof VillageSchema>;

export const VillagesFileSchema = v.object({
  generatedAt: v.pipe(v.string(), v.isoTimestamp()),
  source: v.literal("osm-overpass"),
  villages: v.array(VillageSchema),
});
export type VillagesFile = v.InferOutput<typeof VillagesFileSchema>;

export const VisitSchema = v.object({
  villageId: v.pipe(v.string(), v.minLength(1)),
  visitedAt: v.pipe(v.string(), v.isoDate()),
  note: v.optional(v.string()),
  videos: v.optional(v.array(v.pipe(v.string(), v.url()))),
  photos: v.optional(v.array(v.pipe(v.string(), v.url()))),
  tags: v.optional(v.array(v.pipe(v.string(), v.minLength(1)))),
});
export type Visit = v.InferOutput<typeof VisitSchema>;

export const VisitsFileSchema = v.object({
  visits: v.array(VisitSchema),
});
export type VisitsFile = v.InferOutput<typeof VisitsFileSchema>;

import * as v from "valibot";

export const PeakSchema = v.object({
  id: v.string(),
  name: v.string(),
  lat: v.pipe(v.number(), v.minValue(-90), v.maxValue(90)),
  lng: v.pipe(v.number(), v.minValue(-180), v.maxValue(180)),
  elevation: v.number(),
  prominence: v.nullable(v.number()),
  country: v.nullable(v.string()),
  range: v.nullable(v.string()),
  wikipedia: v.nullable(v.string()),
});

export type Peak = v.InferOutput<typeof PeakSchema>;

export const ASCENT_STATUSES = ["wishlist", "attempted", "summited"] as const;

export const AscentStatusSchema = v.picklist(ASCENT_STATUSES);

export type AscentStatus = v.InferOutput<typeof AscentStatusSchema>;

export const TECHNIQUES = [
  "glacier-travel",
  "crevasse-rescue",
  "snow",
  "neve",
  "mixed",
  "scrambling",
  "technical-rock",
  "ice-climbing",
  "via-ferrata",
  "ski-touring",
  "bivouac",
] as const;

export const TechniqueSchema = v.picklist(TECHNIQUES);

export type Technique = v.InferOutput<typeof TechniqueSchema>;

export const AscentSchema = v.object({
  peakId: v.string(),
  status: AscentStatusSchema,
  /** Deliberately independent of `status`: a failed attempt is attempted + false. */
  summited: v.boolean(),
  date: v.nullable(v.string()),
  route: v.nullable(v.string()),
  alpineGrade: v.nullable(v.string()),
  uiaaGrade: v.nullable(v.string()),
  iceGrade: v.nullable(v.string()),
  note: v.nullable(v.string()),
  photos: v.array(v.string()),
  partners: v.array(v.string()),
  techniques: v.array(TechniqueSchema),
});

export type Ascent = v.InferOutput<typeof AscentSchema>;

export const PeaksSchema = v.array(PeakSchema);

export const AscentsSchema = v.array(AscentSchema);

import * as v from "valibot";

// Re-exported rather than redefined so the pipeline writes exactly the shape
// the app validates at runtime.
export { type Peak, PeakSchema, PeaksSchema } from "../src/lib/schemas";

/** SPARQL JSON wraps every value in an object carrying its RDF term type. */
const BindingSchema = v.object({
  type: v.optional(v.string()),
  datatype: v.optional(v.string()),
  "xml:lang": v.optional(v.string()),
  value: v.string(),
});

// Only the four core fields are guaranteed; the rest come from OPTIONAL
// clauses and are absent for peaks Wikidata has no data for.
export const SparqlRowSchema = v.object({
  item: BindingSchema,
  itemLabel: BindingSchema,
  coordinate: BindingSchema,
  elevation: BindingSchema,
  prominence: v.optional(BindingSchema),
  countryLabel: v.optional(BindingSchema),
  rangeLabel: v.optional(BindingSchema),
  wikipedia: v.optional(BindingSchema),
});

export type SparqlRow = v.InferOutput<typeof SparqlRowSchema>;

export const SparqlResponseSchema = v.object({
  results: v.object({ bindings: v.array(SparqlRowSchema) }),
});

export type SparqlResponse = v.InferOutput<typeof SparqlResponseSchema>;

// Every field but `item` comes from an OPTIONAL clause, so it may be absent.
export const MetadataRowSchema = v.object({
  item: BindingSchema,
  prominence: v.optional(BindingSchema),
  countryLabel: v.optional(BindingSchema),
  rangeLabel: v.optional(BindingSchema),
  wikipedia: v.optional(BindingSchema),
});

export type MetadataRow = v.InferOutput<typeof MetadataRowSchema>;

export const MetadataResponseSchema = v.object({
  results: v.object({ bindings: v.array(MetadataRowSchema) }),
});

export type MetadataResponse = v.InferOutput<typeof MetadataResponseSchema>;

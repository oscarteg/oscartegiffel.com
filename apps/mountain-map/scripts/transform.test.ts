import { describe, expect, it } from "bun:test";
import { deduplicateAndSortPeaks, transformRow } from "./transform";

const everestRow = {
  item: { type: "uri", value: "http://www.wikidata.org/entity/Q513" },
  itemLabel: { type: "literal", value: "Mount Everest" },
  coordinate: { type: "literal", value: "Point(86.925 27.988055555)" },
  elevation: { type: "literal", value: "8848.86" },
  prominence: { type: "literal", value: "8848.86" },
  countryLabel: { type: "literal", value: "Nepal" },
  rangeLabel: { type: "literal", value: "Himalayas" },
  wikipedia: { type: "uri", value: "https://en.wikipedia.org/wiki/Mount_Everest" },
} as const;

describe("transformRow", () => {
  it("maps WKT longitude and latitude correctly when transforming Everest", () => {
    // Given an Everest binding whose WKT coordinate is Point(lng lat)
    // When the row is transformed
    const peak = transformRow(everestRow);

    // Then longitude and latitude retain their geographic meaning
    expect(peak.lng).toBeCloseTo(86.925, 6);
    expect(peak.lat).toBeCloseTo(27.988055555, 6);
  });

  it("maps normalized numeric and optional metadata fields", () => {
    // Given a complete WDQS binding
    // When the row is transformed
    const peak = transformRow(everestRow);

    // Then the consumer-facing peak has parsed values
    expect(peak).toEqual({
      id: "Q513",
      name: "Mount Everest",
      lat: 27.988055555,
      lng: 86.925,
      elevation: 8848.86,
      prominence: 8848.86,
      country: "Nepal",
      range: "Himalayas",
      wikipedia: "https://en.wikipedia.org/wiki/Mount_Everest",
    });
  });

  it("uses null for absent optional metadata", () => {
    // Given a valid binding with no optional metadata
    const row = {
      item: { type: "uri", value: "http://www.wikidata.org/entity/Q999" },
      itemLabel: { type: "literal", value: "Unnamed peak" },
      coordinate: { type: "literal", value: "Point(-70.5 -33.25)" },
      elevation: { type: "literal", value: "4001" },
    } as const;

    // When the row is transformed
    const peak = transformRow(row);

    // Then all optional output fields are explicitly null
    expect(peak.prominence).toBeNull();
    expect(peak.country).toBeNull();
    expect(peak.range).toBeNull();
    expect(peak.wikipedia).toBeNull();
  });
});

describe("deduplicateAndSortPeaks", () => {
  it("keeps only the highest elevation when an id occurs more than once", () => {
    // Given two statements for the same Wikidata item
    const lower = transformRow({ ...everestRow, elevation: { type: "literal", value: "8848" } });
    const higher = transformRow(everestRow);

    // When peaks are deduplicated
    const result = deduplicateAndSortPeaks([lower, higher]);

    // Then exactly one id remains and it has the greatest elevation
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("Q513");
    expect(result[0]?.elevation).toBe(8848.86);
    expect(new Set(result.map((peak) => peak.id)).size).toBe(result.length);
  });

  it("sorts by descending elevation and then ascending id", () => {
    // Given peaks with different and tied elevations
    const peaks = [
      transformRow({
        ...everestRow,
        item: { type: "uri", value: "http://www.wikidata.org/entity/Q9" },
      }),
      transformRow({
        ...everestRow,
        item: { type: "uri", value: "http://www.wikidata.org/entity/Q2" },
      }),
      transformRow({
        ...everestRow,
        item: { type: "uri", value: "http://www.wikidata.org/entity/Q1" },
        elevation: { type: "literal", value: "9000" },
      }),
    ];

    // When peaks are sorted
    const result = deduplicateAndSortPeaks(peaks);

    // Then elevation wins before id
    expect(result.map((peak) => peak.id)).toEqual(["Q1", "Q2", "Q9"]);
  });
});

import { describe, expect, test } from "bun:test";
import type { LoadedData } from "./data";
import { applyFilters, DEFAULT_FILTER_STATE } from "./filters";
import type { Village, Visit } from "./schemas";

const villages: Village[] = [
  {
    id: "visited",
    name: "Visited village",
    province: "Utrecht",
    type: "village",
    lat: 52.09,
    lng: 5.12,
  },
  {
    id: "unvisited",
    name: "Unvisited village",
    province: "Gelderland",
    type: "village",
    lat: 52.05,
    lng: 5.87,
  },
];
const visitedVillage = villages.find((village) => village.id === "visited");

const visits: Visit[] = [
  {
    villageId: "visited",
    visitedAt: "2026-07-07",
    tags: ["motorcycle"],
  },
];

const data: LoadedData = {
  villages,
  visits,
  byId: new Map(villages.map((village) => [village.id, village])),
  visitByVillageId: new Map(visits.map((visit) => [visit.villageId, visit])),
};

describe("applyFilters", () => {
  test("returns every village for the default filters", () => {
    expect(applyFilters(data, DEFAULT_FILTER_STATE)).toEqual(villages);
  });

  test("filters villages by visit state, province, and tag", () => {
    expect(visitedVillage).toBeDefined();
    expect(
      applyFilters(data, {
        visited: "visited",
        provinces: ["Utrecht"],
        tags: ["motorcycle"],
      }),
    ).toEqual(visitedVillage ? [visitedVillage] : []);
  });
});

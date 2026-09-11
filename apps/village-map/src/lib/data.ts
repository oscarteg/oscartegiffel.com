import * as v from "valibot";
import { type Village, VillagesFileSchema, type Visit, VisitsFileSchema } from "./schemas";

export type LoadedData = {
  villages: Village[];
  visits: Visit[];
  byId: Map<string, Village>;
  visitByVillageId: Map<string, Visit>;
};

async function fetchJson<T>(url: string, schema: v.GenericSchema<unknown, T>): Promise<T> {
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${res.status}`);
  }
  const data = (await res.json()) as unknown;
  return v.parse(schema, data);
}

export async function loadData(): Promise<LoadedData> {
  const [villagesFile, visitsFile] = await Promise.all([
    fetchJson("/data/villages.json", VillagesFileSchema),
    fetchJson("/data/visits.json", VisitsFileSchema),
  ]);

  const villages = villagesFile.villages.filter((village) => village.type !== "hamlet");

  const byId = new Map<string, Village>();
  for (const village of villages) {
    byId.set(village.id, village);
  }

  const visitByVillageId = new Map<string, Visit>();
  for (const visit of visitsFile.visits) {
    visitByVillageId.set(visit.villageId, visit);
  }

  return {
    villages,
    visits: visitsFile.visits,
    byId,
    visitByVillageId,
  };
}

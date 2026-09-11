import type { LoadedData } from "./data";
import type { Province, Village } from "./schemas";

export type VisitedFilter = "all" | "visited" | "unvisited";

export type FilterState = {
  visited: VisitedFilter;
  provinces: Province[]; // empty array = no province restriction
  tags: string[]; // empty array = no tag restriction
};

export const DEFAULT_FILTER_STATE: FilterState = {
  visited: "all",
  provinces: [],
  tags: [],
};

export function applyFilters(data: LoadedData, f: FilterState): Village[] {
  const provinceSet = f.provinces.length > 0 ? new Set(f.provinces) : null;
  const tagSet = f.tags.length > 0 ? new Set(f.tags) : null;

  return data.villages.filter((village) => {
    if (provinceSet && !provinceSet.has(village.province)) return false;

    const visit = data.visitByVillageId.get(village.id);
    const isVisited = visit !== undefined;

    if (f.visited === "visited" && !isVisited) return false;
    if (f.visited === "unvisited" && isVisited) return false;

    if (tagSet) {
      if (!visit?.tags || visit.tags.length === 0) return false;
      const hasAny = visit.tags.some((t) => tagSet.has(t));
      if (!hasAny) return false;
    }

    return true;
  });
}

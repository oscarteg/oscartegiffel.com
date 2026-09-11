import { useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import * as v from "valibot";
import { DEFAULT_FILTER_STATE, type FilterState, type VisitedFilter } from "../lib/filters";
import { type Province, ProvinceSchema } from "../lib/schemas";

const VisitedFilterSchema = v.picklist(["all", "visited", "unvisited"]);

function parseProvinces(raw: string | undefined): Province[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((s) => v.safeParse(ProvinceSchema, s))
    .filter((p): p is v.SafeParseResult<typeof ProvinceSchema> & { success: true } => p.success)
    .map((p) => p.output);
}

function parseTags(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length > 0);
}

function parseVisited(raw: string | undefined): VisitedFilter {
  if (!raw) return DEFAULT_FILTER_STATE.visited;
  const parsed = v.safeParse(VisitedFilterSchema, raw);
  return parsed.success ? parsed.output : DEFAULT_FILTER_STATE.visited;
}

export function useFilterStore() {
  const [searchParams, setSearchParams] = useSearchParams<{
    visited?: string;
    province?: string;
    tags?: string;
  }>();

  const state = createMemo<FilterState>(() => ({
    visited: parseVisited(searchParams.visited),
    provinces: parseProvinces(searchParams.province),
    tags: parseTags(searchParams.tags),
  }));

  function patch(p: Partial<FilterState>): void {
    const current = state();
    const next: FilterState = { ...current, ...p };

    setSearchParams({
      visited: next.visited === DEFAULT_FILTER_STATE.visited ? undefined : next.visited,
      province: next.provinces.length > 0 ? next.provinces.join(",") : undefined,
      tags: next.tags.length > 0 ? next.tags.join(",") : undefined,
    });
  }

  return { state, patch };
}

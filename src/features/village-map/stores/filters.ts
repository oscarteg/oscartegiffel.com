import { createMemo, createSignal } from "solid-js";
import * as v from "valibot";
import {
	DEFAULT_FILTER_STATE,
	type FilterState,
	type VisitedFilter,
} from "../lib/filters";
import { type Province, ProvinceSchema } from "../lib/schemas";

const VisitedFilterSchema = v.picklist(["all", "visited", "unvisited"]);

function parseProvinces(raw: string | null): Province[] {
	if (!raw) return [];
	return raw
		.split(",")
		.map((s) => s.trim())
		.filter((s) => s.length > 0)
		.map((s) => v.safeParse(ProvinceSchema, s))
		.filter(
			(p): p is v.SafeParseResult<typeof ProvinceSchema> & { success: true } =>
				p.success,
		)
		.map((p) => p.output);
}

function parseTags(raw: string | null): string[] {
	if (!raw) return [];
	return raw
		.split(",")
		.map((s) => s.trim().toLowerCase())
		.filter((s) => s.length > 0);
}

function parseVisited(raw: string | null): VisitedFilter {
	if (!raw) return DEFAULT_FILTER_STATE.visited;
	const parsed = v.safeParse(VisitedFilterSchema, raw);
	return parsed.success ? parsed.output : DEFAULT_FILTER_STATE.visited;
}

// Filters live in the query string, so a filtered view can be shared and the
// back button steps through filter changes. The map only renders in the
// browser (client:only), so `location` and `history` always exist here.
const [search, setSearch] = createSignal(location.search);
window.addEventListener("popstate", () => setSearch(location.search));

function setParam(
	params: URLSearchParams,
	key: string,
	value: string | undefined,
): void {
	if (value === undefined) params.delete(key);
	else params.set(key, value);
}

export function useFilterStore() {
	const state = createMemo<FilterState>(() => {
		const params = new URLSearchParams(search());
		return {
			visited: parseVisited(params.get("visited")),
			provinces: parseProvinces(params.get("province")),
			tags: parseTags(params.get("tags")),
		};
	});

	function patch(p: Partial<FilterState>): void {
		const next: FilterState = { ...state(), ...p };
		const params = new URLSearchParams(location.search);

		setParam(
			params,
			"visited",
			next.visited === DEFAULT_FILTER_STATE.visited ? undefined : next.visited,
		);
		setParam(
			params,
			"province",
			next.provinces.length > 0 ? next.provinces.join(",") : undefined,
		);
		setParam(
			params,
			"tags",
			next.tags.length > 0 ? next.tags.join(",") : undefined,
		);

		const query = params.toString();
		history.pushState(
			null,
			"",
			`${location.pathname}${query ? `?${query}` : ""}${location.hash}`,
		);
		setSearch(location.search);
	}

	return { state, patch };
}

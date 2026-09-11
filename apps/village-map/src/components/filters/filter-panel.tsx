import { createMemo } from "solid-js";
import type { LoadedData } from "../../lib/data";
import { extractTags } from "../../lib/tags";
import { useFilterStore } from "../../stores/filters";
import { ProvinceFilter } from "./province-filter";
import { TagFilter } from "./tag-filter";
import { VisitedToggle } from "./visited-toggle";

type Props = {
  data: () => LoadedData | undefined;
};

export function FilterPanel(props: Props) {
  const filters = useFilterStore();

  const tagCounts = createMemo(() => {
    const data = props.data();
    return data ? extractTags(data.visits) : [];
  });

  return (
    <aside class="absolute top-4 left-4 z-10 bg-white border border-gray-300 rounded-lg p-4 w-[260px] max-h-[calc(100%-2rem)] overflow-y-auto shadow-lg text-[0.9rem]">
      <div class="mb-4 last:mb-0">
        <span class="block font-semibold mb-2 text-[0.8rem] uppercase text-gray-700">Visited</span>
        <VisitedToggle
          value={filters.state().visited}
          onChange={(v) => filters.patch({ visited: v })}
        />
      </div>

      <div class="mb-4 last:mb-0">
        <span class="block font-semibold mb-2 text-[0.8rem] uppercase text-gray-700">
          Provinces
        </span>
        <ProvinceFilter
          value={filters.state().provinces}
          onChange={(p) => filters.patch({ provinces: p })}
        />
      </div>

      <div class="mb-4 last:mb-0">
        <span class="block font-semibold mb-2 text-[0.8rem] uppercase text-gray-700">Tags</span>
        <TagFilter
          available={tagCounts()}
          value={filters.state().tags}
          onChange={(t) => filters.patch({ tags: t })}
        />
      </div>
    </aside>
  );
}

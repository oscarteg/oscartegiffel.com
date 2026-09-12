import { Show, createMemo, createResource, createSignal } from "solid-js";
import { FilterBar } from "./components/FilterBar";
import { MapView } from "./components/MapView";
import { PeakList } from "./components/PeakList";
import { PeakPanel } from "./components/PeakPanel";
import { StatsBar } from "./components/StatsBar";
import { applyFilters, stateOf } from "./lib/filters";
import { loadData } from "./lib/data";
import { toFeatureCollection } from "./lib/geojson";
import { createFilterStore } from "./stores/filters";

const EMPTY_ASCENTS = new Map<string, readonly never[]>();

const number = (value: number) => value.toLocaleString("en-GB");

export const App = () => {
  const [data] = createResource(loadData);
  const store = createFilterStore();
  const [selectedId, setSelectedId] = createSignal<string | null>(null);

  const peaks = createMemo(() => data()?.peaks ?? []);
  const ascentsByPeak = createMemo(() => data()?.ascentsByPeak ?? EMPTY_ASCENTS);

  const filtered = createMemo(() => applyFilters(peaks(), ascentsByPeak(), store.filters()));

  const collection = createMemo(() => toFeatureCollection(filtered(), ascentsByPeak()));

  const summited = createMemo(() =>
    peaks().filter((peak) => stateOf(peak.id, ascentsByPeak()) === "summited"),
  );

  const stats = createMemo(() => {
    const climbed = summited();
    const highest = climbed.reduce((max, peak) => Math.max(max, peak.elevation), 0);
    const vertical = climbed.reduce((total, peak) => total + peak.elevation, 0);
    return [
      { label: "Peaks shown", value: number(filtered().length) },
      { label: "Summited", value: number(climbed.length) },
      { label: "Highest", value: highest === 0 ? "—" : `${number(Math.round(highest))} m` },
      { label: "Vertical logged", value: `${number(Math.round(vertical))} m` },
    ];
  });

  const selectedPeak = createMemo(() => {
    const id = selectedId();
    return id === null ? null : (peaks().find((peak) => peak.id === id) ?? null);
  });

  return (
    <div class="flex h-dvh flex-col">
      <header class="border-b border-rock-800 px-4 py-3">
        <h1 class="text-base text-rock-50">
          Mountain map
          <span class="ml-2 text-sm text-rock-400">every peak above 4000 m, and my ascents</span>
        </h1>
      </header>

      <Show
        when={data()}
        fallback={
          <p class="p-4 text-sm text-rock-400" role="status">
            {data.error ? `Could not load peaks: ${String(data.error)}` : "Loading peaks…"}
          </p>
        }
      >
        <FilterBar store={store} shown={filtered().length} total={peaks().length} />
        <StatsBar stats={stats()} />

        <div
          class="grid min-h-0 flex-1 grid-cols-1"
          classList={{ "lg:grid-cols-[1fr_22rem]": selectedPeak() !== null }}
        >
          <div class="relative min-h-96">
            <MapView data={collection()} onSelect={setSelectedId} />
          </div>
          <Show when={selectedPeak()}>
            {(peak) => (
              <PeakPanel
                peak={peak()}
                state={stateOf(peak().id, ascentsByPeak())}
                ascents={ascentsByPeak().get(peak().id) ?? []}
                onClose={() => setSelectedId(null)}
              />
            )}
          </Show>
        </div>

        <div class="max-h-80 overflow-y-auto">
          <PeakList
            peaks={filtered()}
            ascentsByPeak={ascentsByPeak()}
            onSelect={setSelectedId}
          />
        </div>
      </Show>
    </div>
  );
};

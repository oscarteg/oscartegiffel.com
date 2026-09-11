import { createEffect, createMemo, createResource, createSignal, Show } from "solid-js";
import { ProgressDashboard } from "../components/dashboard/progress-dashboard";
import { FilterPanel } from "../components/filters/filter-panel";
import { HeatmapLayer } from "../components/map/heatmap-layer";
import { MapCanvas } from "../components/map/map-canvas";
import { useMap } from "../components/map/map-context";
import { MapControls } from "../components/map/map-controls";
import { NearestUnvisitedPanel } from "../components/map/nearest-unvisited-panel";
import { VillageMarkers } from "../components/map/village-markers";
import { VillagePopup } from "../components/map/village-popup";
import type { LoadedData } from "../lib/data";
import { loadData } from "../lib/data";
import { applyFilters } from "../lib/filters";
import { type LatLng, type NearestResult, nearestUnvisited } from "../lib/geo";
import { useFilterStore } from "../stores/filters";
import { selectedVillageId } from "../stores/selection";

function MapEffects(props: { data: () => LoadedData | undefined }) {
  const map = useMap();

  createEffect(() => {
    const m = map();
    const id = selectedVillageId();
    const data = props.data();
    if (!m || !id || !data) return;
    const village = data.byId.get(id);
    if (!village) return;
    const current = m.getZoom();
    m.flyTo({ center: [village.lng, village.lat], zoom: Math.max(current, 12), essential: true });
  });

  return null;
}

export function PublicMap() {
  const [data] = createResource(() => loadData());
  const filters = useFilterStore();
  const [heatmapOn, setHeatmapOn] = createSignal(false);
  const [nearestResults, setNearestResults] = createSignal<NearestResult[] | null>(null);

  const filteredVillages = createMemo(() => {
    const d = data();
    return d ? applyFilters(d, filters.state()) : [];
  });

  async function handleNearestUnvisited() {
    const d = data();
    if (!d) return;

    const origin = await new Promise<LatLng | null>((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => resolve(null),
        { timeout: 8000, maximumAge: 60000 },
      );
    });

    const fallback: LatLng = { lat: 52.1, lng: 5.3 };
    setNearestResults(nearestUnvisited(origin ?? fallback, d, 5));
  }

  return (
    <div class="relative h-screen w-screen overflow-hidden">
      <Show
        when={!data.error}
        fallback={
          <div class="absolute inset-0 flex items-center justify-center bg-white p-8 text-center text-red-700">
            Failed to load village data: {String(data.error)}
          </div>
        }
      >
        <MapCanvas>
          <VillageMarkers data={data} filtered={filteredVillages} />
          <HeatmapLayer data={data} enabled={heatmapOn} />
          <MapEffects data={data} />
        </MapCanvas>
        <FilterPanel data={data} />
        <ProgressDashboard data={data} />
        <VillagePopup data={data} />
        <MapControls
          heatmapEnabled={heatmapOn}
          toggleHeatmap={() => setHeatmapOn(!heatmapOn())}
          onNearestUnvisited={handleNearestUnvisited}
        />
        <NearestUnvisitedPanel results={nearestResults} onClose={() => setNearestResults(null)} />
        <Show when={data.loading}>
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 rounded-md bg-white px-4 py-2 text-sm shadow-md">
            Loading…
          </div>
        </Show>
      </Show>
    </div>
  );
}

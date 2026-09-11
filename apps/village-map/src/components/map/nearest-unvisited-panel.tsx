import { For, Show } from "solid-js";
import type { NearestResult } from "../../lib/geo";
import { setSelectedVillageId } from "../../stores/selection";
import { useMap } from "./map-context";

type Props = {
  results: () => NearestResult[] | null;
  onClose: () => void;
};

export function NearestUnvisitedPanel(props: Props) {
  const map = useMap();

  function flyTo(lat: number, lng: number, id: string) {
    const m = map();
    if (m) {
      m.flyTo({ center: [lng, lat], zoom: 12, essential: true });
    }
    setSelectedVillageId(id);
  }

  return (
    <Show when={props.results()}>
      {(results) => (
        <div class="absolute bottom-20 left-4 z-10 bg-white border border-gray-300 rounded-lg py-3 px-4 w-[280px] shadow-lg text-[0.9rem]">
          <button
            type="button"
            class="float-right border-none bg-transparent text-base text-gray-500"
            aria-label="Close"
            onClick={props.onClose}
          >
            ×
          </button>
          <h3 class="m-0 mb-2 text-base">Nearest unvisited</h3>
          <ul class="list-none p-0 m-0">
            <For each={results()}>
              {(r) => (
                <li class="flex justify-between py-1 border-b border-gray-200 last:border-b-0">
                  <button
                    type="button"
                    class="bg-transparent border-none p-0 text-sky-600 text-left"
                    onClick={() => flyTo(r.village.lat, r.village.lng, r.village.id)}
                  >
                    {r.village.name}
                  </button>
                  <span class="text-gray-500 tabular-nums">{r.distanceKm.toFixed(1)} km</span>
                </li>
              )}
            </For>
          </ul>
        </div>
      )}
    </Show>
  );
}

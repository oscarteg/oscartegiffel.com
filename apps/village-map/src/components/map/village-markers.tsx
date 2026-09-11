import type { Feature, FeatureCollection, Point } from "geojson";
import type { GeoJSONSource, MapLayerMouseEvent } from "maplibre-gl";
import { createEffect, onCleanup } from "solid-js";
import type { LoadedData } from "../../lib/data";
import type { Village } from "../../lib/schemas";
import { setSelectedVillageId } from "../../stores/selection";
import { useMap } from "./map-context";

const SOURCE_ID = "villages";
const LAYER_ID = "village-circles";

type VillageProperties = {
  id: string;
  name: string;
  visited: number; // 0 or 1 — MapLibre filters compare numbers easily
};

function buildFeatureCollection(
  villages: Village[],
  data: LoadedData,
): FeatureCollection<Point, VillageProperties> {
  const features: Feature<Point, VillageProperties>[] = villages.map((v) => {
    const visit = data.visitByVillageId.get(v.id);
    return {
      type: "Feature",
      geometry: { type: "Point", coordinates: [v.lng, v.lat] },
      properties: {
        id: v.id,
        name: v.name,
        visited: visit ? 1 : 0,
      },
    };
  });
  return { type: "FeatureCollection", features };
}

type Props = {
  data: () => LoadedData | undefined;
  filtered: () => Village[];
};

export function VillageMarkers(props: Props) {
  const map = useMap();

  createEffect(() => {
    const m = map();
    const data = props.data();
    if (!m || !data) return;

    const fc = buildFeatureCollection(props.filtered(), data);

    const existing = m.getSource(SOURCE_ID) as GeoJSONSource | undefined;
    if (existing) {
      existing.setData(fc);
      return;
    }

    m.addSource(SOURCE_ID, {
      type: "geojson",
      data: fc,
    });

    m.addLayer({
      id: LAYER_ID,
      type: "circle",
      source: SOURCE_ID,
      paint: {
        // Scale dots with zoom so they stay visible when zoomed out (was a flat
        // 3px, effectively invisible). Visited dots sit one step larger.
        "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          6,
          ["case", ["==", ["get", "visited"], 1], 4, 3],
          10,
          ["case", ["==", ["get", "visited"], 1], 7, 5],
          13,
          ["case", ["==", ["get", "visited"], 1], 10, 8],
        ],
        "circle-color": ["case", ["==", ["get", "visited"], 1], "#1a9850", "#475569"],
        "circle-stroke-color": "#fff",
        "circle-stroke-width": 1.5,
        "circle-opacity": 1,
      },
    });

    function onClick(e: MapLayerMouseEvent) {
      const feature = e.features?.[0];
      if (!feature) return;
      const id = feature.properties?.id;
      if (typeof id !== "string") return;
      setSelectedVillageId(id);
    }

    const onEnter = () => {
      m.getCanvas().style.cursor = "pointer";
    };

    const onLeave = () => {
      m.getCanvas().style.cursor = "";
    };

    m.on("click", LAYER_ID, onClick);
    m.on("mouseenter", LAYER_ID, onEnter);
    m.on("mouseleave", LAYER_ID, onLeave);

    onCleanup(() => {
      m.off("click", LAYER_ID, onClick);
      m.off("mouseenter", LAYER_ID, onEnter);
      m.off("mouseleave", LAYER_ID, onLeave);
      if (m.getLayer(LAYER_ID)) m.removeLayer(LAYER_ID);
      if (m.getSource(SOURCE_ID)) m.removeSource(SOURCE_ID);
    });
  });

  return null;
}

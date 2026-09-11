import type { Feature, FeatureCollection, Point } from "geojson";
import type { GeoJSONSource } from "maplibre-gl";
import { createEffect, onCleanup } from "solid-js";
import type { LoadedData } from "../../lib/data";
import { useMap } from "./map-context";

const SOURCE_ID = "villages-heatmap";
const LAYER_ID = "village-heatmap";

function visitedFeatures(data: LoadedData): FeatureCollection<Point> {
  const features: Feature<Point>[] = [];
  for (const visit of data.visits) {
    const village = data.byId.get(visit.villageId);
    if (!village) continue;
    features.push({
      type: "Feature",
      properties: {},
      geometry: { type: "Point", coordinates: [village.lng, village.lat] },
    });
  }
  return { type: "FeatureCollection", features };
}

type Props = {
  data: () => LoadedData | undefined;
  enabled: () => boolean;
};

export function HeatmapLayer(props: Props) {
  const map = useMap();

  createEffect(() => {
    const m = map();
    const data = props.data();
    const enabled = props.enabled();
    if (!m || !data) return;

    if (!enabled) {
      if (m.getLayer(LAYER_ID)) m.removeLayer(LAYER_ID);
      if (m.getSource(SOURCE_ID)) m.removeSource(SOURCE_ID);
      return;
    }

    const fc = visitedFeatures(data);
    const existing = m.getSource(SOURCE_ID) as GeoJSONSource | undefined;
    if (existing) {
      existing.setData(fc);
    } else {
      m.addSource(SOURCE_ID, { type: "geojson", data: fc });
      m.addLayer({
        id: LAYER_ID,
        type: "heatmap",
        source: SOURCE_ID,
        paint: {
          "heatmap-weight": 1,
          "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 12, 3],
          "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 10, 12, 30],
          "heatmap-opacity": 0.7,
        },
      });
    }
  });

  onCleanup(() => {
    const m = map();
    if (!m) return;
    if (m.getLayer(LAYER_ID)) m.removeLayer(LAYER_ID);
    if (m.getSource(SOURCE_ID)) m.removeSource(SOURCE_ID);
  });

  return null;
}

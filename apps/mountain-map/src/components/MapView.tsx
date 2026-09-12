import type { Point } from "geojson";
import maplibregl from "maplibre-gl";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import type { PeakCollection } from "../lib/geojson";

const SOURCE_ID = "peaks";
const TERRAIN_SOURCE_ID = "terrain";

/** Free, no API key required. */
const BASEMAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";
const TERRAIN_TILES = "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png";

const EMPTY: PeakCollection = { type: "FeatureCollection", features: [] };

// Clusters carry `maxElevation` (a clusterProperty) rather than `elevation`, so each
// layer has to read its own key or the step expression resolves null.
const elevationColor = (property: "elevation" | "maxElevation") =>
  [
    "step",
    ["get", property],
    "#3d8fa8",
    5000,
    "#8fc7d8",
    6000,
    "#e0a34a",
    7000,
    "#c9822a",
    8000,
    "#e05252",
  ] as const;

type MapViewProps = {
  readonly data: PeakCollection;
  readonly onSelect: (peakId: string) => void;
};

export const MapView = (props: MapViewProps) => {
  let container!: HTMLDivElement;
  const [map, setMap] = createSignal<maplibregl.Map | null>(null);
  const [terrainOn, setTerrainOn] = createSignal(false);

  onMount(() => {
    const instance = new maplibregl.Map({
      container,
      style: BASEMAP_STYLE,
      center: [8.0, 46.5],
      zoom: 5,
      maxZoom: 14,
      attributionControl: { compact: true },
    });

    instance.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");
    instance.addControl(new maplibregl.ScaleControl({ unit: "metric" }), "bottom-left");

    instance.on("load", () => {
      instance.addSource(SOURCE_ID, {
        type: "geojson",
        data: EMPTY,
        cluster: true,
        clusterRadius: 55,
        clusterMaxZoom: 9,
        clusterProperties: { maxElevation: ["max", ["get", "elevation"]] },
      });

      instance.addSource(TERRAIN_SOURCE_ID, {
        type: "raster-dem",
        tiles: [TERRAIN_TILES],
        tileSize: 256,
        encoding: "terrarium",
        maxzoom: 12,
        attribution: "Terrain: Mapzen / AWS Terrain Tiles",
      });

      instance.addLayer({
        id: "clusters",
        type: "circle",
        source: SOURCE_ID,
        filter: ["has", "point_count"],
        paint: {
          "circle-color": elevationColor("maxElevation") as unknown as maplibregl.DataDrivenPropertyValueSpecification<string>,
          "circle-opacity": 0.85,
          "circle-radius": ["step", ["get", "point_count"], 16, 25, 22, 100, 30, 500, 38],
          "circle-stroke-width": 1.5,
          "circle-stroke-color": "#141412",
        },
      });

      instance.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: SOURCE_ID,
        filter: ["has", "point_count"],
        layout: {
          "text-field": ["get", "point_count_abbreviated"],
          "text-font": ["Noto Sans Bold"],
          "text-size": 12,
        },
        paint: { "text-color": "#141412" },
      });

      instance.addLayer({
        id: "peak",
        type: "circle",
        source: SOURCE_ID,
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": elevationColor("elevation") as unknown as maplibregl.DataDrivenPropertyValueSpecification<string>,
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 4, 4, 10, 9],
          // Summited peaks get a thick light ring so status is not carried by colour alone.
          "circle-stroke-width": ["case", ["==", ["get", "state"], "summited"], 3, 1],
          "circle-stroke-color": [
            "case",
            ["==", ["get", "state"], "summited"],
            "#ffffff",
            ["==", ["get", "state"], "attempted"],
            "#e0a34a",
            "#141412",
          ],
        },
      });

      instance.addLayer({
        id: "peak-label",
        type: "symbol",
        source: SOURCE_ID,
        filter: ["!", ["has", "point_count"]],
        minzoom: 7,
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Noto Sans Regular"],
          "text-size": 11,
          "text-offset": [0, 1.2],
          "text-anchor": "top",
          "text-optional": true,
        },
        paint: {
          "text-color": "#f6f6f5",
          "text-halo-color": "#141412",
          "text-halo-width": 1.4,
        },
      });

      instance.on("click", "peak", (event) => {
        const feature = event.features?.[0];
        const id = feature?.properties?.id;
        if (typeof id === "string") props.onSelect(id);
      });

      instance.on("click", "clusters", (event) => {
        const feature = event.features?.[0];
        if (feature === undefined) return;
        const clusterId = feature.properties?.cluster_id;
        const source = instance.getSource(SOURCE_ID);
        if (typeof clusterId !== "number" || !(source instanceof maplibregl.GeoJSONSource)) return;
        void source.getClusterExpansionZoom(clusterId).then((zoom) => {
          const [lng, lat] = (feature.geometry as Point).coordinates;
          if (lng !== undefined && lat !== undefined) instance.easeTo({ center: [lng, lat], zoom });
        });
      });

      for (const layer of ["peak", "clusters"]) {
        instance.on("mouseenter", layer, () => {
          instance.getCanvas().style.cursor = "pointer";
        });
        instance.on("mouseleave", layer, () => {
          instance.getCanvas().style.cursor = "";
        });
      }

      setMap(instance);
    });

    // The container width changes when the detail panel opens, and MapLibre only
    // re-reads its size on demand.
    const observer = new ResizeObserver(() => instance.resize());
    observer.observe(container);

    onCleanup(() => {
      observer.disconnect();
      instance.remove();
      setMap(null);
    });
  });

  createEffect(() => {
    const instance = map();
    const collection = props.data;
    if (instance === null) return;
    const source = instance.getSource(SOURCE_ID);
    if (source instanceof maplibregl.GeoJSONSource) {
      source.setData(collection);
    }
  });

  createEffect(() => {
    const instance = map();
    if (instance === null) return;
    if (terrainOn()) {
      instance.setTerrain({ source: TERRAIN_SOURCE_ID, exaggeration: 1.3 });
      if (instance.getLayer("hillshade") === undefined) {
        instance.addLayer(
          { id: "hillshade", type: "hillshade", source: TERRAIN_SOURCE_ID, paint: {} },
          "clusters",
        );
      }
    } else {
      instance.setTerrain(null);
      if (instance.getLayer("hillshade") !== undefined) instance.removeLayer("hillshade");
    }
  });

  return (
    <div class="relative h-full w-full">
      <div ref={container} class="h-full w-full" data-testid="map-canvas" />
      <button
        type="button"
        aria-pressed={terrainOn()}
        onClick={() => setTerrainOn((on) => !on)}
        class="absolute top-3 left-3 rounded-md border border-rock-600 bg-rock-900/90 px-3 py-1.5 text-sm text-rock-100 backdrop-blur transition-colors hover:bg-rock-800"
      >
        {terrainOn() ? "Terrain on" : "Terrain off"}
      </button>
    </div>
  );
};

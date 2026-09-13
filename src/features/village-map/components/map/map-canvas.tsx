import type { StyleSpecification } from "maplibre-gl";
import { Map as MaplibreMap, setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import { createSignal, type JSX, onCleanup, onMount } from "solid-js";
import { MapContext } from "./map-context";

// maplibre-gl 6 loads its worker relative to its own module, which breaks once
// Vite bundles it. Build the worker as its own file and hand maplibre its URL.
setWorkerUrl(workerUrl);

const NL_CENTER: [number, number] = [5.3, 52.1];
const INITIAL_ZOOM = 7;

// Minimal raster style using OSM tiles — works without any API key.
// Replace with a Protomaps or self-hosted vector tile URL later.
const OSM_RASTER_STYLE: StyleSpecification = {
	version: 8,
	sources: {
		osm: {
			type: "raster",
			tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
			tileSize: 256,
			attribution: "© OpenStreetMap contributors",
		},
	},
	layers: [
		{
			id: "osm",
			type: "raster",
			source: "osm",
		},
	],
};

type MapCanvasProps = {
	children?: JSX.Element;
};

export function MapCanvas(props: MapCanvasProps) {
	let container: HTMLDivElement | undefined;
	const [map, setMap] = createSignal<MaplibreMap | null>(null);

	onMount(() => {
		if (!container) return;
		const instance = new MaplibreMap({
			container,
			style: OSM_RASTER_STYLE,
			center: NL_CENTER,
			zoom: INITIAL_ZOOM,
			attributionControl: { compact: true },
		});
		instance.on("load", () => setMap(instance));

		onCleanup(() => {
			instance.remove();
			setMap(null);
		});
	});

	return (
		<MapContext.Provider value={map}>
			<div ref={container} class="absolute inset-0" />
			{props.children}
		</MapContext.Provider>
	);
}

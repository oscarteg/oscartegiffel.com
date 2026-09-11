import type { Map as MaplibreMap } from "maplibre-gl";
import { createContext, useContext } from "solid-js";

export const MapContext = createContext<() => MaplibreMap | null>(() => null);

export function useMap(): () => MaplibreMap | null {
  return useContext(MapContext);
}

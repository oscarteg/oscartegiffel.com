import { createSignal } from "solid-js";

const [selectedVillageId, setSelectedVillageId] = createSignal<string | null>(null);

export { selectedVillageId, setSelectedVillageId };

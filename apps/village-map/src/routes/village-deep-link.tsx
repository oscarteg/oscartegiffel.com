import { useParams } from "@solidjs/router";
import { onMount } from "solid-js";
import { setSelectedVillageId } from "../stores/selection";
import { PublicMap } from "./public-map";

export function VillageDeepLink() {
  const params = useParams<{ id: string }>();

  onMount(() => {
    setSelectedVillageId(params.id);
  });

  return <PublicMap />;
}

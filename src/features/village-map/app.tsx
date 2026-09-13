import { onMount } from "solid-js";
import { PublicMap } from "./routes/public-map";
import { setSelectedVillageId } from "./stores/selection";

type Props = {
	/** Village to select on load, passed by the /village-map/v/[id] page. */
	villageId?: string;
};

export function App(props: Props) {
	onMount(() => {
		if (props.villageId !== undefined) setSelectedVillageId(props.villageId);
	});

	return <PublicMap />;
}

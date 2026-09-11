type Props = {
  heatmapEnabled: () => boolean;
  toggleHeatmap: () => void;
  onNearestUnvisited: () => void;
};

export function MapControls(props: Props) {
  return (
    <div class="absolute bottom-4 left-4 z-10 flex flex-col gap-2">
      <button
        type="button"
        class="bg-white border border-gray-300 rounded-md px-3 py-2 text-[0.85rem] shadow-md data-[active=true]:bg-sky-100 data-[active=true]:border-sky-600 data-[active=true]:text-sky-600"
        data-active={props.heatmapEnabled()}
        onClick={props.toggleHeatmap}
      >
        Heatmap: {props.heatmapEnabled() ? "On" : "Off"}
      </button>
      <button
        type="button"
        class="bg-white border border-gray-300 rounded-md px-3 py-2 text-[0.85rem] shadow-md"
        onClick={props.onNearestUnvisited}
      >
        Find nearest unvisited
      </button>
    </div>
  );
}

import type { VisitedFilter } from "../../lib/filters";

type Props = {
  value: VisitedFilter;
  onChange: (v: VisitedFilter) => void;
};

const OPTIONS: { value: VisitedFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "visited", label: "Visited" },
  { value: "unvisited", label: "Unvisited" },
];

export function VisitedToggle(props: Props) {
  return (
    <div class="flex border border-gray-300 rounded-md overflow-hidden">
      {OPTIONS.map((opt) => (
        <button
          type="button"
          aria-pressed={props.value === opt.value}
          data-active={props.value === opt.value}
          class="flex-1 bg-white border-r border-gray-300 last:border-r-0 py-[0.4rem] px-2 text-[0.85rem] data-[active=true]:bg-sky-600 data-[active=true]:text-white"
          onClick={() => props.onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

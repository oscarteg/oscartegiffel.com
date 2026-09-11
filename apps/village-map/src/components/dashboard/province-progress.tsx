type Props = {
  name: string;
  visited: number;
  total: number;
};

export function ProvinceProgress(props: Props) {
  const pct = props.total === 0 ? 0 : (props.visited / props.total) * 100;
  return (
    <li class="my-[0.4rem]">
      <div class="flex justify-between mb-[0.15rem]">
        <span class="text-gray-700">{props.name}</span>
        <span class="text-gray-500 tabular-nums">
          {props.visited}/{props.total} · {pct.toFixed(1)}%
        </span>
      </div>
      <div class="h-2 bg-gray-200 rounded overflow-hidden my-1">
        <div
          class="h-full bg-green-600 transition-[width] duration-200 ease-in"
          style={{ width: `${pct.toFixed(2)}%` }}
        />
      </div>
    </li>
  );
}

import { For } from "solid-js";

type Stat = { readonly label: string; readonly value: string };

type StatsBarProps = {
  readonly stats: readonly Stat[];
};

export const StatsBar = (props: StatsBarProps) => (
  <dl class="grid grid-cols-2 gap-px border-b border-rock-800 bg-rock-800 sm:grid-cols-4">
    <For each={props.stats}>
      {(stat) => (
        <div class="bg-rock-950 px-4 py-3">
          <dt class="text-xs uppercase tracking-wider text-rock-400">{stat.label}</dt>
          <dd class="tabular mt-1 text-xl text-rock-50">{stat.value}</dd>
        </div>
      )}
    </For>
  </dl>
);

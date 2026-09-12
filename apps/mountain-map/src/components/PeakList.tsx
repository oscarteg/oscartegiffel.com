import { For, Show } from "solid-js";
import { stateOf } from "../lib/filters";
import type { Ascent, Peak } from "../lib/schemas";

type PeakListProps = {
  readonly peaks: readonly Peak[];
  readonly ascentsByPeak: ReadonlyMap<string, readonly Ascent[]>;
  readonly onSelect: (peakId: string) => void;
};

const LIMIT = 200;

export const PeakList = (props: PeakListProps) => (
  <section class="border-t border-rock-800 p-4">
    <h2 class="text-xs uppercase tracking-wider text-rock-400">
      Peak list
      <span class="ml-2 normal-case tracking-normal text-rock-600">
        a non-map alternative to the view above
      </span>
    </h2>
    <ul class="mt-3 divide-y divide-rock-800">
      <For each={props.peaks.slice(0, LIMIT)}>
        {(peak) => (
          <li>
            <button
              type="button"
              onClick={() => props.onSelect(peak.id)}
              class="flex w-full items-baseline justify-between gap-4 py-2 text-left hover:bg-rock-900"
            >
              <span class="text-sm text-rock-100">{peak.name}</span>
              <span class="flex items-baseline gap-3">
                <span class="text-xs text-rock-400">
                  {stateOf(peak.id, props.ascentsByPeak) === "unclimbed"
                    ? ""
                    : stateOf(peak.id, props.ascentsByPeak)}
                </span>
                <span class="tabular text-sm text-rock-300">
                  {Math.round(peak.elevation).toLocaleString("en-GB")} m
                </span>
              </span>
            </button>
          </li>
        )}
      </For>
    </ul>
    <Show when={props.peaks.length > LIMIT}>
      <p class="mt-3 text-xs text-rock-400">
        Showing the first {LIMIT.toLocaleString("en-GB")} of{" "}
        {props.peaks.length.toLocaleString("en-GB")}. Narrow the filters to see more.
      </p>
    </Show>
  </section>
);

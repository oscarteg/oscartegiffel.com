import { For, Show, createEffect, onCleanup } from "solid-js";
import type { PeakState } from "../lib/filters";
import type { Ascent, Peak } from "../lib/schemas";

const STATE_LABEL: Record<PeakState, string> = {
  summited: "Summited",
  attempted: "Attempted",
  wishlist: "Wishlist",
  unclimbed: "Unclimbed",
};

const metres = (value: number) => `${Math.round(value).toLocaleString("en-GB")} m`;

const formatDate = (value: string | null) =>
  value === null
    ? "No date"
    : new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

const Grade = (props: { readonly label: string; readonly value: string | null }) => (
  <Show when={props.value}>
    {(value) => (
      <span class="rounded border border-rock-600 px-1.5 py-0.5 text-xs text-rock-200">
        {props.label} <span class="text-rock-50">{value()}</span>
      </span>
    )}
  </Show>
);

type PeakPanelProps = {
  readonly peak: Peak;
  readonly state: PeakState;
  readonly ascents: readonly Ascent[];
  readonly onClose: () => void;
};

export const PeakPanel = (props: PeakPanelProps) => {
  let closeButton!: HTMLButtonElement;

  createEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") props.onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    onCleanup(() => document.removeEventListener("keydown", onKeyDown));
  });

  createEffect(() => {
    if (props.peak.id) closeButton.focus();
  });

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-labelledby="peak-panel-title"
      class="flex h-full w-full flex-col overflow-y-auto border-l border-rock-800 bg-rock-950"
    >
      <header class="flex items-start justify-between gap-3 border-b border-rock-800 p-4">
        <div>
          <h2 id="peak-panel-title" class="text-lg text-rock-50">
            {props.peak.name}
          </h2>
          <p class="tabular mt-0.5 text-2xl text-glacier-300">{metres(props.peak.elevation)}</p>
        </div>
        <button
          ref={closeButton}
          type="button"
          onClick={props.onClose}
          aria-label="Close peak details"
          class="rounded-md border border-rock-600 px-2 py-1 text-sm text-rock-300 hover:border-rock-400 hover:text-rock-100"
        >
          Close
        </button>
      </header>

      <dl class="grid grid-cols-2 gap-x-4 gap-y-3 p-4 text-sm">
        <div>
          <dt class="text-rock-400">Status</dt>
          <dd class="text-rock-50">{STATE_LABEL[props.state]}</dd>
        </div>
        <Show when={props.peak.prominence}>
          {(prominence) => (
            <div>
              <dt class="text-rock-400">Prominence</dt>
              <dd class="tabular text-rock-50">{metres(prominence())}</dd>
            </div>
          )}
        </Show>
        <Show when={props.peak.country}>
          {(country) => (
            <div>
              <dt class="text-rock-400">Country</dt>
              <dd class="text-rock-50">{country()}</dd>
            </div>
          )}
        </Show>
        <Show when={props.peak.range}>
          {(range) => (
            <div>
              <dt class="text-rock-400">Range</dt>
              <dd class="text-rock-50">{range()}</dd>
            </div>
          )}
        </Show>
      </dl>

      <Show when={props.peak.wikipedia}>
        {(url) => (
          <p class="px-4 pb-4">
            <a
              href={url()}
              target="_blank"
              rel="noreferrer"
              class="text-sm text-glacier-300 underline underline-offset-2 hover:text-glacier-500"
            >
              Wikipedia
            </a>
          </p>
        )}
      </Show>

      <Show
        when={props.ascents.length > 0}
        fallback={
          <p class="border-t border-rock-800 p-4 text-sm text-rock-400">
            No ascents logged for this peak yet.
          </p>
        }
      >
        <section class="border-t border-rock-800">
          <h3 class="px-4 pt-4 text-xs uppercase tracking-wider text-rock-400">Ascents</h3>
          <ul class="divide-y divide-rock-800">
            <For each={props.ascents}>
              {(ascent) => (
                <li class="p-4">
                  <div class="flex flex-wrap items-baseline justify-between gap-2">
                    <p class="text-sm text-rock-50">{formatDate(ascent.date)}</p>
                    <p
                      class={
                        ascent.summited
                          ? "text-xs text-glacier-300"
                          : "text-xs text-summit-400"
                      }
                    >
                      {ascent.summited ? "Reached the summit" : "Did not summit"}
                    </p>
                  </div>
                  <Show when={ascent.route}>
                    {(route) => <p class="mt-1 text-sm text-rock-200">{route()}</p>}
                  </Show>
                  <div class="mt-2 flex flex-wrap gap-1.5">
                    <Grade label="Alpine" value={ascent.alpineGrade} />
                    <Grade label="UIAA" value={ascent.uiaaGrade} />
                    <Grade label="Ice" value={ascent.iceGrade} />
                  </div>
                  <Show when={ascent.techniques.length > 0}>
                    <ul class="mt-2 flex flex-wrap gap-1.5">
                      <For each={ascent.techniques}>
                        {(technique) => (
                          <li class="rounded bg-rock-800 px-1.5 py-0.5 text-xs text-rock-200">
                            {technique.replaceAll("-", " ")}
                          </li>
                        )}
                      </For>
                    </ul>
                  </Show>
                  <Show when={ascent.note}>
                    {(note) => (
                      <p class="mt-2 text-sm leading-relaxed text-rock-300">{note()}</p>
                    )}
                  </Show>
                  <Show when={ascent.partners.length > 0}>
                    <p class="mt-2 text-xs text-rock-400">With {ascent.partners.join(", ")}</p>
                  </Show>
                </li>
              )}
            </For>
          </ul>
        </section>
      </Show>
    </aside>
  );
};

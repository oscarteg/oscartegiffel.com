import { createMemo, For, Show } from "solid-js";
import type { LoadedData } from "../../lib/data";
import { selectedVillageId, setSelectedVillageId } from "../../stores/selection";

type Props = {
  data: () => LoadedData | undefined;
};

function videoEmbedUrl(raw: string): string | null {
  try {
    const url = new URL(raw);
    // YouTube
    if (url.hostname.includes("youtube.com")) {
      const v = url.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
    }
    if (url.hostname === "youtu.be") {
      const id = url.pathname.replace(/^\//, "");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    // Vimeo
    if (url.hostname.includes("vimeo.com")) {
      const id = url.pathname.split("/").filter(Boolean)[0];
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
  } catch {
    return null;
  }
  return null;
}

export function VillagePopup(props: Props) {
  const selected = createMemo(() => {
    const id = selectedVillageId();
    const data = props.data();
    if (!id || !data) return null;
    const village = data.byId.get(id);
    if (!village) return null;
    const visit = data.visitByVillageId.get(id);
    return { village, visit };
  });

  return (
    <Show when={selected()}>
      {(sel) => (
        <aside class="absolute top-4 right-4 z-10 bg-white border border-gray-300 rounded-lg p-4 w-[320px] max-w-[calc(100%-2rem)] max-h-[calc(100%-2rem)] overflow-y-auto shadow-lg">
          <button
            type="button"
            class="float-right border-none bg-transparent text-[1.2rem] text-gray-500"
            aria-label="Close"
            onClick={() => setSelectedVillageId(null)}
          >
            ×
          </button>
          <h2 class="m-0 mb-1 text-[1.2rem]">{sel().village.name}</h2>
          <p class="text-gray-500 text-[0.85rem] mb-3">
            {sel().village.province} · {sel().village.type}
            <Show when={sel().village.population}>
              {(pop) => <> · pop. {pop().toLocaleString()}</>}
            </Show>
          </p>

          <Show when={sel().visit}>
            {(visit) => (
              <>
                <div class="text-gray-500 text-[0.85rem] mb-3">Visited {visit().visitedAt}</div>
                <Show when={visit().note}>
                  {(note) => <p class="whitespace-pre-wrap my-2 text-[0.9rem]">{note()}</p>}
                </Show>

                <Show when={(visit().videos?.length ?? 0) > 0}>
                  <div class="mt-3">
                    <h4 class="text-[0.85rem] my-1 text-gray-700">Videos</h4>
                    <For each={visit().videos ?? []}>
                      {(v) => {
                        const embed = videoEmbedUrl(v);
                        return embed ? (
                          <iframe
                            class="w-full aspect-video border-0 mb-2 rounded"
                            src={embed}
                            title="Village video"
                            allow="accelerometer; encrypted-media; picture-in-picture; fullscreen"
                            allowfullscreen
                          />
                        ) : (
                          <p>
                            <a href={v} target="_blank" rel="noreferrer">
                              {v}
                            </a>
                          </p>
                        );
                      }}
                    </For>
                  </div>
                </Show>

                <Show when={(visit().photos?.length ?? 0) > 0}>
                  <div class="mt-3">
                    <h4 class="text-[0.85rem] my-1 text-gray-700">Photos</h4>
                    <For each={visit().photos ?? []}>
                      {(src) => (
                        <img
                          class="block w-full mb-2 rounded"
                          src={src}
                          alt={sel().village.name}
                          loading="lazy"
                        />
                      )}
                    </For>
                  </div>
                </Show>
              </>
            )}
          </Show>
        </aside>
      )}
    </Show>
  );
}

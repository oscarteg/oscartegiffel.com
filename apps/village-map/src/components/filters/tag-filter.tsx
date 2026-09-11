import { For, Show } from "solid-js";
import type { TagCount } from "../../lib/tags";

type Props = {
  available: TagCount[];
  value: string[];
  onChange: (next: string[]) => void;
};

export function TagFilter(props: Props) {
  function toggle(tag: string) {
    const set = new Set(props.value);
    if (set.has(tag)) {
      set.delete(tag);
    } else {
      set.add(tag);
    }
    props.onChange([...set]);
  }

  return (
    <Show
      when={props.available.length > 0}
      fallback={<p class="text-gray-400 italic text-[0.8rem]">No tags available.</p>}
    >
      <div class="flex flex-wrap gap-1">
        <For each={props.available}>
          {(t) => (
            <button
              type="button"
              class="group bg-gray-100 border border-gray-300 rounded-full py-1 px-[0.6rem] text-[0.8rem] data-[active=true]:bg-sky-600 data-[active=true]:text-white data-[active=true]:border-sky-600"
              data-active={props.value.includes(t.tag)}
              onClick={() => toggle(t.tag)}
            >
              {t.tag}
              <span class="text-gray-400 ml-1 text-[0.7rem] group-data-[active=true]:text-sky-200">
                {t.count}
              </span>
            </button>
          )}
        </For>
      </div>
    </Show>
  );
}

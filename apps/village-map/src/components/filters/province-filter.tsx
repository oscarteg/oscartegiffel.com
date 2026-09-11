import { For } from "solid-js";
import { PROVINCES } from "../../lib/provinces";
import type { Province } from "../../lib/schemas";

type Props = {
  value: Province[];
  onChange: (next: Province[]) => void;
};

export function ProvinceFilter(props: Props) {
  function toggle(p: Province) {
    const set = new Set(props.value);
    if (set.has(p)) {
      set.delete(p);
    } else {
      set.add(p);
    }
    props.onChange([...set]);
  }

  return (
    <div class="flex flex-wrap gap-1">
      <For each={PROVINCES}>
        {(p) => (
          <button
            type="button"
            class="bg-gray-100 border border-gray-300 rounded-full py-1 px-[0.6rem] text-[0.8rem] data-[active=true]:bg-sky-600 data-[active=true]:text-white data-[active=true]:border-sky-600"
            data-active={props.value.includes(p)}
            onClick={() => toggle(p)}
          >
            {p}
          </button>
        )}
      </For>
    </div>
  );
}

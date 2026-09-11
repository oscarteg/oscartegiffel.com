import { createMemo, createSignal, For, Show } from "solid-js";
import type { LoadedData } from "../../lib/data";
import { PROVINCES } from "../../lib/provinces";
import type { Province, Visit } from "../../lib/schemas";
import { ProvinceProgress } from "./province-progress";

type Props = {
  data: () => LoadedData | undefined;
};

type ProvinceStats = { name: Province; visited: number; total: number };

function lastVisit(visits: Visit[]): Visit | null {
  if (visits.length === 0) return null;
  return [...visits].sort((a, b) => b.visitedAt.localeCompare(a.visitedAt))[0] ?? null;
}

function relative(dateIso: string, now: Date): string {
  const then = new Date(`${dateIso}T00:00:00Z`);
  const diffMs = now.getTime() - then.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} mo ago`;
  return `${Math.floor(days / 365)} yr ago`;
}

export function ProgressDashboard(props: Props) {
  const [expanded, setExpanded] = createSignal(false);

  const stats = createMemo(() => {
    const data = props.data();
    if (!data) return null;
    const total = data.villages.length;
    const visited = data.visits.length;
    const byProvince: ProvinceStats[] = PROVINCES.map((name) => ({
      name,
      visited: 0,
      total: 0,
    }));
    const idx = new Map<Province, ProvinceStats>(byProvince.map((s) => [s.name, s]));

    for (const v of data.villages) {
      const s = idx.get(v.province);
      if (s) s.total += 1;
    }
    for (const v of data.visits) {
      const village = data.byId.get(v.villageId);
      if (!village) continue;
      const s = idx.get(village.province);
      if (s) s.visited += 1;
    }
    byProvince.sort((a, b) => {
      const ap = a.total === 0 ? 0 : a.visited / a.total;
      const bp = b.total === 0 ? 0 : b.visited / b.total;
      return bp - ap || a.name.localeCompare(b.name);
    });

    return {
      total,
      visited,
      pct: total === 0 ? 0 : (visited / total) * 100,
      byProvince,
      last: lastVisit(data.visits),
    };
  });

  const now = new Date();

  return (
    <Show when={stats()}>
      {(s) => (
        <section
          class={`absolute top-4 right-4 z-10 bg-white border border-gray-300 rounded-lg py-3 px-4 shadow-lg text-[0.9rem] ${expanded() ? "w-[280px]" : "w-auto"}`}
          aria-label="Progress"
        >
          <div class="flex justify-between items-center gap-2 mb-2">
            <span class="font-semibold">
              {s().visited} / {s().total} visited · {s().pct.toFixed(1)}%
            </span>
            <button
              type="button"
              class="bg-transparent border-none text-gray-500 text-[0.85rem]"
              onClick={() => setExpanded(!expanded())}
            >
              {expanded() ? "Hide" : "Details"}
            </button>
          </div>
          <Show when={expanded()}>
            <div class="h-2 bg-gray-200 rounded overflow-hidden my-1">
              <div
                class="h-full bg-green-600 transition-[width] duration-200 ease-in"
                style={{ width: `${s().pct.toFixed(2)}%` }}
              />
            </div>
            <ul class="list-none p-0 mt-2 text-[0.8rem]">
              <For each={s().byProvince}>
                {(p) => <ProvinceProgress name={p.name} visited={p.visited} total={p.total} />}
              </For>
            </ul>
            <Show when={s().last}>
              {(l) => {
                const village = props.data()?.byId.get(l().villageId);
                return (
                  <p class="mt-3 text-[0.8rem] text-gray-700">
                    Last visit: {village?.name ?? l().villageId}, {relative(l().visitedAt, now)}
                  </p>
                );
              }}
            </Show>
          </Show>
        </section>
      )}
    </Show>
  );
}

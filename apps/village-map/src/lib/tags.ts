import type { Visit } from "./schemas";

export type TagCount = { tag: string; count: number };

export function extractTags(visits: Visit[]): TagCount[] {
  const counts = new Map<string, number>();
  for (const visit of visits) {
    if (!visit.tags) continue;
    for (const tag of visit.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

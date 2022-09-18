import type { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

type ElementsOf<T extends unknown[]> = T extends ReadonlyArray<infer E> ? E : never;

export type Page = ElementsOf<QueryDatabaseResponse["results"]>;

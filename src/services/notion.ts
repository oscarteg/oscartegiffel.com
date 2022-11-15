import { Client } from "@notionhq/client";
import type {
  ListBlockChildrenResponse,
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { Result, ResultAsync } from "neverthrow";

export const client = new Client({ auth: import.meta.env.NOTION_ACCESS_TOKEN! });

export async function fetchPages(): Promise<Result<QueryDatabaseResponse, Error>> {
  return ResultAsync.fromPromise(
    client.databases.query({
      database_id: import.meta.env.NOTION_DATABASE_BLOG_ID!,
      filter: {
        property: "Status",
        status: {
          equals: "Stage 5: Epiloque",
        },
      },
      sorts: [
        {
          property: "Published at",
          direction: "descending",
        },
      ],
    }),
    () => new Error("Could not fetch Notion pages")
  );
}

export async function fetchBlocks(id: string): Promise<Result<ListBlockChildrenResponse, Error>> {
  return ResultAsync.fromPromise(
    client.blocks.children.list({ block_id: id }),
    () => new Error("Could not fetch Notion blocks")
  );
}

export async function fetchPage(id: string): Promise<Result<PageObjectResponse, Error>> {
  return ResultAsync.fromPromise(client.pages.retrieve({ page_id: id }), () => new Error("Could not fetch page"));
}

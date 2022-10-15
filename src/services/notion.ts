import { Client } from "@notionhq/client";
import type { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export const client = new Client({ auth: import.meta.env.NOTION_ACCESS_TOKEN! });

export async function fetchPages(): Promise<QueryDatabaseResponse> {
  return client.databases.query({
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
  });
}

export async function fetchBlocks(id: string) {
  return client.blocks.children.list({ block_id: id });
}

export async function fetchPage(id: string): Promise<any> {
  // TODO: Fix typing of response.
  // When infering the type it does not select the correct item of the tuple..
  return client.pages.retrieve({ page_id: id }) as any;
}

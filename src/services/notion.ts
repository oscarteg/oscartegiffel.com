import { Client } from "@notionhq/client";
import type {
  ListBlockChildrenResponse,
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

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

export async function fetchBlocks(id: string): Promise<ListBlockChildrenResponse> {
  return client.blocks.children.list({ block_id: id });
}

export async function fetchPage(id: string): Promise<PageObjectResponse> {
  return client.pages.retrieve({ page_id: id }) as Promise<PageObjectResponse>;
}

import { Client } from "@notionhq/client";
import type {
  GetBlockResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { blocksToReactComponents } from "notion-blocks-react-renderer";

const client = new Client({ auth: import.meta.env.NOTION_ACCESS_TOKEN! });

console.log(import.meta.env);

export async function fetchBlocks(id: string) {
  return client.blocks.children.list({ block_id: id });
}

export async function fetchPages(): Promise<QueryDatabaseResponse> {
  return client.databases.query({
    database_id: import.meta.env.NOTION_DATABASE_BLOG_ID!,
    filter: {
      property: "Stage",
      select: {
        equals: "Stage 5: Epilogue",
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

export async function fetchPage(id: string) {
  return client.pages.retrieve({ page_id: id });
}

export function blocksToHtml(blocks: any) {
  return blocksToReactComponents(blocks);
}

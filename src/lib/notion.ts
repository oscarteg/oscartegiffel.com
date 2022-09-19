import { Client } from "@notionhq/client";
import type { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import pkg from "notion-blocks-react-renderer";
const { blocksToReactComponents } = pkg;
import TextRenderer from "../components/TextRenderer";

const client = new Client({ auth: import.meta.env.NOTION_ACCESS_TOKEN! });

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
  // TODO: Fix typing of response.
  // When infering the type it does not select the correct item of the tuple..
  return client.pages.retrieve({ page_id: id }) as any;
}

export function blocksToHtml(blocks: any) {
  return blocksToReactComponents(blocks);
}

enum BLOCKS {
  PARAGRAPH = "paragraph",
  HEADING1 = "heading_1",
  HEADING2 = "heading_2",
  HEADING3 = "heading_3",
  BULLETEDLIST = "bulleted_list",
  NUMBEREDLIST = "numbered_list",
  BULLETEDLISTITEM = "bulleted_list_item",
  NUMBEREDLISTITEM = "numbered_list_item",
  QUOTE = "quote",
  IMAGE = "image",
  CODE = "code",
  AUDIO = "audio",
  VIDEO = "video",
  CALLOUT = "callout",
}

export function blockToText(block: any) {
  switch (block.type) {
    case BLOCKS.PARAGRAPH:
      return TextRenderer(block.paragraph.rich_text);
    case BLOCKS.HEADING1:
      return TextRenderer(block.heading_1.rich_text);
    case BLOCKS.HEADING2:
      return TextRenderer(block.heading_2.rich_text);
    case BLOCKS.HEADING3:
      return TextRenderer(block.heading_3.rich_text);
    case BLOCKS.BULLETEDLISTITEM:
      return TextRenderer(block.bulleted_list_item.rich_text);
    case BLOCKS.NUMBEREDLISTITEM:
      return TextRenderer(block.numbered_list_item.rich_text);
    case BLOCKS.QUOTE:
      return TextRenderer(block.quote.rich_text);
    case BLOCKS.CODE:
      return TextRenderer(block.code.rich_text);
    default:
      throw Error("Unknown block type");
  }
}

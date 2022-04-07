import {Client} from '@notionhq/client';
import {
  GetBlockResponse,
  ListBlockChildrenResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import BulletedListItem from '../components/notion/bulleted-list-item';
import Code from '../components/notion/code';
import Header from '../components/notion/header';
import Paragraph from '../components/notion/paragraph';

import {NotionBlocksHtmlParser} from '@notion-stuff/blocks-html-parser';

const client = new Client({auth: process.env.NOTION_ACCESS_TOKEN});

export async function fetchBlocks(
  id: string
): Promise<ListBlockChildrenResponse> {
  return client.blocks.children.list({block_id: id});
}

export async function fetchPages(): Promise<QueryDatabaseResponse> {
  return client.databases.query({
    database_id: process.env.NOTION_DATABASE_BLOG_ID!,
    filter: {
      property: 'Stage',
      select: {
        equals: 'Stage 5: Epilogue',
      },
    },
    sorts: [
      {
        property: 'Published at',
        direction: 'descending',
      },
    ],
  });
}

export async function fetchPage(id: string) {
  return client.pages.retrieve({page_id: id});
}

export default function notionToHtml(child: GetBlockResponse): void {
  const map: {[key: string]: unknown} = {
    heading_1: Header,
    heading_2: Header,
    heading_3: Header,
    bulleted_list_item: BulletedListItem,
    paragraph: Paragraph,
    code: Code,
  };

  const instance = NotionBlocksHtmlParser.getInstance();
}

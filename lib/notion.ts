import {Client} from '@notionhq/client';
import Header from '../components/notion/header';
import BulletedListItem from '../components/notion/bulleted-list-item';
import Paragraph from '../components/notion/paragraph';
import Code from '../components/notion/code';
import {
  GetBlockResponse,
  ListBlockChildrenResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import {ReactElement} from 'react';

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

// type MapType = Pick<GetBlockResponse, 'type'>;

export default function notionToHtml(child: GetBlockResponse): JSX.Element {
  // return children.results.map((child, currentIndex) => {
  // const previousElement = children.results[currentIndex - 1];
  // const nextElement = children.results[currentIndex + 1];
  //
  // console.
  console.log({child});

  const map: {[key: string]: unknown} = {
    heading_1: Header,
    heading_2: Header,
    heading_3: Header,
    bulleted_list_item: BulletedListItem,
    paragraph: Paragraph,
    code: Code,
  };

  return (map[child.type] as JSX.Element) ?? null;
}

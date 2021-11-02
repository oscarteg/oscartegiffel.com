import {Client} from '@notionhq/client';
import Header from '../components/notion/header';
import BulletedListItem from '../components/notion/bulleted_list_item';
import Paragraph from '../components/notion/paragraph';
import Code from '../components/notion/code';

const client = new Client({auth: process.env.NOTION_ACCESS_TOKEN});

export async function fetchBlocks(id: string) {
  return client.blocks.children.list({block_id: id});
}

export async function fetchPages() {
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

// This is temp code to refactore after the notion API is out of beta
export default function notionToHtml(child) {
  // return children.results.map((child, currentIndex) => {
  // const previousElement = children.results[currentIndex - 1];
  // const nextElement = children.results[currentIndex + 1];

  const map = {
    heading_1: Header,
    heading_2: Header,
    heading_3: Header,
    bulleted_list_item: BulletedListItem,
    paragraph: Paragraph,
    code: Code,
  };

  console.log(child.type);
  console.log(map[child.type]);

  return map[child.type] ?? null;
}

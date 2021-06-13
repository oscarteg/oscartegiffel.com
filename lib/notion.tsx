import {encode} from 'html-entities';
import {BlocksChildrenListResponse} from '@notionhq/client/build/src/api-endpoints';
import {
  BulletedListItemBlock,
  HeadingOneBlock,
  HeadingThreeBlock,
  HeadingTwoBlock,
  NumberedListItemBlock,
  ParagraphBlock,
  RichText,
} from '@notionhq/client/build/src/api-types';
import {ReactNode} from 'react';
import {Client} from '@notionhq/client';

const client = new Client({auth: process.env.NOTION_ACCESS_TOKEN});

export async function fetchBlocks(id: string) {
  return client.blocks.children.list({block_id: id});
}

export async function fetchPages() {
  return client.databases.query({
    database_id: process.env.NOTION_DATABASE_BLOG_ID,
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

export default function notionToHtml(
  children: BlocksChildrenListResponse
): ReactNode[] {
  return children.results.map((child, currentIndex) => {
    const previousElement = children.results[currentIndex - 1];
    const nextElement = children.results[currentIndex + 1];

    switch (child.type) {
      case 'heading_1':
        return `<h1>${(child as HeadingOneBlock).heading_1.text
          .map(text => renderRichText(text))
          .join('')}</h1>`;
      case 'heading_2':
        return `<h2>${(child as HeadingTwoBlock).heading_2.text
          .map(text => renderRichText(text))
          .join('')}</h2>`;
      case 'heading_3':
        return `<h3>${(child as HeadingThreeBlock).heading_3.text
          .map(text => renderRichText(text))
          .join('')}</h3>`;
      case 'numbered_list_item':
        return `${
          previousElement === undefined ||
          previousElement.type !== 'numbered_list_item'
            ? '<ol>'
            : ''
        }<li>${(child as NumberedListItemBlock).numbered_list_item.text
          .map(text => renderRichText(text))
          .join('')}</li>${
          nextElement === undefined || nextElement.type !== 'numbered_list_item'
            ? '</ol>'
            : ''
        }`;

      case 'bulleted_list_item':
        return `${
          previousElement === undefined ||
          previousElement.type !== 'bulleted_list_item'
            ? '<ul>'
            : ''
        }<li>${(child as BulletedListItemBlock).bulleted_list_item.text
          .map(text => renderRichText(text))
          .join('')}</li>${
          nextElement === undefined || nextElement.type !== 'bulleted_list_item'
            ? '</ul>'
            : ''
        }`;

      case 'paragraph':
        return `<p>${(child as ParagraphBlock).paragraph.text
          .map(text => renderRichText(text))
          .join('')}</p>`;
      case 'to_do':
        return `<div><label class="inline-flex items-center">
                    <input readonly disabled type="checkbox" class="rounded bg-gray-200 border-transparent focus:border-transparent focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500" ${
                      child.to_do.checked ? 'checked' : ''
                    }>
                    <span class="ml-2">${child.to_do.text[0].plain_text}</span>
                  </label></div>`;
      default:
        console.error(`Type ${child.type} not implemented!`);
    }
  });
}

export function renderRichText(text: RichText): string {
  let formattedText = encode(text.plain_text);

  if (text.annotations.bold) {
    formattedText = `<strong>${formattedText}</strong>`;
  }

  if (text.annotations.italic) {
    formattedText = `<em>${formattedText}</em>`;
  }

  if (text.annotations.strikethrough) {
    formattedText = `<strike>${formattedText}</strike>`;
  }

  if (text.annotations.underline) {
    formattedText = `<u>${formattedText}</u>`;
  }

  if (text.annotations.code) {
    formattedText = `<code>${formattedText}</code>`;
  }

  if (text.href !== null) {
    formattedText = `<a href="${text.href}" target="_blank" rel="noreferrer noopener" >${formattedText}</a>`;
  }

  // TODO: Implement color

  return formattedText;
}

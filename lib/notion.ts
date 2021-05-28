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

export default function notionToHtml(
  children: BlocksChildrenListResponse
): ReactNode[] {
  return children.results.map(child => {
    switch (child.type) {
      case 'heading_1':
        return `<h1>${
          (child as HeadingOneBlock).heading_1.text[0].plain_text
        }</h1>`;
      case 'heading_2':
        return `<h2>${
          (child as HeadingTwoBlock).heading_2.text[0].plain_text
        }</h2>`;
      case 'heading_3':
        return `<h3>${
          (child as HeadingThreeBlock).heading_3.text[0].plain_text
        }</h3>`;
      case 'numbered_list_item':
        return `<li>${(
          child as NumberedListItemBlock
        ).numbered_list_item.text.map(text => renderParagraph(text))}</li>`;

      case 'bulleted_list_item':
        return `<li>${(
          child as BulletedListItemBlock
        ).bulleted_list_item.text.map(text => renderParagraph(text))}</li>`;

      case 'paragraph':
        return `<p>${(child as ParagraphBlock).paragraph.text.map(text =>
          renderParagraph(text)
        )}</p>`;
      default:
        return child.type;
    }
  });
}

export function renderParagraph(text: RichText) {
  if (text.annotations.code) {
    return `<code>${text.plain_text}</code>`;
  } else {
    return `${text.plain_text}`;
  }
}

import type { BlockObjectResponse, PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { blockRenderer, blockToText, CustomBlockObjectResponse, remapContent, RenderNode } from "../lib/notion";
import React from "react";

const renderers: RenderNode = {
  paragraph: (block) => <p>{blockToText(block).unwrapOr(<>testing</>)}</p>,
  heading_1: (block) => <h1>{blockToText(block).unwrapOr(<></>)}</h1>,
  heading_2: (block) => <h2>{block.heading_2.rich_text[0].text.content}</h2>,
  heading_3: (block) => <h3>{blockToText(block).unwrapOr(<></>)}</h3>,
  bulleted_list_item: (block) => <li>{blockToText(block).unwrapOr(<></>)}</li>,
  bulleted_list: (block) => <ul>{block.list.map((listItem: any) => blockRenderer(listItem, renderers))}</ul>,
  numbered_list_item: (block) => <li>{blockToText(block).unwrapOr(<></>)}</li>,
  numbered_list: (block) => <ol>{block.list.map((listItem: any) => blockRenderer(listItem, renderers))}</ol>,
  quote: (block) => <blockquote>{blockToText(block).unwrapOr(<></>)}</blockquote>,
  code: (block) => <pre>{blockToText(block).unwrapOr(<></>)}</pre>,
  image: (block) => <img src={block.image.file.url} />,
  audio: (block) => <audio controls preload="none" src={block.audio.file.url} />,
  divider: () => <div className="w-full my-8 border border-gray-200 dark:border-gray-600" />,
  to_do: () => <></>,
  toggle: () => <></>,
  template: () => <></>,
  synced_block: () => <></>,
  child_database: () => <></>,
  child_page: () => <></>,
  equation: () => <></>,
  callout: () => <></>,
  breadcrumb: () => <></>,
  table_of_contents: () => <></>,
  table_row: () => <></>,
  table: () => <></>,
  column_list: () => <></>,
  column: () => <></>,
  link_to_page: () => <></>,
  link_preview: () => <></>,
  embed: () => <></>,
  bookmark: () => <></>,
  video: () => <></>,
  pdf: () => <></>,
  file: () => <></>,
  unsupported: () => <></>,
};

type Props = {
  blocks: Array<PartialBlockObjectResponse | BlockObjectResponse>;
};

export default function Content({ blocks }: Props) {
  const remappedContent = remapContent(blocks as Array<BlockObjectResponse>);

  return React.Children.toArray(
    remappedContent.map((block: CustomBlockObjectResponse) => {
      return blockRenderer(block, renderers);
    })
  );
}

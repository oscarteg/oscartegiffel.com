import React from "react";
import pkg from "notion-blocks-react-renderer";
import { blockToText } from "../lib/notion";

const { blocksToReactComponents, BLOCKS, blockRenderer } = pkg;

type Props = {
  blocks: any;
};

const renderers = {
  [BLOCKS.PARAGRAPH]: (block: any) => <p>{blockToText(block)}</p>,
  [BLOCKS.HEADING1]: (block: any) => <h1>{blockToText(block)}</h1>,
  [BLOCKS.HEADING2]: (block: any) => <h2>{block.heading_2.rich_text[0].text.content}</h2>,
  [BLOCKS.HEADING3]: (block: any) => <h3>{blockToText(block)}</h3>,
  [BLOCKS.BULLETEDLISTITEM]: (block: any) => <li>{blockToText(block)}</li>,
  [BLOCKS.BULLETEDLIST]: (block: any) => (
    <ul>{block.list.map((listItem: any) => blockRenderer(listItem, renderers))}</ul>
  ),
  [BLOCKS.NUMBEREDLISTITEM]: (block: any) => <li>{blockToText(block)}</li>,
  [BLOCKS.NUMBEREDLIST]: (block: any) => (
    <ol>{block.list.map((listItem: any) => blockRenderer(listItem, renderers))}</ol>
  ),
  [BLOCKS.QUOTE]: (block: any) => <blockquote>{blockToText(block)}</blockquote>,
  [BLOCKS.CODE]: (block: any) => <pre>{blockToText(block)}</pre>,
  [BLOCKS.IMAGE]: (block: any) => <img src={block.image.file.url} />,
  [BLOCKS.AUDIO]: (block: any) => <audio controls preload="none" src={block.audio.file.url} />,
  ["divider"]: () => <div className="w-full my-8 border border-gray-200 dark:border-gray-600" />,
};

export default function Content({ blocks }: Props) {
  return <>{blocksToReactComponents(blocks.results, renderers)}</>;
}

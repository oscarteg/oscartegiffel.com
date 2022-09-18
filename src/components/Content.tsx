import React from "react";
import { blockToText, blocksToReactComponents, BLOCKS, blockRenderer } from "notion-blocks-react-renderer";

type Props = {
  blocks: any;
};

const renderers = {
  [BLOCKS.PARAGRAPH]: (block) => <p>{blockToText(block)}</p>,
  [BLOCKS.HEADING1]: (block) => <h1>{blockToText(block)}</h1>,
  [BLOCKS.HEADING2]: (block) => <h2>{blockToText(block)}</h2>,
  [BLOCKS.HEADING3]: (block) => <h3>{blockToText(block)}</h3>,
  [BLOCKS.BULLETEDLISTITEM]: (block) => <li>{blockToText(block)}</li>,
  [BLOCKS.BULLETEDLIST]: (block) => <ul>{block.list.map((listItem) => blockRenderer(listItem, renderers))}</ul>,
  [BLOCKS.NUMBEREDLISTITEM]: (block) => <li>{blockToText(block)}</li>,
  [BLOCKS.NUMBEREDLIST]: (block) => <ol>{block.list.map((listItem) => blockRenderer(listItem, renderers))}</ol>,
  [BLOCKS.QUOTE]: (block) => <blockquote>{blockToText(block)}</blockquote>,
  [BLOCKS.CODE]: (block) => <code>{blockToText(block)}</code>,
  [BLOCKS.IMAGE]: (block) => <img src={block.image.file.url} />,
  [BLOCKS.AUDIO]: (block) => <audio controls preload="none" src={block.audio.file.url} />,
  ["divider"]: (block) => <div className="w-full my-8 border border-gray-200 dark:border-gray-600" />,
};

export default function Content({ blocks }: Props) {
  console.log(blocks.results);
  return <>{blocksToReactComponents(blocks.results, renderers)}</>;
}

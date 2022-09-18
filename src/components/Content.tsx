import React from "react";
import { blocksToReactComponents } from "notion-blocks-react-renderer";

type Props = {
  blocks: any;
};

export default function Content({ blocks }: Props) {
  return <div>{blocksToReactComponents(blocks)}</div>;
}

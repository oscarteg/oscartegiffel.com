import type {
  BlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import TextRenderer from "../../components/TextRenderer";

export type CustomBlockObjectResponse =
  | BlockObjectResponse
  | {
      type: "numbered_list";
      has_children: boolean;
      list: Array<NumberedListItemBlockObjectResponse>;
    }
  | {
      type: "bulleted_list";
      has_children: boolean;
      list: Array<BulletedListItemBlockObjectResponse>;
    };

export type BlockType = CustomBlockObjectResponse["type"];

export function blockToText(block: CustomBlockObjectResponse): JSX.Element {
  switch (block.type) {
    case "paragraph":
      return TextRenderer(block.paragraph.rich_text);
    case "heading_1":
      return TextRenderer(block.heading_1.rich_text);
    case "heading_2":
      return TextRenderer(block.heading_2.rich_text);
    case "heading_3":
      return TextRenderer(block.heading_3.rich_text);
    case "bulleted_list_item":
      return TextRenderer(block.bulleted_list_item.rich_text);
    case "numbered_list_item":
      return TextRenderer(block.numbered_list_item.rich_text);
    case "quote":
      return TextRenderer(block.quote.rich_text);
    case "code":
      return TextRenderer(block.code.rich_text);
    default:
      return "Block object type not implemented";
  }
}

function isType(block: BlockObjectResponse, type: BlockType): boolean {
  return block.type === type;
}

function createNumberedList(
  blocks: Array<BlockObjectResponse>,
  index: number
): Array<NumberedListItemBlockObjectResponse> {
  const numbered: Array<NumberedListItemBlockObjectResponse> = [];

  for (index; index < blocks.length; index++) {
    const block = blocks[index] as BlockObjectResponse;

    if (block.type === "numbered_list_item") {
      numbered.push(block);
    } else {
      break;
    }
  }

  return numbered;
}

function createBulletedList(
  blocks: Array<BlockObjectResponse>,
  index: number
): Array<BulletedListItemBlockObjectResponse> {
  const numbered: Array<BulletedListItemBlockObjectResponse> = [];

  for (index; index < blocks.length; index++) {
    const block = blocks[index] as BlockObjectResponse;

    if (block.type === "bulleted_list_item") {
      numbered.push(block);
    } else {
      break;
    }
  }

  return numbered;
}

export function remapContent(blocks: Array<BlockObjectResponse>) {
  const result: Array<CustomBlockObjectResponse> = [];

  blocks.forEach((block, index) => {
    if (!isType(block, "bulleted_list_item") && !isType(block, "numbered_list_item")) {
      result.push(block);
    }

    if (isType(block, "numbered_list_item")) {
      const numbered = createNumberedList(blocks, index);

      result.push({
        has_children: true,
        type: "numbered_list",
        list: numbered,
      });

      index = index + numbered.length;
    }

    if (isType(block, "bulleted_list_item")) {
      const bulleted = createBulletedList(blocks, index);

      result.push({
        has_children: true,
        type: "bulleted_list",
        list: bulleted,
      });

      index = index + bulleted.length;
    }
  });

  return result;
}

export type RenderNode = {
  [key in BlockType]: (block: any) => JSX.Element;
};

export function blockRenderer(block: CustomBlockObjectResponse, renderers: RenderNode): JSX.Element | undefined {
  return renderers[block.type](block) ?? null;
}

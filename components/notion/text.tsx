import {encode} from 'html-entities';
import {Text as TextModel} from '../../models/text';

export default function Text(props: TextModel) {
  const formattedText = encode(props.plain_text);

  //   if (props.annotations.bold) {
  //     formattedText = <strong>${formattedText}</strong>;
  //   }

  //   if (props.annotations.italic) {
  //     formattedText = <em>${formattedText}</em>;
  //   }

  //   if (props.annotations.strikethrough) {
  //     formattedText = <del>${formattedText}</de>;
  //   }

  //   if (props.annotations.underline) {
  //     formattedText = <u>${formattedText}</u>;
  //   }

  //   if (props.annotations.code) {
  //     formattedText = <code>${formattedText}</code>;
  //   }

  //   if (props.href !== null) {
  //     formattedText = (
  //       <a href="${text.href}" target="_blank" rel="noreferrer noopener">
  //         {formattedText}
  //       </a>
  //     );
  //   }

  // TODO: Implement color

  return <p>{formattedText}</p>;
}

import {Text as TextModel} from '../../models/text';
import Text from './text';

type HeaderType = 'heading_1' | 'heading_2';

type Props = {
  [key in HeaderType]: {
    type: string;
    text: Array<TextModel>;
  };
};

export default function Header(props: Props) {
  return (
    <h1>
      {props.heading_1.text.map((text: TextModel) => (
        <Text {...text} />
      ))}
    </h1>
  );
}

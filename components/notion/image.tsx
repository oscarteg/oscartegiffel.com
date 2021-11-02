import NextImage from 'next/image';

type Props = {
  src: string;
};

export default function Image({src}: Props) {
  return <NextImage src={src} />;
}

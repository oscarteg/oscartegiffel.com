import Image from 'next/image';
import Link from 'next/link';
import {HTMLProps} from 'react';
import Step from '../components/step';

type Props = HTMLProps<HTMLAnchorElement>;

const CustomLink = (props: Props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props} />
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const MDXComponents = {
  Image,
  a: CustomLink,
  Step,
};

export default MDXComponents;

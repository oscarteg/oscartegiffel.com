import ConsCard from '@/components/ConsCard';
import ProsCard from '@/components/ProsCard';
import Step from '@/components/Step';
import Image from 'next/image';
import Link from 'next/link';
import Tweet from 'react-tweet-embed';

const CustomLink = props => {
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
  ConsCard,
  ProsCard,
  Step,
  Tweet,
};

export default MDXComponents;

import Link from 'next/link';
import cn from 'classnames';
import {HTMLProps} from 'react';

type Props = HTMLProps<HTMLAnchorElement> & {
  title: string;
  description: string;
  slug: string;
  logo: string;
};
export default function FunctionCard({
  title,
  description,
  slug,
  logo,
  className,
  ...rest
}: Props) {
  return (
    <Link href={`/snippets/${slug}`}>
      <a
        className={cn(
          'w-full p-4 border rounded border-grey-200 dark:border-gray-900',
          className
        )}
        {...rest}
      >
        {logo && (
          <img
            alt={title}
            src={`/logos/${logo}`}
            className="w-8 h-8 rounded-full"
          />
        )}
        <h3 className="mt-2 text-lg font-bold text-left text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="mt-1 text-gray-700 dark:text-gray-100">{description}</p>
      </a>
    </Link>
  );
}

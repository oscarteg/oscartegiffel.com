import {format, formatRelative} from 'date-fns';
import {ReactNode} from 'react';
import BlogSeo from '../components/BlogSeo';
import Container from '../components/Container';

type Props = {
  id: string;
  frontMatter: {
    title: string;
    summary: string;
    publishedAt: Date;
    updatedAt: Date;
    image: string;
  };
  children: ReactNode;
};

export default function BlogLayout({id, children, frontMatter}: Props) {
  return (
    <Container>
      <BlogSeo url={`https://oscartegiffel.com/blog/${id}`} {...frontMatter} />
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {frontMatter.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2 mb-8 md:flex-row md:items-center">
          <div className="flex items-center">
            <img
              alt="Oscar te Giffel"
              src="/avatar.jpg"
              className="w-6 h-6 rounded-full"
            />
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {'Oscar te Giffel / '}
              {format(frontMatter.publishedAt, 'MMMM dd, yyyy')}
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-500 min-w-32 md:mt-0">
            {' • '}
            Last update: {formatRelative(frontMatter.updatedAt, new Date())}
          </p>
        </div>
        <div className="w-full prose dark:prose-dark max-w-none">
          {children}
        </div>
        <div className="mt-3 text-sm text-gray-700 dark:text-gray-300"></div>
      </article>
    </Container>
  );
}

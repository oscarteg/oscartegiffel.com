import {format, formatRelative, parseISO} from 'date-fns';
import {ReactNode} from 'react';
import BlogSeo from '../components/BlogSeo';
import Container from '../components/Container';

type Props = {
  id: string;
  frontMatter: {
    title: string;
    publishedAt: Date;
    updatedAt: Date;
  };
  children: ReactNode;
};

export default function BlogLayout({id, children, frontMatter}: Props) {
  console.log(frontMatter);
  return (
    <Container>
      <BlogSeo url={`https://oscartegiffel.com/blog/${id}`} {...frontMatter} />
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          {frontMatter.title}
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-2 mb-8">
          <div className="flex items-center">
            <img
              alt="Oscar te Giffel"
              src="/avatar.jpg"
              className="rounded-full w-6 h-6"
            />
            <p className="text-sm text-gray-700 dark:text-gray-300 ml-2">
              {'Oscar te Giffel / '}
              {format(frontMatter.publishedAt, 'MMMM dd, yyyy')}
            </p>
          </div>
          <p className="text-sm text-gray-500 min-w-32 mt-2 md:mt-0">
            {' • '}
            Last update: {formatRelative(frontMatter.updatedAt, new Date())}
          </p>
        </div>
        <div className="prose dark:prose-dark max-w-none w-full">
          {children}
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300 mt-3"></div>
      </article>
    </Container>
  );
}

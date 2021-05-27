import BlogSeo from '@/components/BlogSeo';
import Container from '@/components/Container';
import {format, parseISO} from 'date-fns';

const editUrl = slug =>
  `https://github.com/oscarteg/oscartegiffel.com/edit/master/data/blog/${slug}.mdx`;

export default function BlogLayout({children, frontMatter}) {
  return (
    <Container>
      <BlogSeo
        url={`https://oscartegiffel.com/blog/${frontMatter.slug}`}
        {...frontMatter}
      />
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
              {frontMatter.by}
              {'Oscar te Giffel / '}
              {format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}
            </p>
          </div>
          <p className="text-sm text-gray-500 min-w-32 mt-2 md:mt-0">{' • '}</p>
        </div>
        <div className="prose dark:prose-dark max-w-none w-full">
          {children}
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300 mt-3"></div>
      </article>
    </Container>
  );
}

import Container from '@/components/Container';
import { NextSeo } from 'next-seo';

export default function SnippetLayout({ children, frontMatter }) {
  const title = `${frontMatter.title} - Code Snippet`;
  const url = `https://oscartegiffel.com/snippets/${frontMatter.slug}`;

  return (
    <Container>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title
        }}
      />
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <div className="flex justify-between w-full mb-8">
          <div>
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
              {frontMatter.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              {frontMatter.description}
            </p>
          </div>
          <div className="mt-2 sm:mt-0">
            <img
              alt={frontMatter.title}
              src={`/logos/${frontMatter.logo}`}
              className="rounded-full w-12 h-12"
            />
          </div>
        </div>
        <div className="prose dark:prose-dark w-full">{children}</div>
      </article>
    </Container>
  );
}
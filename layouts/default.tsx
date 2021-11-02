import {NextSeo} from 'next-seo';
import {useRouter} from 'next/router';
import {ReactNode} from 'react';
import Container from '../components/Container';

type Props = {
  title?: string;
  excerpt?: string;
  frontMatter: {
    title: string;
    excerpt: string;
  };
  children: ReactNode;
};

export default function DefaultLayout({
  title,
  excerpt,
  frontMatter,
  children,
}: Props) {
  const {pathname} = useRouter();
  return (
    <Container>
      <NextSeo
        title={`${title || frontMatter.title}– Oscar te Giffel`}
        description={excerpt || frontMatter.excerpt}
        canonical={pathname}
        openGraph={{
          url: pathname,
          title: `${title || frontMatter.title}– Oscar te Giffel`,
          description: excerpt || frontMatter.excerpt,
        }}
      />
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          {title || frontMatter.title}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mt-2 mb-8">
          {excerpt || frontMatter.excerpt}
        </p>
        <div className="prose dark:prose-dark w-full">{children}</div>
      </article>
    </Container>
  );
}

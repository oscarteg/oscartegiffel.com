import {NextSeo} from 'next-seo';
import {useRouter} from 'next/router';
import {ReactNode} from 'react';
import Container from '../components/container';

type Props = {
  title?: string;
  excerpt?: string;
  frontMatter: {
    title: string;
    excerpt: string;
  };
  children: ReactNode;
  meta: {
    title: string;
    excerpt: string;
  };
};

export default function DefaultLayout(props: Props) {
  const {pathname} = useRouter();

  console.log({props});
  const {title, excerpt, meta: frontMatter, children} = props;

  return (
    <Container>
      <NextSeo
        title={`${title || frontMatter?.title}– Oscar te Giffel`}
        description={excerpt || frontMatter?.excerpt}
        canonical={pathname}
        openGraph={{
          url: pathname,
          title: `${title || frontMatter?.title}– Oscar te Giffel`,
          description: excerpt || frontMatter?.excerpt,
        }}
      />
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {title || frontMatter?.title}
        </h1>
        <p className="mt-2 mb-8 text-gray-700 dark:text-gray-300">
          {excerpt || frontMatter?.excerpt}
        </p>
        <div className="w-full prose dark:prose-invert">{children}</div>
      </article>
    </Container>
  );
}

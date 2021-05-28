import {MDXRemote} from 'next-mdx-remote';
import SnippetLayout from '../../layouts/snippets';
import {getFileBySlug, getFiles} from '../../lib/mdx';

export default function Snippet({mdxSource, frontMatter}) {
  return (
    <SnippetLayout frontMatter={frontMatter}>
      <MDXRemote {...mdxSource} />
    </SnippetLayout>
  );
}

export async function getStaticPaths() {
  const snippets = await getFiles('snippets');

  return {
    paths: snippets.map(s => ({
      params: {
        slug: s.replace(/\.mdx/, ''),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({params}) {
  const snippet = await getFileBySlug('snippets', params.slug);

  return {props: snippet};
}

import {MDXRemote} from 'next-mdx-remote';
import DefaultLayout from '../layouts/default';
import {getFileBySlug} from '../lib/mdx';

export default function Workflow({mdxSource, frontMatter}) {
  return (
    <DefaultLayout frontMatter={frontMatter}>
      <MDXRemote {...mdxSource} />
    </DefaultLayout>
  );
}

export async function getStaticProps() {
  const {mdxSource, frontMatter} = await getFileBySlug('workflow');

  return {
    props: {
      mdxSource,
      frontMatter,
    },
  };
}

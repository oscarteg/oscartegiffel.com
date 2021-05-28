import {GetStaticProps} from 'next';
import {MDXRemote, MDXRemoteSerializeResult} from 'next-mdx-remote';
import DefaultLayout from '../layouts/default';
import {getFileBySlug} from '../lib/mdx';

export default function Books({mdxSource, frontMatter}) {
  return (
    <DefaultLayout frontMatter={frontMatter}>
      <MDXRemote {...mdxSource} />
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps<MDXRemoteSerializeResult> =
  async () => {
    const {mdxSource, frontMatter} = await getFileBySlug('books');

    return {
      props: {
        mdxSource,
        frontMatter,
      },
    };
  };

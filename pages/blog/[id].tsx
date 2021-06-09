import BlogLayout from '../../layouts/blog';
import notionToHtml, {
  fetchBlocks,
  fetchPage,
  fetchPages,
} from '../../lib/notion';
import Error from 'next/error';
import {GetStaticProps, GetStaticPaths} from 'next';

export default function Blog({error, html, post}) {
  if (error) return <Error statusCode={error.status} title={error.message} />;

  return (
    <BlogLayout
      id={post.id}
      frontMatter={{
        title: post.properties.Name.title[0].text.content,
        publishedAt: new Date(post.properties['Published at'].date.start),
        updatedAt: new Date(post.properties['Updated at'].last_edited_time),
      }}
    >
      <div dangerouslySetInnerHTML={{__html: html}} />
    </BlogLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  try {
    const [page, blocks] = await Promise.all([
      fetchPage(params.id),
      fetchBlocks(params.id),
    ]);
    const html = notionToHtml(blocks).join('');

    return {
      props: {
        post: page,
        blocks: blocks,
        html,
        revalidate: 1,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await fetchPages();
  // Get the paths we want to pre-render based on posts
  const paths = pages.results.map(({id}) => ({
    params: {id},
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return {paths, fallback: 'blocking'};
};

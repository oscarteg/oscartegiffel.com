import {
  GetPageResponse,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints';
import {GetStaticPaths, GetStaticProps} from 'next';
import BlogLayout from '../../layouts/blog';
import notionToHtml, {
  fetchBlocks,
  fetchPage,
  fetchPages,
} from '../../lib/notion';

type Props = {
  blocks: ListBlockChildrenResponse;
  post: GetPageResponse;
};

export default function Blog({blocks, post}: Props) {
  const html = blocks.results.reduce((acc, result) => {
    const Component = notionToHtml(result);

    // console.log(Component);
    console.log(acc);

    if (Component) {
      // acc.push(<Component {...result} />);
    }
  }, []);
  console.log({html, post});

  return (
    <BlogLayout
      id={post.id}
      frontMatter={{
        title: post.properties.name,
        // image:
        summary: post.properties.Summary.text,
        publishedAt: new Date(post.properties['Published at'].date.start),
        updatedAt: new Date(post.last_edited_time),
      }}
    >
      {html}
    </BlogLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  try {
    const [page, blocks] = await Promise.all([
      fetchPage(params?.id as string),
      fetchBlocks(params?.id as string),
    ]);

    return {
      props: {
        post: page,
        blocks: blocks,
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

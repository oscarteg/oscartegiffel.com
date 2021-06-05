import BlogLayout from '../../layouts/blog';
import notionToHtml, {fetchBlocks, fetchPage} from '../../lib/notion';
import Error from 'next/error';

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

export async function getServerSideProps({res, params}) {
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
      },
    };
  } catch (error) {
    res.statusCode = error.status;
    return {
      props: {
        error: {
          status: error.status,
          message: error.message,
        },
      },
    };
  }
}

import {Client} from '@notionhq/client';
import BlogLayout from '../../layouts/blog';
import notionToHtml from '../../lib/notion';

export default function Blog({html, post}) {
  return (
    <BlogLayout
      id={post.id}
      frontMatter={{
        title: post.properties.Name.title[0].text.content,
        publishedAt: post.properties['Published at'].date.start,
      }}
    >
      <div dangerouslySetInnerHTML={{__html: html}} />
    </BlogLayout>
  );
}

export async function getServerSideProps({params}) {
  const client = new Client({auth: process.env.NOTION_ACCESS_TOKEN});

  const pagePromise = client.pages.retrieve({page_id: params.id});
  const blocksPromise = client.blocks.children.list({block_id: params.id});
  const [page, blocks] = await Promise.all([pagePromise, blocksPromise]);

  const html = notionToHtml(blocks).join('');

  return {
    props: {
      post: page,
      blocks: blocks,
      html,
    },
  };
}

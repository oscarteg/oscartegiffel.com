import {Client} from '@notionhq/client';
import {NextSeo} from 'next-seo';
import {useState} from 'react';
import BlogPost from '../../components/BlogPost';
import Container from '../../components/Container';

const url = 'https://oscartegiffel.com/blog';
const title = 'Blog – Oscar te Giffel';
const description =
  'Thoughts on the software industry, programming, tech, videography, music, and my personal life.';

export default function Blog({posts}) {
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Container>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
        }}
      />
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Blog
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {`I've started writing since the start of 2021, mostly about web development and tech careers.
            In total, I've written ${posts.length} articles on this site.
            Use the search below to filter by title.`}
        </p>
        <div className="relative w-full mb-4">
          <input
            autoFocus
            aria-label="Search articles"
            type="text"
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Search articles"
            className="px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <svg
            className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white">
          All Posts
        </h3>
        {!filteredBlogPosts.length && 'No posts found.'}
        {filteredBlogPosts.map(post => (
          <BlogPost key={post.title} {...post} />
        ))}
      </div>
    </Container>
  );
}

// export async function getStaticProps() {
//   const posts = await getAllFilesFrontMatter('blog');
//
//   // Removed posts that are in draft.
//   const nonDraftPosts = posts.filter(post => post.draft !== true);
//
//   return {
//     // props: {posts: nonDraftPosts},
//   };
// }
//
// ---
// title: Tailwind best practices
// publishedAt: '2020-07-20'
// summary: ''
// image: '/static/images/zero-programming-experience-to-three-internships/banner.png'
// tags:
// - tailwind
// - best practices
// ---

export async function getServerSideProps() {
  const client = new Client({auth: process.env.NOTION_ACCESS_TOKEN});

  const pages = await client.databases.query({
    database_id: process.env.NOTION_DATABASE_BLOG_ID,
    filter: {
      property: 'Stage',
      select: {
        equals: 'Stage 5: Epilogue',
      },
    },
    sorts: [
      {
        property: 'Published at',
        direction: 'descending',
      },
    ],
  });

  const posts = pages.results.map(({id, properties}) => ({
    id,
    title: properties.Name.title[0].plain_text,
    summary: properties.Summary.rich_text[0].plain_text,
    tags: properties.Tags.multi_select.map(select => ({
      name: select.name,
      color: select.color,
    })),
  }));

  console.log({posts});

  return {
    props: {
      posts,
    },
  };
}

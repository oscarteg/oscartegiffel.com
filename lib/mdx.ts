import fs from 'fs';
import matter from 'gray-matter';
import {MDXRemoteSerializeResult} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';
import path from 'path';
import readingTime from 'reading-time';

const root = process.cwd();

export async function getFiles(type) {
  return fs.readdirSync(path.join(root, 'data', type));
}

type IReadTimeResults = {
  text: string;
  time: number;
  words: number;
  minutes: number;
};

type GetFileByPropsReturn<
  T extends {wordCount: number; readingTime: IReadTimeResults; slug: string}
> = Promise<{
  mdxSource: MDXRemoteSerializeResult<Record<string, unknown>>;
  frontMatter: T;
}>;

export async function getFileBySlug(type: string, slug?: string) {
  const source = slug
    ? fs.readFileSync(path.join(root, 'data', type, `${slug}.mdx`), 'utf8')
    : fs.readFileSync(path.join(root, 'data', `${type}.mdx`), 'utf8');

  const {data, content} = matter(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        require('remark-autolink-headings'),
        require('remark-slug'),
        require('remark-code-titles'),
        require('remark-math'),
      ],
      rehypePlugins: [require('mdx-prism'), require('rehype-katex')],
    },
  });

  return {
    mdxSource,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      slug: slug || null,
      ...data,
    },
  };
}

export async function getAllFilesFrontMatter(type: string) {
  const files = fs.readdirSync(path.join(root, 'data', type));

  return files.reduce((allPosts, postSlug) => {
    const source = fs.readFileSync(
      path.join(root, 'data', type, postSlug),
      'utf8'
    );
    const {data} = matter(source);

    return [
      {
        ...data,
        slug: postSlug.replace('.mdx', ''),
      },
      ...allPosts,
    ];
  }, []);
}
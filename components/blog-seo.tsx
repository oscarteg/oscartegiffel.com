import {ArticleJsonLd, NextSeo} from 'next-seo';

type Props = {
  title: string;
  summary: string;
  publishedAt: Date;
  updatedAt: Date;
  image: string;
  url: string;
};

const BlogSeo = ({title, summary, publishedAt, url, image}: Props) => {
  const date = new Date(publishedAt).toISOString();
  const featuredImage = {
    url: `https://oscartegiffel.com${image}`,
    alt: title,
  };

  return (
    <>
      <NextSeo
        title={`${title} – Oscar te Giffel`}
        description={summary}
        canonical={url}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: date,
          },
          url,
          title,
          description: summary,
          images: [featuredImage],
        }}
      />
      <ArticleJsonLd
        authorName="Oscar te Giffel"
        dateModified={date}
        datePublished={date}
        description={summary}
        images={[featuredImage.url]}
        publisherLogo="/static/favicons/android-chrome-192x192.png"
        publisherName="Oscar te Giffel"
        title={title}
        url={url}
      />
    </>
  );
};

export default BlogSeo;

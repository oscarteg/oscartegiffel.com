import Container from '@/components/Container';
import Tweet from '@/components/Tweet';
import { getLikedTweets } from '@/lib/twitter';
import { NextSeo } from 'next-seo';

const url = 'https://oscartegiffel.com/tweets';
const title = 'Tweets – Oscar te Giffel';
const description =
  'A collection of tweets that inspire me, make me laugh, and make me think.';

export default function Tweets({ tweets }) {
  return (
    <Container>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description
        }}
      />
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Tweets
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          This is a collection of tweets I've enjoyed. I use Twitter quite a
          bit, so I wanted a place to publically share what inspires me, makes
          me laugh, and makes me think.
        </p>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const tweets = await getLikedTweets(['1344020569151434752']);

  return { props: { tweets } };
}

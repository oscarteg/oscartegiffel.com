import Container from '@/components/Container';
import { NextSeo } from 'next-seo';

const url = 'https://oscartegiffel.com/youtube';
const title = 'Tweets – Oscar te Giffel';
const description =
  'A collection of tweets that inspire me, make me laugh, and make me think.';

export default function Youtube({}) {
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
          Music
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          This is the playlist I use for when I want to focus. It consist of
          some chillstep | classical | lofi beats for concentration. Whenever I
          want to focus I really don't like music with lyrics because I tend to
          listen to much to them. So this is my way of keeping my focus.
        </p>

        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/videoseries?list=PL9WtCaBDfOZt2HMoqNiV13sYSHV27FSJn"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
      </div>
    </Container>
  );
}

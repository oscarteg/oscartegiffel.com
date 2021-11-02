import {NextSeo} from 'next-seo';
import Container from '../components/container';

const url = 'https://oscartegiffel.com/youtube';
const title = 'Youtube – Oscar te Giffel';
const description =
  'A collection of youtube music that makes me get into the flow state.';

export default function Youtube() {
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
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Music
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-100">
          This is the playlist I use for when I want to focus. It consist of
          some chillstep | classical | lofi beats for concentration. Whenever I
          want to focus I really don't like music with lyrics because I tend to
          listen to much to them. So this is my way of keeping my focus.
        </p>

        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/videoseries?list=PL9WtCaBDfOZt2HMoqNiV13sYSHV27FSJn"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    </Container>
  );
}

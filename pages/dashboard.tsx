import {NextSeo} from 'next-seo';
import Container from '../components/container';
import TopTracks from '../components/top-tracks';

const url = 'https://oscartegiffel.com/dashboard';
const title = 'Dashboard – Oscar te Giffel';
const description =
  'My personal dashboard, built with Next.js API routes deployed as serverless functions.';

export default function Dashboard() {
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
          Dashboard
        </h1>
        <h2 className="mt-16 mb-4 text-3xl font-bold tracking-tight text-black dark:text-white">
          Top Tracks
        </h2>
        <p className="mb-4 text-gray-600 dark:text-gray-100">
          Curious what I'm currently jamming to? Here's my top tracks on Spotify
          updated daily.
        </p>
        <TopTracks />
      </div>
    </Container>
  );
}

import {NextSeo} from 'next-seo';
import Link from 'next/link';
import Container from '../components/container';

export default function NotFound() {
  return (
    <Container>
      <NextSeo
        title="404 – Oscar te Giffel"
        canonical="https://oscartegiffel.com/404"
        openGraph={{
          url: 'https://oscartegiffel.com/404',
          title: '404 – Oscar te Giffel',
        }}
      />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          451 – Unavailable For Legal Reasons
        </h1>
        <p className="mb-8 text-gray-600 dark:text-gray-100">
          Why show a generic 404 when I can make it sound mysterious? It seems
          you've found something that used to exist, or you spelled something
          wrong. I'm guessing you spelled something wrong. Can you double check
          that URL?
        </p>
        <Link href="/">
          <a className="w-64 p-1 mx-auto font-bold text-center text-black bg-gray-100 sm:p-4 dark:bg-gray-900 rounded-md dark:text-white">
            Return Home
          </a>
        </Link>
      </div>
    </Container>
  );
}

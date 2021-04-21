import Container from '@/components/Container';
import {NextSeo} from 'next-seo';

const Talk = ({title, link, children}) => (
  <>
    <h3 className="font-medium mb-2 text-lg">
      <a
        className="flex items-center text-gray-900 dark:text-gray-100"
        target="_blank"
        rel="noopener noreferrer"
        href={link}
      >
        {title}
        <div>
          <svg
            className="h-4 w-4 ml-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
      </a>
    </h3>
    <p className="text-gray-600 dark:text-gray-400 mb-8">{children}</p>
  </>
);

export default function About() {
  return (
    <Container>
      <NextSeo
        title="About Me – Oscar te Giffel"
        canonical="https://oscartegiffel.com/about"
        openGraph={{
          url: 'https://oscartegiffel.com/about',
          title: 'About Me – Oscar te Giffel',
        }}
      />
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          About Me
        </h1>
        <div className="mb-8 prose leading-6 text-gray-600 dark:text-gray-400">
          <p>
            Hey, I’m Oscar. I'm a developer, aspired writer, and user of many
            technologies.
          </p>
          <p>
            I am a social and driven software developer. My father has involved
            me in the computer from an early age and through proper guidance and
            training it has led to a passion for technology. I have a broad
            field of interest and that can also be seen in the various
            techniques and technologies I have used the years. During and after
            his studies, I mainly developed in the field of web development.
          </p>
          <p>
            I have studied self-study into various technologies and software
            architectures. I can be described as a social, enthusiastic and
            communicatively skilled software engineer. I have a passion for my
            profession, work hard and like to contribute to a positive working
            atmosphere. My ambition is to work in a dynamic environment with an
            open culture and passionate employees. The ideal organization
            delivers an (innovative) product or service with real added value to
            the largest possible audience.
          </p>
        </div>
      </div>
    </Container>
  );
}

import {ReactNode} from 'react';
import Container from '../components/container';

type Props = {
  error: ReactNode;
};

export default function ErrorLayout({error}: Props) {
  return (
    <Container>
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {error}
        </h1>
      </article>
    </Container>
  );
}

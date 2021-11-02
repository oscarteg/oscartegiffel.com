import {ReactNode} from 'react';
import NextLink from 'next/link';

type Props = {
  children: ReactNode;
};

export default function Container({children}: Props) {
  return (
    <div>
      <nav className="flex flex-row-reverse items-center w-full max-w-4xl p-8 mx-auto my-0 sticky-nav md:my-8">
        <div>
          <NextLink href="/dashboard">
            <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100 hover:text-gray-400 transition">
              Dashboard
            </a>
          </NextLink>
          <NextLink href="/blog">
            <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100 hover:text-gray-400 transition">
              Blog
            </a>
          </NextLink>
          <NextLink href="/about">
            <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100 hover:text-gray-400 transition">
              About
            </a>
          </NextLink>
          <NextLink href="/">
            <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100 hover:text-gray-400 transition">
              Home
            </a>
          </NextLink>
        </div>
      </nav>
      <main className="flex flex-col justify-center px-8">{children}</main>
    </div>
  );
}

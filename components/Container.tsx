import NextLink from 'next/link';
import Footer from '../components/Footer';

export default function Container({children}) {
  return (
    <div>
      <nav className="sticky-nav flex flex-row-reverse items-center max-w-4xl w-full p-8 my-0 md:my-8 mx-auto bg-white dark:bg-gray-800">
        <div>
          <NextLink href="/dashboard">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">
              Dashboard
            </a>
          </NextLink>
          <NextLink href="/blog">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">Blog</a>
          </NextLink>
          <NextLink href="/about">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">About</a>
          </NextLink>
          <NextLink href="/">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">Home</a>
          </NextLink>
        </div>
      </nav>
      <main className="flex flex-col justify-center px-8">
        {children}
        <Footer />
      </main>
    </div>
  );
}

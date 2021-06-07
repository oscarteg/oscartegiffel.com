import NextLink from 'next/link';

export default function Container({children}) {
  return (
    <div>
      <nav className="sticky-nav flex flex-row-reverse items-center max-w-4xl w-full p-8 my-0 md:my-8 mx-auto">
        <div>
          <NextLink href="/dashboard">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100 hover:text-gray-400 transition">
              Dashboard
            </a>
          </NextLink>
          <NextLink href="/blog">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100 hover:text-gray-400 transition">
              Blog
            </a>
          </NextLink>
          <NextLink href="/about">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100 hover:text-gray-400 transition">
              About
            </a>
          </NextLink>
          <NextLink href="/">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100 hover:text-gray-400 transition">
              Home
            </a>
          </NextLink>
        </div>
      </nav>
      <main className="flex flex-col justify-center px-8">{children}</main>
    </div>
  );
}

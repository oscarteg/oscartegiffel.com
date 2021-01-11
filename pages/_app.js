import MDXComponents from '@/components/MDXComponents';
import '@/styles/global.css';
import { MDXProvider } from '@mdx-js/react';
import 'katex/dist/katex.min.css';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import SEO from '../next-seo.config';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" enableSystem>
      <MDXProvider components={MDXComponents}>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </MDXProvider>
    </ThemeProvider>
  );
}

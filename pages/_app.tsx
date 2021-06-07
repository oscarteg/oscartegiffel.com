import {MDXProvider} from '@mdx-js/react';
import 'katex/dist/katex.min.css';
import {DefaultSeo} from 'next-seo';
import {ThemeProvider} from 'next-themes';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import 'nprogress/nprogress.css';
import Footer from '../components/Footer';
import MDXComponents from '../components/MDXComponents';
import SEO from '../next-seo.config';
import '../styles/global.css';
import AnimatedBackgroundShapes from '../components/animated-background-shapes';

const ProgressBar = dynamic(
  () => {
    return import('../components/progress-bar');
  },
  {ssr: false}
);

export default function App({Component, pageProps}) {
  return (
    <ThemeProvider attribute="class" enableSystem>
      <MDXProvider components={MDXComponents}>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        <DefaultSeo {...SEO} />
        <ProgressBar />
        <AnimatedBackgroundShapes />
        <Component {...pageProps} />
        <Footer />
      </MDXProvider>
    </ThemeProvider>
  );
}

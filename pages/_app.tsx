import {MDXProvider} from '@mdx-js/react';
import 'katex/dist/katex.min.css';
import {DefaultSeo} from 'next-seo';
import {ThemeProvider} from 'next-themes';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import 'nprogress/nprogress.css';
import Footer from '../components/footer';
import MDXComponents from '../components/mdx-components';
import SEO from '../next-seo.config';
import '../styles/global.css';
import AnimatedBackgroundShapes from '../components/animated-background-shapes';
import type {AppProps} from 'next/app';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import * as Fathom from 'fathom-client';

const ProgressBar = dynamic(
  () => {
    return import('../components/progress-bar');
  },
  {ssr: false}
);

export default function App({Component, pageProps}: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Initialize Fathom when the app loads
    // Example: yourdomain.com
    //  - Do not include https://
    //  - This must be an exact match of your domain.
    //  - If you're using www. for your domain, make sure you include that here.
    Fathom.load('ALCMLMBG', {
      includedDomains: ['oscartegiffel.com'],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);
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

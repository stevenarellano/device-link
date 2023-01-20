import '/styles/global/globals.scss';

import Head from 'next/head';
import { Navbar } from '../components';
import type { AppProps } from 'next/app';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Sold Sensor</title>
        <meta
          name="description"
          content="A webapp"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />
        <Component {...pageProps} />
      </main>

    </>
  );
}

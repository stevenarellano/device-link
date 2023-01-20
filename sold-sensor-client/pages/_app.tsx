import '/styles/global/globals.scss';

import Head from 'next/head';
import type { AppProps } from 'next/app';

import { RecoilRoot } from 'recoil';

import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';


export default function App({ Component, pageProps }: AppProps) {
  const phantomWallet = new PhantomWalletAdapter();

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
        <RecoilRoot>

          <Component {...pageProps} />

        </RecoilRoot>
      </main>

    </>
  );
}

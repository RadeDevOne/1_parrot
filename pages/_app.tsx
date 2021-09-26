import type { AppProps } from "next/app";
import Head from "next/head";
// import { GlobalStyles } from "twin.macro";
// import { injectGlobal } from "@emotion/css";

import GlobalStyles from "@/styles/GlobalStyles";

import Header from "@/components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;

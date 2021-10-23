import type { AppProps } from "next/app";
import Head from "next/head";
// import { GlobalStyles } from "twin.macro";
// import { injectGlobal } from "@emotion/css";
import { ThemeProvider as DangerousThemeSettingProvider } from "next-themes";

import { SessionProvider } from "next-auth/react";

// import type { Session } from "next-auth";

import GlobalStyles from "@/styles/GlobalStyles";

import Header from "@/components/Header";
// import PageLoadingIndiccator from "@/components/loaders/PageLoadingIndicator";

import usePageLoadingService from "@/hooks/usePageLoadiingService";
import useCartService from "@/hooks/useCartService";
import useHamburgerMachine from "@/hooks/useHamburgerMachine";

function MyApp({ Component, pageProps }: AppProps) {
  usePageLoadingService();
  useHamburgerMachine();
  useCartService();

  const { session } = pageProps;

  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <GlobalStyles />
      <SessionProvider session={session}>
        <DangerousThemeSettingProvider
          attribute="class"
          enableColorScheme={false}
          enableSystem={false}
        >
          {/* <PageLoadingIndiccator /> */}
          <Header />
          <Component {...pageProps} />
        </DangerousThemeSettingProvider>
      </SessionProvider>
    </>
  );
}
export default MyApp;

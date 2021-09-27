import type { AppProps } from "next/app";
import Head from "next/head";
// import { GlobalStyles } from "twin.macro";
// import { injectGlobal } from "@emotion/css";
import { ThemeProvider as DangerousThemeSettingProvider } from "next-themes";

import GlobalStyles from "@/styles/GlobalStyles";

import Header from "@/components/Header";

import Switch from "@/components/tryout/Switch";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <GlobalStyles />
      <DangerousThemeSettingProvider
        attribute="class"
        enableColorScheme={false}
        enableSystem={false}
      >
        <Header />
        <Switch />
        <Component {...pageProps} />
      </DangerousThemeSettingProvider>
    </>
  );
}
export default MyApp;

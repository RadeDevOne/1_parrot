import type { AppProps } from "next/app";

// import { GlobalStyles } from "twin.macro";

import { injectGlobal } from "@emotion/css";

import GlobalStyles from "../styles/GlobalStyles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <GlobalStyles />
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;

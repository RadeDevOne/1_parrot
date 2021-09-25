/* eslint react/react-in-jsx-scope: 0 */
import Document, { Html, Head, Main, NextScript } from "next/document";
import type { DocumentContext, DocumentInitialProps } from "next/document";
import { extractCritical } from "@emotion/server";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps: DocumentInitialProps = await Document.getInitialProps(
      ctx
    );

    const page = await ctx.renderPage();

    const styles = extractCritical(page.html);

    return { ...initialProps, ...page, ...styles };
  }

  render() {
    return (
      <Html>
        <Head>{/*  */}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

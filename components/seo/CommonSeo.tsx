/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC } from "react";

const CommonSeo: FC = () => {
  return (
    <>
      {/* VIEWPORT META */}
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
      {/* FONTS */}
      <link
        rel="preload"
        href="/fonts/Inter-roman.var.woff2?v=3.19"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/Inter.var.woff2?v=3.19"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/Inter-italic.var.woff2?v=3.19"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      {/* COMMON META TAGS */}
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
    </>
  );
};

export default CommonSeo;

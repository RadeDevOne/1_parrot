import React from "react";

import tw, { css, styled } from "twin.macro";

const fontStyles = css`
  html {
    --font-fam-primary: "Inter var", sans-serif;
  }
  @supports (font-variation-settings: normal) {
    html {
      font-family: "Inter var", sans-serif;
    }
  }
  @font-face {
    font-family: "Inter var";
    font-weight: 100 900;
    /* OVDE UMESTO swap ILI block KORISTICEMO optional
    SVE U CILJU DA NAM TEXT NE BI FLASH-OVAO, NE BI BIO PRIKAZAN
    NA SEKUNDU, ILI DA SE NE BI MENJAO FROM DEFULT FONT-A
    (USTVARI JEDNOM RECUJU, OVIM SE PREVENTIRA LAYOUT SHIFT)*/
    font-display: optional;
    /*  */
    font-style: normal;
    font-named-instance: "Regular";
    src: url("/fonts/Inter-roman.var.woff2?v=3.19") format("woff2");
  }
  @font-face {
    font-family: "Inter var";
    font-weight: 100 900;
    /* OVDE UMESTO swap ILI block KORISTICEMO optional
    SVE U CILJU DA NAM TEXT NE BI FLASH-OVAO, NE BI BIO PRIKAZAN
    NA SEKUNDU, ILI DA SE NE BI MENJAO FROM DEFULT FONT-A */
    font-display: optional;
    /*  */
    font-style: italic;
    font-named-instance: "Italic";
    src: url("/fonts/Inter-italic.var.woff2?v=3.19") format("woff2");
  }

  /* --------------------------------------------------------------------------
  [EXPERIMENTAL] Multi-axis, single variable font.
  Slant axis is not yet widely supported (as of February 2019) and thus this
  multi-axis single variable font is opt-in rather than the default.
  When using this, you will probably need to set font-variation-settings
  explicitly, e.g.
    * { font-variation-settings: "slnt" 0deg }
    .italic { font-variation-settings: "slnt" 10deg }
  */
  @font-face {
    font-family: "Inter var experimental";
    font-weight: 100 900;
    /* font-display: swap; */
    /* OVDE UMESTO swap ILI block KORISTICEMO optional
    SVE U CILJU DA NAM TEXT NE BI FLASH-OVAO, NE BI BIO PRIKAZAN
    NA SEKUNDU, ILI DA SE NE BI MENJAO FROM DEFULT FONT-A */
    font-display: optional;
    /*  */
    font-style: oblique 0deg 10deg;
    src: url("/fonts/Inter.var.woff2?v=3.19") format("woff2");
  }
`;

export default fontStyles;

import React from "react";
import { Global } from "@emotion/react";
import tw, { css, theme, GlobalStyles as BaseStyles } from "twin.macro";

import fontStyles from "./FontStyles";

const customStyles = css`
  /* ADDING VARIABLE FONT CSS TO THE GLOBAL STILES */
  ${fontStyles}

  .beauty-h1 {
    /* font-family: var(--font-fam-primary); */
  }

  body {
    --webkit-tap-highlight-color: ${theme`colors.purple.500`};
    ${tw`antialiased`}
  }
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;

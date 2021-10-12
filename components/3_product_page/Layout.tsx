/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import ProductView from "../products/ProductView";

const Layout: FC = ({ children }) => {
  return (
    <main>
      <ProductView />
      {children}
    </main>
  );
};

export default Layout;

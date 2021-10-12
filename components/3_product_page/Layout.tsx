/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/product/[productId]";

import ProductView from "../products/ProductView";

const Layout: FC<PropsI> = ({ children, product }) => {
  return (
    <main>
      <ProductView product={product} />
      {children}
    </main>
  );
};

export default Layout;

/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/products/[pageNum]";

import Products from "../products/Products";

const Layout: FC<PropsI> = ({ products, totalProducts }) => {
  return (
    <main>
      <Products pagAbove products={products} totalProducts={totalProducts} />
    </main>
  );
};

export default Layout;

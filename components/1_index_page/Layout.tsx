/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/index";
import Products from "../products/Products";

const Layout: FC<PropsI> = ({ products, topRatedProducts, totalProducts }) => {
  return (
    <main>
      <Products products={products} totalProducts={totalProducts} />
    </main>
  );
};

export default Layout;

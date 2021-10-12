/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/index";
import Products from "../products/Products";

import SeeMoreProducts from "../navigation/SeeMoreProducts";

const Layout: FC<PropsI> = ({
  products,
  topRatedProducts,
  totalProducts,
  paginationData,
}) => {
  return (
    <main>
      <Products
        products={products}
        totalProducts={totalProducts}
        pagination={paginationData}
      />

      <SeeMoreProducts />
    </main>
  );
};

export default Layout;

/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/product/[productId]";

import ProductView from "../products/ProductView";
import Reviews from "../reviews/Reviews";
import Alert from "../alerts/Alert";

const Layout: FC<PropsI> = ({ children, product }) => {
  return (
    <main>
      <ProductView product={product} />
      <Reviews reviews={product.reviews} />
      {children}
      {/* <Alert
        visible={true}
        header="Hello world"
        text="You are informed"
        variant="info"
      /> */}
    </main>
  );
};

export default Layout;

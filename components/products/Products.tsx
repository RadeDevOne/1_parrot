/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw /* , { css, styled, theme } */ from "twin.macro";

import Product from "./Product";

import type { PropsI } from "@/pages/index";

export interface ProductsPropsI {
  products: PropsI["products"];
}

const Products: FC<ProductsPropsI> = ({ products }) => {
  return (
    <section>
      <div tw="container mx-auto px-6">
        <h3 tw="light:text-gray-700 dark:text-gray-200 text-2xl font-medium">
          We have everything
        </h3>
        <span tw="mt-3 text-sm light:text-gray-500 dark:text-gray-600">
          200+ Products
        </span>

        <div tw="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {products.map((product, i) => {
            return <Product key={`${i}-${product.id}`} product={product} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;

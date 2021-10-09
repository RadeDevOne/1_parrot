/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/index";

export interface ProductsPropsI {
  products: PropsI["products"];
}

const Products: FC<ProductsPropsI> = ({ products }) => {
  return (
    <section>
      <div tw="container mx-auto px-6">
        <h3 tw="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
        <span tw="mt-3 text-sm text-gray-500">200+ Products</span>

        <div tw="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {products.map(({ id, image, name }, i) => {
            return (
              <div
                key={`${i}-${id}`}
                tw="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden"
              >
                <div
                  tw="flex items-end justify-end h-56 w-full bg-cover"
                  // SHOULD SET UP BACKGROUND IMAGE
                  css={css`
                    background-image: url(${image});
                  `}
                >
                  <button tw="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                    <svg
                      tw="h-5 w-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </button>
                </div>
                <div tw="px-5 py-3">
                  <h3 tw="text-gray-700 uppercase">{name}</h3>
                  <span tw="text-gray-500 mt-2">$123</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;

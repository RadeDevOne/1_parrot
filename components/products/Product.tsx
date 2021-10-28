/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useState } from "react";
import tw, { css, styled, theme } from "twin.macro";

import Link from "next/link";
import { useActor } from "@xstate/react";

import { cartService, EE } from "@/machines/cart_machine";

import { unsplashTemplate } from "@/lib/prisma/seed-helpers";
import { FALLBACK_PHOTO } from "@/constants/index";
import type { PropsI } from "@/pages/index";

interface ProductPropsI {
  product: PropsI["products"][0];
}

const Product: FC<ProductPropsI> = ({ product }) => {
  const basePath = "/product/";

  // const [imageErrored, setImageErrored] = useState<boolean>(false);
  const [cartState, dispatchToCart] = useActor(cartService);

  const productIsInCart = cartState.context.cart[product.id] !== undefined;

  return (
    <Link href={`${basePath}${product.id}`}>
      <a
        css={[
          tw`hover:cursor-pointer w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden`,
          css`
            & * {
              ${tw`transform-gpu`}
            }

            & h3.header3 {
              /* display: block; */
              zoom: 100%;
              display: table;
              -webkit-font-smoothing: subpixel-antialiased;
              backface-visibility: hidden;
              -webkit-filter: blur(0);
              ${tw`duration-500 ease-in-out transform`}
            }

            &:hover {
              & h3 {
                ${tw`scale-90`};
                /* transform: scale3d(0.92, 0.92, 1); */
              }
            }
          `,
        ]}
      >
        <div
          css={[tw`relative flex flex-wrap justify-center overflow-hidden`]}
          // tw="flex items-end justify-end h-56 w-full bg-cover"
          // SHOULD SET UP BACKGROUND IMAGE
        >
          <div
            tw="hover:scale-150 duration-500 ease-in-out transform flex items-end justify-end h-56 w-full bg-cover "
            css={[
              css`
                background-image: url(${product.image}),
                  /* url(${unsplashTemplate(product.name)})
                  , 
                  
                  */ url(${FALLBACK_PHOTO});
              `,
            ]}
          ></div>
          {!productIsInCart && product.countInStock > 0 && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                if (product.countInStock === 0) return;

                dispatchToCart({
                  type: EE.ADD,
                  payload: {
                    item: {
                      count: 1,
                      id: product.id,
                      image: product.image,
                      name: product.name,
                      countInStock: product.countInStock,
                      price: parseFloat(product.price),
                    },
                  },
                });
              }}
              tw="absolute bottom-7 -right-2 p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            >
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
          )}
        </div>
        <div tw="px-5 py-3">
          <h3
            className="header3"
            tw="light:text-gray-700 dark:text-gray-200 uppercase"
          >
            {product.name}
          </h3>
          <span tw="light:text-gray-500 dark:text-gray-400 mt-2">
            ${product.price}
          </span>
        </div>
      </a>
    </Link>
  );
};

export default Product;

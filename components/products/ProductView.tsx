/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { Fragment } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI as ProductPropsI } from "@/pages/product/[productId]";

// import Info from "../info/Info";

import OutOfStockInfo from "./OutOfStockInfo";

import Rating from "../products/Rating";

interface PropsI {
  product: ProductPropsI["product"];
}

const ProductView: FC<PropsI> = ({ product }) => {
  if (product === null) {
    return null;
  }

  const { description, name, image, price, countInStock, averageRating } =
    product;

  // console.log({ countInStock, averageRating });

  return (
    <Fragment>
      <div tw="w-full md:flex md:items-center mt-8 md:px-5">
        <div tw="w-full h-72 md:w-1/2 lg:h-96">
          <div tw="h-full mx-1.5">
            <img
              tw="h-full w-full rounded-md object-cover max-w-lg mx-auto"
              src={image}
              alt="product"
            />
          </div>
        </div>
        <div tw="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
          <h3 tw="dark:text-gray-300 text-gray-700 uppercase text-lg ml-7">
            {name}
          </h3>
          <Rating value={averageRating} />
          <span tw="text-gray-500 mt-3 ml-7">${price}</span>

          <hr tw="my-3 w-11/12 mx-auto" />
          <p tw="dark:text-gray-400 text-gray-500 px-5 md:px-6">
            {description}
          </p>
          <hr tw="my-3 w-11/12 mx-auto" />
          {countInStock !== 0 ? (
            <Fragment>
              <div tw="mt-2">
                <label
                  tw="flex justify-center dark:text-gray-400 text-gray-700 text-sm"
                  htmlFor="count"
                >
                  <span>Count:</span>
                </label>
                <div tw="flex justify-center">
                  <div tw="flex items-center mt-1">
                    <button tw="text-gray-500 focus:outline-none focus:text-gray-600">
                      <svg
                        tw="h-5 w-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </button>
                    <span tw="dark:text-gray-50 text-gray-700 text-lg mx-2">
                      20
                    </span>
                    <button tw="text-gray-500 focus:outline-none focus:text-gray-600">
                      <svg
                        tw="h-5 w-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              {/* <div tw="mt-3">
                <label tw="text-gray-700 text-sm" htmlFor="count">
                  Color:
                  </label>
                  <div tw="flex items-center mt-1">
                  <button tw="h-5 w-5 rounded-full bg-blue-600 border-2 border-blue-200 mr-2 focus:outline-none"></button>
                  <button tw="h-5 w-5 rounded-full bg-yellow-400 mr-2 focus:outline-none"></button>
                  <button tw="h-5 w-5 rounded-full bg-pink-600 mr-2 focus:outline-none"></button>
                </div>
              </div> */}
              <div tw="flex items-center mt-6 justify-center sm:justify-center  md:justify-center">
                <button tw="mb-6 flex px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                  Add To Cart
                  <span tw="ml-1">
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
                  </span>
                </button>
                {/* <button tw="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
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
                </button> */}
              </div>
            </Fragment>
          ) : (
            <OutOfStockInfo countInStock={0} />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductView;

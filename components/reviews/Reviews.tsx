/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI as ProductPropsI } from "@/pages/product/[productId]";

import Stringified from "../dev-helpers/Stringified";

interface PropsI {
  reviews: ProductPropsI["product"]["reviews"];
}

const Reviews: FC<PropsI> = ({ reviews }) => {
  const unsplash_url = "https://source.unsplash.com/100x100/?face";

  return (
    <section tw="mt-8 mb-8">
      <div tw=" dark:inherits[inherit] antialiased mx-auto max-w-screen-sm px-1 ">
        <h3 tw="dark:text-gray-200 mb-4 text-lg font-semibold text-gray-900">
          Reviews
        </h3>

        <div tw="space-y-4">
          <div tw="flex">
            <div tw="flex-shrink-0 mr-3">
              <img
                tw="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                // src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                src={unsplash_url}
                alt="profile"
              />
            </div>
            <div tw="flex-1 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
              <strong tw="dark:text-gray-300">Sarah</strong>{" "}
              <span tw="text-xs text-gray-400">3:34 PM</span>
              <span tw="inline-block ml-2 text-green-600 text-xs">
                Verified Buyer
              </span>
              <div tw="flex items-center mt-1 mb-0.5">
                <svg
                  tw="w-4 h-4 fill-current text-yellow-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <svg
                  tw="w-4 h-4 fill-current text-yellow-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <svg
                  tw="w-4 h-4 fill-current text-yellow-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <svg
                  tw="w-4 h-4 fill-current text-yellow-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <svg
                  tw="w-4 h-4 fill-current text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              </div>
              <p tw="dark:text-gray-50 text-sm">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua.
              </p>
              {/* <div tw="mt-4 flex items-center">
                <div tw="text-sm text-gray-500 font-semibold">5 Replies</div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* <Stringified data={reviews} /> */}
    </section>
  );
};

export default Reviews;

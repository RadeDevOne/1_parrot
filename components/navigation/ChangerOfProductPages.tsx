/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";
import Link from "next/link";

import pagCalc from "@/util/pagCalc";

export interface PropsI {
  currentPageNumber: number;
  totalItems: number;
}

const ChangerOfProductsPages: FC<PropsI> = ({
  currentPageNumber,
  totalItems,
}) => {
  const basePath = "/products";

  const paginationData = pagCalc(currentPageNumber, totalItems);

  return (
    <div tw="flex justify-center">
      <div tw="flex rounded-md mt-8">
        <a
          href="#"
          tw="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-blue-500 hover:text-white"
        >
          <span>Previous</span>
        </a>
        <a
          href="#"
          tw="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
        >
          <span>1</span>
        </a>
        <a
          href="#"
          tw="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
        >
          <span>2</span>
        </a>
        <a
          href="#"
          tw="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
        >
          <span>3</span>
        </a>
        <a
          href="#"
          tw="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 rounded-r hover:bg-blue-500 hover:text-white"
        >
          <span>Next</span>
        </a>
      </div>
    </div>
  );
};

export default ChangerOfProductsPages;

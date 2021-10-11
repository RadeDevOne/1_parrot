/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";
import Link from "next/link";

import calcPagi from "@/util/calcPagi";

import type { ProductsPropsI } from "../products/Products";

export interface PropsI {
  currentPageNumber: number;
  totalItems: number;
  pagination?: ProductsPropsI["pagination"];
}

const ChangerOfProductsPages: FC<PropsI> = ({
  currentPageNumber,
  totalItems,
  pagination,
}) => {
  const basePath = "/products/";

  // const paginationData = pagCalc(currentPageNumber, totalItems);

  const pgData = paginationData[1];
  const contenders = paginationData[1].contenders;
  const current = paginationData[0];

  console.log(paginationData, totalItems);

  return (
    <div tw="flex justify-center">
      <div
        // tw="flex rounded-md mt-8"
        css={[
          tw`dark:bg-white rounded-md`,
          css`
            display: flex;
            border-radius: ${tw`rounded-md`};
            margin-top: 2rem;

            & .contenders {
              user-select: none;
            }

            & .around {
              @media screen and (max-width: 500px) {
                display: none;
              }
            }

            & .current {
              border: #5fbbbe solid 2px;
              pointer-events: none;
            }

            & .previous {
              &::after {
                display: inline;
                content: "Previous";
                /* content: "◀️"; */
              }

              @media screen and (max-width: 500px) {
                &::after {
                  display: inline;
                  /* content: "Previous"; */
                  content: "◀️";
                }
              }
            }

            & .next {
              &::after {
                display: inline;
                content: "Next";
                /* content: "▶️"; */
              }

              @media screen and (max-width: 500px) {
                &::after {
                  display: inline;
                  /* content: "Next"; */
                  content: "▶️";
                }
              }
            }

            & .first {
              /* @media screen and (max-width: 500px) { */
              &::after {
                display: inline;
                font-size: 0.6rem;
                content: "◀️◀️";
              }
              /* } */
            }

            & .last {
              /* @media screen and (max-width: 500px) { */
              &::after {
                display: inline;
                font-size: 0.6rem;
                content: "▶️▶️";
              }
              /* } */
            }
          `,
        ]}
      >
        <Link href={`${basePath}${pgData.first}`}>
          <a tw="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-blue-500 hover:text-white">
            <span className="first">{/* First */}</span>
          </a>
        </Link>
        <Link href={`${basePath}${pgData.prev}`}>
          <a tw="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-blue-500 hover:text-white">
            <span className="previous">{/* Previous */}</span>
          </a>
        </Link>
        {contenders.map((item, i) => {
          return (
            <Link href={`${basePath}${item}`} key={`${i}-${item}`}>
              <a
                className={`contenders ${
                  item === current ? "current" : "around"
                }`.trim()}
                tw="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
              >
                <span>{item}</span>
              </a>
            </Link>
          );
        })}
        <Link href={`${basePath}${pgData.next}`}>
          <a tw="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 rounded-r hover:bg-blue-500 hover:text-white">
            <span className="next">{/* Next */}</span>
          </a>
        </Link>
        <Link href={`${basePath}${pgData.last}`}>
          <a tw="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 rounded-r hover:bg-blue-500 hover:text-white">
            <span className="last">{/* Last */}</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ChangerOfProductsPages;

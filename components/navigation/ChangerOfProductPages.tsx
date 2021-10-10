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
  const basePath = "/products/";

  const paginationData = pagCalc(currentPageNumber, totalItems);

  const contenders = paginationData[1].contenders;
  const current = paginationData[0];

  console.log(paginationData, totalItems);

  return (
    <div tw="flex justify-center">
      <div
        // tw="flex rounded-md mt-8"
        css={css`
          display: flex;
          border-radius: ${tw`rounded-md`};
          margin-top: 2rem;

          & .around {
            @media screen and (max-width: 500px) {
              display: none;
            }
          }

          & .current {
            border: crimson solid 2px;
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
        `}
      >
        <a
          href="#"
          tw="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-blue-500 hover:text-white"
        >
          <span className="first">{/* Previous */}</span>
        </a>
        <a
          href="#"
          tw="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-blue-500 hover:text-white"
        >
          <span className="previous">{/* Previous */}</span>
        </a>
        {contenders.map((item, i) => {
          return (
            <a
              key={`${i}-${item}`}
              className={`${item === current ? "current" : "around"}`.trim()}
              href="#"
              tw="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
            >
              <span>{item}</span>
            </a>
          );
        })}
        <a
          href="#"
          tw="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 rounded-r hover:bg-blue-500 hover:text-white"
        >
          <span className="next">{/* Next */}</span>
        </a>
        <a
          href="#"
          tw="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 rounded-r hover:bg-blue-500 hover:text-white"
        >
          <span className="last">{/* Next */}</span>
        </a>
      </div>
    </div>
  );
};

export default ChangerOfProductsPages;

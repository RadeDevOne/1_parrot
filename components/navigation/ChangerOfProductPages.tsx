/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";
import Link from "next/link";

// import type { ProductsPropsI } from "../products/Products";
import type { PropsI as IndexPagePropsI } from "@/pages/index";

export interface PropsI {
  pagination: IndexPagePropsI["paginationData"];
}

const basePath = "/products/";

const buildUrl = (pageNum: number | null, currentNum: number) => {
  if (pageNum === null) {
    return `${basePath}${currentNum}`;
  }

  if (pageNum === 0) {
    return "/";
  }

  return `${basePath}${pageNum}`;
};

const ChangerOfProductsPages: FC<PropsI> = ({ pagination }) => {
  // const paginationData = pagCalc(currentPageNumber, totalItems);

  const {
    // a__current_page_position: currPagePos,
    // b__array_of_buttons: arrOfPageSpans,
    // currentPageNumber,
    surounding_buttons_logic: buttonsAround,
    currentButtonSpan,
    highlightedPageNum,
  } = pagination;

  const { first, previousSpanPage, nextSpanPage, last } = buttonsAround;

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

            & a.disabled-anch {
              pointer-events: none;
            }

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
        <Link href={buildUrl(first, highlightedPageNum)}>
          <a
            css={[
              first !== null ? css`` : tw`pointer-events-none`,
              tw`py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-blue-500 hover:text-white`,
            ]}
          >
            <span className="first">{/* First */}</span>
          </a>
        </Link>
        <Link href={buildUrl(previousSpanPage, highlightedPageNum)}>
          <a
            css={[
              previousSpanPage !== null ? css`` : tw`pointer-events-none`,
              tw`py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-blue-500 hover:text-white`,
            ]}
          >
            <span className="previous">{/* Previous */}</span>
          </a>
        </Link>
        {currentButtonSpan.map((item, i) => {
          return (
            <Link href={`${basePath}${item}`} key={`${i}-${item}`}>
              <a
                className={`contenders ${
                  item === highlightedPageNum ? "current" : "around"
                } ${item === null ? "disabled-anch" : ""}`.trim()}
                tw="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
              >
                <span>{item}</span>
              </a>
            </Link>
          );
        })}
        <Link href={`${basePath}${nextSpanPage}`}>
          <a
            css={[
              nextSpanPage !== null ? css`` : tw`pointer-events-none`,
              tw`py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 rounded-r hover:bg-blue-500 hover:text-white`,
            ]}
          >
            <span className="next">{/* Next */}</span>
          </a>
        </Link>
        <Link href={`${basePath}${last}`}>
          <a
            css={[
              last !== null ? css`` : tw`pointer-events-none`,
              tw`py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 rounded-r hover:bg-blue-500 hover:text-white`,
            ]}
          >
            <span className="last">{/* Last */}</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ChangerOfProductsPages;

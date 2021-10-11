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

  const { first, previousSpanPage, nextSpanPage, last, next, previous } =
    buttonsAround;

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

            & a {
              ${tw`light:border-indigo-400`}
            }

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
              border: #595f75 solid 2px;
              color: #2a2c3b;
              font-weight: 500;
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

            & .previous-one {
              /*  */
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

            & .next-one {
              /*  */
            }

            & .first {
              /* @media screen and (max-width: 500px) { */
              &::after {
                display: inline;
                font-size: 0.8rem;
                font-weight: 600;
                content: "<<";
              }
              /* } */
            }

            & .last {
              /* @media screen and (max-width: 500px) { */
              &::after {
                display: inline;
                font-size: 0.8rem;
                font-weight: 600;
                content: ">>";
              }
              /* } */
            }
          `,
        ]}
      >
        <Link href={buildUrl(first !== null ? 1 : first, highlightedPageNum)}>
          <a
            css={[
              first !== null ? css`` : tw`pointer-events-none`,
              tw`flex align-middle py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-blue-500 hover:text-white`,
            ]}
          >
            <span
              className="first"
              css={[
                tw`flex align-middle my-auto`,
                first !== null ? css`` : tw`text-gray-400 light:text-gray-500`,
              ]}
            >
              {/* First */}
            </span>
          </a>
        </Link>
        <Link href={buildUrl(previousSpanPage, highlightedPageNum)}>
          <a
            css={[
              previousSpanPage !== null ? css`` : tw`pointer-events-none`,
              tw`flex align-middle py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0  hover:bg-blue-500 hover:text-white`,
            ]}
          >
            <span
              className="previous"
              css={[
                tw`flex align-middle my-auto`,
                previousSpanPage !== null
                  ? css``
                  : tw`text-gray-400 light:text-gray-500`,
              ]}
            >
              {/* Previous */}
            </span>
          </a>
        </Link>
        <Link href={buildUrl(previous, highlightedPageNum)}>
          <a
            css={[
              previous !== null ? css`` : tw`pointer-events-none`,
              tw`flex align-middle py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0  hover:bg-blue-500 hover:text-white`,
            ]}
          >
            <span
              className="previous-one"
              css={[
                tw`flex align-middle my-auto`,
                previous !== null
                  ? css``
                  : tw`text-gray-400 light:text-gray-500`,
              ]}
            >
              {/* Previous-ONE */}
            </span>
          </a>
        </Link>
        {currentButtonSpan.map((item, i) => {
          return (
            <Link
              href={item !== 0 ? `${basePath}${item}` : "/"}
              key={`${i}-${item}`}
            >
              <a
                className={`contenders ${
                  item === highlightedPageNum ? "current" : "around"
                } ${item === null ? "disabled-anch" : ""}`.trim()}
                tw="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
              >
                <span>{item === 0 ? "🏠" : item}</span>
              </a>
            </Link>
          );
        })}
        <Link href={`${basePath}${next}`}>
          <a
            css={[
              next !== null ? css`` : tw`pointer-events-none`,
              tw`flex align-middle py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 hover:bg-blue-500 hover:text-white`,
            ]}
          >
            <span
              className="next-one"
              css={[
                tw`flex align-middle my-auto`,
                next !== null ? css`` : tw`text-gray-400 light:text-gray-500`,
              ]}
            >
              {/* Next-ONE */}
            </span>
          </a>
        </Link>
        <Link href={`${basePath}${nextSpanPage}`}>
          <a
            css={[
              nextSpanPage !== null ? css`` : tw`pointer-events-none`,
              tw`flex align-middle py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 hover:bg-blue-500 hover:text-white`,
            ]}
          >
            <span
              className="next"
              css={[
                tw`flex align-middle my-auto`,
                nextSpanPage !== null
                  ? css``
                  : tw`text-gray-400 light:text-gray-500`,
              ]}
            >
              {/* Next */}
            </span>
          </a>
        </Link>
        <Link href={`${basePath}${last}`}>
          <a
            css={[
              last !== null ? css`` : tw`pointer-events-none`,
              tw`flex align-middle py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 rounded-r hover:bg-blue-500 hover:text-white`,
            ]}
          >
            <span
              className="last"
              css={[
                tw`flex align-middle my-auto`,
                last !== null ? css`` : tw`text-gray-400 light:text-gray-500`,
              ]}
            >
              {/* Last */}
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ChangerOfProductsPages;

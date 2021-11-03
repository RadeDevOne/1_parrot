/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { Favorite } from "@prisma/client";

import { useSession } from "next-auth/react";

interface PropsI {
  productId: string;
  favorite: Favorite | null;
}

const AddToFavorites: FC<PropsI> = ({ favorite, productId }) => {
  const { data, status } = useSession();

  console.log({ favorite });

  if (!data) {
    return null;
  }

  const heartColor = "#e24f68";

  return (
    <div
      css={css`
        /* background-color: ${theme`colors.electric`}; */
        /* position: absolute; */

        /* border: crimson solid 1px; */
        padding: 2px;
        /* padding-left: 12%; */
        /* display: flex; */
        /* justify-content: center; */
        /* align-items: center; */

        /* z-index: 1; */
        /* bottom: 8px; */
        /* right: 8px; */

        & button:hover {
          transform: scale(1.19);
        }

        & svg {
          stroke: ${heartColor};
        }

        & button {
          /* border: crimson solid 1px; */
          display: flex;
          align-items: center;
        }
      `}
    >
      <button
        onClick={() => {
          console.log("add to favs");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          tw="h-8 w-8"
          // fill="none"
          viewBox="0 0 24 24"
          // stroke="currentColor"
          css={[favorite && favorite.id ? tw`fill[#e24f68]` : tw`fill[none]`]}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default AddToFavorites;

/*

// empty

<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
</svg>



*/

/*

// full

<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
</svg>
 
 */

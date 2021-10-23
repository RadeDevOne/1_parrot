/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import Link from "next/link";

import useProfileMenuData from "@/hooks/useProfileMenuData";

const MobileProfileButton: FC = () => {
  const profileMenuData = useProfileMenuData();

  if (!profileMenuData) {
    return null;
  }

  const { id, name, email, image } = profileMenuData;

  return (
    <section
      css={
        [
          // tw`bg-gray-200`, tw`hover:text-indigo-600`
        ]
      }
    >
      {/*  */}
      <Link href={`/profile/${id}`}>
        <a tw="overflow-ellipsis flex flex-wrap items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
          <img
            tw="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
            src={image}
            alt={`${name} avatar`}
          />

          <div tw="mx-1 overflow-ellipsis">
            <h1 tw="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {name}
            </h1>
          </div>
          <div
            /* onClick={() => {
            console.log("hello world");
          }} */
            tw="w-full select-none overflow-ellipsis"
          >
            {email && (
              <p tw="pl-2 mt-1 overflow-ellipsis text-sm text-gray-500 dark:text-gray-400">
                {email}
              </p>
            )}
          </div>
        </a>
      </Link>
    </section>
  );
};

export default MobileProfileButton;

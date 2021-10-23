/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { Fragment } from "react";
import tw, { css, styled, theme } from "twin.macro";

import Link from "next/link";

import { useRouter } from "next/router";

import useProfileMenuData from "@/hooks/useProfileMenuData";

const MobileProfileButton: FC = () => {
  const profileMenuData = useProfileMenuData();

  const { asPath } = useRouter();

  if (!profileMenuData) {
    return null;
  }

  const { id, name, email, image } = profileMenuData;

  return (
    <Fragment>
      {!asPath.includes("/profile") && (
        <section
          css={[
            tw`flex width[fit-content] mt-1 pb-1`,
            tw`hover:text-indigo-600`,
          ]}
        >
          {/*  */}
          <hr />
          <Link href={`/profile/${id}`}>
            <a tw="hover:text-gray-500 dark:hover:text-gray-600 mt-1 overflow-ellipsis flex items-center p-3 -mt-2 text-sm text-gray-700 transition-colors duration-200 transform dark:text-gray-300">
              <div tw="pl-4">
                <img
                  tw="flex-shrink-0 object-cover ml-0 rounded-full w-9 h-9"
                  src={image}
                  alt={`${name} avatar`}
                />
              </div>

              <div tw="flex align-items[baseline] ml-0 overflow-ellipsis">
                <h1 tw="text-sm font-semibold">
                  {name}
                  {email && ":"}
                </h1>
                {email && (
                  <p tw="pl-1 mt-1 overflow-ellipsis text-sm">{email}</p>
                )}
              </div>
              <p tw="ml-0 underline w-full select-none overflow-ellipsis">
                view profile
              </p>
            </a>
          </Link>
        </section>
      )}
    </Fragment>
  );
};

export default MobileProfileButton;

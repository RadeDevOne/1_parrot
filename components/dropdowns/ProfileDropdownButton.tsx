/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useState } from "react";
import tw, { css, styled, theme } from "twin.macro";

import ProfileDropdownMenu from "./ProfileDropdownMenu";

const ProfileDropdownButton: FC = () => {
  const [dropdownOpened, setDropdownOpened] = useState<boolean>(false);

  return (
    <div tw="relative margin-top[-5px] inline-block light:bg-gray-300">
      {/* <!-- Dropdown toggle button --> */}
      <button
        onMouseDown={() => {
          setDropdownOpened((prev) => !prev);
        }}
        tw="relative z-10 flex items-center px-1 py-1 text-sm text-gray-600 bg-gray-200 border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none"
      >
        <span tw="mx-1">Jane</span>
        <svg
          tw="w-5 h-5 mx-1"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
      {dropdownOpened && <ProfileDropdownMenu />}
    </div>
  );
};

export default ProfileDropdownButton;

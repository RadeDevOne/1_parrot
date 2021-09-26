/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import useColorModeSwitcher from "@/hooks/useColorModeSwitcher";

const Header: FC = () => {
  const { toggle } = useColorModeSwitcher();

  return (
    <header
      css={[
        tw`h-16 bg-bledoliko light:bg-bledoliko dark:bg-gray-800 dark:border-b-green-200`,
      ]}
    >
      <button
        onClick={() => {
          toggle();
        }}
      >
        Mode
      </button>
    </header>
  );
};

export default Header;

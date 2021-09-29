/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { useTheme as useColorMode } from "next-themes";

import NavMenu from "./navigation/NavMenu";
import ShoppingCart from "./cart/ShoppingCart";

const Header: FC = ({ children }) => {
  const { setTheme, theme } = useColorMode();

  console.log({ theme });

  return (
    <header
      tw="overflow-hidden"
      /* css={[
        tw`h-16 bg-bledoliko light:bg-bledoliko dark:bg-gray-800 dark:border-b-green-200`,
      ]} */
    >
      {/* <button
        onClick={() => {
          // toggle();

          setTheme(theme === "light" ? "dark" : "light");
        }}
      >
        Mode
      </button> */}
      <NavMenu />
      <ShoppingCart />
      {children}
    </header>
  );
};

export default Header;

/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

const Header: FC = () => {
  return (
    <header css={[tw`h-1.5 dark:bg-gray-800`]}>
      <button>Mode</button>
    </header>
  );
};

export default Header;

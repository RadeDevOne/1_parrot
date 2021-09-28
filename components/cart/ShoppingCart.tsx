/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

const ShoppingCart: FC = () => {
  return (
    <section css={[tw`bg-gray-200`, tw`hover:text-indigo-600`]}>
      <div
        css={css`
          background-color: ${theme`colors.electric`};
        `}
      ></div>
      {/*  */}
    </section>
  );
};

export default ShoppingCart;

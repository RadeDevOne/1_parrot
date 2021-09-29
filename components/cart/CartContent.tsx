/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

const CartContent: FC = () => {
  return (
    <section
      css={[
        css`
          ${tw`border flex w-full h-full`}
        `,
      ]}
    >
      <div className="close"></div>
    </section>
  );
};

export default CartContent;

/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

const ShoppingCart: FC = () => {
  return (
    <>
      <section
        className="cart-wide"
        tw="transform-gpu xl:flex lg:flex md:flex sm:hidden hidden"
        css={css`
          border: crimson solid 2px;
          position: absolute;
          top: 0;
          height: 60vh;
          width: 100vw;
          transform: translateX(80%) translateY(5%);
        `}
      >
        <div></div>
        {/*  */}
      </section>
      <section
        className="cart-mobile"
        tw="transform-gpu flex md:hidden"
        css={css`
          border: crimson solid 2px;
          position: absolute;
          top: 46px;
          height: 60vh;
          width: 100vw;
          /* transform: translateX(-98%); */
        `}
      >
        <div></div>
      </section>
    </>
  );
};

export default ShoppingCart;

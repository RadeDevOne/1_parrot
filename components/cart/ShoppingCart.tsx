/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { motion } from "framer-motion";

import { useActor } from "@xstate/react";

import { headerNCartService, fse } from "@/machines/header_n_cart_machine";

import CartContent from "./CartContent";

const ShoppingCart: FC = () => {
  const [cartUIState, cartUIDispatch] = useActor(headerNCartService);

  return (
    <>
      <motion.section
        animate={{
          translateX: cartUIState.value === fse.cart_visible ? "0%" : "80%",
          translateY: cartUIState.value === fse.cart_visible ? "0%" : "5%",
          scale: cartUIState.value === fse.cart_visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        initial={{
          translateX: "80%",
          translateY: "5%",
          scale: 0,
        }}
        className="cart-wide"
        tw="dark:bg-gray-800 transform-gpu xl:flex lg:flex md:flex sm:hidden hidden"
        css={css`
          border: crimson solid 2px;
          position: absolute;
          top: 0;
          height: 60vh;
          width: 100vw;
          /* transform: translateX(80%) translateY(5%); */
        `}
      >
        <CartContent />
        {/*  */}
      </motion.section>
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

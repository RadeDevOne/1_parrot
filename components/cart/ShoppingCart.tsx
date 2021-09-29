/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { motion } from "framer-motion";

import { useActor } from "@xstate/react";

import { headerNCartService, fse } from "@/machines/header_n_cart_machine";

import CartContent from "./CartContent";

const ShoppingCart: FC = () => {
  const [cartUIState, cartUIDispatch] = useActor(headerNCartService);

  const cartIsVisible = cartUIState.value === fse.cart_visible;

  return (
    <>
      <motion.section
        animate={{
          translateX: cartIsVisible ? "0%" : "80%",
          translateY: cartIsVisible ? "0%" : "-100%",
          scale: cartIsVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
        }}
        initial={{
          translateX: "80%",
          translateY: "-100%",
          scale: 0,
        }}
        className="cart-wide"
        tw="light:bg-l dark:bg-gray-800 transform-gpu xl:flex lg:flex md:flex sm:hidden hidden"
        css={css`
          border: crimson solid 2px;
          position: fixed;
          top: 0;
          /* height: 60vh; */
          width: 100vw;
          height: 100vh;
          /* transform: translateX(80%) translateY(5%); */
        `}
      >
        <CartContent />
        {/*  */}
      </motion.section>
      <motion.section
        animate={{
          top: cartIsVisible ? 0 : "auto",
          height: cartIsVisible ? "100vh" : "0vh",
        }}
        transition={{
          duration: 0.2,
        }}
        initial={{
          top: "auto",
          height: "0vh",
        }}
        className="cart-mobile"
        tw="dark:bg-d light:bg-l transform-gpu flex md:hidden"
        css={css`
          /* border: crimson solid 2px; */
          position: fixed;

          width: 100vw;
          overflow: hidden;
        `}
      >
        <CartContent />
      </motion.section>
    </>
  );
};

export default ShoppingCart;

/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { useRouter } from "next/router";

import { useActor } from "@xstate/react";

import { EE, fse, cartService } from "@/machines/cart_machine";
import {
  headerNCartService,
  EE as EEE,
  fse as fsee,
} from "@/machines/header_n_cart_machine";

const CreateOrder: FC<{ foo?: "bar" }> = ({}) => {
  const [{ value, context }, dispatch] = useActor(cartService);
  const [{ value: val }, disp] = useActor(headerNCartService);

  return (
    <button
      onClick={() => {
        // console.log("hello world");
        dispatch({
          type: EE.ERASE,
        });
        disp({
          type: EEE.TOGGLE,
        });
      }}
      disabled={val === fsee.header_visible}
      type="button"
      tw="px-6 py-2 border rounded-md dark:bg-gray-400 dark:text-gray-900 dark:border-gray-400"
    >
      <span tw="sr-only sm:not-sr-only">Continue to </span>Checkout
    </button>
  );
};

export default CreateOrder;

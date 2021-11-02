/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { useActor } from "@xstate/react";

import { cartService } from "@/machines/cart_machine";

import Alert from "../alerts/Alert";

const AddedToCart: FC = () => {
  const [{ value, context }] = useActor(cartService);

  console.log({ value, context });

  return (
    //<section css={[tw`bg-gray-200`, tw`hover:text-indigo-600`]}>
    <Alert header="Hello" text="i am here" variant="success" visible />
    //</section>
  );
};

export default AddedToCart;

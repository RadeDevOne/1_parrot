/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import Alert from "../alerts/Alert";

const AddedToCart: FC = () => {
  return (
    //<section css={[tw`bg-gray-200`, tw`hover:text-indigo-600`]}>
    <Alert header="Hello" text="i am here" variant="success" visible />
    //</section>
  );
};

export default AddedToCart;

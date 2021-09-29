/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { useActor } from "@xstate/react";
import { headerNCartService, EE } from "@/machines/header_n_cart_machine";

const CartContent: FC = () => {
  const [____, dispatchHC] = useActor(headerNCartService);

  return (
    <section
      css={[
        css`
          ${tw`border flex flex-col w-full h-full`}

          & .close-btn {
            border: crimson solid 1px;
            display: flex;

            align-self: flex-end;
            width: fit-content;
            ${tw`h-8`}
          }
        `,
      ]}
    >
      <button
        className="close-btn"
        onClick={() => dispatchHC({ type: EE.TOGGLE })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          tw="h-8 w-8"
          viewBox="0 0 20 20"
          fill="crimson"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </section>
  );
};

export default CartContent;

/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

const CreateOrder: FC<{ disabled: boolean }> = ({ disabled }) => {
  return (
    <button
      disabled={disabled}
      type="button"
      tw="px-6 py-2 border rounded-md dark:bg-gray-400 dark:text-gray-900 dark:border-gray-400"
    >
      <span tw="sr-only sm:not-sr-only">Continue to </span>Checkout
    </button>
  );
};

export default CreateOrder;

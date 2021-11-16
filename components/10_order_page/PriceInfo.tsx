/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/order/[orderId]";

const PriceInfo: FC<{ prices: PropsI["sumasAndPrices"] }> = ({ prices }) => {
  //

  return (
    <section
      css={[
        tw`flex justify-center mt-8 text-3xl font-bold dark:text-gray-400 text-gray-800`,
      ]}
    >
      <span tw="drop-shadow-2xl shadow-2xl">{prices.formated.totalPrice}</span>
    </section>
  );
};

export default PriceInfo;

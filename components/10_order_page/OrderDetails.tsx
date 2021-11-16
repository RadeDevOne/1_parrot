/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/order/[orderId]";

const OrderDetails: FC<PropsI> = ({ order, sumasAndPrices }) => {
  console.log({ order, sumasAndPrices });

  return <section css={[tw`border border-__warning`]}>{/*  */}</section>;
};

export default OrderDetails;

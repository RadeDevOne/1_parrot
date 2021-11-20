/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/profile/stats/[profileId]";

interface OrderListPropsI {
  fulfiledOrders: PropsI["payedOrders"];
  pendingOrders: PropsI["pendingOrders"];
}

const OrderList: FC<OrderListPropsI> = ({ fulfiledOrders, pendingOrders }) => {
  //

  return <section css={[tw``]}></section>;
};

export default OrderList;

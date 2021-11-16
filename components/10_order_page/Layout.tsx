/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import Lorem from "@/components/dev-helpers/Lorem";
import Stringified from "@/components/dev-helpers/Stringified";
import PayPalThing from "./PayPalThing";

import type { PropsI } from "@/pages/order/[orderId]";

const Layout: FC<PropsI> = ({ order, sumasAndPrices }) => {
  const status = order.status;

  const notPayed = status === "AWAITING_PAYMENT_RESOLVEMENT";
  const payed = status === "FULFILLED";
  const orderIsPayed = notPayed === false && payed === true;

  // console.log({ favorites });

  // console.log("Place Order Page");
  // console.log({ order });

  return (
    <main css={[tw`border-electric border h-screen`, tw``]}>
      {/*  */}
      {/* {!orderIsPayed && <Stringified data={{ order, sumasAndPrices }} />} */}
      <PayPalThing order={order} sumasAndPrices={sumasAndPrices} />
    </main>
  );
};

export default Layout;

/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import Lorem from "@/components/dev-helpers/Lorem";
import Stringified from "@/components/dev-helpers/Stringified";
// import PayPalThing from "./PayPalThing";
import PaymentButtons from "./PaymentButtons";
import OrderDetails from "./OrderDetails";
import PriceInfo from "./PriceInfo";

import type { PropsI } from "@/pages/order/[orderId]";

const Layout: FC<PropsI> = (props) => {
  const { order, sumasAndPrices } = props;

  const status = order.status;

  const notPayed = status === "AWAITING_PAYMENT_RESOLVEMENT";
  const payed = status === "FULFILLED";
  const orderIsPayed = notPayed === false && payed === true;

  // console.log({ favorites });

  // console.log("Place Order Page");
  // console.log({ order });

  return (
    <main
      css={[
        tw`flex flex-col fixed right-0 bottom-0 left-0 top-14 align-content[center] align-items[center] justify-center`,
        tw``,
      ]}
    >
      {/*  */}
      {/* {!orderIsPayed && <Stringified data={{ order, sumasAndPrices }} />} */}
      {/* <PayPalThing order={order} sumasAndPrices={sumasAndPrices} /> */}
      <PriceInfo prices={sumasAndPrices} />
      <PaymentButtons order={order} sumasAndPrices={sumasAndPrices} />
      {/* <OrderDetails {...props} /> */}
    </main>
  );
};

export default Layout;

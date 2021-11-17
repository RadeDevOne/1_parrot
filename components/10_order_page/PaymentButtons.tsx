/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/order/[orderId]";
import PayPalThing from "./PayPalThing";
import PriceInfo from "./PriceInfo";

const PaymentButtons: FC<PropsI> = ({ order, sumasAndPrices }) => {
  return (
    <>
      <PriceInfo prices={sumasAndPrices} />
      <section
        css={[tw`border-__warning mt-8 px-2.5 md:mx-auto w-full md:w-96`]}
      >
        <PayPalThing order={order} sumasAndPrices={sumasAndPrices} />
      </section>
    </>
  );
};

export default PaymentButtons;

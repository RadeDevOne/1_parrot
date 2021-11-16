/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { Fragment, useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";
import { ClipLoader as Loader } from "react-spinners";
import { useRouter } from "next/router";

import axios from "axios";

// HOOK
import useLoadPayPalScript from "@/hooks/paypal/usePaypalLoadScript";
//

import type { PropsI } from "@/pages/order/[orderId]";

type PayPalThingPropsType = PropsI;

const PayPalThing: FC<PayPalThingPropsType> = ({ order, sumasAndPrices }) => {
  // TODO
  // CHECK IF ORDER IS ALREADY PAYED
  // (IN THAT CASE WE ARE NOT SHOWING ANY PAYPAL BUTTONS)
  //
  console.log({ order, sumasAndPrices });

  const { PayPalButtons, isPending, loadPayPalScript } = useLoadPayPalScript();

  const orderStatus = order.status;

  //
  //
  //
  //

  if (order.status === "FULFILLED" || order.status === "DELIVERED") {
    return null;
  }

  return (
    <section css={[tw``]}>
      {/*  */}
      {/*  */}
    </section>
  );
};

export default PayPalThing;

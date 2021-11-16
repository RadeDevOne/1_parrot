/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { Fragment, useEffect, useState } from "react";
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

  // const orderStatus = order.status;

  const { push: routerPush } = useRouter();

  const orderIsPayed =
    order.status === "FULFILLED" || order.status === "DELIVERED";

  const [canLoad, setCanLoad] = useState<boolean>(true);

  useEffect(() => {
    if (!orderIsPayed) return;

    if (!canLoad) return;

    loadPayPalScript();
    setCanLoad(false);
  }, [orderIsPayed, loadPayPalScript, setCanLoad, canLoad]);

  //
  //
  //
  //

  if (orderIsPayed) {
    return null;
  }

  return (
    <Fragment>
      {!orderIsPayed && (
        <div className="paypal-buttons">
          {isPending ? (
            <Loader size={52} color="#eed85a" />
          ) : (
            <PayPalButtons
              // THIS IS PAYPAL ORDER CREATION
              // LIKE YOU SEE THAT IS PAYPAL THING
              // SINCE WE ARE NOT USING PRISMA
              createOrder={async (__, actions) => {
                const paypalOrderId = await actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "EUR",
                        value: sumasAndPrices.totalPrice.toString(),
                      },
                    },
                  ],
                });

                return paypalOrderId;
              }}
              // ON ERROR
              onError={(err) => {
                routerPush("/payment-error");
              }}
              // HERE WE CAN ANTICIPATE PAYPAL ORDER CREATION
              // AND WE CAN SEND REQUEST CREATE PaymentResult
              // RECORD IN OUR DATBASE AND WE CAN UPDATE OUR ORDER
              // RECORD AND CONNECT PAYMENT RESULT TO IT
              onApprove={async (data, actions) => {
                //
                try {
                  //
                  //
                } catch (err) {
                  //
                  //
                }
              }}
            />
          )}
        </div>
      )}
    </Fragment>
  );
};

export default PayPalThing;

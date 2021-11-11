/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import type { Order } from "@prisma/client";

import prisma from "@/lib/prisma";

import Layout from "@/components/7_shipping_page/Layout";

import { redirectToSigninIfNoAuth } from "@/lib/intent_nav";

// TODO (USE THIS)
import validateOrder from "@/lib/auth/validateOrder";

export interface PropsI {
  order: Order;
}

export type paramsType = {
  orderId: string;
};

export const getServerSideProps: GetServerSideProps<
  PropsI | { nothing: true },
  paramsType
> = async (ctx) => {
  // const { params } = ctx;

  const redirectOptions = await redirectToSigninIfNoAuth(ctx, "/signin");

  if (redirectOptions.status === "unauthenticated") {
    return {
      props: {
        nothing: true,
      },
      redirect: redirectOptions.redirect,
    };
  }

  // WE WILL CHECK IF ORDER EXISTS
  // IF NOT WE ARE GOING TO REDIRRECT TO THE MAIN PAGE
  const order = await validateOrder(ctx);
  if (order === "unauthorized" || order === "unauthenticated") {
    return {
      props: {
        nothing: true,
      },
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

const ShippingPage: NP<PropsI> = (props) => {
  //

  console.log(props);
  // eslint-disable-next-line
  return (
    <div>
      <Layout order={props.order} />
    </div>
  );
};

export default ShippingPage;

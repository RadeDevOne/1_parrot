/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import { redirectToSigninIfNoAuth } from "@/lib/intent_nav";

// TODO (USE THIS)
import validateOrder from "@/lib/auth/validateOrder";

interface PropsI {
  placeholder: boolean;
  orderId?: string;
}

type paramsType = {
  orderId: string;
};

export const getServerSideProps: GetServerSideProps<
  PropsI | { nothing: true },
  paramsType
> = async (ctx) => {
  const { params } = ctx;

  params?.orderId; //

  // TODO
  // CHECKING AUTHENTICATION/AUTHORIZATION
  // REDIRECTING IF SOMETHING IS WRONG
  // FETCHING ORDER
  // CHECKING STATUS OF AN ORDER
  // MAKING CALCULATIONS
  // PASSING TOTAL PRICE
  // AND SUBTOTAL PRICE
  // AND SHIPPING PRICE, AND MAYBE SOME OTHER THINGS
  // NAME OF THE USER
  // AND MAYBE ALSO A ID OF AN ORDER

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

  // WE WILL CHECK IF ORDER EXISTS
  // IF NOT WE ARE GOING TO REDIRRECT TO THE MAIN PAGE
  const order = await validateOrder(ctx);
  if (order === "unauthorized" || order === "unauthenticated") {
    return {
      props: {
        nothing: true,
      },
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  if (
    order.status === "PENDING" ||
    order.status === "AWAITING_PAYMENT_METHOD" ||
    order.status === "AWAITING_ORDER_PLACEMENT"
  ) {
    return {
      props: {
        nothing: true,
      },
      redirect: {
        destination: `/shipping/${order.id}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      placeholder: true,
      orderId: params?.orderId,
    },
  };
};

const Page: NP<PropsI> = (props) => {
  //

  console.log(props);

  return <div>Order {props.orderId}</div>;
};

export default Page;

/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import Layout from "@/components/7_shipping_page/Layout";

import { redirectToSigninIfNoAuth } from "@/lib/intent_nav";

// TODO (USE THIS)
import validateOrder from "@/lib/auth/validateOrder";

export interface PropsI {
  placeholder: boolean;
}

export type paramsType = {
  orderId: string;
};

export const getServerSideProps: GetServerSideProps<PropsI, paramsType> =
  async (ctx) => {
    const { params } = ctx;

    const redirectOptions = await redirectToSigninIfNoAuth(ctx, "/signin");

    if (redirectOptions.status === "unauthenticated") {
      return {
        props: {
          nothing: true,
        },
        redirect: redirectOptions.redirect,
      };
    }

    return {
      props: {
        placeholder: true,
      },
    };
  };

const ShippingPage: NP<PropsI> = (props) => {
  //

  console.log(props);
  // eslint-disable-next-line
  return (
    <div>
      <Layout placeholder />
    </div>
  );
};

export default ShippingPage;

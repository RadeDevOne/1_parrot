/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import { redirectToSigninIfNoAuth } from "@/lib/intent_nav";

// TODO (USE THIS)
import validateOrder from "@/lib/auth/validateOrder";

import Layout from "@/components/8_payment_page/Layout";

interface PropsI {
  placeholder: boolean;
}

type paramsType = {
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

const PaymentPage: NP<PropsI> = (props) => {
  //

  console.log(props);

  return (
    <div>
      <Layout placeholder />
    </div>
  );
};

export default PaymentPage;

/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

interface PropsI {
  placeholder: boolean;
  orderId?: string;
}

type paramsType = {
  orderId: string;
};

export const getServerSideProps: GetServerSideProps<PropsI, paramsType> =
  async (ctx) => {
    const { params } = ctx;

    params?.orderId; //

    // TODO
    // CHECKING AUTHENTICATION/AUTHORIZATION
    // REDIRECTING IF SOMETHING IS WRONG
    // FETCHING ORDER
    // MAKING CALCULATIONS
    // PASSING TOTAL PRICE
    // AND SUBTOTAL PRICE
    // AND SHIPPING PRICE, AND MAYBE SOME OTHER THINGS
    // NAME OF THE USER
    // AND MAYBE ALSO A ID OF AN ORDER

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

/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

export interface PropsI {
  placeholder: boolean;
}

type paramsType = {
  siteId: string;
};

export const getServerSideProps: GetServerSideProps<PropsI, paramsType> =
  async (ctx) => {
    // const { params } = ctx;

    // params?.siteId; //

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
  return <div>🦉</div>;
};

export default ShippingPage;

/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import { getSession } from "next-auth/react";

interface PropsI {
  placeholder: boolean;
}

type paramsType = {
  siteId: string;
};

export const getServerSideProps: GetServerSideProps<PropsI, paramsType> =
  async (ctx) => {
    const session = await getSession({ req: ctx.req });

    console.log("HELLO WORLD PAGE", { session });

    /* if (session?.profile) {
      ctx.res.writeHead(302, { Location: "/profile" });

      return {
        props: {
          placeholder: false,
        },
      };
    } */

    const { params } = ctx;

    params?.siteId; //

    return {
      props: {
        placeholder: true,
      },
    };
  };

const Page: NP<PropsI> = (props) => {
  //

  console.log(props);

  return <div>Hello World Page</div>;
};

export default Page;

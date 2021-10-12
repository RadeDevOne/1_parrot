/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import { Product, Review } from "@prisma/client";

import prisma from "@/lib/prisma";

export interface PropsI {
  product:
    | (Product & {
        reviews: Review[];
      })
    | null;
}

type paramsType = {
  productId: string;
};

export const getServerSideProps: GetServerSideProps<PropsI, paramsType> =
  async (ctx) => {
    const { params } = ctx;

    params?.productId; //

    const product = await prisma.product.findUnique({
      where: {
        id: params?.productId,
      },
      include: {
        reviews: true,
      },
    });

    // console.log({ product });

    if (product === null) {
      ctx.res.writeHead(302, { Location: "/" });

      return {
        props: {
          product: null,
        },
      };
    }

    return {
      props: {
        product,
      },
    };
  };

const Page: NP<PropsI> = (props) => {
  return (
    <div>
      <pre>{JSON.stringify({ product: props.product }, null, 2)}</pre>
    </div>
  );
};

export default Page;

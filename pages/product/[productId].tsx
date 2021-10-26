/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import { useEffect } from "react";
//
import axios from "axios";
import { useSession } from "next-auth/react";
//

import { Product, Review } from "@prisma/client";

import prisma from "@/lib/prisma";

import Layout from "@/components/3_product_page/Layout";

export interface PropsI {
  product: Product & {
    reviews: (Review & {
      profile: {
        nick: string | null;
        image: string | null;
        user: {
          email: string | null;
        } | null;
      };
    })[];
  };
}

type paramsType = {
  productId: string;
};

export const getServerSideProps: GetServerSideProps<
  PropsI | { nothing: true },
  paramsType
> = async (ctx) => {
  const { params } = ctx;

  params?.productId; //

  const product = await prisma.product.findUnique({
    where: {
      id: params?.productId,
    },
    include: {
      reviews: {
        include: {
          profile: {
            select: {
              nick: true,
              image: true,
              user: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
      },
    },
  });

  // console.log({ product });

  if (product === null) {
    ctx.res.writeHead(302, { Location: "/" });

    return {
      props: {
        nothing: true,
      },
    };
  }

  return {
    props: {
      product: product,
    },
  };
};

const Page: NP<PropsI> = (props) => {
  const { data, status } = useSession();

  useEffect(() => {
    if (!data) return;

    axios.get(`/api/product/favorite/${data.profile?.id || 1}`);
  }, [data]);

  return (
    <Layout {...props}>
      {/* <pre>{JSON.stringify({ product: props.product }, null, 2)}</pre> */}
    </Layout>
  );
};

export default Page;

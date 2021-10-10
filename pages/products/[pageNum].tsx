/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import prisma from "@/lib/prisma";

import { PRODUCTS_PER_PAGE } from "@/constants/index";

import Layout from "@/components/2_products_pag_page/Layout";

export interface PropsI {
  products: {
    id: string;
    name: string;
    image: string;
    price: string;
  }[];
  totalProducts: number;
}

type paramsType = {
  pageNum: string;
};

// todo: number of pages and calculation

export const getServerSideProps: GetServerSideProps<PropsI, paramsType> =
  async (ctx) => {
    const { params } = ctx;

    console.log({ PAGENUM: params?.pageNum });

    // PAGE NUMBER
    const pageNum = parseInt(params?.pageNum || "0");

    // AND PRODUCTS PER PAGE TO DECIDE ON SKIPP VALUE
    const skipper = (pageNum - 1) * PRODUCTS_PER_PAGE;

    const products = await prisma.product.findMany({
      take: PRODUCTS_PER_PAGE,
      skip: skipper,
      select: {
        id: true,
        name: true,
        image: true,
        price: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    const totalProducts = await prisma.product.count();

    return {
      props: {
        products,
        totalProducts,
      },
    };
  };

const Page: NP<PropsI> = (props) => {
  return <Layout {...props} />;
};

export default Page;

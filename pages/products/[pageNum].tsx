/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import prisma from "@/lib/prisma";

import { PRODUCTS_PER_PAGE } from "@/constants/index";

import calcPagi from "@/util/calcPagi";

import Layout from "@/components/2_products_pag_page/Layout";

export interface PropsI {
  products: {
    id: string;
    name: string;
    image: string;
    price: string;
  }[];
  totalProducts: number;
  pagination: {
    currentPagePosition: [number, number];
    arraysOfProductSubpathNumbers: (number | null)[][];
    suroundingButtonLogic: {
      first: number | null;
      previous: number | null;
      next: number | null;
      last: number | null;
    };
    currentPageNumber: number;
  };
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

    const totalProducts = await prisma.product.count();

    const paginationData = calcPagi(pageNum, 16, 4, totalProducts);

    const pagination = {
      currentPagePosition: paginationData.a__current_page_position,
      arraysOfProductSubpathNumbers: paginationData.b__array_of_buttons,
      suroundingButtonLogic: paginationData.surounding_buttons_logic,
      currentPageNumber: paginationData.currentPageNumber,
    };

    const products = await prisma.product.findMany({
      take: PRODUCTS_PER_PAGE,
      skip: paginationData.skipper,
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

    return {
      props: {
        products,
        totalProducts,
        pagination,
      },
    };
  };

const Page: NP<PropsI> = (props) => {
  return <Layout {...props} />;
};

export default Page;

/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";
import { useEffect } from "react";
import cook from "js-cookie";

import { getSession, useSession } from "next-auth/react";

// MANUAL TESTS, TRYOUTS AND EVERYTHING ELSE YOU CAN TRY AND COMMENT OUT
import useManualTest from "../manual_tests/useManualTest";
import useSetSomeBrowserCookie from "../manual_tests/useSetSomeBrowserCookie";
//
import prisma from "@/lib/prisma";

import Layout from "@/components/1_index_page/Layout";

import { PRODUCTS_PER_PAGE } from "@/constants/index";

import calcPagi from "@/util/calcPagi";

export interface PropsI {
  products: {
    id: string;
    name: string;
    image: string;
    price: string;
    countInStock: number;
  }[];
  topRatedProducts: {
    id: string;
    name: string;
    image: string;
    price: string;
    averageRating: number;
  }[];
  totalProducts: number;
  paginationData: {
    a__current_page_position: [number, number];
    b__array_of_buttons: (number | null)[][];
    surounding_buttons_logic: {
      first: number | null;
      previousSpanPage: number | null;
      previous: number | null;
      next: number | null;
      nextSpanPage: number | null;
      last: number | null;
    };
    currentPageNumber: number;
    skip: number;
    currentButtonSpan: (number | null)[];
    highlightedPageNum: number;
  };
}

export const getServerSideProps: GetServerSideProps<PropsI> = async (ctx) => {
  // const {} = getSession({req: ctx.req})
  const sess = await getSession({ req: ctx.req });
  // sess?.profile.

  console.log({ sess });

  // INITIAL PRODUCTS
  const products = await prisma.product.findMany({
    take: PRODUCTS_PER_PAGE,
    select: {
      id: true,
      name: true,
      image: true,
      price: true,
      countInStock: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const topRatedProducts = await prisma.product.findMany({
    take: 5,
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
      averageRating: true,
    },
    orderBy: {
      averageRating: "desc",
    },
  });

  const totalProducts = await prisma.product.count();

  const paginationData = calcPagi(0, 16, 4, totalProducts);

  // console.log({ totalProducts });

  return {
    props: {
      products,
      topRatedProducts,
      totalProducts,
      paginationData,
    },
  };
};

const Page: NP<PropsI> = (props) => {
  //--------------------------------------
  // MANUAL TESTS, AND OTHER TRYOUT STUFF
  // useManualTest();
  useSetSomeBrowserCookie();
  //--------------------------------------
  // -------------------------------------

  const { data, status } = useSession();

  console.log({ data, status });

  return (
    <Layout {...props} />
    // <div>
    //   PRODUCTS:
    //   <div>{JSON.stringify(props.products, null, 2)}</div>
    //   TOP RATED PRODUCTS:
    //   <div>{JSON.stringify(props.topRatedProducts, null, 2)}</div>
    //   TOTAL PRODUCTS:
    //   <div>{props.totalProducts}</div>
    // </div>
  );
};

export default Page;

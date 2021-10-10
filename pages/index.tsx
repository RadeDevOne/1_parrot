/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import prisma from "@/lib/prisma";

import Layout from "@/components/1_index_page/Layout";

import { PRODUCTS_PER_PAGE } from "@/constants/index";

export interface PropsI {
  products: {
    id: string;
    name: string;
    image: string;
    price: string;
  }[];
  topRatedProducts: {
    id: string;
    name: string;
    image: string;
    price: string;
    averageRating: number;
  }[];
  totalProducts: number;
}

export const getServerSideProps: GetServerSideProps<PropsI> = async (ctx) => {
  // INITIAL PRODUCTS
  const products = await prisma.product.findMany({
    take: PRODUCTS_PER_PAGE,
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

  console.log({ totalProducts });

  return {
    props: {
      products,
      topRatedProducts,
      totalProducts,
    },
  };
};

const Page: NP<PropsI> = (props) => {
  //

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

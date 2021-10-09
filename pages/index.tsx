/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import prisma from "@/lib/prisma";

export interface PropsI {
  products: {
    id: string;
    name: string;
    image: string;
  }[];
  topRatedProducts: {
    name: string;
    image: string;
    price: string;
    averageRating: number;
  }[];
}

export const getServerSideProps: GetServerSideProps<PropsI> = async (ctx) => {
  // INITIAL PRODUCTS
  const products = await prisma.product.findMany({
    take: 16,
    select: {
      id: true,
      name: true,
      image: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const topRatedProducts = await prisma.product.findMany({
    take: 5,
    select: {
      name: true,
      price: true,
      image: true,
      averageRating: true,
    },
    orderBy: {
      averageRating: "desc",
    },
  });

  return {
    props: {
      products,
      topRatedProducts,
    },
  };
};

const Page: NP<PropsI> = (props) => {
  //

  return (
    <div>
      PRODUCTS:
      <div>{JSON.stringify(props.products, null, 2)}</div>
      TOP RATED PRODUCTS:
      <div>{JSON.stringify(props.topRatedProducts, null, 2)}</div>
    </div>
  );
};

export default Page;

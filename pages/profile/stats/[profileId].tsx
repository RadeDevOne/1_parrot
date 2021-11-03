/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import prisma from "@/lib/prisma";

import { getSession } from "next-auth/react";

import type { Favorite, Product } from "@prisma/client";

import type { SessStuff } from "../../../session";

import { redirectToSigninIfNoAuth } from "@/lib/intent_nav";
import validateProfille from "@/lib/auth/validateProfile";

import Layout from "@/components/6_profile_stats/Layout";

export interface PropsI {
  favorites: (Favorite & {
    product: Product;
  })[];
}

type paramsType = {
  profileId: string;
};

export const getServerSideProps: GetServerSideProps<PropsI, paramsType> =
  async (ctx) => {
    // const { params } = ctx;
    // params?.profileId; //

    const redirectOptions = await redirectToSigninIfNoAuth(ctx, "/signin");

    if (redirectOptions.status === "unauthenticated") {
      return {
        props: {
          nothing: true,
        },
        redirect: redirectOptions.redirect,
      };
    }

    const validaationResult = await validateProfille(ctx);
    if (
      validaationResult === "unauthorized" ||
      validaationResult === "unauthenticated"
    ) {
      return {
        props: {
          nothing: true,
        },
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    // HERE WE CAN TAKE PROFILE FROM SESSION
    // AND QUERY FOR FAVORITES (BUT WE NEE PRODUCTS SO WE ARE DOING JOIN)
    // SESSION IS NOT null HERE
    const session = (await getSession({ req: ctx.req })) as SessStuff;

    const favorites = await prisma.favorite.findMany({
      where: {
        profile: {
          id: session.profile?.id,
        },
      },
      include: {
        product: true,
      },
    });

    return {
      props: {
        favorites,
      },
    };
  };

const ProfileStatsPage: NP<PropsI> = (props) => {
  //

  console.log({ props });

  return (
    <main>
      <Layout {...props} />
    </main>
  );
};

export default ProfileStatsPage;

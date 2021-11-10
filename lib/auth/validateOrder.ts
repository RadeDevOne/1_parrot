import type { GetServerSidePropsContext } from "next";

import prisma from "@/lib/prisma";

import { getSession } from "next-auth/react";

import type { paramsType } from "@/pages/shipping/[orderId]";

type ReturnType = "authorized" | "unauthenticated" | "unauthorized";

/**
 *
 * @param ctx GetServerSidePropsContext
 * @returns "authorized" | "unauthenticated" | "unauthorized"
 * @description use this inside "getServerSideProps" hen you intend
 * to redirect user if he stumbbled on unauthorized page
 * (that can be order page of another user for example)
 */
const validateProfile = async (
  ctx: GetServerSidePropsContext<paramsType>
): Promise<ReturnType> => {
  // PROFILE ID FROM SESSION MUST MATCH PARAMS
  const session = await getSession({ req: ctx.req });

  if (!session) {
    // console.log("11111111111111111111111111111111111");

    return "unauthenticated";
  }
  if (!session.profile) {
    return "unauthorized";
  }

  const { id } = session.profile;

  if (!id) {
    return "unauthorized";
  }

  // THESE TWO HAVE SAME VALUE (WE WILL STICK WITH USING params)
  // const {profileId} = ctx.query;
  // const {profileId} = ctx.params;

  if (!ctx.params) {
    return "unauthenticated";
  }

  if (ctx.params && !ctx.params.orderId) {
    return "unauthorized";
  }

  if (id === ctx.params.orderId) {
    return "authorized";
  }
  // WE SHOULD NOW GET AN ORDER
  // AND CHEC IF ORDER ACTUALLYY BELONGS TO THE CURRENT PROFILE

  const order = await prisma.order.findFirst({
    where: {
      id: ctx.params.orderId,
      buyerId: id,
    },
  });

  if (order) {
    return "authorized";
  }

  return "unauthenticated";
};

export default validateProfile;

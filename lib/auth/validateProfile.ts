// WE CAN'T HAVE SCENARIO THAT WHEN WE HAVE VALID USER
// YOU SIMPLY AN NAVIGATE USER TO THE /profile/<whatever>
// WE MUST CHECK THAT WE CAN ONY RENDER PAGE OF CURRENT USER (CURRENT PROFILE)

import type { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
// import { NAV_UNAUTH_HISTORY } from "@/constants/index";

import type { paramsType } from "@/pages/profile/[profileId]";

type ReturnType = "authorized" | "unauthenticated" | "unauthorized";

/**
 *
 * @param ctx GetServerSidePropsContext
 * @returns "authorized" | "unauthenticated" | "unauthorized"
 * @description use this inside "getServerSideProps" hen you intend
 * to redirect user if he stumbbled on unauthorized page
 * (that can be profile page of another user for example)
 */
const validateProfile = async (
  ctx: GetServerSidePropsContext<paramsType>
): Promise<ReturnType> => {
  // PROFILE ID FROM SESSION MUST MATCH PARAMS
  const session = await getSession({ req: ctx.req });

  if (!session) {
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

  if (ctx.params && !ctx.params.profileId) {
    return "unauthorized";
  }

  if (id === ctx.params.profileId) {
    return "authorized";
  }

  return "unauthenticated";
};

export default validateProfile;

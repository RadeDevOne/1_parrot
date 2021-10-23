// WE CAN'T HAVE SCENARIO THAT WHEN WE HAVE VALID USER
// YOU SIMPLY AN NAVIGATE USER TO THE /profile/<whatever>
// WE MUST CHECK THAT WE CAN ONY RENDER PAGE OF CURRENT USER (CURRENT PROFILE)

import type { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { NAV_UNAUTH_HISTORY } from "@/constants/index";

const validateProfile = (ctx: GetServerSidePropsContext) => {
  // const session =
  //
  //
  //
};

export default validateProfile;

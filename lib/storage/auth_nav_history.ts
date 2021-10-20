// METHODS TO HELP WHEN UNAUTHENTICATED USER REQUESTS PAGE THAT REQUIRE AUTH
// HE SHOULD BE REDIRECTED TO THE signin PAGE
// BUT AFTER SIGNIN HE SHOULD BE REDIRECTED TO THE PAGE HE REQUESTED

// JUST TO KNOW
// import { signIn, useSession } from "next-auth/react";
// WITH SECOND ARGUMENT OF signIn YOU CAN DEFINE ROUTE TO BE
// NAVIGATED ON SUCCESSFULL SIGNIN
// https://next-auth.js.org/getting-started/client#specifying-a-callbackurl

import cook from "js-cookie";

import { NAV_HISTORY } from "@/constants/index";

const basePath = process.env.NEXTAUTH_URL;

export const getNavHistory = () => {
  const navHistory = cook.get(NAV_HISTORY);

  if (!navHistory?.startsWith("/")) {
    throw new Error("Pth needs to start with `/`");
  }

  return navHistory;
};

export const setNavHistory = (path: string) => {
  if (!path.startsWith("/")) {
    throw new Error("Your path should start with `/`");
  }

  return cook.set(NAV_HISTORY, path);
};

/**
 *
 * @description run this after navigation to protected page happens
 */
export const clearNavHistory = () => {
  return cook.remove(NAV_HISTORY);
};

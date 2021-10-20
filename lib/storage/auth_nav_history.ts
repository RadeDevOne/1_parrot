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

// const basePath = process.env.NEXTAUTH_URL;

/**
 *
 * @description getting string in format http<>
 */
export const getNavHistory = () => {
  const navHistory = cook.get(NAV_HISTORY);

  if (!navHistory?.startsWith("http")) {
    throw new Error("Path needs to start with `http`");
  }

  return navHistory;
};

/**
 *
 * @param path in format http<>
 * @returns string | undefined
 */
export const setNavHistory = (path: string) => {
  if (!path.startsWith("http")) {
    throw new Error("Your path should start with `http`");
  }

  return cook.set(NAV_HISTORY, path);
};

/**
 *
 * @description run this after navigation to protected page happens,
 * when navigation is successful
 */
export const clearNavHistory = () => {
  return cook.remove(NAV_HISTORY);
};

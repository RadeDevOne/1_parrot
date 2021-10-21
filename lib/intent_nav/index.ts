import type { GetServerSidePropsContext, Redirect } from "next";

import { getSession } from "next-auth/react";

import anh from "../storage/auth_nav_history";

/**
 *
 * @param absPath absolute path of the protected route user wanted
 * to initialy navigate
 */
export const setUserIntentNav = (absPath: string) => {
  //
  return anh.setNavHistory(absPath);
};

//
// THIS IS GOING TO BE NO OP
/**
 *
 * @decrription NO-OP because path we are passing into signIn function as a
 * callbackUrl  is going to be the path we need instead of path that this method provides
 */
export const redirectToUserIntentNav = (ctx: GetServerSidePropsContext) => {
  //
  const navHist = anh.getNavHistory();

  if (navHist === undefined) return;

  ctx.res?.writeHead(302, { Location: navHist });
};

/**
 *
 * @param ctx GetServerSidePropsContext
 * @description redirecting to the signin page if user isn't authenticated
 */
export const redirectToSigninIfNoAuth = async (
  ctx: GetServerSidePropsContext
) => {
  //
  const session = await getSession({ req: ctx.req });

  if (session) return null;

  const redirect: Redirect = {
    destination: "/signin",
    permanent: false,
  };

  return redirect;
};

/**
 *
 * @param ctx GetServerSidePropsContext
 * @description redirecting to the signin page if user isn't authorized
 */
const redirectIfNotAuthorized = async (ctx: GetServerSidePropsContext) => {
  //
};

import type { GetServerSidePropsContext, Redirect } from "next";
import type { Role } from "@prisma/client";

import { getSession } from "next-auth/react";

import cookie from "cookie";

import { NAV_HISTORY } from "@/constants/index";

// PROTECTED PAGE SHOUD PASS URL FROM ITS PROPS
//

/**
 *
 * @param absPath GetServerSidePropsContext
 */
export const buildUnAuthHistoryPathCookieData = (
  ctx: GetServerSidePropsContext
) => {
  const resolvedUrl = ctx.resolvedUrl;

  let path: string;

  if (resolvedUrl.includes("?") && resolvedUrl.includes("=")) {
    //

    const index = resolvedUrl.indexOf("?");

    const substring = resolvedUrl.slice(0, index);

    path = substring;
  } else {
    path = resolvedUrl;
  }

  console.log({ path });

  // WE WILL BULD httpOnly COOKIE
  // ON UNAUTHORIZED PAGE
  // BUT ON signin PAGE WE ARE GOING TO TAKE THAT COOKIE
  // AND PASS IT AS SERVER SIDE PROP

  const cookies = ctx.req.cookies;

  console.log({ cookies });

  return path;
};

//

/**
 *
 * @param ctx GetServerSidePropsContext
 * @param redirectTo string (must start with "/")
 * @param authorization optional {role: Role} IF USER ISN'T THIS ROLE IT SHOULD BE REDIRRECTED
 * @description redirecting to the `redirectTo` page if user isn't authenticated
 *
 */
export const redirectToSigninIfNoAuth = async (
  ctx: GetServerSidePropsContext,
  redirectTo: string,
  authorization?: {
    role: Role;
  }
): Promise<
  | {
      status: "unauthenticated";
      redirect: Redirect;
    }
  | {
      // redirect: undefined;
      status: "authenticated";
    }
> => {
  if (!redirectTo.startsWith("/")) {
    throw new Error('"redirectTo" argument must start with "/"');
  }

  //
  const session = await getSession({ req: ctx.req });

  /* 
  console.log("session && authorization && authorization.role");
  console.log(session && authorization && authorization.role);
  */

  if (session && authorization && authorization.role) {
    const { profile } = session;

    if (profile?.role === authorization.role) {
      // AUTHENTICATED AND AUTHORIZED
      return { status: "authenticated" };
    }

    const redirect: Redirect = {
      destination: redirectTo,
      permanent: false,
    };

    return {
      redirect,
      status: "unauthenticated",
    };
  }

  // AUTHENTICATED
  if (session) {
    return { status: "authenticated" };
  }

  const redirect: Redirect = {
    destination: redirectTo,
    permanent: false,
  };

  return { redirect, status: "unauthenticated" };
};

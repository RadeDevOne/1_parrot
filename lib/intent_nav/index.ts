import type { GetServerSidePropsContext, Redirect } from "next";
import type { Role } from "@prisma/client";

import { getSession } from "next-auth/react";

import cookie from "cookie";

/**
 *
 * @param absPath absolute path of the protected route user wanted
 * to initialy navigate (it must start with "http" or "https")
 */
export const setNavHistoryCookie = (absPath: string) => {
  if (!absPath.startsWith("http")) {
    throw new Error("path must start with http");
  }

  //
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

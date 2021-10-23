/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import prisma from "@/lib/prisma";

import { redirectToSigninIfNoAuth } from "@/lib/intent_nav";

import validateProfille from "@/lib/auth/validateProfile";

interface PropsI {
  placeholder: boolean;
}

export type paramsType = {
  profileId: string;
};

export const getServerSideProps: GetServerSideProps<
  PropsI | { nothing: true },
  paramsType
> = async (ctx) => {
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

  // REDIRECTING AND SETTING THE COOKIE IF THERE IS NO
  // AUTHENTICATED USER
  const redirectOptions = await redirectToSigninIfNoAuth(ctx, "/signin");

  if (redirectOptions.status === "unauthenticated") {
    return {
      props: {
        nothing: true,
      },
      redirect: redirectOptions.redirect,
    };
  }

  return {
    props: {
      placeholder: true,
    },
  };
};

const ProfilePage: NP<PropsI> = (props) => {
  //

  console.log(props);

  return <div>Profile</div>;
};

export default ProfilePage;

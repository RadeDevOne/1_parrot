/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import prisma from "@/lib/prisma";

import { redirectToSigninIfNoAuth } from "@/lib/intent_nav";

import validateProfille from "@/lib/auth/validateProfile";

import Layout from '@/components/5_profile_page/Layout'


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

  // THIS GOES AFTER BECAUSE HERE WE EXPECT TO HAVE profile
  // WE EXPECT THAT CASE WHEN USER IS SIGNED IN BUT
  // TRIES TO GO TO PROFILE PAGE OF ANOTHER USER
  // WE ARE PREVENTING THAT THING ITH THIS FUNCTION
  // BECAUSE ONLY USER WHO IS SIGNED IN SHOUD ONLY
  // BE ABLE TO SEE HIS OWN PROFILE
  // AND NOT THE OTHER PROFILES
  // ------------------------------------------------------
  // TO TEST IF THIS WORKS, SIGN IN AN GO TO
  // RANDOM PROFILE PAGE FOR EXAMPLE
  // "/profile/<random>"
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
  // -------------------------------------------------------

  return {
    props: {
      placeholder: true,
    },
  };
};

const ProfilePage: NP<PropsI> = (props) => {
  //

  console.log(props);

  return <Layout />;
};

export default ProfilePage;

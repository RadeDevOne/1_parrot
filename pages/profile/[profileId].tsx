/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

// import { getSession } from "next-auth/react";

// import cookie from "cookie";

import { redirectToSigninIfNoAuth } from "@/lib/intent_nav";

interface PropsI {
  placeholder: boolean;
}

type paramsType = {
  siteId: string;
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

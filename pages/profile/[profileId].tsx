/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import { getSession } from "next-auth/react";

import cookie from "cookie";

import { buildUnAuthHistoryPathCookieData } from "@/lib/intent_nav";

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
  //
  const query = ctx.query;
  const paramz = ctx.params;
  const resolvedUrl = ctx.resolvedUrl;
  const defaultLocale = ctx.defaultLocale;
  const locale = ctx.locale;
  const locales = ctx.locales;

  console.log(
    // JSON.stringify(
    {
      query,
      params: paramz,
      resolvedUrl,
      defaultLocale,
      locale,
      locales,
    },
    null,
    2
    // )
  );

  console.log(buildUnAuthHistoryPathCookieData(ctx));

  /* const session = await getSession({ req: ctx.req });

  const headers = ctx.req.headers;

  const cookies = ctx.req.cookies;

  console.log({ session, headers, cookies });

  console.log({ session, headers });

  const parsedCart = JSON.parse(ctx.req.cookies.CART);

  console.log({ parsedCart }); */

  /*   if(!session){

      return {props: {
        nothing: true
      }}
    } */

  const { params } = ctx;

  params?.siteId; //

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

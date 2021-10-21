/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";
// import { buildUnAuthHistoryPathCookie } from "@/lib/intent_nav";

interface PropsI {
  placeholder: boolean;
}

type paramsType = {
  argz: string[];
};

export const getServerSideProps: GetServerSideProps<PropsI, paramsType> =
  async (ctx) => {
    const params = ctx.params?.argz;

    const query = ctx.query;
    // const paramz = ctx.params;
    const resolvedUrl = ctx.resolvedUrl;
    const defaultLocale = ctx.defaultLocale;
    const locale = ctx.locale;
    const locales = ctx.locales;

    console.log(
      // JSON.stringify(
      {
        query,
        params,
        resolvedUrl,
        defaultLocale,
        locale,
        locales,
      },
      null,
      2
      // )
    );

    // console.log(buildUnAuthHistoryPathCookie(ctx));

    return {
      props: {
        placeholder: true,
      },
    };
  };

const Page: NP<PropsI> = (props) => {
  //

  console.log(props);

  return <div>Hello argz baz</div>;
};

export default Page;

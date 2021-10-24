/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import Lorem from "@/components/dev-helpers/Lorem";

interface PropsI {
  placeholder: boolean;
}

type paramsType = {
  profileId: string;
};

export const getServerSideProps: GetServerSideProps<PropsI, paramsType> =
  async (ctx) => {
    const { params } = ctx;

    params?.profileId; //

    return {
      props: {
        placeholder: true,
      },
    };
  };

const ProfileStatsPage: NP<PropsI> = (props) => {
  //

  console.log({ props });

  return (
    <main>
      {/* eslint-disable-next-line */}
      <h1>🦉 Profile Stats</h1>
      Helo world
      <h2 style={{ color: "blanchedalmond" }} id="favorites">
        Favorites
      </h2>
      <Lorem />
      <h2 style={{ color: "blanchedalmond" }} id="purchases">
        Past Purchases
      </h2>
      <Lorem />
    </main>
  );
};

export default ProfileStatsPage;

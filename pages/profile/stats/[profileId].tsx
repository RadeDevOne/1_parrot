/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

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

  console.log(props);

  // eslint-disable-next-line
  return <div>🦉 Profile Stats</div>;
};

export default ProfileStatsPage;

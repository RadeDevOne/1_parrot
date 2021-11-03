/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/profile/stats/[profileId]";

import Lorem from "@/components/dev-helpers/Lorem";

import Favorites from "@/components/favorites/Favorites";

const Layout: FC<PropsI> = ({ favorites }) => {
  // console.log({ favorites });

  return (
    <main css={[tw``, tw``]}>
      {/* eslint-disable-next-line */}
      <h1>🦉 Profile Stats</h1>
      Helo World
      <h2 style={{ color: "blanchedalmond" }} id="favorites">
        Favorites
      </h2>
      <Favorites favorites={favorites} />
      <h2 style={{ color: "blanchedalmond" }} id="purchases">
        Past Purchases
      </h2>
    </main>
  );
};

export default Layout;

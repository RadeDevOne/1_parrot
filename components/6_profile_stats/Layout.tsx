/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/profile/stats/[profileId]";

import Lorem from "@/components/dev-helpers/Lorem";

const Layout: FC<PropsI> = () => {
  return (
    <main css={[tw``, tw``]}>
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

export default Layout;

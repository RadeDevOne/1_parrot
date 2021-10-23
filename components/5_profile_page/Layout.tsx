/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import ProfileView from "../profile/ProfileView";

const Layout: FC = ({ children }) => {
  return (
    <main>
      <ProfileView />
      {/*  */}
      {children}
      {/*  */}
    </main>
  );
};

export default Layout;

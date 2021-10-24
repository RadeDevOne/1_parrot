/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/profile/[profileId]";

import ProfileView from "../profile/ProfileView";

const Layout: FC<PropsI> = ({ children, profile }) => {
  return (
    <main>
      <ProfileView profile={profile} />
      {/*  */}
      {children}
      {/*  */}
    </main>
  );
};

export default Layout;

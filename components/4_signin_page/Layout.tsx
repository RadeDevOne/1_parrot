/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

// import type { PropsI } from "@/pages/product/[productId]";

import SignInForm from "../auth/SignInForm";

const Layout: FC = ({ children }) => {
  console.log("signin layout");

  return (
    <main>
      {children}
      <SignInForm />

      {/*  */}
    </main>
  );
};

export default Layout;

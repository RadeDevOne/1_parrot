/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

const Layout: FC = ({ children }) => {
  return (
    <main>
      {children}
      {/* <Alert
        visible={true}
        header="Hello world"
        text="You are informed"
        variant="info"
      /> */}
    </main>
  );
};

export default Layout;

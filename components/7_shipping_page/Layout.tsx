/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/shipping";

import Lorem from "@/components/dev-helpers/Lorem";

import ShipPayOrdBreadcrumbs from "@/components/breadcrumbs/ShipPayOrdBreadcrumbs";

const Layout: FC<PropsI> = ({ children }) => {
  // console.log({ favorites });

  return (
    <main css={[tw``, tw``]}>
      <ShipPayOrdBreadcrumbs />
    </main>
  );
};

export default Layout;

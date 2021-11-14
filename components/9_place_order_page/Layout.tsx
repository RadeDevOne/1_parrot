/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/place-order/[orderId]";

import Lorem from "@/components/dev-helpers/Lorem";

import ShipPayOrdBreadcrumbs from "@/components/breadcrumbs/ShipPayOrdBreadcrumbs";

const Layout: FC<PropsI> = ({ order }) => {
  // console.log({ favorites });

  console.log("Place Order Page")
  console.log({order})


  return (
    <main css={[tw``, tw``]}>
      <ShipPayOrdBreadcrumbs orderId={order.id} />
    </main>
  );
};

export default Layout;

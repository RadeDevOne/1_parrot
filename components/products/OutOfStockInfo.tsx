/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { Fragment } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { useRouter } from "next/router";

import Info from "../info/Info";
import Button from "../buttons/Button";

interface PropsI {
  countInStock: number;
}

const OutOfStock: FC<PropsI> = ({ countInStock }) => {
  const { back } = useRouter();

  return (
    <Fragment>
      {countInStock === 0 && (
        <section css={[tw`px-2`]}>
          <Info variant="blue" boldText="Out Of Stock">
            We will replenis this product very soon.{" "}
            <span tw="inline-block">In the maean time you can: </span>
            <span tw="inline-block ml-1 mt-4">
              <Button
                onClick={() => {
                  back();
                }}
                variant="primary"
                size="small"
              >
                check our other products
              </Button>
            </span>
          </Info>
        </section>
      )}
    </Fragment>
  );
};

export default OutOfStock;

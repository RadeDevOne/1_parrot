/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

const AfterPaymentView: FC = () => {
  return (
    <section css={[tw``]}>
      <div
        css={css`
          background-color: ${theme`colors.electric`};
        `}
      >
        Hello World
      </div>
      {/*  */}
    </section>
  );
};

export default AfterPaymentView;

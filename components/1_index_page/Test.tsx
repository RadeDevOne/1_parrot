/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled } from "twin.macro";

const StyledTwDiv = tw.div`

  border hover:border-b-gray-900

`;

const TestComponent: FC = () => {
  return (
    <section css={[tw`bg-gray-200`, tw`hover:bg-green-400`]}>
      <div
        css={css`
          border: crimson solid 1px;
          & h1 {
            font-size: 2em;
          }
          & p {
            color: #421f35;
          }
        `}
      >
        <h1>Test</h1>
        <p>Lorem ipsum</p>
        <StyledTwDiv>Hello World</StyledTwDiv>
      </div>
    </section>
  );
};

export default TestComponent;

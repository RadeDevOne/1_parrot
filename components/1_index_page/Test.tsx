/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tm, { css, styled } from "twin.macro";

const TestComponent: FC = () => {
  return (
    <section className="bg-green">
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
      </div>
    </section>
  );
};

export default TestComponent;

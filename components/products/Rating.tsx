/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

const Rating: FC<{ value: number }> = ({ value }) => {
  const five = new Array(5).fill(1);

  return (
    <section css={[tw`bg-gray-200`, tw`hover:text-indigo-600`]}>
      <div tw="flex items-center mt-1 mb-0.5">
        {five.map((one, i) => {
          // console.log({ value });

          return (
            <svg
              key={`${i}-${one}`}
              css={[
                value > i ? tw`text-yellow-600` : tw`text-gray-400`,
                tw`w-4 h-4 fill-current`,
              ]}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          );
        })}
      </div>
    </section>
  );
};

export default Rating;

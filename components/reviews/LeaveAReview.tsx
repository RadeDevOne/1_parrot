/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

const LeaveAReview: FC = () => {
  return (
    // <section css={[tw`width[86vw] mx-auto md:width[420px] mt-8 mb-4`]}>

    <section tw="mt-10 mx-2 md:w-full max-w-2xl px-6 py-4 md:mx-auto bg-__secondary_dark rounded-md shadow-md dark:bg-gray-800">
      <h2 tw="text-3xl font-semibold text-center text-gray-800 dark:text-white">
        Rate Our Product
      </h2>
      <div tw="flex justify-center items-center">
        <div tw="flex items-center mt-6 mb-4">
          <svg
            tw="mx-1 w-6 h-6 fill-current text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <svg
            tw="mx-1 w-6 h-6 fill-current text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <svg
            tw="mx-1 w-6 h-6 fill-current text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <svg
            tw="mx-1 w-6 h-6 fill-current text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <svg
            tw="mx-1 w-6 h-6 fill-current text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        </div>
      </div>

      <div tw="mt-6 ">
        <div tw="w-full mt-4">
          <label
            htmlFor="comment"
            tw="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
          >
            And Leave A Review
          </label>

          <textarea
            id="comment"
            name="comment"
            tw="block w-full h-40 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          ></textarea>
        </div>

        <div tw="flex justify-center mt-6">
          <button tw="px-4 py-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
            Submit
          </button>
        </div>
      </div>
    </section>
    // {/* </section> */}
  );
};

export default LeaveAReview;

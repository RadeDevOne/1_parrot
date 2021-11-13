/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

const PickPayment: FC = () => {
  return (
    <div tw="bg-gray-200">
      <div tw="flex flex-col items-center justify-center h-screen">
        <div tw="flex flex-col">
          <label tw="inline-flex items-center mt-3">
            <input type="radio" tw="h-5 w-5 text-green-600" />
            <span tw="ml-2 text-gray-700">label</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PickPayment;

/*

<div tw="bg-gray-200">
    <div tw="flex flex-col items-center justify-center h-screen">
        <div tw="flex flex-col">
            <label tw="inline-flex items-center mt-3">
                <input type="checkbox" tw="h-5 w-5 text-gray-600" / /><span tw="ml-2 text-gray-700">label</span>
            </label>

            <label tw="inline-flex items-center mt-3">
                <input type="checkbox" tw="h-5 w-5 text-red-600" / /><span tw="ml-2 text-gray-700">label</span>
            </label>

            <label tw="inline-flex items-center mt-3">
                <input type="checkbox" tw="h-5 w-5 text-orange-600" / /><span tw="ml-2 text-gray-700">label</span>
            </label>

            <label tw="inline-flex items-center mt-3">
                <input type="checkbox" tw="h-5 w-5 text-yellow-600" / /><span tw="ml-2 text-gray-700">label</span>
            </label>

            <label tw="inline-flex items-center mt-3">
                <input type="checkbox" tw="h-5 w-5 text-green-600" / /><span tw="ml-2 text-gray-700">label</span>
            </label>

            <label tw="inline-flex items-center mt-3">
                <input type="checkbox" tw="h-5 w-5 text-teal-600" / /><span tw="ml-2 text-gray-700">label</span>
            </label>

            <label tw="inline-flex items-center mt-3">
                <input type="checkbox" tw="h-5 w-5 text-blue-600" / /><span tw="ml-2 text-gray-700">label</span>
            </label>

            <label tw="inline-flex items-center mt-3">
                <input type="checkbox" tw="h-5 w-5 text-indigo-600" / /><span tw="ml-2 text-gray-700">label</span>
            </label>

            <label tw="inline-flex items-center mt-3">
                <input type="checkbox" tw="h-5 w-5 text-purple-600" / /><span tw="ml-2 text-gray-700">label</span>
            </label>

            <label tw="inline-flex items-center mt-3">
                <input type="checkbox" tw="h-5 w-5 text-pink-600" / /><span tw="ml-2 text-gray-700">label</span>
            </label>
        </div>
    </div>
</div>


 */

/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

const Summary: FC = () => {
  return (
    <section css={[tw`mt-24`]}>
      <div tw="grid grid-cols-3">
        <div tw="rounded-t-md dark:bg-gray-700 bg-l pb-6 col-span-3 lg:col-span-1 lg:mx-2 mx-4">
          <h1 tw=" py-6 border-b-2 text-xl text-gray-600 px-8">
            Order Summary
          </h1>
          <ul tw="py-6 border-b space-y-6 px-8">
            <li tw="grid grid-cols-6 gap-2 border-b-2">
              <div tw="col-span-1 self-center">
                <img
                  src="https://bit.ly/3oW8yej"
                  alt="Product"
                  tw="rounded w-full"
                />
              </div>
              <div tw="flex flex-col col-span-3 pt-2">
                <span tw="text-gray-600 text-lg font-semibold">
                  Studio 2 Headphone
                </span>
                <span tw="text-gray-400 text-sm inline-block pt-2">
                  Red Headphone
                </span>
              </div>
              <div tw="col-span-2 pt-3">
                <div tw="flex items-center space-x-2 text-sm justify-between">
                  <span tw="text-gray-400">2 x €30.99</span>
                  <span tw="text-pink-400 font-semibold inline-block">
                    €61.98
                  </span>
                </div>
              </div>
            </li>
            <li tw="grid grid-cols-6 gap-2 border-b-2">
              <div tw="col-span-1 self-center">
                <img
                  src="https://bit.ly/3lCyoSx"
                  alt="Product"
                  tw="rounded w-full"
                />
              </div>
              <div tw="flex flex-col col-span-3 pt-2">
                <span tw="text-gray-600 text-lg font-semibold">
                  Apple iPhone 13
                </span>
                <span tw="text-gray-400 text-sm inline-block pt-2">Phone</span>
              </div>
              <div tw="col-span-2 pt-3">
                <div tw="flex items-center space-x-2 text-sm justify-between">
                  <span tw="text-gray-400">1 x €785</span>
                  <span tw="text-pink-400 font-semibold inline-block">
                    €785
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <div tw="px-8 border-b">
            <div tw="flex justify-between py-4 text-gray-600">
              <span>Subtotal</span>
              <span tw="font-semibold text-pink-500">€846.98</span>
            </div>
            <div tw="flex justify-between py-4 text-gray-600">
              <span>Shipping</span>
              <span tw="font-semibold text-pink-500">Free</span>
            </div>
          </div>
          <div tw="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
            <span>Total</span>
            <span>€846.98</span>
          </div>
        </div>
        <div tw="pb-8 lg:col-span-2 col-span-3 space-y-8 lg:px-12 overflow-x-hidden">
          <div tw="rounded-2xl lg:mx-2 mx-4 mt-8">
            <section tw="rounded-md dark:bg-gray-700 bg-__secondary_dark p-6">
              <h2 tw="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                Shipping & Billing Information
              </h2>
              <fieldset tw="mb-3 shadow-lg rounded text-gray-600">
                <label tw="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span tw="text-right px-2">Name</span>
                  <input
                    name="name"
                    tw="focus:outline-none px-3"
                    placeholder="Try Odinsson"
                    required={true}
                  />
                </label>
                <label tw="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span tw="text-right px-2">Email</span>
                  <input
                    name="email"
                    type="email"
                    tw="focus:outline-none px-3"
                    placeholder="try@example.com"
                    required={true}
                  />
                </label>
                <label tw="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span tw="text-right px-2">Address</span>
                  <input
                    name="address"
                    tw="focus:outline-none px-3"
                    placeholder="10 Street XYZ 654"
                  />
                </label>
                <label tw="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span tw="text-right px-2">City</span>
                  <input
                    name="city"
                    tw="focus:outline-none px-3"
                    placeholder="San Francisco"
                  />
                </label>
                <label tw="inline-flex w-2/4 border-gray-200 py-3">
                  <span tw="text-right px-2">State</span>
                  <input
                    name="state"
                    tw="focus:outline-none px-3"
                    placeholder="CA"
                  />
                </label>
                <label tw="xl:w-1/4 xl:inline-flex py-3 items-center flex xl:border-none border-t border-gray-200 py-3">
                  <span tw="text-right px-2 xl:px-0 ">ZIP</span>
                  <input
                    name="postal_code"
                    tw="focus:outline-none px-3"
                    placeholder="98603"
                  />
                </label>
                <label tw="flex border-t border-gray-200 h-12 py-3 items-center relative">
                  <span tw="text-right px-2">Country</span>
                  <div
                    id="country"
                    tw="focus:outline-none px-3 w-full flex items-center"
                  >
                    <select
                      name="country"
                      tw="border-none bg-transparent flex-1 cursor-pointer appearance-none focus:outline-none"
                    >
                      <option value="AU">Australia</option>
                      <option value="BE">Belgium</option>
                      <option value="BR">Brazil</option>
                      <option value="CA">Canada</option>
                      <option value="CN">China</option>
                      <option value="DK">Denmark</option>
                      <option value="FI">Finland</option>
                      <option value="FR">France</option>
                      <option value="DE">Germany</option>
                      <option value="HK">Hong Kong</option>
                      <option value="IE">Ireland</option>
                      <option value="IT">Italy</option>
                      <option value="JP">Japan</option>
                      <option value="LU">Luxembourg</option>
                      <option value="MX">Mexico</option>
                      <option value="NL">Netherlands</option>
                      <option value="PL">Poland</option>
                      <option value="PT">Portugal</option>
                      <option value="SG">Singapore</option>
                      <option value="ES">Spain</option>
                      <option value="TN">Tunisia</option>
                      <option value="GB">United Kingdom</option>
                      <option value="US" selected={true}>
                        United States
                      </option>
                    </select>
                  </div>
                </label>
              </fieldset>
            </section>
          </div>
          <div tw="rounded-md lg:mx-2 mx-4">
            <section tw="rounded-md dark:bg-gray-700 bg-__secondary_dark">
              <h2 tw="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                Payment Information
              </h2>
              <fieldset tw=" dark:bg-gray-700 bg-__secondary_dark  mb-3 shadow-lg rounded text-gray-600">
                <label tw="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span tw="text-right px-2">Card</span>
                  <input
                    name="card"
                    tw="focus:outline-none px-3 w-full"
                    placeholder="Card number MM/YY CVC"
                    required={true}
                  />
                </label>
              </fieldset>
            </section>
          </div>
          <button tw="px-4 py-3 rounded-full bg-pink-400 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors">
            Pay €846.98
          </button>
        </div>
      </div>
    </section>
  );
};

export default Summary;

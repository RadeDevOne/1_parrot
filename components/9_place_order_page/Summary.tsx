/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

const Summary: FC = () => {
  return (
    <section css={[tw``]}>
      <div tw="h-screen grid grid-cols-3">
        <div tw="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12">
          <div tw="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
            <div tw="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
              <div tw="text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  tw="w-6 sm:w-5 h-6 sm:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div tw="text-sm font-medium ml-3">Checkout</div>
            </div>
            <div tw="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">
              Complete your shipping and payment details below.
            </div>
            <div tw="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
              <svg
                tw="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
          </div>
          <div tw="rounded-md">
            <form id="payment-form" method="POST" action="">
              <section>
                <h2 tw="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                  Shipping & Billing Information
                </h2>
                <fieldset tw="mb-3 bg-white shadow-lg rounded text-gray-600">
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
            </form>
          </div>
          <div tw="rounded-md">
            <section>
              <h2 tw="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                Payment Information
              </h2>
              <fieldset tw="mb-3 bg-white shadow-lg rounded text-gray-600">
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
        <div tw="col-span-1 bg-white lg:block hidden">
          <h1 tw="py-6 border-b-2 text-xl text-gray-600 px-8">Order Summary</h1>
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
      </div>
    </section>
  );
};

export default Summary;

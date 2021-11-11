/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useState, Fragment } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { Profile } from "@prisma/client";

import { useSession } from "next-auth/react";

const ShippingBillingForm: FC<{ initialProfilleInfo: Profile }> = ({
  initialProfilleInfo,
}) => {
  const { data, status } = useSession();

  if (!data) {
    return null;
  }
  if (!data.profile) {
    return null;
  }

  const { id, nick, role } = data.profile;

  //
  return (
    <div tw="leading-loose flex justify-center">
      <form tw="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
        <p tw="text-gray-800 font-medium">Customer information</p>
        <div tw="">
          <label tw="block text-sm text-gray-50" htmlFor="cus_name">
            Name
          </label>
          <input
            tw="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
            id="cus_name"
            name="cus_name"
            type="text"
            required
            placeholder="Your Name"
            aria-label="Name"
          />
        </div>
        <div tw="mt-2">
          <label tw="block text-sm text-gray-600" htmlFor="cus_email">
            Email
          </label>
          <input
            tw="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
            id="cus_email"
            name="cus_email"
            type="text"
            required
            placeholder="Your Email"
            aria-label="Email"
          />
        </div>
        <div tw="mt-2">
          <label tw=" block text-sm text-gray-600" htmlFor="cus_email">
            Address
          </label>
          <input
            tw="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            id="cus_email"
            name="cus_email"
            type="text"
            required
            placeholder="Street"
            aria-label="Email"
          />
        </div>
        <div tw="mt-2">
          <label tw="hidden text-sm block text-gray-600" htmlFor="cus_email">
            City
          </label>
          <input
            tw="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            id="cus_email"
            name="cus_email"
            type="text"
            required
            placeholder="City"
            aria-label="Email"
          />
        </div>
        <div tw="inline-block mt-2 w-1/2 pr-1">
          <label tw="hidden block text-sm text-gray-600" htmlFor="cus_email">
            Country
          </label>
          <input
            tw="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            id="cus_email"
            name="cus_email"
            type="text"
            required
            placeholder="Country"
            aria-label="Email"
          />
        </div>
        <div tw="inline-block mt-2 -mx-1 pl-1 w-1/2">
          <label tw="hidden block text-sm text-gray-600" htmlFor="cus_email">
            Zip
          </label>
          <input
            tw="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            id="cus_email"
            name="cus_email"
            type="text"
            required
            placeholder="Zip"
            aria-label="Email"
          />
        </div>
        {/* <p tw="mt-4 text-gray-800 font-medium">Payment information</p> */}
        {/* <div tw="">
          <label tw="block text-sm text-gray-600" htmlFor="cus_name">
            Card
          </label>
          <input
            tw="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            id="cus_name"
            name="cus_name"
            type="text"
            required
            placeholder="Card Number MM/YY CVC"
            aria-label="Name"
          />
        </div> */}
        <div tw="mt-4">
          <button
            tw="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
            type="submit"
          >
            $3.00
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingBillingForm;

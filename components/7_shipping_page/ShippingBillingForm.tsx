/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC, ChangeEventHandler } from "react";
import { useState, Fragment } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { Profile } from "@prisma/client";

import { useSession } from "next-auth/react";

import countries from "../../countries_n_states/1_countries.json";
import states from "../../countries_n_states/2_states.json";

const ShippingBillingForm: FC<{ initialProfilleInfo: Profile }> = ({
  initialProfilleInfo,
}) => {
  const { data, status } = useSession();
  // console.log({ initialProfilleInfo });

  const [bodyData, setBodyData] =
    useState<typeof initialProfilleInfo>(initialProfilleInfo);

  if (!data) {
    return null;
  }
  if (!data.profile) {
    return null;
  }

  const {
    nick: name,
    email,
    streetAddress,
    city,
    country,
    postalCode,
    regionOrState,
  } = bodyData;

  console.log({ bodyData });

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const {
      target: { name: inputName, value: inputValue },
    } = e;
    // @ts-ignore
    handleBodyDataChange(inputName, inputValue);
  };

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const {
      target: { name: selName, value: selValue },
    } = e;
    // @ts-ignore
    handleBodyDataChange(selName, selValue);
  };

  //
  return (
    <div tw="leading-loose flex justify-center mt-28">
      <form
        css={[
          css`
            /*  */
          `,

          tw`dark:bg-gray-800 bg-l max-w-xl m-4 p-10 rounded shadow-xl`,
        ]}
      >
        <p tw="text-gray-800 font-medium">Customer information</p>
        <div tw="">
          <label tw="block text-sm" htmlFor="nick">
            Name
          </label>
          <input
            tw="w-full px-5 py-2 rounded"
            id="nick"
            name="nick"
            type="text"
            required
            placeholder="Your Name"
            aria-label="Name"
          />
        </div>
        <div tw="mt-2">
          <label tw="block text-sm" htmlFor="email">
            Email
          </label>
          <input
            tw="w-full px-5  py-2 rounded"
            id="email"
            name="email"
            type="text"
            required
            placeholder="Your Email"
            aria-label="Email"
          />
        </div>
        <div tw="mt-2">
          <label tw=" block text-sm" htmlFor="streetAddress">
            Address
          </label>
          <input
            tw="w-full px-2 py-2 rounded"
            id="streetAddress"
            name="streetAddress"
            type="text"
            required
            placeholder="Street"
            aria-label="Email"
          />
        </div>
        <div tw="mt-2">
          <label tw="hidden text-sm block" htmlFor="city">
            City
          </label>
          <input
            tw="w-full px-2 py-2 rounded"
            id="city"
            name="city"
            type="text"
            required
            placeholder="City"
            aria-label="City"
          />
        </div>
        <div tw="inline-block mt-2 w-1/2 pr-1">
          <label tw="hidden block text-sm" htmlFor="country">
            Country
          </label>
          <select
            tw="w-full px-2 py-3 rounded"
            id="country"
            name="country"
            required
            placeholder="Country"
            aria-label="Country"
          >
            {countries.map((item, i) => {
              return (
                <option key={`${i}-${item.iso2}`} value={item.iso2}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <div tw="inline-block mt-2 -mx-1 pl-1 w-1/2">
          <label tw="hidden block text-sm" htmlFor="postalCode">
            Zip
          </label>
          <input
            tw="w-full px-2 py-2 rounded"
            id="postalCode"
            name="postalCode"
            type="text"
            required
            placeholder="Zip"
            aria-label="Zip"
          />
        </div>
        <div tw="mt-2">
          <label tw="hidden block text-sm" htmlFor="state">
            State
          </label>
          <select
            tw="w-full px-2 py-3 rounded"
            id="state"
            name="state"
            required
            placeholder="State"
            aria-label="State"
          >
            {states.map((item, i) => {
              return (
                <option key={`${i + item.state_code}`} value={item.state_code}>
                  {item.name}
                </option>
              );
            })}
          </select>
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
            tw="mt-8 px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingBillingForm;

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

  const [bodyData, setBodyData] = useState<{
    nick: string;
    email: string;
    streetAddress: string;
    city: string;
    country: string;
    postalCode: string;
    regionOrState: string;
  }>({
    nick: initialProfilleInfo.nick || "",
    email: initialProfilleInfo.email || "",
    city: initialProfilleInfo.city || "",
    country: initialProfilleInfo.country || "",
    postalCode: initialProfilleInfo.postalCode || "",
    regionOrState: initialProfilleInfo.regionOrState || "",
    streetAddress: initialProfilleInfo.streetAddress || "",
  });

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

  const handleBodyDataChange = (name: string, value: string) =>
    setBodyData((prev) => ({ ...prev, [name]: value }));

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const {
      target: { name: inputName, value: inputValue },
    } = e;

    handleBodyDataChange(inputName, inputValue);
  };

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const {
      target: { name: selName, value: selValue },
    } = e;

    handleBodyDataChange(selName, selValue);
  };

  //
  return (
    <div tw="leading-loose flex justify-center mt-28">
      <form
        css={[
          css`
            /*  */

            & input {
              /* ${tw`border dark:border-gray-200 border-gray-800`}; */

              ${tw`dark:text-gray-700 dark:placeholder-gray-600 light:text-gray-800 font-family["FiraMono"] overflow-ellipsis`}

              &:-webkit-autofill,
                        &:-webkit-autofill:hover {
                ${tw`dark:-webkit-text-fill-color[#b3bed8] -webkit-text-fill-color[#32343f]`};
                ${tw`dark:-webkit-box-shadow[0 0 0px 1000px #2f314b inset] -webkit-box-shadow[0 0 0px 1000px #c7d5df inset]`};
                border-radius: 0px;
              }
            }

            & select {
              ${tw`dark:text-gray-50 dark:placeholder-gray-600 light:text-gray-800 font-family["FiraMono"] light:bg-gray-400 bg-gray-500`}

              /*  appearance: none;
                        // Additional resets for further consistency
                        background-color: transparent;
                        border: none;
                        padding: 0 1em 0 0;
                        margin: 0;
                        width: 100%;
                        font-size: inherit;
                        cursor: inherit;
                        line-height: inherit; */

                        & option {
                ${tw`dark:bg-gray-800 bg-l  dark:border-l border-gray-800`}
                /* border: crimson solid 1px; */
                          font-size: 16px;
                border-top: crimson solid 1px;
              }
            }

            & textarea:-webkit-autofill,
            & textarea:-webkit-autofill:hover,
            & textarea:-webkit-autofill:focus,
            & select:-webkit-autofill,
            & select:-webkit-autofill:hover,
            & select:-webkit-autofill:focus {
              ${tw`dark:-webkit-text-fill-color[#b3bed8] -webkit-text-fill-color[#32343f]`};
              ${tw`dark:-webkit-box-shadow[0 0 0px 1000px #2f314b inset] -webkit-box-shadow[0 0 0px 1000px #c7d5df inset]`};
              border-radius: 0px;
            }

            & label {
              ${tw`dark:text-gray-50`}
            }
          `,

          tw`dark:bg-gray-700 bg-l max-w-xl m-4 p-10 rounded shadow-xl`,
        ]}
      >
        <p tw="dark:text-gray-400 font-medium">Customer information</p>
        <div tw="">
          <label tw="block text-sm" htmlFor="nick">
            Name
          </label>
          <input
            onChange={handleInputChange}
            value={bodyData.nick}
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
            onChange={handleInputChange}
            value={bodyData.email}
            tw="w-full px-5  py-2 rounded"
            id="email"
            name="email"
            type="email"
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
            onChange={handleInputChange}
            value={bodyData.streetAddress}
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
            onChange={handleInputChange}
            value={bodyData.city}
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
            onChange={handleSelectChange}
            onBlur={handleSelectChange}
            value={bodyData.country}
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
            onChange={handleInputChange}
            value={bodyData.postalCode}
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
            onChange={handleSelectChange}
            onBlur={handleSelectChange}
            value={bodyData.regionOrState}
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

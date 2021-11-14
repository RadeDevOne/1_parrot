/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { Fragment, useState } from "react";
import tw, { css, styled, theme } from "twin.macro";
import type { Order, PaymentProvider } from "@prisma/client";

import CreditCardIcon from "@/svgs/inline/CreditCard.svg";

const PickPayment: FC<{ order: Order }> = ({ order }) => {
  const [paymentProvider, setPaymentProvider] =
    useState<PaymentProvider | null>(null);

  const paymentMethod: { value: PaymentProvider; available: boolean }[] = [
    { value: "PayPal", available: true },
    { value: "Stripe", available: false },
  ];

  const nonAvailable: { value: PaymentProvider; available: boolean }[] = [];

  return (
    <div
      css={[
        tw`rounded-sm shadow-lg mx-auto p-16 dark:bg-gray-700 bg-gray-300 md:width[460px] width[80vw]`,
        css`
          & {
            transition-property: background-color;
            transition-duration: 1s;

            --form-control-color: #2d4b5f;

            & input[type="radio"] {
              /* Add if not using autoprefixer */
              -webkit-appearance: none;
              /* Remove most all native input styles */
              appearance: none;
              /* For iOS < 15 */
              /* background-color: var(--form-control-color); */
              /* Not removed via appearance */
              margin: 0;

              font: inherit;
              color: currentColor;
              width: 1.15em;
              height: 1.15em;
              border-width: 0.15em;
              border-style: solid;
              ${tw`dark:border-color[yellow] border-color[#4036cc]`};
              border-radius: 50%;
              transform: translateY(-0.075em);

              display: grid;
              place-content: center;
            }

            & input[type="radio"]::before {
              content: "";
              width: 0.65em;
              height: 0.65em;
              border-radius: 50%;
              transform: scale(0);
              transition: 120ms transform ease-in-out;

              ${tw`dark:box-shadow[inset 1em 1em #2baf99]`};

              box-shadow: inset 1em 1em #153a69;
              /* Windows High Contrast Mode */
              background-color: CanvasText;
            }

            & input[type="radio"]:checked::before {
              transform: scale(1);
            }

            & input[type="radio"]:focus {
              ${tw`dark:outline[max(2px, 0.15em) solid #2baf99]`};

              outline: max(2px, 0.15em) solid #153a69;
              outline-offset: max(2px, 0.15em);
            }
          }
        `,

        tw`mt-28 border-__primary`,
      ]}
    >
      <h2 tw="dark:text-gray-400 font-medium text-center text-xl">
        Select Your Payment Method:
      </h2>
      <div
        css={[
          css`
            ${tw`-left-5 md:left-0`}

            position: relative;
            top: -26.9px;
            height: 180px;
            padding: 0;
            /* border: pink solid 2px; */
            width: fit-content;
            margin: 0 auto;
          `,
        ]}
      >
        <CreditCardIcon />
      </div>
      {paymentMethod.map(({ available, value }, i) => {
        //
        //
        //
        //

        if (!available) {
          nonAvailable.push({ available, value });
        }

        return (
          <Fragment key={i + value}>
            {available && (
              <div tw="mt-6 flex flex-col items-center justify-center">
                <div tw="width[120px]  border-__primary_outline_focus">
                  <label tw="flex align-items[center] mt-3">
                    <input
                      type="radio"
                      tw="h-5 w-5"
                      value={value}
                      name={value}
                      onChange={(e) => {
                        console.log({ e });
                        e.target.checked = true;
                      }}
                      onBlur={(e) => {
                        console.log({ e });
                        e.target.checked = false;
                      }}
                    />
                    <span tw="ml-5 margin-bottom[4px] dark:text-gray-200">
                      {value}
                    </span>
                  </label>
                </div>
              </div>
            )}
          </Fragment>
        );
      })}
      <h2 tw="dark:text-gray-300  font-normal text-align[center] mb-6 mt-12">
        Soon To Be Available:
      </h2>
      {nonAvailable.map(({ available, value }, i) => {
        return (
          <div
            key={i + value + available}
            tw="mt-6 flex flex-col items-center justify-center"
          >
            <div tw="width[120px]  border-__primary_outline_focus">
              <label tw="flex align-items[center] mt-3">
                <input
                  disabled={true}
                  type="radio"
                  tw="h-5 w-5"
                  name={value}
                  value={value}
                  onChange={(e) => {
                    console.log({ e });
                    e.target.checked = true;
                  }}
                  onBlur={(e) => {
                    console.log({ e });
                    e.target.checked = false;
                  }}
                />
                <span tw="ml-5 margin-bottom[4px] dark:text-gray-200">
                  {value}
                </span>
              </label>
            </div>
          </div>
        );
      })}
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
                <input type="checkbox" tw="h-5 w-5" / /><span tw="ml-2 text-gray-700">label</span>
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

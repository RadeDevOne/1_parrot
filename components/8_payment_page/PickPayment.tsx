/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { Fragment, useState } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { Order, PaymentProvider } from "@prisma/client";

const PickPayment: FC<{ order: Order }> = ({ order }) => {
  const [paymentProvider, setPaymentProvider] =
    useState<PaymentProvider | null>(null);

  const paymentMethod: { value: PaymentProvider; available: boolean }[] = [
    { value: "PayPal", available: true },
    { value: "Stripe", available: false },
  ];

  return (
    <div
      css={[
        css`
          & {
            --form-control-color: rebeccapurple;

            & input[type="radio"] {
              /* Add if not using autoprefixer */
              -webkit-appearance: none;
              /* Remove most all native input styles */
              appearance: none;
              /* For iOS < 15 */
              /* background-color: var(--); */
              /* Not removed via appearance */
              margin: 0;

              font: inherit;
              color: currentColor;
              width: 1.15em;
              height: 1.15em;
              border: 0.15em solid currentColor;
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
              box-shadow: inset 1em 1em purple;
              /* Windows High Contrast Mode */
              background-color: CanvasText;
            }

            & input[type="radio"]:checked::before {
              transform: scale(1);
            }

            & input[type="radio"]:focus {
              outline: max(2px, 0.15em) solid currentColor;
              outline-offset: max(2px, 0.15em);
            }
          }
        `,

        tw`mt-28 border border-__primary`,
      ]}
    >
      <h2 tw="dark:text-gray-400 font-medium text-xl ml-10 mb-20">
        Select Your Payment Method
      </h2>
      {paymentMethod.map(({ available, value }, i) => (
        <div
          key={i + value}
          tw="border border-__hazard mt-6 flex flex-col items-center justify-center"
        >
          <div tw="width[120px] border border-__primary_outline_focus">
            <label tw="flex align-items[center] mt-3">
              <input
                type="radio"
                tw="h-5 w-5"
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
      ))}
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

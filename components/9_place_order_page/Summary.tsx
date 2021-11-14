/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { ExpectedDataProps as PropsI } from "@/pages/place-order/[orderId]";

import {
  calculatePriceWithoutShipping,
  calculateTotalPrice,
  getItemWithQuantityAndPrice,
} from "@/lib/order/calculateOrderPrice";
import formatPrice from "@/util/formatPrice";

import countries from "../../countries_n_states/3_countries_by_key.json";
import states from "../../countries_n_states/3_countries_by_key.json";
//

const Summary: FC<PropsI> = ({ order }) => {
  if (!order) {
    return null;
  }

  //
  //
  const shippingPrice = order.shippingPrice;
  const totalPrice = calculateTotalPrice(order);
  const priceWithoutShipping = calculatePriceWithoutShipping(order);

  const buyerKeys = [
    "nick",
    "email",
    "country",
    "regionOrState",
    "city",
    "streetAddress",
    "postalCode",
  ];
  const lables = {
    nick: "Name",
    email: "Email",
    country: "Country",
    regionOrState: "State",
    city: "City",
    streetAddress: "Address",
    postalCode: "ZIP",
  };
  //
  //
  return (
    <section css={[tw`mt-24`]}>
      <div tw="grid grid-cols-3">
        <div tw="rounded-t-md dark:bg-gray-700 bg-__secondary_dark pb-6 col-span-3 lg:col-span-1 lg:mx-2 mx-4">
          <h1 tw=" py-6 border-b-2 text-xl text-gray-600 px-8">
            Order Summary
          </h1>
          <ul tw="py-6 border-b space-y-6 px-8">
            {order.items.map((item, i) => {
              return (
                <li
                  key={i + item.id}
                  tw="relative -left-3.5   grid grid-cols-6 gap-2 border-b-2"
                >
                  <div tw="col-span-1 self-center">
                    <img
                      src={item.product.image}
                      alt={"Product: " + item.product.name}
                      tw="rounded w-full"
                    />
                  </div>
                  <div tw="flex flex-col col-span-3 pt-2">
                    <span tw="text-gray-600 text-sm font-semibold">
                      {item.product.name}
                    </span>
                    {/* <span tw="text-gray-400 text-sm inline-block pt-2">
                  Red Headphone
                </span> */}
                  </div>
                  <div tw="col-span-2 pt-3">
                    <div tw="flex items-center space-x-2 text-sm justify-between">
                      <span tw="text-gray-400">
                        {item.quantity} x{" "}
                        {formatPrice(item.product.price, "EUR")}
                      </span>
                      <span tw="text-pink-400 font-semibold inline-block">
                        {formatPrice(
                          getItemWithQuantityAndPrice(item).amount,
                          "EUR"
                        )}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div tw="px-8 border-b">
            <div tw="flex justify-between py-4 text-gray-600">
              <span>Subtotal</span>
              <span tw="font-semibold text-pink-500">
                {formatPrice(priceWithoutShipping, "EUR")}
              </span>
            </div>
            <div tw="flex justify-between py-4 text-gray-600">
              <span>Shipping</span>
              <span tw="font-semibold text-pink-500">
                {formatPrice(shippingPrice, "EUR")}
              </span>
            </div>
          </div>
          <div tw="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
            <span>Total</span>
            <span>{formatPrice(totalPrice, "EUR")}</span>
          </div>
        </div>
        <div tw="pb-8 lg:col-span-2 col-span-3 space-y-8 lg:px-12 overflow-x-hidden">
          <div tw="rounded-2xl lg:mx-2 mx-4 mt-8">
            <section tw="rounded-md dark:bg-gray-700 bg-__secondary_dark p-6">
              <h2 tw="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                Shipping & Billing Information
              </h2>
              <div tw="mb-3 shadow-lg rounded text-gray-600">
                {buyerKeys.map((key) => {
                  // @ts-ignore
                  const v: string = order.buyer[key];
                  // @ts-ignore
                  const l: string = lables[key];
                  // @ts-ignore
                  let value = l === "Country" ? countries[v]["name"] : v;
                  // @ts-ignore
                  value =
                    v === "US" && l === "State" ? states[v]["name"] : value;

                  if (v !== "US" && l === "State") {
                    return null;
                  }

                  return (
                    <span
                      key={key}
                      tw="flex border-b border-gray-200 h-12 py-3 items-center"
                    >
                      <span>{l}</span>
                      <span tw="ml-auto">{value}</span>
                    </span>
                  );
                })}
              </div>
            </section>
          </div>
          <div tw="rounded-md lg:mx-2 mx-4">
            <section tw="p-6 rounded-md dark:bg-gray-700 bg-__secondary_dark">
              <h2 tw="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                Payment Method
              </h2>
              <fieldset tw=" dark:bg-gray-700 bg-__secondary_dark  mb-3 shadow-lg rounded text-gray-600">
                <label tw="flex border-gray-200 h-12 py-3 items-center">
                  <span tw="text-right px-2">{order.paymentMethod}</span>
                </label>
              </fieldset>
            </section>
          </div>
          <div tw="flex justify-center">
            <button tw="px-4 width[220px] mx-auto py-3 rounded-full bg-pink-400 text-white focus:ring focus:outline-none text-xl font-semibold transition-colors">
              Place An Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Summary;

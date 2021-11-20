/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/profile/stats/[profileId]";

interface OrderListPropsI {
  fulfiledOrders: PropsI["payedOrders"];
  pendingOrders: PropsI["pendingOrders"];
}

const OrderList: FC<OrderListPropsI> = ({ fulfiledOrders, pendingOrders }) => {
  //
  console.log({ fulfiledOrders, pendingOrders });

  return (
    <section css={[tw``]}>
      <h3
        id="purchases"
        tabIndex={-1}
        tw="ml-4 mt-10 light:text-gray-700 dark:text-gray-200 text-2xl font-medium"
      >
        Your Orders
      </h3>

      <div tw="container flex flex-col mx-auto w-full items-center justify-center">
        <ul tw="flex flex-col">
          <li tw="border-gray-400 flex flex-row mb-2">
            <div tw="shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
              <div tw="flex flex-col w-10 h-10 justify-center items-center mr-4">
                <a href="#" tw="block relative">
                  <img
                    alt="profil"
                    src="/images/person/6.jpg"
                    tw="mx-auto object-cover rounded-full h-10 w-10 "
                  />
                </a>
              </div>
              <div tw="flex-1 pl-1 md:mr-16">
                <div tw="font-medium dark:text-white">Jean Marc</div>
                <div tw="text-gray-600 dark:text-gray-200 text-sm">
                  Developer
                </div>
              </div>
              <div tw="text-gray-600 dark:text-gray-200 text-xs">6:00 AM</div>
              <button tw="w-24 text-right flex justify-end">
                <svg
                  width="12"
                  fill="currentColor"
                  height="12"
                  tw="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                </svg>
              </button>
            </div>
          </li>
          <li tw="border-gray-400 flex flex-row mb-2">
            <div tw="shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
              <div tw="flex flex-col w-10 h-10 justify-center items-center mr-4">
                <a href="#" tw="block relative">
                  <img
                    alt="profil"
                    src="/images/person/10.jpg"
                    tw="mx-auto object-cover rounded-full h-10 w-10 "
                  />
                </a>
              </div>
              <div tw="flex-1 pl-1 md:mr-16">
                <div tw="font-medium dark:text-white">Designer</div>
                <div tw="text-gray-600 dark:text-gray-200 text-sm">
                  Charlie Moi
                </div>
              </div>
              <div tw="text-gray-600 dark:text-gray-200 text-xs">6:00 AM</div>
              <button tw="w-24 text-right flex justify-end">
                <svg
                  width="12"
                  fill="currentColor"
                  height="12"
                  tw="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                </svg>
              </button>
            </div>
          </li>
          <li tw="border-gray-400 flex flex-row mb-2">
            <div tw="shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
              <div tw="flex flex-col w-10 h-10 justify-center items-center mr-4">
                <a href="#" tw="block relative">
                  <img
                    alt="profil"
                    src="/images/person/3.jpg"
                    tw="mx-auto object-cover rounded-full h-10 w-10 "
                  />
                </a>
              </div>
              <div tw="flex-1 pl-1 md:mr-16">
                <div tw="font-medium dark:text-white">CEO</div>
                <div tw="text-gray-600 dark:text-gray-200 text-sm">
                  Marine Jeanne
                </div>
              </div>
              <div tw="text-gray-600 dark:text-gray-200 text-xs">6:00 AM</div>
              <button tw="w-24 text-right flex justify-end">
                <svg
                  width="12"
                  fill="currentColor"
                  height="12"
                  tw="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                </svg>
              </button>
            </div>
          </li>
          <li tw="border-gray-400 flex flex-row mb-2">
            <div tw="shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
              <div tw="flex flex-col w-10 h-10 justify-center items-center mr-4">
                <a href="#" tw="block relative">
                  <img
                    alt="profil"
                    src="/images/person/7.jpg"
                    tw="mx-auto object-cover rounded-full h-10 w-10 "
                  />
                </a>
              </div>
              <div tw="flex-1 pl-1 md:mr-16">
                <div tw="font-medium dark:text-white">CTO</div>
                <div tw="text-gray-600 dark:text-gray-200 text-sm">
                  Boby PArk
                </div>
              </div>
              <div tw="text-gray-600 dark:text-gray-200 text-xs">6:00 AM</div>
              <button tw="w-24 text-right flex justify-end">
                <svg
                  width="12"
                  fill="currentColor"
                  height="12"
                  tw="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                </svg>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default OrderList;

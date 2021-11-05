/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC, ChangeEventHandler, SyntheticEvent } from "react";
import { useState, useEffect, Fragment } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { motion } from "framer-motion";

import Link from "next/link";

import useProfData from "@/hooks/useProfileMenuData";

import Spinner from "../common/Spinner";

import type { PropsI } from "@/pages/profile/[profileId]";

import countries from "../../countries_n_states/1_countries.json";
import states from "../../countries_n_states/2_states.json";

import InvalidDataAlert from "../alerts/Alert";

import type {ResData as ResponseDataType, BodyDataTypeI} from '@/pages/api/profile/[profileId]'

type profType = PropsI["profile"];

interface UserDataI extends profType {
  email: string;
}

const ProfileView: FC<PropsI> = ({
  profile,
  fulfilledOrdersCount,
  favoritesCount,
}) => {
  console.log({ profile });

  const sessionData = useProfData();

  /*  const [profileData, setProfileData] = useState<UserDataI>({
    ...profile,
    email: (sessionData ? sessionData?.email : "") || "",
  }); */

  const [sanitizedProfileData, setSanitizedProfileData] = useState<UserDataI>({
    //
    ...profile,
    // WE DEFINED THIS AS nick (BUT THIS SHOULD BE FULL NAME
    // SO WE WILL ASK FOR FULL NAME)
    nick: sessionData?.name || profile?.nick || "",
    image: sessionData?.image || profile?.image || "",
    email: sessionData?.email || profile?.email || "",
    city: profile.city || "",
    country: profile.country || "",
    postalCode: profile.postalCode || "",
    streetAddress: profile.streetAddress || "",
  });

  /* useEffect(() => {
    setSanitizedProfileData((prev) => ({
      ...prev,
      // WE DEFINED THIS AS nick (BUT THIS SHOULD BE FULL NAME
      // SO WE WILL ASK FOR FULL NAME)
      nick: prev.nick || sessionData?.name || "",
      image: prev.image || sessionData?.image || "",
    }));
  }, [sessionData, setSanitizedProfileData]); */

  // ----------------------             ----------------------
  const [bodyData, setBodyData] = useState<BodyDataTypeI>({
    country: "",
    email: "",
    name: "",
    postalCode: "",
    streetAddress: "",
    regionOrState: ""
  })
  // ----------------------------------------------------------

  if (!sessionData) {
    return null;
  }

  if (sessionData.authStatus === "loading") {
    return <Spinner />;
  }

  if (!profile) {
    return null;
  }

  if (!profile.id) {
    return null;
  }

  // console.log({ sanitizedProfileData });
  // console.log({ countries });
  // console.log({ states });
  // console.log({ sessionData });

  const {
    city,
    country,
    email,
    image,
    nick: name,
    streetAddress,
    postalCode,
    regionOrState,
    id,
  } = sanitizedProfileData;

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const {
      target: { name: inputName, value: inputValue },
    } = e;

    setSanitizedProfileData((prev) => ({ ...prev, [inputName]: inputValue }));
  };

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const {
      target: { name: inputName, value: inputValue },
    } = e;

    setSanitizedProfileData((prev) => ({ ...prev, [inputName]: inputValue }));
  };

  return (
    <Fragment>
      <div tw="pt-16 mb-32">
        <div tw="w-full lg:w-4/12 px-4 mx-auto">
          <div
            css={[
              css`
                transition-property: background-color;
                transition-duration: 600ms;
              `,
              tw`relative flex flex-col min-w-0 break-words bg-gray-800 light:bg-l w-full mb-6 shadow-xl rounded-lg mt-16`,
            ]}
          >
            <div tw="px-6">
              <div tw="flex flex-wrap justify-center">
                <div
                  css={[
                    css`
                      background-image: linear-gradient(
                        103.3deg,
                        #484257 12%,
                        rgba(252, 225, 208, 1) 30%,
                        rgba(255, 173, 214, 1) 52.7%,
                        rgba(162, 186, 245, 1) 71.8%,
                        #353e53 92.8%
                      );
                    `,
                    tw`w-full h-2 px-4 flex justify-center rounded-b-2xl`,
                  ]}
                >
                  <div
                    css={[
                      css`
                        transition-property: transform;
                        transition-duration: 0.3s;

                        &:hover {
                          transform: scale(1.2);
                        }
                      `,
                      tw`relative flex justify-center`,
                    ]}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <img
                      alt="..."
                      // src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                      src={
                        sessionData?.image ||
                        profile?.image ||
                        "https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                      }
                      tw="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16  max-width[110px]"
                    />
                  </div>
                </div>
                <div
                  css={[
                    css`
                      & a {
                        user-select: none;

                        & span:hover {
                          color: #bd768e;
                        }
                      }
                      & span {
                        user-select: none;
                      }
                    `,
                    tw`w-full px-4 text-center mt-20`,
                  ]}
                >
                  <div tw="flex justify-center py-4 lg:pt-4 pt-8">
                    {
                      fulfilledOrdersCount > 0 ? (
                        <Link href={`/profile/stats/${id}${"#purchases"}`}>
                          <a>
                            <div tw="mr-4 p-3 text-center">
                              <span tw="text-xl font-bold block uppercase tracking-wide text-gray-900 dark:text-gray-100">
                                {fulfilledOrdersCount}
                              </span>
                              <span tw="text-sm text-gray-400 light:text-gray-600">
                                Purchases
                              </span>
                            </div>
                          </a>
                        </Link>
                      ) : (
                        //   <Link
                        //   href={`/profile/stats/${"bitcoinether"}${"#purchases"}`}
                        // >
                        <span>
                          <div tw="mr-4 p-3 text-center">
                            <span tw="text-xl font-bold block uppercase tracking-wide text-gray-900 dark:text-gray-100">
                              0
                            </span>
                            <span tw="text-sm text-gray-400 light:text-gray-600">
                              Purchases
                            </span>
                          </div>
                        </span>
                      )
                      // </Link>
                    }
                    {favoritesCount > 0 ? (
                      <Link href={`/profile/stats/${id}${"#favorites"}`}>
                        <a>
                          <div tw="mr-4 p-3 text-center">
                            <span tw="text-xl font-bold block uppercase tracking-wide text-gray-900 dark:text-gray-100">
                              {favoritesCount}
                            </span>
                            <span tw="text-sm text-gray-400 light:text-gray-600">
                              Favorites
                            </span>
                          </div>
                        </a>
                      </Link>
                    ) : (
                      <span>
                        <div tw="mr-4 p-3 text-center">
                          <span tw="text-xl font-bold block uppercase tracking-wide text-gray-900 dark:text-gray-100">
                            0
                          </span>
                          <span tw="text-sm text-gray-400 light:text-gray-600">
                            Favorites
                          </span>
                        </div>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div tw="text-center mt-12">
                <h3 tw="text-xl font-semibold leading-normal dark:text-gray-300 text-gray-900 mb-2">
                  {sessionData?.name || profile?.nick || ""}
                </h3>
                <h3 tw="text-sm leading-normal underline mt-0 mb-2 dark:text-gray-200 light:text-gray-800">
                  {sessionData?.email ||
                    (profile?.email && (
                      <i>
                        {/* <i tw="mr-2 text-lg text-gray-600"></i> */}
                        {sessionData?.email || profile?.email || ""}
                      </i>
                    ))}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* SHIPPING BILLING AND REST OF STUFF */}
        <section tw="mt-8 rounded-md w-full lg:w-6/12 px-4 mx-auto mb-12">
          <form
            id="payment-form"
            method="POST"
            action=""
            css={[
              css`
                &#payment-form#payment-form {
                  & input {
                    background-color: inherit;
                  }
                }
              `,
            ]}
          >
            <section
              className="info-fieldz"
              css={[
                css`
                  &.info-fieldz.info-fieldz.info-fieldz.info-fieldz {
                    border: crimson solid 0px;

                    overflow-x: hidden;
                    /* background: ${theme`colors.l`}; */

                    & label > span {
                      ${tw`dark:text-gray-400 light:text-gray-600`}
                    }

                    & input {
                      /* ${tw`border dark:border-gray-200 border-gray-800`}; */

                      ${tw`dark:text-gray-50 dark:placeholder-gray-600 light:text-gray-800 font-family["FiraMono"] overflow-ellipsis`}

                      &:-webkit-autofill,
                    &:-webkit-autofill:hover {
                        ${tw`dark:-webkit-text-fill-color[#b3bed8] -webkit-text-fill-color[#32343f]`};
                        ${tw`dark:-webkit-box-shadow[0 0 0px 1000px #2f314b inset] -webkit-box-shadow[0 0 0px 1000px #c7d5df inset]`};
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
                    }

                    /* & input:-webkit-autofill,
                  & input:-webkit-autofill:hover,
                  & input:-webkit-autofill:focus,
                  & textarea:-webkit-autofill,
                  & textarea:-webkit-autofill:hover,
                  & textarea:-webkit-autofill:focus,
                  & select:-webkit-autofill,
                  & select:-webkit-autofill:hover,
                  & select:-webkit-autofill:focus {
                    border: 1px solid green;
                    -webkit-text-fill-color: green;
                    -webkit-box-shadow: 0 0 0px 1000px #000 inset;
                    transition: background-color 5000s ease-in-out 0s;
                  } */
                  }
                `,
                css`
                  transition-property: background-color;
                  transition-duration: 600ms;
                `,
                tw`rounded bg-l dark:bg-gray-800`,
              ]}
            >
              <h2 tw="dark:text-gray-600 ml-4 mt-2 uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                Shipping & Billing Information
              </h2>
              <fieldset tw="mb-3 shadow-lg text-gray-600">
                <label tw="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span tw="dark:text-gray-300 text-right px-2">Name</span>
                  <input
                    defaultValue={
                      sanitizedProfileData.nick || sessionData.name || ""
                    }
                    onChange={handleInputChange}
                    tw="background-clip[content-box] focus:outline-none px-3"
                    name="nick"
                    placeholder="Try Odinsson"
                    required
                  />
                </label>
                <label tw="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span tw="dark:text-gray-300 text-right px-2">Email</span>
                  <input
                    defaultValue={sanitizedProfileData.email || ""}
                    onChange={handleInputChange}
                    tw="background-clip[content-box] focus:outline-none px-3"
                    name="email"
                    type="email"
                    placeholder="try@example.com"
                    required
                  />
                </label>
                <label tw="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span tw="dark:text-gray-300 text-right px-2">Address</span>
                  <input
                    // value={sanitizedProfileData.streetAddress || ""}
                    onChange={handleInputChange}
                    tw="background-clip[content-box] focus:outline-none px-3"
                    name="streetAddress"
                    placeholder="10 Street XYZ 654"
                  />
                </label>
                <label tw="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span tw="dark:text-gray-300 text-right px-2">City</span>
                  <input
                    defaultValue={sanitizedProfileData.city || ""}
                    onChange={handleInputChange}
                    tw="-webkit-text-fill-color[inherit] background-clip[content-box] focus:outline-none px-3"
                    name="city"
                    placeholder="San Francisco"
                  />
                </label>
                {/* <label tw="inline-flex w-2/4 border-gray-200 py-3">
                <span tw="dark:text-gray-300 text-right px-2">State</span>
                <input
                  tw="background-clip[content-box] focus:outline-none px-3"
                  name="state"
                  placeholder="CA"
                />
              </label> */}

                <label tw="xl:w-1/4 xl:inline-flex py-3 items-center flex xl:border-none border-t border-gray-200 py-3">
                  <span tw="dark:text-gray-300 text-right px-2 xl:px-0 ">
                    ZIP
                  </span>
                  <input
                    defaultValue={sanitizedProfileData.postalCode || undefined}
                    onChange={handleInputChange}
                    tw="-webkit-text-fill-color[inherit] background-clip[content-box] focus:outline-none px-3"
                    name="postalCode"
                    placeholder="98603"
                  />
                </label>
                <label tw="flex border-t border-gray-200 h-12 py-3 items-center select-none relative">
                  <span tw="dark:text-gray-300 text-right px-2">Country</span>
                  <div
                    id="country"
                    tw="focus:outline-none px-3 w-full flex items-center"
                  >
                    <select
                      defaultValue={sanitizedProfileData.country || "KR"}
                      onChange={handleSelectChange}
                      onBlur={handleSelectChange}
                      // defaultValue={"KR"}
                      name="country"
                      tw="border-none bg-transparent flex-1 cursor-pointer appearance-none focus:outline-none"
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
                </label>
                {sanitizedProfileData.country === "US" && (
                  <motion.label
                    css={[
                      css`
                        /*  */
                        /*  */
                        /* ${tw`h-12 py-3`} */
                        height: 0px;
                        overflow-y: hidden;
                        /* border: crimson solid 1px; */
                      `,
                      tw`flex border-t border-gray-200 items-center select-none relative`,
                    ]}
                    animate={{
                      height: ["0rem", "3rem"],
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <span tw="dark:text-gray-300 text-right px-2">State</span>
                    <div
                      id="state"
                      tw="focus:outline-none px-3 w-full flex items-center"
                    >
                      <select
                        defaultValue={
                          sanitizedProfileData.regionOrState || "CO"
                        }
                        onChange={handleSelectChange}
                        onBlur={handleSelectChange}
                        name="regionOrState"
                        // defaultValue={"CO"}
                        tw="border-none bg-transparent flex-1 cursor-pointer appearance-none focus:outline-none"
                      >
                        {states.map((item, i) => {
                          return (
                            <option
                              key={`${i + item.state_code}`}
                              value={item.state_code}
                            >
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </motion.label>
                )}
              </fieldset>
            </section>
          </form>
        </section>
      </div>
      <InvalidDataAlert
        visible
        header="Wrong!"
        text="Something is wrong"
        variant="error"
      />
    </Fragment>
  );
};

export default ProfileView;

/*
// PROFILE PART

<section tw="pt-16 bg-gray-50">
<div tw="w-full lg:w-4/12 px-4 mx-auto">
  <div tw="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
    <div tw="px-6">
      <div tw="flex flex-wrap justify-center">
        <div tw="w-full px-4 flex justify-center">
          <div tw="relative">
            <img alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" tw="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px">
          </div>
        </div>
        <div tw="w-full px-4 text-center mt-20">
          <div tw="flex justify-center py-4 lg:pt-4 pt-8">
            <div tw="mr-4 p-3 text-center">
              <span tw="text-xl font-bold block uppercase tracking-wide text-gray-600">
                22
              </span>
              <span tw="text-sm text-gray-400">Friends</span>
            </div>
            <div tw="mr-4 p-3 text-center">
              <span tw="text-xl font-bold block uppercase tracking-wide text-gray-600">
                10
              </span>
              <span tw="text-sm text-gray-400">Photos</span>
            </div>
            <div tw="lg:mr-4 p-3 text-center">
              <span tw="text-xl font-bold block uppercase tracking-wide text-gray-600">
                89
              </span>
              <span tw="text-sm text-gray-400">Comments</span>
            </div>
          </div>
        </div>
      </div>
      <div tw="text-center mt-12">
        <h3 tw="text-xl font-semibold leading-normal mb-2 text-gray-700 mb-2">
          Jenna Stones
        </h3>
        <div tw="text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold uppercase">
          <i tw="fas fa-map-marker-alt mr-2 text-lg text-gray-400"></i>
          Los Angeles, California
        </div>
        <div tw="mb-2 text-gray-600 mt-10">
          <i tw="fas fa-briefcase mr-2 text-lg text-gray-400"></i>
          Solution Manager - Creative Tim Officer
        </div>
        <div tw="mb-2 text-gray-600">
          <i tw="fas fa-university mr-2 text-lg text-gray-400"></i>
          University of Computer Science
        </div>
      </div>
      <div tw="mt-10 py-10 border-t border-blueGray-200 text-center">
        <div tw="flex flex-wrap justify-center">
          <div tw="w-full lg:w-9/12 px-4">
            <p tw="mb-4 text-lg leading-relaxed text-gray-700">
              An artist of considerable range, Jenna the name taken
              by Melbourne-raised, Brooklyn-based Nick Murphy
              writes, performs and records all of his own music,
              giving it a warm, intimate feel with a solid groove
              structure. An artist of considerable range.
            </p>
            <a href="javascript:void(0);" tw="font-normal text-pink-500">
              Show more
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<footer tw="relative  pt-8 pb-6 mt-8">
  <div tw="container mx-auto px-4">
    <div tw="flex flex-wrap items-center md:justify-between justify-center">
      <div tw="w-full md:w-6/12 px-4 mx-auto text-center">
        <div tw="text-sm text-blueGray-500 font-semibold py-1">
          Made with <a href="https://www.creative-tim.com/product/notus-js" tw="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" tw="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
        </div>
      </div>
    </div>
  </div>
</footer>
</section>

*/

/*

// SHIPPING INFORMATION


<!DOCTYPE html>
<html tw="border-l" lang="en">
<head>
    <meta charset="UTF-8">
    <title>Checkout</title>
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        fieldset label span {
            min-width: 125px;
        }
        fieldset .select::after {
            content: '';
            position: absolute;
            width: 9px;
            height: 5px;</Fragment>
            right: 20px;
            top: 50%;
            margin-top: -2px;
            background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='9' height='5' viewBox='0 0 9 5'><title>Arrow</title><path d='M.552 0H8.45c.58 0 .723.359.324.795L5.228 4.672a.97.97 0 0 1-1.454 0L.228.795C-.174.355-.031 0 .552 0z' fill='%23CFD7DF' fill-rule='evenodd'/></svg>");
            pointer-events: none;
        }
    </style>
</head>
<body>
    <header tw="flex flex-wrap">
        <nav tw="flex w-screen justify-between bg-gray-50 text-gray-600">
            <div tw="w-full xl:px-12 py-6 px-5 flex space-x-12 items-center ">
                <a tw="text-2xl font-bold" href="#">
                    Your Logo
                </a>
                <ul tw="hidden md:flex mx-auto px-5 font-semibold space-x-12">
                    <li><a tw="hover:text-gray-900" href="#">Home</a></li>
                    <li><a tw="hover:text-gray-900" href="#">Products</a></li>
                    <li><a tw="hover:text-gray-900" href="#">Contact Us</a></li>
                </ul>
                <div tw="flex-grow border-2 py-1 px-3 lg:flex justify-between round hidden">
                    <input tw="flex-grow text-gray-600 focus:outline-none" type="text" placeholder="Search Product ..." / />
                    <span>-webkit-text-fill-color[inherit] background-clip[content-box] 
                        <svg xmlns="http://www.w3.org/2000/svg" tw="h-6 w-6 text-gray-400 hover:text-gray-600 transition duration-100 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                </div>
                <div tw="hidden xl:flex items-center text-gray-600 space-x-5 items-center">
                    <a tw="hover:text-gray-900" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" tw="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </a>
                    <a tw="flex items-center hover:text-gray-900" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" tw="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span tw="absolute flex ml-4 -mt-5">
                            <span tw="h-3 w-3 animate-ping absolute inline-flex rounded-full bg-pink-500 opacity-75"></span>
                            <span tw="h-3 w-3 relative inline-flex rounded-full bg-pink-600"></span>
                        </span>
                    </a>
                </div>
            </div>
            <a tw="flex xl:hidden items-center mr-6 hover:text-gray-900" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" tw="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span tw="flex absolute -mt-5 ml-4">
                  <span tw="h-3 w-3 absolute bg-pink-500 opacity-75 inline-flex rounded-full animate-ping"></span>
                  <span tw="h-3 w-3 relative inline-flex rounded-full bg-pink-600"></span>
                </span>
            </a>
            <a tw="xl:hidden self-center mr-12 hover:text-gray-900" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" tw="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </a>
        </nav>
    </header>
    <div tw="h-screen grid grid-cols-3">
        <div tw="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12">
            <div tw="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
                <div tw="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                    <div tw="text-yellow-500">
                        <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 sm:w-5 h-6 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div tw="text-sm font-medium ml-3">Checkout</div>
                </div>
                <div tw="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">Complete your shipping and payment details below.</div>
                <div tw="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
                    <svg tw="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
            </div>
            <div tw="rounded-md">
                <form id="payment-form" method="POST" action="">
                    <section>
                        <h2 tw="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Shipping & Billing Information</h2>
                        <fieldset tw="mb-3 bg-white shadow-lg rounded text-gray-600">
                            <label tw="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span twdark:text-gray-400 ="text-right px-2">Name</span>
                                <input name="name" tw="focus:outline-none px-3" placeholder="Try Odinsson" required />
                            </label>-webkit-text-fill-color[inherit] background-clip[content-box] 
                            <label tw="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span twdark:text-gray-400 ="text-right px-2">Email</span>
                                <input name="email" type="email" tw="focus:outline-none px-3" placeholder="try@example.com" required />
                            </label>-webkit-text-fill-color[inherit] background-clip[content-box] 
                            <label tw="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span twdark:text-gray-400 ="text-right px-2">Address</span>
                                <input name="address" tw="focus:outline-none px-3" placeholder="10 Street XYZ 654" />
                            </label>-webkit-text-fill-color[inherit] background-clip[content-box] 
                            <label tw="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span twdark:text-gray-400 ="text-right px-2">City</span>
                                <input name="city" tw="focus:outline-none px-3" placeholder="San Francisco" />
                            </label>-webkit-text-fill-color[inherit] background-clip[content-box] 
                            <label tw="inline-flex w-2/4 border-gray-200 py-3">
                                <span twdark:text-gray-400 ="text-right px-2">State</span>
                                <input name="state" tw="focus:outline-none px-3" placeholder="CA" />
                            </label>-webkit-text-fill-color[inherit] background-clip[content-box] 
                            <label tw="xl:w-1/4 xl:inline-flex py-3 items-center flex xl:border-none border-t border-gray-200 py-3">
                                <span twdark:text-gray-400 ="text-right px-2 xl:px-0 xl:content-none">ZIP</span>
                                <input name="postal_code" tw="focus:outline-none px-3" placeholder="98603" />
                            </label>-webkit-text-fill-color[inherit] background-clip[content-box] 
                            <label tw="flex border-t border-gray-200 h-12 py-3 items-center select relative">
                                <span twdark:text-gray-400 ="text-right px-2">Country</span>
                                <div id="country" tw="focus:outline-none px-3 w-full flex items-center">
                                    <select name="country" tw="border-none bg-transparent flex-1 cursor-pointer appearance-none focus:outline-none">
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
                                        <option value="US" selected="selected">United States</option>
                                    </select>
                                </div>
                            </label>
                        </fieldset>
                    </section>
                </form>
            </div>
            <div tw="rounded-md">
                <section>
                    <h2 tw="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Payment Information</h2>
                    <fieldset tw="mb-3 bg-white shadow-lg rounded text-gray-600">
                        <label tw="flex border-b border-gray-200 h-12 py-3 items-center">
                            <span twdark:text-gray-400 ="text-right px-2">Card</span>
                            <input name="card" tw="focus:outline-none px-3 w-full" placeholder="Card number MM/YY CVC" required />
                        </label>-webkit-text-fill-color[inherit] background-clip[content-box] 
                    </fieldset>
                </section>
            </div>
            <button tw="submit-button px-4 py-3 rounded-full bg-pink-400 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors">
                Pay €846.98
            </button>
        </div>
        <div tw="col-span-1 bg-white lg:block hidden">
            <h1 tw="py-6 border-b-2 text-xl text-gray-600 px-8">Order Summary</h1>
            <ul tw="py-6 border-b space-y-6 px-8">
                <li tw="grid grid-cols-6 gap-2 border-b-1">
                    <div tw="col-span-1 self-center">
                        <img src="https://bit.ly/3oW8yej" alt="Product" tw="rounded w-full">
                    </div>
                    <div tw="flex flex-col col-span-3 pt-2">
                        <span tw="text-gray-600 text-md font-semi-bold">Studio 2 Headphone</span>
                        <span tw="text-gray-400 text-sm inline-block pt-2">Red Headphone</span>
                    </div>
                    <div tw="col-span-2 pt-3">
                        <div tw="flex items-center space-x-2 text-sm justify-between">
                            <span tw="text-gray-400">2 x €30.99</span>
                            <span tw="text-pink-400 font-semibold inline-block">€61.98</span>
                        </div>
                    </div>
                </li>
                <li tw="grid grid-cols-6 gap-2 border-b-1">
                    <div tw="col-span-1 self-center">
                        <img src="https://bit.ly/3lCyoSx" alt="Product" tw="rounded w-full">
                    </div>
                    <div tw="flex flex-col col-span-3 pt-2">
                        <span tw="text-gray-600 text-md font-semi-bold">Apple iPhone 13</span>
                        <span tw="text-gray-400 text-sm inline-block pt-2">Phone</span>
                    </div>
                    <div tw="col-span-2 pt-3">
                        <div tw="flex items-center space-x-2 text-sm justify-between">
                            <span tw="text-gray-400">1 x €785</span>
                            <span tw="text-pink-400 font-semibold inline-block">€785</span>
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
</body>
</html>



*/

/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC, MouseEvent, SyntheticEvent, Touch } from "react";
import { useState, Fragment, createRef, useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { motion } from "framer-motion";

// import { useSession, signOut } from "next-auth/react";

import { useActor } from "@xstate/react";

import {
  EE,
  fse,
  profileDropdownService,
} from "@/machines/profile_dropdown_machine";

import ProfileDropdownMenu from "./ProfileDropdownMenu";

import isSSR from "@/util/isSSR";

import useProfileMenuData from "@/hooks/useProfileMenuData";

const ProfileDropdownButton: FC = () => {
  const profileData = useProfileMenuData();

  const [
    {
      context: { dropdownFocused },
      value: stateVal,
    },
    dispatch,
  ] = useActor(profileDropdownService);

  const handleClick = () => {
    if (stateVal === fse.opened) {
      dispatch({
        type: EE.CLOSE,
      });
    } else {
      dispatch({
        type: EE.OPEN,
      });
    }
  };

  useEffect(() => {
    const elIds = ["#prof-drop-b", "#prof-drop"];

    if (isSSR()) return;

    const dropButton = document.querySelector(elIds[0]);
    const dropMenu = document.querySelector(elIds[1]);

    console.log(dropButton?.children);

    const bodyMousedownHandler = (e: MouseEvent<HTMLBodyElement>) => {
      console.log(e.target);
    };
    // @ts-ignore
    document.body.addEventListener("mousedown", bodyMousedownHandler);

    return () => {
      // @ts-ignore
      document.body.removeEventListener("mousedown", bodyMousedownHandler);
    };
  }, [dispatch]);

  if (!profileData) {
    return null;
  }

  return (
    <Fragment>
      {profileData.id && (
        <div
          id="prof-drop-b"
          tw="relative margin-top[-5px] inline-block light:bg-l"
        >
          {/* <!-- Dropdown toggle button --> */}
          <button
            onClick={handleClick}
            tw="relative z-index[5] flex items-center px-1 py-1 text-sm text-gray-600 bg-l border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none"
          >
            <span tw="mx-1">{profileData.name}</span>
            <motion.span
              animate={{
                rotateZ: stateVal === fse.opened ? [0, 180] : [180, 0],
              }}
              transition={{
                duration: 0.16,
              }}
            >
              <svg
                tw="w-5 h-5 mx-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
                  fill="currentColor"
                ></path>
              </svg>
            </motion.span>
          </button>
          {/* {dropdownVisible && ( */}
          <ProfileDropdownMenu
            id={profileData.id}
            image={profileData.image}
            name={profileData.name}
            email={profileData.email}
            role={profileData.role}
          />
          {/* )} */}
        </div>
      )}
    </Fragment>
  );
};

export default ProfileDropdownButton;

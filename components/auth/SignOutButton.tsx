/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { signOut } from "next-auth/react";

import Button from "../buttons/Button";

const SignOut: FC = () => {
  return (
    <div tw="">
      <button
        tw="dark:text-white bg-__primary px-2.5 rounded"
        onClick={() => {
          signOut({ callbackUrl: process.env.NEXTAUTH_URL });
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;

/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";
import { Fragment } from "react";

import { signOut, useSession } from "next-auth/react";

const SignOutButton: FC = () => {
  const { status } = useSession();

  return (
    <Fragment>
      {status === "authenticated" && (
        <div tw="my-6 mr-0.5 md:-my-1 md:mr-1 md:ml-1.5">
          <button
            tw="dark:text-white bg-__primary px-3 py-0.5 rounded"
            onClick={() => {
              signOut({ callbackUrl: process.env.NEXTAUTH_URL });
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default SignOutButton;

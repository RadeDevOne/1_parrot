/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { Fragment } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const SignInButton: FC = () => {
  const { push, asPath } = useRouter();

  const { status } = useSession();

  return (
    <Fragment>
      {status === "unauthenticated" && asPath !== "/signin" && (
        <div>
          <button
            tw="dark:text-white bg-__primary px-2.5 rounded"
            onMouseDown={() => {
              push("/signin");
            }}
          >
            Sign In
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default SignInButton;

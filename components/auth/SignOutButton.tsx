/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";
import { Fragment, useState } from "react";

import { signOut, useSession } from "next-auth/react";

import { ClipLoader as Loader } from "react-spinners";

const SignOutButton: FC = () => {
  const { status } = useSession();

  const [reqStatus, setReqStatus] = useState<"idle" | "pending">("idle");

  return (
    <Fragment>
      {status === "authenticated" && (
        <div tw="my-2.5 mr-0.5 md:-my-1 md:mr-1 md:ml-1.5">
          <button
            disabled={reqStatus === "pending"}
            tw="dark:text-white bg-__primary width[88.91px] px-3 py-0.5 rounded"
            onClick={() => {
              setReqStatus("pending");
              signOut({ callbackUrl: process.env.NEXTAUTH_URL }).then(() => {
                // setReqStatus("idle");
              });
            }}
          >
            {reqStatus === "idle" ? "Sign Out" : <Loader size={12} />}
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default SignOutButton;

/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { Fragment, useState } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { ClipLoader as Loader } from "react-spinners";

const SignInButton: FC = () => {
  const { push, asPath } = useRouter();

  const { status } = useSession();

  const [reqStatus, setReqStatus] = useState<"idle" | "pending">("idle");

  return (
    <Fragment>
      {status === "unauthenticated" && asPath !== "/signin" && (
        <div tw="my-2.5 mr-0.5 md:-my-1 md:mr-1 md:ml-1.5">
          <button
            disabled={reqStatus === "pending"}
            tw="dark:text-white bg-__primary width[88.91px] px-3 py-0.5 rounded"
            onMouseDown={() => {
              setReqStatus("pending");
              push("/signin").then(() => {
                setReqStatus("idle");
              });
            }}
          >
            Sign In
            {/* {reqStatus === "idle" ? "Sign In" : <Loader size={12} />} */}
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default SignInButton;

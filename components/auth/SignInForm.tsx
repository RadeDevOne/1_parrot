/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC, ChangeEventHandler, FormEvent } from "react";
import { useState, useCallback, useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { useRouter } from "next/router";

import { signIn, useSession } from "next-auth/react";
//
//

import Spinner from "@/components/common/Spinner";

const SignInForm: FC = () => {
  const { push, asPath } = useRouter();
  const { data, status } = useSession();
  // const a = data.;

  useEffect(() => {
    if (status === "authenticated") push("/");
  }, [status, push]);

  const [{ email }, setFields] = useState<{
    email: string;
  }>({
    email: "",
  });

  const [reqStatus, setReqStatus] = useState<"idle" | "pending">("idle");

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) =>
    setFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setReqStatus("pending");
      try {
        //
        // TRY SIGNING IN
        const resp = signIn("email", { email });

        console.log({ resp });
      } catch (err) {
        setReqStatus("idle");
        //

        console.error(err);
      }
    },
    [email, setReqStatus]
  );

  const buttonDisabled = !email || reqStatus === "pending" ? true : false;

  return (
    <section>
      <>
        <div tw="w-full lg:w-4/12 px-4 mx-auto pt-6 mt-12">
          <div tw="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
            <div tw="rounded-t mb-0 px-6 py-6">
              <div tw="text-center mb-3">
                <h6 tw="text-gray-500 text-sm font-bold">Sign in with</h6>
              </div>
              <div tw="text-center">
                <button
                  onClick={() => {
                    signIn("facebook");
                  }}
                  tw="bg-white active:bg-gray-50 text-gray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                  type="button"
                >
                  <img
                    alt="..."
                    tw="w-5 mr-1"
                    src="/images/social/github.svg"
                  />
                  Github
                </button>
                <button
                  onClick={() => {
                    signIn("google");
                  }}
                  tw="bg-white active:bg-gray-50 text-gray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                  type="button"
                >
                  <img
                    alt="..."
                    tw="w-5 mr-1"
                    src="/images/social/google.svg"
                  />
                  Google{" "}
                </button>
                <button
                  onClick={() => {
                    signIn("facebook");
                  }}
                  tw="bg-white active:bg-gray-50 text-gray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                  type="button"
                >
                  <img
                    alt="..."
                    tw="w-5 mr-1"
                    src="/images/social/fb-round.svg"
                  />
                  Facebook{" "}
                </button>
              </div>
              <hr tw="mt-6 border-b-2 border-gray-300" />
            </div>
            <div tw="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div tw="text-gray-400 text-center mb-3 font-bold">
                <small>Or sign in with email magic link</small>
              </div>
              <form>
                <div tw="relative w-full mb-3">
                  <label
                    tw="block uppercase text-gray-600 text-xs font-bold mb-2"
                    htmlFor="e-thing"
                  >
                    Email
                  </label>
                  <input
                    id="e-thing"
                    type="email"
                    tw="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Email"
                  />
                </div>
                {/* <div tw="relative w-full mb-3">
                <label
                  tw="block uppercase text-gray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  type="password"
                  tw="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                />
              </div> */}
                <div>
                  <label tw="inline-flex items-center cursor-pointer">
                    <input
                      id="customCheckLogin"
                      type="checkbox"
                      tw="border-0 rounded text-gray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                    />
                    <span tw="ml-2 text-sm font-semibold text-gray-600">
                      Remember me
                    </span>
                  </label>
                </div>
                <div tw="text-center mt-6">
                  <button
                    tw="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="button"
                  >
                    {" "}
                    Sign In{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </section>
  );
};

export default SignInForm;

// {
/* <footer tw="relative pt-8 pb-6 mt-2">
        <div tw="container mx-auto px-2">
          <div tw="flex flex-wrap items-center md:justify-between justify-center">
            <div tw="w-full md:w-6/12 px-4 mx-auto text-center">
              <div tw="text-sm text-gray-500 font-semibold py-1">
                Made with{" "}
                <a
                  href="https://www.creative-tim.com/product/notus-js"
                  tw="text-gray-500 hover:text-gray-800"
                  target="_blank"
                  rel="noreferrer"
                >
                  Notus JS
                </a>{" "}
                by{" "}
                <a
                  href="https://www.creative-tim.com"
                  tw="text-gray-500 hover:text-gray-800"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  Creative Tim
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer> */
// }

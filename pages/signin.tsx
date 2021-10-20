/* eslint react/react-in-jsx-scope: 0 */

/* eslint jsx-a11y/anchor-is-valid: 1 */
import tw, { css, styled, theme } from "twin.macro";

import type { NextPage as NP } from "next";
import { useState, useCallback, useEffect } from "react";

import { useRouter } from "next/router";

import type { ChangeEventHandler, FormEvent } from "react";

// import { useActor } from "@xstate/react";

// WE ARE GOING TO USE SIGNING IN WITH EMAIL LOGIC LIKE THIS
// AND WE NEED TO CHECK SESSION
import { signIn, useSession } from "next-auth/react";
//
//

import Layout from "@/components/4_signin_page/Layout";

const SignInPage: NP = () => {
  /* if (status === "unauthenticated") {
    return null;
  }
  if (status === "loading") {
    return <span>loading...</span>;
  } */

  return <Layout>{/*  */}</Layout>;
};

export default SignInPage;

//
//
//
// {
/*  <h1>Sign In</h1>
      <section
        css={css`
          padding-top: 10vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          align-content: center;
          & div.email-field {
            margin-top: 10vh;
            display: flex;
            justify-content: center;
          }
          & button {
            margin-top: 8vh;
          }
        `}
      >
        <form onSubmit={handleSubmit}>
          <div className="email-field">
            <input
              onChange={handleChange}
              value={email}
              type="email"
              name="email"
              id="email-field"
              placeholder="Sign In/Up With Email"
            />
          </div>

          <button color="primary" type="submit" disabled={buttonDisabled}>
            {"Sign In/Up "}
            {reqStatus === "pending" ? (
              <div
                css={css`
                  display: inline-block;
                  margin-left: 8px;
                `}
              >
                <Spinner />
              </div>
            ) : (
              ""
            )}
          </button>
        </form>
      </section> */
// }

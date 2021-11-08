/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useState, Fragment } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { useActor } from "@xstate/react";
import { dropboxToggService, EE } from "@/machines/dropbox_togg_machine";

const Dropzone: FC = () => {
  const [
    {
      context: { visible },
    },
    dispatch,
  ] = useActor(dropboxToggService);

  const [file, setFile] = useState<File | null>(null);

  console.log(file);

  return (
    // <section css={[tw``]}>
    <Fragment>
      {visible && (
        <div tw="fixed z-10 left-0 top-0 w-full h-full flex bg-black bg-opacity-60">
          <div tw=" p-4 w-max bg-gray-400  m-auto rounded-lg">
            <div
              onDrop={(e) => {
                e.preventDefault();
                // console.log({ e });

                // console.log(e.target);

                // @ts-ignore
                const file = e.dataTransfer.files[0] as File;

                // console.log({ one: file });

                if (file) {
                  setFile(file);
                }

                //

                // console.log(file);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                // console.log({ e });
              }}
              tw="p-5 relative width[279px] md:width[496px] border-4 border-dotted border-gray-300 rounded-lg"
              // style={{ minWidth: "278px", maxWidth: "60vw" }}
            >
              <svg
                tw="text-indigo-500 w-24 mx-auto mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <div tw=" flex flex-col w-max mx-auto text-center">
                <label>
                  <input
                    /* onSelect={(e) => {
                      console.log({ e });
                    }} */
                    onChange={(e) => {
                      // console.log({ e });

                      // console.log(e.target.files[0]);
                      // @ts-ignore
                      const file = e.target.files[0] as File;

                      // console.log({ two: file });

                      if (file) {
                        setFile(file);
                      }
                    }}
                    tw="text-sm cursor-pointer w-36 hidden"
                    type="file"
                    // multiple
                  />
                  <div tw=" bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">
                    Select
                  </div>
                </label>

                <div tw=" text-indigo-500 uppercase">or drop files here</div>
              </div>
              <button
                onClick={() => dispatch({ type: EE.TOGGLE })}
                tw=" absolute -top-10 -right-10 bg-white p-4 cursor-pointer hover:bg-gray-100 py-2 text-gray-600 rounded-full"
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
    // </section>
  );
};

export default Dropzone;

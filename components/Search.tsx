/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useEffect, useState, useCallback, Fragment } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { useRouter } from "next/router";

import axios from "axios";

const Search: FC = () => {
  const { push: rPush } = useRouter();

  const [slugs, setSlugs] = useState<{ value: string; label: string }[]>([]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (window) {
      window.onkeydown = (e) => {
        if (e.ctrlKey) {
          if (e.key === "k" || e.key === "K") {
            e.preventDefault();
            setOpen(true);
          }
        }
      };
    }

    return () => {
      window.onkeydown = null;
    };
  }, [setOpen]);

  const [searchReqStatus, setSearchReqStatus] = useState<
    "idle" | "pending" | "failed"
  >("idle");

  const sendSearchReq = useCallback(
    async (text: string) => {
      try {
        setSearchReqStatus("pending");

        const { data } = await axios.get(`/api/products/search/${text}`);

        setSlugs(data);

        setSearchReqStatus("idle");
      } catch (error) {
        console.error(error);

        setSearchReqStatus("failed");

        setTimeout(() => {
          setSearchReqStatus("idle");
        }, 3000);
      }
    },
    [setSearchReqStatus, setSlugs]
  );

  return null;
};

export default Search;

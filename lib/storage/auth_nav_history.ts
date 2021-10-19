// METHODS TO HELP WHEN UNAUTHENTICATED USER REQUESTS PAGE THAT REQUIRE AUTH
// HE SHOULD BE REDIRECTED TO THE signin PAGE
// BUT AFTER SIGNIN HE SHOULD BE REDIRECTED TO THE PAGE HE REQUESTED

import cook from "js-cookie";

import { NAV_HISTORY } from "@/constants/index";

export const getNavHistory = () => {
  const navHistory = cook.get(NAV_HISTORY);

  if (!navHistory?.startsWith("/")) {
    throw new Error("Pth needs to start with `/`");
  }

  return navHistory;
};

export const setNavHistory = (path: string) => {
  if (!path.startsWith("/")) {
    throw new Error("Your path should start with `/`");
  }

  return cook.set(NAV_HISTORY, path);
};

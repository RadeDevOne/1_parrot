import Cook from "js-cookie";

import isSSR from "@/util/isSSR";

/**
 * @description color mode enum
 */
export enum CME {
  light = "light",
  dark = "dark",
  cookie_key = "color_mode",
}
export type colorModeType = CME.dark | CME.light;

// DON'T FORGET TO USE THIS COOKIE SERVER SIDE ALSO
// (NO WE WON'T DO THIS BECAUSE XSS ATTACKS)

/**
 * @description USE THIS ONLY INSIDE React.useEffect
 * OR ANWHERE WHERE WE KNOW WE ARE NOT ON THE SERVER
 */
export const setInitialColorMode = (): colorModeType | undefined => {
  if (isSSR()) return;

  const mode = Cook.get(CME.cookie_key);
  const documentElementClasses = document.documentElement.classList;

  let colorModeClass: colorModeType | undefined;

  for (const item in documentElementClasses) {
    if (item === CME.dark || item === CME.light) {
      colorModeClass = item;
    }
  }

  // IF WE DON'T HAVE COLOR MODE, TAKE IT FROM THE html TAG
  if (!mode && !colorModeClass) {
    // AND IF WE DON'T HAVE COLOR MODE ON HTML
    // I THINK THIS SHOULD BE light, BECAUSE MAYBE THE DEFAULT IS LIGHT
    // colorModeClass = CME.dark;
    colorModeClass = CME.light;
    // NOW WE ARE GOING TO SET MODE BACK TO THE COOKIE
    Cook.set(CME.cookie_key, colorModeClass);
    // AND WE SHOULD ADD IT TO THE HTML ELEMENT
    document.documentElement.classList.add(colorModeClass);

    // IN THIS INSTANCE WE SETTED BOTH VALUES TO BE THE SAME
    return;
  }

  // IF ONLY WE DON'T HAVE CLASS ON HTML
  if (!colorModeClass && mode) {
    document.documentElement.classList.add(mode);
    return;
  }

  // IF MODE FROM COOKIE IS MISSING

  if (colorModeClass && !mode) {
    Cook.set(CME.cookie_key, colorModeClass);
    return;
  }

  // IF WE HAVE A MISSMACH (CLASS FROM THE HTML SHOULD HAVE THE ADVANTAGE)

  if (colorModeClass && mode) {
    if (colorModeClass !== mode) {
      // JUST CHANGE THE COOKIE
      Cook.set(CME.cookie_key, colorModeClass);
      return;
    }
  }
};

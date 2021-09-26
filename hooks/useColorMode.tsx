import isSSR from "@/util/isSSR";

const useColorModeSwitcher = () => {
  enum T {
    dark = "dark",
    light = "light",
  }

  const toggleDark = () => {
    if (isSSR()) return;
  };

  const toggleLight = () => {
    if (isSSR()) return;
  };

  const toggle = () => {
    if (isSSR()) return;
  };

  return { toggle, toggleDark, toggleLight };
};

export default useColorModeSwitcher;

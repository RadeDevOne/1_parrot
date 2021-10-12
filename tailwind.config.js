const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors")

// console.log({ defaultTheme });

module.exports = {
  // important: true, // NO NEED FOR THIS BECAUSE WE DON'T HAVE OTHER SOURCE OF CSS WE NEED TO OVERRIDE
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        d: "#171614",
        l: "#DDDBF1",
        y: "#E9D758",
        good: "#297373",
        bad: "#FE5F55",
        electric: "#db00ff",
        ribbon: "#0047ff",
        bledoliko: "crimson",
        __primary: colors.blue[500],
        __secondary: colors.
      },
      // OVERRIDING DEFAULT FONT FAMILY
      fontFamily: {
        sans: ['"InterVar"', ...defaultTheme.fontFamily.sans],
        serif: ['"Alegreya"', ...defaultTheme.fontFamily.serif],
        mono: ['"FiraMono"', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};

const defaultTheme = require("tailwindcss/defaultTheme");

console.log({ defaultTheme });

module.exports = {
  // important: true, // NO NEED FOR THIS BECAUSE WE DON'T HAVE OTHER SOURCE OF CSS WE NEED TO OVERRIDE
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        electric: "#db00ff",
        ribbon: "#0047ff",
        bledoliko: "crimson",
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

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  important: true,
  theme: {
    extend: {
      colors: {
        electric: "#db00ff",
        ribbon: "#0047ff",
        bledoliko: "crimson",
      },
      /* fontFamily: {
        sans: ['"InterVar"', ...defaultTheme.fontFamily.sans],
      }, */
    },
  },
  plugins: [],
};
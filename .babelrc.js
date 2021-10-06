module.exports = {
  presets: [
    [
      "next/babel",
      {
        "preset-react": {
          runtime: "automatic",
          importSource: "@emotion/react",
        },
      },
      // ---- I ADDED THESE TWO ----
      /* [
        "@babel/preset-env",
        {
          targets: {
            node: "current",
          },
        },
      ],
      "@babel/preset-typescript" */
      // ---------------------------
      ,
    ],
  ],
  plugins: ["@emotion/babel-plugin", "babel-plugin-macros", "superjson-next"],
};

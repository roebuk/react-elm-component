import terser from "@rollup/plugin-terser";

export default {
  external: ["react"],
  input: "index.js",
  output: [
    {
      file: "dist/react-elm-component.mjs",
      format: "esm",
      name: "version",
      plugins: [terser()],
    },
  ],
};

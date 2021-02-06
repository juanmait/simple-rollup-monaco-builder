import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import typescript from '@rollup/plugin-typescript';

const production = process.env.NODE_ENV === "production";

export default {
  input: "src/index.ts",
  output: {
    sourcemap: !production,
    /**
     * es – Keep the bundle as an ES module file, suitable for other bundlers
     * and inclusion as a <script type=module> tag in modern browsers (alias: esm, module).
     * @see https://rollupjs.org/guide/en/#outputformat
     */
    format: "esm",
    name: "monaco-editor",
    /**
     * Create single bundle when using dynamic imports
     * @see https://rollupjs.org/guide/en/#outputinlinedynamicimports
     */
    inlineDynamicImports: true,
    dir: "monaco-editor",
  },
  plugins: [
    typescript(),
    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: (importee) =>
        importee === "svelte" || importee.startsWith("svelte/"),
      preferBuiltins: false,
    }),
    commonjs(),
    postcss({
      extract: true,
      sourceMap: !production,
      minimize: production,
    }),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
};

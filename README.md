# Simple rollup monaco builder

> Forked from [fudgepop01/svelte-monaco-editor-example](https://github.com/fudgepop01/svelte-monaco-editor-example)

Simple rollup config to build a customized esm version of monaco editor.

```sh
yarn install
yarn build  # build with NODE_ENV=production (minification enabled, sourcemaps disabled).
yarn build-dev  # build with NODE_ENV=development (minification disabled, sourcemaps enabled).
```

### Scripts

```json
{
  "build": "NODE_ENV=production yarn _build",
  "build-dev": "NODE_ENV=development yarn _build",
  "_build": "rm -rf monaco-editor && rollup -c"
}
```

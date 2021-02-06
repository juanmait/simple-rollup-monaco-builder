# Simple rollup monaco builder

> Forked from [fudgepop01/svelte-monaco-editor-example](https://github.com/fudgepop01/svelte-monaco-editor-example)

Simple rollup config to build a customized esm version of monaco editor. Includes some typescript suport.

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

## Svelte Component Example

```html
<script context="module" lang="ts">
  import type { DefaultExport, IStandaloneCodeEditor } from "./monaco-editor";

  let _monaco: DefaultExport;

  // @ts-ignore (exclude css import from type checking)
  const monacoCssImport = import("./monaco-editor/index.css");
  const monacoApiImport = import("./monaco-editor");

  let monacoImporter = () =>
    Promise.all([monacoApiImport, monacoCssImport]).then(([mod]) => {
      // monaco and monaco css is imported!
      _monaco = mod.default;
      return mod.default;
    });
</script>

<script lang="ts">
  import { onMount } from "svelte";

  let monaco: DefaultExport;
  let container;
  let editor: IStandaloneCodeEditor;

  onMount(() => {
    if (_monaco) {
      monaco = _monaco;
      editor = monaco.editor.create(container);
    } else {
      monacoImporter().then((defaultExport) => {
        monaco = defaultExport;
        editor = monaco.editor.create(container, {
          value: [
            "# example from https://github.com/fudgepop01/svelte-monaco-editor-example",
            "",
            "from banana import *",
            "",
            "class Monkey:",
            "	# Bananas the monkey can eat.",
            "	capacity = 10",
            "	def eat(self, N):",
            "		'''Make the monkey eat N bananas!'''",
            "		capacity = capacity - N*banana.size",
            "",
            "	def feeding_frenzy(self):",
            "		eat(9.25)",
            '		return "Yum yum"',
          ].join("\n"),
          language: "python",
        });
      });
    }
    return () => {
      editor.dispose();
    };
  });
</script>

<div style="height: 300px;">
  <div
    style="height: 300px;"
    class="monaco-container"
    bind:this="{container}"
  />
</div>
```

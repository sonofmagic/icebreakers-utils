# create-functional-loader

This is a fork of `simple-functional-loader` but rewrite with `Typescript` for TypeStrong !

> Use function as webpack loader option

## Install

```bash
<npm|yarn|pnpm> i -D create-functional-loader
```

## Usage

```js
// webpack.config.js
const { createLoader } = require('create-functional-loader')
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          createLoader((source, map) => { // must be an "ES5" function!
            // use "this" as loaderContext
            return processHTML(source, map) // process source code.
          })
        ]
      }
    ]
  }
}
```

`createLoader` function will return [`UseEntry`](https://webpack.js.org/configuration/module/#useentry) object:

```js
{
  loader: string,
  options: object,
  ident: string
}
```

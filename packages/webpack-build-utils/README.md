# webpack-build-utils

webpack build utils

## Install

```bash
<npm|yarn|pnpm> i -D webpack-build-utils
```

## Usage

```js
import {
  compile,
  createLoader,
  getErrors,
  getMemfsCompiler5,
  getWarnings,
  readAsset,
  readAssets
} from 'webpack-build-utils'

// normal get compiler
const compiler = webpack(webpackConfig)

// get memory compiler
// const compiler = getMemfsCompiler5(webpackConfig)


// promisify webpack.run
const stats = await compile(compiler)

// get all Assets as Record<string,string>
expect(readAssets(compiler, stats)).toMatchSnapshot('assets')
// get all error
expect(getErrors(stats)).toMatchSnapshot('errors')
// get all warnings
expect(getWarnings(stats)).toMatchSnapshot('warnings')



// createLoader, quickly create a simple loader
// webpackConfig
module: {
  rules: [
    {
      test: /\.m?js$/,
      // https://webpack.js.org/configuration/module/#useentry
      use: createLoader(function (source,map,meta) {
        
        return source
      })
    }
  ]
}
```

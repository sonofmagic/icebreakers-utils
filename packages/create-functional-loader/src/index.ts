import type webpack from 'webpack'
import loaderUtils from 'loader-utils'
import { name } from '../package.json'
// const pkg = require('../package.json')

export type webpackLoaderContext = webpack.LoaderContext<{
  processor: webpack.LoaderDefinitionFunction
}>

function simpleFunctionalLoader(
  this: webpackLoaderContext,
  ...args: Parameters<webpack.LoaderDefinitionFunction>
) {
  // @ts-ignore
  const { processor } = loaderUtils.getOptions(this)
  // @ts-ignore
  return processor.call(this, ...args)
}

export type CompatLoaderItem = Exclude<
  webpack.RuleSetUseItem,
  string | Function
>

export function createLoader(
  processor: webpack.LoaderDefinitionFunction,
  options?: Partial<CompatLoaderItem>,
): Partial<CompatLoaderItem> {
  if (
    typeof processor !== 'function'
    || !Function.prototype.toString.call(processor).includes('function')
  ) {
    throw new Error(
      `${name}: parameter passed to "createLoader" must be an ES5 function.`,
    )
  }
  return Object.assign(
    {
      loader: __filename,
      options: { processor },
      ident: `${name}-${Math.random()}`,
      // type: undefined
    },
    options,
  )
}
export type CreateLoader = typeof createLoader
// export default simpleFunctionalLoader
simpleFunctionalLoader.createLoader = createLoader
module.exports = simpleFunctionalLoader

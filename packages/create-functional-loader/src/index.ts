import loaderUtils from 'loader-utils'
// import pkg from '../package.json'
import type webpack5 from 'webpack'
import type webpack4 from 'webpack4'
const pkg = require('../package.json')
const { name } = pkg

// https://github.com/vuejs/vue-loader/blob/main/src/util.ts#L193
const testWebpack5 = (compiler?: webpack5.Compiler) => {
  if (!compiler) {
    return false
  }
  const webpackVersion = compiler?.webpack?.version
  return Boolean(webpackVersion && Number(webpackVersion.split('.')[0]) > 4)
}

export type Webpack5LoaderContext = webpack5.LoaderContext<{
  processor: webpack5.LoaderDefinitionFunction
}>

export type Webpack4LoaderContext = webpack4.loader.LoaderContext

function simpleFunctionalLoader(
  this: Webpack5LoaderContext | Webpack4LoaderContext,
  ...args:
    | Parameters<webpack5.LoaderDefinitionFunction>
    | Parameters<webpack4.loader.Loader>
) {
  const loaderContext = this
  // @ts-ignore
  const isWebpack5 = testWebpack5(loaderContext._compiler)
  if (isWebpack5) {
    const params = args as Parameters<webpack5.LoaderDefinitionFunction>
    const ctx = loaderContext as Webpack5LoaderContext
    const { processor } = ctx.getOptions(this)
    return processor.apply(ctx, params)
  } else {
    const params = args as Parameters<webpack4.loader.Loader>
    const ctx = loaderContext as Webpack4LoaderContext
    const { processor } = loaderUtils.getOptions(ctx)
    return (processor as unknown as webpack4.loader.Loader).apply(ctx, params)
  }
}

simpleFunctionalLoader.createLoader = function createLoader(
  processor: webpack5.LoaderDefinitionFunction
) {
  if (
    typeof processor !== 'function' ||
    Function.prototype.toString.call(processor).indexOf('function')
  ) {
    throw new Error(
      name + ': parameter passed to "createLoader" must be an ES5 function.'
    )
  }
  return {
    loader: __filename,
    options: { processor },
    ident: name + '-' + Math.random()
  }
}

export default simpleFunctionalLoader

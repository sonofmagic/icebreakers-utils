import type { LoaderDefinitionFunction } from 'webpack'
const { createLoader } = require('simple-functional-loader')

export default function (processor: LoaderDefinitionFunction) {
  return createLoader(processor)
}

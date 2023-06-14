import type { LoaderDefinitionFunction } from 'webpack'
import { createLoader } from 'create-functional-loader'

export default function (processor: LoaderDefinitionFunction) {
  return createLoader(processor)
}

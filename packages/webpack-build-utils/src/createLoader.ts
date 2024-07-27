import type { LoaderDefinitionFunction } from 'webpack'
import { createLoader } from 'create-functional-loader'
import type { CompatLoaderItem } from 'create-functional-loader'

export default function (
  processor: LoaderDefinitionFunction,
  options?: Partial<CompatLoaderItem>,
) {
  return createLoader(processor, options)
}

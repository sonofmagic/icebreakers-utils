import type { Compiler, Stats } from './types'

import readAsset from './readAsset'

export default function readAssets(compiler: Compiler, stats: Stats) {
  const assets: Record<string, string> = {}

  for (const asset of Object.keys(stats.compilation.assets)) {
    assets[asset] = readAsset(asset, compiler, stats)
  }

  return assets
}

import type { RollupOptions, OutputOptions, Plugin, InputOption } from 'rollup'
import type { DeletePluginOptions } from './del'

export interface PackageJson {
  main?: string
  module?: string
  dependencies?: { [key: string]: string }
}

export interface CreateRollupConfigOptions {
  rollupOptions?: RollupOptions
  external?: string[]
  plugins?: Plugin[]
  input?: InputOption
  output?: OutputOptions | OutputOptions[]
  deletePluginOptions?: DeletePluginOptions
}

import type { RollupOptions, OutputOptions, Plugin, InputOption } from 'rollup'
import type { DeletePluginOptions } from './del'
import type { MinifyOptions } from 'terser'
import type { RollupReplaceOptions } from '@rollup/plugin-replace'
import type { RollupTypescriptOptions } from '@rollup/plugin-typescript'
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
  tsconfig?: string
  terser?: false | MinifyOptions
  replace?: false | RollupReplaceOptions
  typescript?: false | RollupTypescriptOptions
}

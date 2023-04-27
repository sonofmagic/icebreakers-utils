import type {
  RollupOptions,
  OutputOptions,
  Plugin,
  InputOption,
  ExternalOption
} from 'rollup'
import type { DeletePluginOptions as RollupDeletePluginOptions } from './del'
import type { Options as RollupTerserOptions } from '@rollup/plugin-terser'
import type { RollupReplaceOptions } from '@rollup/plugin-replace'
import type { RollupTypescriptOptions } from '@rollup/plugin-typescript'
import type { RollupJsonOptions } from '@rollup/plugin-json'
import type { RollupCommonJSOptions } from '@rollup/plugin-commonjs'
import type { RollupNodeResolveOptions } from '@rollup/plugin-node-resolve'
export interface PackageJson {
  main?: string
  module?: string
  dependencies?: { [key: string]: string }
}

type PluginLoad<T> = false | T

export interface CreateRollupConfigOptions {
  rollupOptions?: RollupOptions
  external?: ExternalOption
  plugins?: Plugin[]
  input?: InputOption
  output?: OutputOptions | OutputOptions[]
  tsconfig?: string
  del?: PluginLoad<RollupDeletePluginOptions>
  terser?: PluginLoad<RollupTerserOptions>
  replace?: PluginLoad<RollupReplaceOptions>
  typescript?: PluginLoad<RollupTypescriptOptions>
  json?: PluginLoad<RollupJsonOptions>
  commonjs?: PluginLoad<RollupCommonJSOptions>
  nodeResolve?: PluginLoad<RollupNodeResolveOptions>
}

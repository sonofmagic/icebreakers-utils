import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import type { CreateRollupConfigOptions, PackageJson } from './type'
import type {
  RollupOptions,
  OutputOptions,
  Plugin,
  ExternalOption
} from 'rollup'
import terser from '@rollup/plugin-terser'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import { createDefu } from 'defu'
import path from 'path'
import del from './del'

const defu = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value)) {
    obj[key] = value
    return true
  }
})
// const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
// https://rollupjs.org/guide/en/#changed-defaults
export const legacyOutputOptions: Partial<OutputOptions> = {
  esModule: true,
  generatedCode: {
    reservedNamesAsProps: false
  },
  interop: 'compat',
  systemNullSetters: false
}

export function getDefaultOutputs(pkgJson: PackageJson) {
  const output: OutputOptions[] = []
  if (pkgJson.main) {
    output.push({
      file: pkgJson.main,
      format: 'cjs',
      sourcemap: isDev,
      exports: 'auto',
      ...legacyOutputOptions
    })
  }
  if (pkgJson.module) {
    output.push({
      format: 'esm',
      file: pkgJson.module,
      sourcemap: isDev,
      ...legacyOutputOptions
    })
  }
  return output
}

export function createRollupConfig(
  options: CreateRollupConfigOptions = {},
  pkg?: any
): RollupOptions {
  if (typeof pkg === 'undefined') {
    try {
      pkg = require(path.resolve(process.cwd(), 'package.json'))
    } catch (error) {
      throw new Error(
        'package.json not found, you should pass parameter pkg for package.json'
      )
    }
  }
  const pkgJson = pkg as PackageJson
  const {
    rollupOptions,
    external: postExternal,
    plugins: postPlugins,
    input,
    output: postOutput,
    del: rollupDeletePluginOptions,
    typescript: rollupTypescriptOptions,
    json: rollupJsonOptions,
    terser: rollupTerserOptions,
    replace: rollupReplaceOptions,
    nodeResolve: rollupNodeResolveOptions,
    commonjs: rollupCommonJSOptions
  } = defu(options, <CreateRollupConfigOptions>{
    input: 'src/index.ts',
    plugins: [],
    external: [],
    del: {
      targets: 'dist/*',
      verbose: true,
      runOnce: true
    },
    rollupOptions: {},
    typescript: {
      tsconfig: './tsconfig.json',
      sourceMap: isDev
    },
    nodeResolve: {
      preferBuiltins: true
    }
  })

  let output: OutputOptions[]
  if (Array.isArray(postOutput)) {
    output = postOutput
  } else if (typeof postOutput !== 'undefined') {
    output = [postOutput]
  } else {
    output = getDefaultOutputs(pkgJson)
  }

  const plugins = [...(<Plugin[]>postPlugins)]
  // default open

  if (rollupJsonOptions !== false) {
    plugins.push(json(rollupJsonOptions))
  }
  if (rollupTypescriptOptions !== false) {
    plugins.push(typescript(rollupTypescriptOptions))
  }
  if (rollupDeletePluginOptions !== false) {
    plugins.push(del(rollupDeletePluginOptions))
  }
  if (rollupNodeResolveOptions !== false) {
    plugins.push(nodeResolve(rollupNodeResolveOptions))
  }
  if (rollupCommonJSOptions !== false) {
    plugins.push(commonjs(rollupCommonJSOptions))
  }

  if (rollupTerserOptions) {
    plugins.push(terser(rollupTerserOptions))
  }
  if (rollupReplaceOptions) {
    plugins.push(replace(rollupReplaceOptions))
  }

  const defaultExternal = pkgJson.dependencies
    ? Object.keys(pkgJson.dependencies)
    : []
  const external: ExternalOption =
    typeof postExternal === 'function'
      ? postExternal
      : Array.isArray(postExternal)
        ? [...defaultExternal, ...postExternal]
        : [...defaultExternal, postExternal!]

  const config: RollupOptions = {
    input,
    output,
    plugins,
    external,
    makeAbsoluteExternalsRelative: true,
    preserveEntrySignatures: 'strict'
  }
  // rollupOptions first
  return defu(rollupOptions!, config)
}

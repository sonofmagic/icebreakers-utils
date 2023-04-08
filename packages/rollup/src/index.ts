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
import json from '@rollup/plugin-json'
import defu from 'defu'
import path from 'path'
import del from './del'

// import replace from '@rollup/plugin-replace'
// import { terser } from 'rollup-plugin-terser'
// const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
// https://rollupjs.org/guide/en/#changed-defaults
const legacyOutputOptions: Partial<OutputOptions> = {
  esModule: true,
  generatedCode: {
    reservedNamesAsProps: false
  },
  interop: 'compat',
  systemNullSetters: false
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
    rollupOptions = {},
    external: postExternal = [],
    plugins: postPlugins = [],
    input = 'src/index.ts',
    output: postOutput,
    deletePluginOptions = {}
  } = options

  let output: OutputOptions[]
  if (Array.isArray(postOutput)) {
    output = postOutput
  } else if (typeof postOutput !== 'undefined') {
    output = [postOutput]
  } else {
    output = []
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
  }

  const plugins: Plugin[] = [
    json(),
    nodeResolve({
      preferBuiltins: true
    }),
    commonjs(),
    typescript({
      tsconfig: options.tsconfig ?? './tsconfig.json',
      sourceMap: isDev
    }),
    del(
      defu(deletePluginOptions, {
        targets: 'dist/*',
        verbose: true,
        runOnce: true
      })
    ),
    ...postPlugins
  ]
  // if (isProd) {
  //   plugins.push(terser())
  // }

  const external: ExternalOption = [
    ...(pkgJson.dependencies ? Object.keys(pkgJson.dependencies) : []),
    ...postExternal
  ]

  const config: RollupOptions = {
    input,
    output,
    plugins,
    external,
    makeAbsoluteExternalsRelative: true,
    preserveEntrySignatures: 'strict'
  }

  return defu(rollupOptions, config)
}

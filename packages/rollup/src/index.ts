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

export function createRollupConfig (
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
  pkg as PackageJson
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
    if (pkg.main) {
      output.push({
        file: pkg.main,
        format: 'cjs',
        sourcemap: isDev,
        exports: 'auto'
      })
    }
    if (pkg.module) {
      output.push({ format: 'esm', file: pkg.module, sourcemap: isDev })
    }
  }

  const plugins: Plugin[] = [
    json(),
    nodeResolve({
      preferBuiltins: true
    }),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json', sourceMap: isDev }),
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
    ...(pkg.dependencies ? Object.keys(pkg.dependencies) : []),
    ...postExternal
  ]

  const config: RollupOptions = {
    input,
    output,
    plugins,
    external
  }

  return defu(rollupOptions, config)
}

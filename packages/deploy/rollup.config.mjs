import { createRollupConfig, legacyOutputOptions } from '@icebreakers/rollup'

export default createRollupConfig({
  input: {
    index: 'src/index.ts',
    cli: 'src/tencent/cli.ts'
  },
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      ...legacyOutputOptions
    },
    {
      dir: 'dist',
      entryFileNames: '[name].[format].js',
      chunkFileNames: '[name]-[hash].[format].js',
      format: 'esm',
      ...legacyOutputOptions
    }
  ]
})

import { createRollupConfig } from '@icebreakers/rollup'

export default createRollupConfig({
  input: {
    index: 'src/index.ts',
    cli: 'src/cli.ts'
  },
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: false
  }
})

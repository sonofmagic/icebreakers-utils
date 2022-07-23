import { createRollupConfig } from '@icebreakers/rollup'
const sourcemap = process.env.NODE_ENV === 'development'
export default createRollupConfig({
  input: {
    index: 'src/index.ts',
    cli: 'src/cli.ts'
  },
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap
  }
})

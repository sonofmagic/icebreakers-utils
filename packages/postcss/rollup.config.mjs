import { createRollupConfig } from '@icebreakers/rollup'

export default createRollupConfig({
  input: ['./src/px-to-viewport.ts'],
  rollupOptions: {
    output: [
      {
        file: 'dist/px-to-viewport.js',
        format: 'cjs',
        // sourcemap: isDev,
        exports: 'auto'
      }
    ]
  }
})

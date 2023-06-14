import { createRollupConfig, getDefaultOutputs } from '@icebreakers/rollup'
import pkg from './package.json' assert { type: 'json' }
// const pkg = require('./package.json')
const outputs = getDefaultOutputs(pkg)
const cjsOutput = outputs.find((x) => x.format === 'cjs')
// cjsOutput.exports = 'none'
export default createRollupConfig({
  output: [...outputs]
})

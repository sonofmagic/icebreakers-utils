import type { Stats } from './types'
import normalizeErrors from './normalizeErrors'

export default (stats: Stats) =>
  normalizeErrors(stats.compilation.warnings).sort()

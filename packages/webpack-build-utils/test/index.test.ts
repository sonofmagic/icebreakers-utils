import {
  compile,
  createLoader,
  execute,
  getContext,
  getErrors,
  getMemfsCompiler5,
  getWarnings,
  readAsset,
  readAssets,
  runLoaders
} from '@/index'

describe('index', () => {
  it('should exports', () => {
    for (const m of [
      compile,
      createLoader,
      execute,
      getContext,
      getErrors,
      getMemfsCompiler5,
      getWarnings,
      readAsset,
      readAssets,
      runLoaders
    ]) {
      expect(m).toBeDefined()
    }
  })
})

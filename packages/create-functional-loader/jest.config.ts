import type { Config } from 'jest'
import baseConfig from '../../jest.config'
const config: Config = {
  projects: [
    {
      ...baseConfig,
      modulePathIgnorePatterns: ['test/test.ts']
    }
  ]
}

export default config

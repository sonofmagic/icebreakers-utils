import type { Config } from 'jest'
const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node'
  // transform: {
  //   '\\.[jt]sx?$': 'babel-jest'
  // },
  // projects: ['<rootDir>/packages/*'],
  // setupFiles: ['./jest.setup.ts']
}

export default config

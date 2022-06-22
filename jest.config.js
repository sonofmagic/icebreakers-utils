/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  },
  projects: ['<rootDir>/packages/*'],
  setupFiles: ['./jest.setup.js']
}

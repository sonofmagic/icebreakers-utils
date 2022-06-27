const { install, eachDir, run } = require('../')
const path = require('path')
const fs = require('fs')
jest.setTimeout(60000)
describe('default', () => {
  test('eachDir', async () => {
    const res = []
    const t = path.resolve(__dirname, 'fixtures')
    await eachDir(t, (p) => {
      res.push(p)
    })
    expect(res).toEqual(fs.readdirSync(t))
  })

  test('eachDir', async () => {
    const res = []
    const t = path.resolve(__dirname, 'fixtures')
    await eachDir(t, (p) => {
      res.push(p)
    })
    expect(res).toEqual(fs.readdirSync(t))
  })

  test('install', async () => {
    await install(path.resolve(__dirname, 'fixtures'))
    await install(
      path.resolve(__dirname, 'fixtures'),
      '-D weapp-tailwindcss-webpack-plugin@latest tailwindcss-rem2px-preset@latest postcss-rem-to-responsive-pixel@latest'
    )
    expect(true).toBe(true)
  })

  test('run', async () => {
    await run(path.resolve(__dirname, 'fixtures'), 'test')
    expect(true).toBe(true)
  })
})

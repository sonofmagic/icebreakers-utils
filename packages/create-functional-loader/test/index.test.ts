import { expect, test } from 'vitest'
import { createFsFromVolume, Volume } from 'memfs'
import webpack from 'webpack'
import fs from 'fs'
import path from 'path'
import compile from './helper/compile'
import readAssets from './helper/readAssets'

const { createLoader } = require('../')

const resolve = (p) => path.resolve(__dirname, p)
// jest.setTimeout(60_000)
test('simple functional loader', async function () {
  const markHTML = Date.now() + '_html_' + Math.random()
  const markTs = Date.now() + '_ts_' + Math.random()
  const simple = function (source, map) {
    expect(source).toEqual(fs.readFileSync(resolve('test.ts'), 'utf8'))
    expect('resource' in this).toEqual(true)
    expect(this.webpack).toEqual(true)
    expect(this.loaderIndex).toEqual(1)

    this.callback(
      null,
      source.replace(/:\s*\w+? /g, ' ') + `/*${markTs}*/`,
      map,
      { foo: 'bar' }
    )
  }
  const compiler = webpack({
    mode: 'production',
    context: __dirname,
    entry: resolve('main.js'),
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '_main.js'
    },
    optimization: {
      minimize: false
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: createLoader(function (source) {
            expect(source).toEqual(
              fs.readFileSync(resolve('test.html'), 'utf8')
            )
            expect('resourceQuery' in this).toEqual(true)
            expect(this.webpack).toEqual(true)
            expect(this.loaderIndex).toEqual(0)

            return `module.exports = ${JSON.stringify(
              source.trim() + markHTML
            )}`
          })
        },
        {
          test: /\.ts$/,
          use: [
            createLoader(function (source, map, meta) {
              expect(source.indexOf(markTs) > 0).toBe(true)
              expect('resourcePath' in this).toBe(true)
              expect(this.webpack).toBe(true)
              expect(this.loaderIndex).toBe(0)
              expect(meta.foo).toBe('bar')

              return source
            }),
            createLoader(simple)
          ]
        }
      ]
    }
  })
  compiler.outputFileSystem = createFsFromVolume(new Volume())

  const stats = await compile(compiler)
  const assets = readAssets(compiler, stats)
  // expect(assets).toMatchSnapshot()
  const result = assets['_main.js']
  // const result = fs.readFileSync(
  //   path.resolve(compiler.outputPath, '_main.js'),
  //   'utf8'
  // )
  expect(result.indexOf(markHTML) > 0).toBe(true)
  expect(result.indexOf('functional loader') > 0).toBe(true)
  // compiler.run((err, stats) => {
  //   if (err || stats.hasErrors()) {
  //     expect(err || stats.compilation.errors).toBeFalsy()
  //   } else {
  //     const result = fs.readFileSync(
  //       path.resolve(compiler.outputPath, '_main.js'),
  //       'utf8'
  //     )
  //     expect(result.indexOf(markHTML) > 0).toBe(true)
  //     expect(result.indexOf('functional loader') > 0).toBe(true)
  //   }
  // })
})

test('show throw error', () => {
  const errorTest =
    /create-functional-loader: parameter passed to "createLoader" must be an ES5 function/
  expect(() => {
    createLoader(() => {})
  }).toThrowError(errorTest)

  expect(() => {
    createLoader(
      class {
        // eslint-disable-next-line no-useless-constructor
        constructor() {}
      }
    )
  }).toThrowError(errorTest)

  expect(() => {
    createLoader(this)
  }).toThrowError(errorTest)
})

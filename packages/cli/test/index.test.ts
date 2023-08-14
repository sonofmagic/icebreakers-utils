import path from 'node:path'
import fs from 'node:fs/promises'
import { install } from '@/index'
import { eachDir } from '@/utils'

async function getPkgJson(p: string) {
  return JSON.parse(await fs.readFile(p, 'utf8'))
}

describe('default', () => {
  const fixtures: string[] = []
  const fixturesPaths: string[] = []
  const fixturesPath = path.resolve(__dirname, 'fixtures')

  beforeAll(async () => {
    await eachDir(fixturesPath, (f) => {
      fixtures.push(path.basename(f))
      fixturesPaths.push(f)
    })
  })
  test('eachDir', () => {
    expect(fixtures).toEqual(['npm-case', 'pnpm-case', 'yarn-case'])
  })

  it('install', async () => {
    await install({
      cwd: fixturesPath
    })
  })

  // test('currentDir', async () => {
  //   const res: string[] = []
  //   const name = 'npm-case'
  //   const t = path.resolve(__dirname, 'fixtures/' + name)
  //   await currentDir(t, (p) => {
  //     res.push(p)
  //   })
  //   expect(res).toEqual([name])
  // })

  // test('install & remove', async () => {
  //   const installPkgs = [
  //     'weapp-tailwindcss-webpack-plugin',
  //     'tailwindcss-rem2px-preset',
  //     'postcss-rem-to-responsive-pixel'
  //   ]
  //   await raw(path.resolve(__dirname, 'fixtures/pnpm-case'), 'install')
  //   await install(path.resolve(__dirname, 'fixtures'), '', true)
  //   await install(
  //     path.resolve(__dirname, 'fixtures'),
  //     '-D ' + installPkgs.map((x) => x + '@latest').join(' '),
  //     true
  //   )
  //   for (const p of fixturesPaths) {
  //     const pkg = path.resolve(p, 'package.json')
  //     const devDependencies = getPkgJson(pkg).devDependencies
  //     for (const x of installPkgs) {
  //       expect(Boolean(devDependencies[x])).toBe(true)
  //     }
  //   }
  //   const removePkgs = installPkgs.slice(1)
  //   await remove(
  //     path.resolve(__dirname, 'fixtures'),
  //     removePkgs.join(' '),
  //     true
  //   )

  //   for (const p of fixturesPaths) {
  //     const pkg = path.resolve(p, 'package.json')
  //     // delete require.cache[pkg]
  //     const devDependencies = getPkgJson(pkg).devDependencies
  //     for (const x of removePkgs) {
  //       expect(Boolean(devDependencies[x])).toBe(false)
  //     }
  //   }

  //   expect(true).toBe(true)
  // })

  // test('run', async () => {
  //   await run(path.resolve(__dirname, 'fixtures'), 'test', true)
  //   expect(true).toBe(true)
  // })

  // test('raw', async () => {
  //   await raw(path.resolve(__dirname, 'fixtures'), 'run test', true)
  //   expect(true).toBe(true)
  // })
})

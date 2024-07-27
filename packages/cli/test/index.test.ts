import path from 'node:path'
import fs from 'node:fs'
import { currentDir, eachDir, install, raw, remove, run } from '@/index'

function getPkgJson(p: string) {
  return JSON.parse(
    fs.readFileSync(p, {
      encoding: 'utf-8',
    }),
  )
}

describe('default', () => {
  const fixtures: string[] = []
  const fixturesPaths: string[] = []
  const fixturesPath = path.resolve(__dirname, 'fixtures')

  beforeAll(async () => {
    await eachDir(fixturesPath, (f, p) => {
      fixtures.push(f)
      fixturesPaths.push(p)
    })
  })
  it('eachDir', async () => {
    expect(fixtures).toEqual(['npm-case', 'pnpm-case', 'yarn-case'])
  })

  it('currentDir', async () => {
    const res = []
    const name = 'npm-case'
    const t = path.resolve(__dirname, `fixtures/${name}`)
    await currentDir(t, (p) => {
      res.push(p)
    })
    expect(res).toEqual([name])
  })

  it('install & remove', async () => {
    const installPkgs = [
      'weapp-tailwindcss-webpack-plugin',
      'tailwindcss-rem2px-preset',
      'postcss-rem-to-responsive-pixel',
    ]
    await raw(path.resolve(__dirname, 'fixtures/pnpm-case'), 'install')
    await install(path.resolve(__dirname, 'fixtures'), true)
    await install(
      path.resolve(__dirname, 'fixtures'),
      `-D ${installPkgs.map(x => `${x}@latest`).join(' ')}`,
      true,
    )
    fixturesPaths.forEach((p) => {
      const pkg = path.resolve(p, 'package.json')
      const devDependencies = getPkgJson(pkg).devDependencies
      installPkgs.forEach((x) => {
        expect(Boolean(devDependencies[x])).toBe(true)
      })
    })
    const removePkgs = installPkgs.slice(1)
    await remove(
      path.resolve(__dirname, 'fixtures'),
      removePkgs.join(' '),
      true,
    )

    fixturesPaths.forEach((p) => {
      const pkg = path.resolve(p, 'package.json')
      // delete require.cache[pkg]
      const devDependencies = getPkgJson(pkg).devDependencies
      removePkgs.forEach((x) => {
        expect(Boolean(devDependencies[x])).toBe(false)
      })
    })

    expect(true).toBe(true)
  })

  it('run', async () => {
    await run(path.resolve(__dirname, 'fixtures'), 'test', true)
    expect(true).toBe(true)
  })

  it('raw', async () => {
    await raw(path.resolve(__dirname, 'fixtures'), 'run test', true)
    expect(true).toBe(true)
  })
})

import { runLoaders } from '../src'
import * as path from 'path'

const fixtures = path.resolve(__dirname, 'fixtures')
describe('index', () => {
  it('runLoaders promise', async () => {
    const result = await runLoaders({
      resource: path.resolve(fixtures, 'resource.bin')
    })
    expect(result.result).toEqual([Buffer.from('resource', 'utf-8')])
    expect(result.cacheable).toBe(true)
    expect(result.fileDependencies).toEqual([
      path.resolve(fixtures, 'resource.bin')
    ])
    expect(result.contextDependencies).toEqual([])
  })

  it('runLoaders callback', (done) => {
    runLoaders(
      {
        resource: path.resolve(fixtures, 'resource.bin')
      },
      (err, result) => {
        if (err) {
          done(err)
        }
        expect(result.result).toEqual([Buffer.from('resource', 'utf-8')])
        expect(result.cacheable).toBe(true)
        expect(result.fileDependencies).toEqual([
          path.resolve(fixtures, 'resource.bin')
        ])
        expect(result.contextDependencies).toEqual([])
        done()
      }
    )
  })
})

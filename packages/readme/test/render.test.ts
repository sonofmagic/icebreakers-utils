// import { ReadmeRender } from '../dist/index'
const { ReadmeRender } = require('..')
describe('ReadmeRender test', () => {
  beforeEach(() => {
    process.chdir(__dirname)
  })
  test('normal usage', () => {
    const render = new ReadmeRender({
      templatePath: './fixtures/template.md'
    })
    const v = 'hello world'
    const source = render.render([
      [/{{scoped}}/, v]
    ])
    expect(source.replace(/[\r\n]/g, '')).toBe(v)
  })
})

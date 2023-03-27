// import { ReadmeRender } from '../dist/index'
// const { ReadmeRender } = require('..')
import { ReadmeRender, collapse } from '../src/index'
import fs from 'fs'
import path from 'path'

describe('ReadmeRender test', () => {
  beforeEach(() => {
    process.chdir(__dirname)
  })
  test('normal usage', () => {
    const render = new ReadmeRender({
      templatePath: './fixtures/template.md'
    })
    const v = 'hello world'
    const source = render.render([[/{{scoped}}/, v]])
    expect(source.replace(/[\r\n]/g, '')).toBe(v)
  })

  test('collapse usage', () => {
    const render = new ReadmeRender({
      templatePath: './fixtures/template.md'
    })
    const v = collapse({
      summary: 'hello world',
      body: '# 对酒当歌人生几何!  a other row\n\naaa'
    })
    const source = render.render([[/{{scoped}}/, v]])
    fs.writeFileSync('./fixtures/collapse-usage.md', source)
    expect(true).toBe(true)
  })
})

// import { ReadmeRender } from '../dist/index'
// const { ReadmeRender } = require('..')
import fs from 'node:fs'
import { collapse, ReadmeRender } from '@/index'

describe('readmeRender test', () => {
  beforeEach(() => {
    process.chdir(__dirname)
  })
  it('normal usage', () => {
    const render = new ReadmeRender({
      templatePath: './fixtures/template.md',
    })
    const v = 'hello world'
    const source = render.render([[/\{\{scoped\}\}/, v]])
    expect(source.replace(/[\r\n]/g, '')).toBe(v)
  })

  it('collapse usage', () => {
    const render = new ReadmeRender({
      templatePath: './fixtures/template.md',
    })
    const v = collapse({
      summary: 'hello world',
      body: '# 对酒当歌人生几何!  a other row\n\naaa',
    })
    const source = render.render([[/\{\{scoped\}\}/, v]])
    fs.writeFileSync('./fixtures/collapse-usage.md', source)
    expect(true).toBe(true)
  })
})

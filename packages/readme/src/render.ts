import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

export interface ReadmeRenderOptions {
  templatePath?: string
  template?: string
  outputPath?: string
}

function getAbsPath(p: string) {
  if (path.isAbsolute(p)) {
    return p
  }
  else {
    return path.resolve(process.cwd(), p)
  }
}

export class ReadmeRender {
  public templatePath?: string
  public template?: string
  public outputPath: string
  constructor(options: ReadmeRenderOptions) {
    this.template = options.template
    this.templatePath = options.templatePath
    this.outputPath = options.outputPath ?? './README.md'
  }

  render(data: [RegExp, string][]) {
    const { template, templatePath } = this
    if (template || templatePath) {
      const tp = getAbsPath(templatePath as string)
      let rawTemplate
        = template
          ?? fs.readFileSync(tp, {
            encoding: 'utf-8',
          })
      for (let i = 0; i < data.length; i++) {
        const [regex, value] = data[i]
        rawTemplate = rawTemplate.replace(regex, value)
      }
      return rawTemplate
    }
    throw new TypeError(
      'one of template and templatePath option should have value',
    )
  }

  write(data: [RegExp, string][]) {
    const source = this.render(data)
    fs.writeFileSync(getAbsPath(this.outputPath), source, {
      encoding: 'utf-8',
    })
  }
}

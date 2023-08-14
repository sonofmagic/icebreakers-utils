import { run as _run, parseNi } from '@antfu/ni'
import { eachDir } from './utils'

async function run(options: { cwd?: string; args?: string[] } = {}) {
  const { args = [], cwd = process.cwd() } = options
  await eachDir(cwd, (path) => {
    return _run(parseNi, args, {
      cwd: path,
      programmatic: true,
      autoInstall: true
    })
  })
}

export { run }

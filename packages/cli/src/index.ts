import { run, parseNi } from '@antfu/ni'
import { eachDir } from './utils'

export async function install(options: { cwd?: string; args?: string[] } = {}) {
  const { args = [], cwd = process.cwd() } = options
  await eachDir(cwd, async (path) => {
    await run(parseNi, args, {
      cwd: path,
      programmatic: true
    })
  })
}

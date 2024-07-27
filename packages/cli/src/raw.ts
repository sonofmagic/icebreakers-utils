import process from 'node:process'
import { execa } from 'execa'
import PQueue from 'p-queue'
import { currentDir, eachDir, isExist } from './utils'
import type { PkgManager } from './enum'
import { lockFileEntries } from './enum'
// import os from 'os'
// const createExecFile = (pkgM: PkgManager, command?: string): string => {
//   return `${pkgM} ${command}`
// }

export function raw(
  pathLike: string,
  getCommand: string | ((pkgM: PkgManager) => string),
  subDir: boolean = false,
) {
  const fn = subDir ? eachDir : currentDir
  return fn(pathLike, async () => {
    // os.cpus().length
    const queue = new PQueue({ concurrency: 1 })
    for (let index = 0; index < lockFileEntries.length; index++) {
      const [pkgM, lockFile] = lockFileEntries[index]
      if (await isExist(lockFile)) {
        const command
          = typeof getCommand === 'string' ? getCommand : getCommand(pkgM)
        const subprocess = execa(pkgM, command.split(/\s/))
        subprocess.stdout?.pipe(process.stdout)
        // 并发
        queue.add(() => subprocess)
        // 串行
        // try {
        //   await subprocess
        // } catch (error) {
        //   console.error(error)
        // }
        // break
      }
    }
    await queue.onIdle()
  })
}

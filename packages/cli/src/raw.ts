import execa from 'execa'
import { isExist, eachDir, currentDir } from './utils'
import { PkgManager, lockFileEntries } from './enum'
import PQueue from 'p-queue'
import os from 'os'
const createExecFile = (pkgM: PkgManager, command?: string): string => {
  return `${pkgM} ${command}`
}

export function raw(
  pathLike: string,
  getCommand: string | ((pkgM: PkgManager) => string),
  subDir: boolean = false
) {
  const fn = subDir ? eachDir : currentDir
  return fn(pathLike, async (p) => {
    const queue = new PQueue({ concurrency: os.cpus().length })
    for (let index = 0; index < lockFileEntries.length; index++) {
      const [pkgM, lockFile] = lockFileEntries[index]
      if (await isExist(lockFile)) {
        const command =
          typeof getCommand === 'string' ? getCommand : getCommand(pkgM)
        const subprocess = execa(createExecFile(pkgM, command))
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

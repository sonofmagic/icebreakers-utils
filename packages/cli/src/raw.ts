import execa from 'execa'
import { isExist, eachDir } from './utils'
import { PkgManager, lockFileEntries } from './enum'

const createExecFile = (pkgM: PkgManager, command?: string): string => {
  return `${pkgM} ${command}`
}

export function raw (
  pathLike: string,
  getCommand: string | ((pkgM: PkgManager) => string)
) {
  return eachDir(pathLike, async (p) => {
    for (let index = 0; index < lockFileEntries.length; index++) {
      const [pkgM, lockFile] = lockFileEntries[index]
      if (await isExist(lockFile)) {
        const command =
          typeof getCommand === 'string' ? getCommand : getCommand(pkgM)
        const subprocess = execa(createExecFile(pkgM, command))
        subprocess.stdout?.pipe(process.stdout)
        await subprocess
        break
      }
    }
  })
}

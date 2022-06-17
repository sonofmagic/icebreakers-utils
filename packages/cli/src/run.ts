import execa from 'execa'
import { eachDir, isExist } from './utils'
import { PkgManager, runDirective, lockFileEntries } from './enum'

const getCommand = (pkgM: PkgManager, script: string): string => {
  return `${pkgM} ${runDirective[pkgM]} ${script}`
}

export async function run (pathLike: string, script: string) {
  return await eachDir(pathLike, async () => {
    for (let index = 0; index < lockFileEntries.length; index++) {
      const [pkgM, lockFile] = lockFileEntries[index]
      if (await isExist(lockFile)) {
        const subprocess = execa(getCommand(pkgM as PkgManager, script))
        subprocess.stdout?.pipe(process.stdout)
        await subprocess
        break
      }
    }
  })
}

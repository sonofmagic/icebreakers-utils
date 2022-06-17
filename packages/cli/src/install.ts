import execa from 'execa'
import { isExist, eachDir } from './utils'
import { PkgManager, addPkgDirective, lockFileEntries } from './enum'

const getCommand = (pkgM: PkgManager, pkg?: string): string => {
  if (pkg) {
    return `${pkgM} ${addPkgDirective[pkgM]} ${pkg}`
  } else {
    return `${pkgM} install`
  }
}
// await new Promise((resolve, reject) => {
//   subStdout.on('error', (err) => {
//     reject(err)
//   })
//   subStdout.on('end', () => {
//     resolve(undefined)
//   })
// })
export async function install (pathLike: string, pkg?: string) {
  return await eachDir(pathLike, async (p) => {
    for (let index = 0; index < lockFileEntries.length; index++) {
      const [pkgM, lockFile] = lockFileEntries[index]
      if (await isExist(lockFile)) {
        const subprocess = execa(getCommand(pkgM as PkgManager, pkg))
        subprocess.stdout?.pipe(process.stdout)
        await subprocess
        break
      }
    }
  })
}

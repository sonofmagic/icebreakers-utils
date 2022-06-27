import { raw } from './raw'
import { PkgManager, runDirective } from './enum'

export function run (pathLike: string, pkg?: string, subDir?: boolean) {
  const getCommand = (pkgM: PkgManager) => {
    return `${runDirective[pkgM]} ${pkg}`
  }
  return raw(pathLike, getCommand, subDir)
}

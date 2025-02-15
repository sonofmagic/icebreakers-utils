import type { PkgManager } from './enum'
import { addPkgDirective } from './enum'
import { raw } from './raw'

export function install(pathLike: string, pkg?: string, subDir?: boolean) {
  const getCommand = (pkgM: PkgManager) => {
    if (pkg) {
      return `${addPkgDirective[pkgM]} ${pkg}`
    }
    else {
      return 'install'
    }
  }
  return raw(pathLike, getCommand, subDir)
}

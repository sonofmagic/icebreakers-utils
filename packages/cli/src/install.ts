import { raw } from './raw'
import { PkgManager, addPkgDirective } from './enum'

export function install (pathLike: string, pkg?: string) {
  const getCommand = (pkgM: PkgManager) => {
    if (pkg) {
      return `${addPkgDirective[pkgM]} ${pkg}`
    } else {
      return 'install'
    }
  }
  return raw(pathLike, getCommand)
}

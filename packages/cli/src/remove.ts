import type { PkgManager } from './enum'
import { removePkgDirective } from './enum'
import { raw } from './raw'

export function remove(pathLike: string, pkg?: string, subDir?: boolean) {
  const getCommand = (pkgM: PkgManager) => {
    return `${removePkgDirective[pkgM]} ${pkg}`
  }
  return raw(pathLike, getCommand, subDir)
}

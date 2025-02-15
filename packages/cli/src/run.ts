import type { PkgManager } from './enum'
import { runDirective } from './enum'
import { raw } from './raw'

export function run(pathLike: string, pkg?: string, subDir?: boolean) {
  const getCommand = (pkgM: PkgManager) => {
    return `${runDirective[pkgM]} ${pkg}`
  }
  return raw(pathLike, getCommand, subDir)
}

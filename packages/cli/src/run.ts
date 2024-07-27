import { raw } from './raw'
import type { PkgManager } from './enum'
import { runDirective } from './enum'

export function run(pathLike: string, pkg?: string, subDir?: boolean) {
  const getCommand = (pkgM: PkgManager) => {
    return `${runDirective[pkgM]} ${pkg}`
  }
  return raw(pathLike, getCommand, subDir)
}

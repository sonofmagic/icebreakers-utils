export type PkgManager = 'yarn' | 'npm' | 'pnpm'

export const lockFileMap: Record<PkgManager, string> = {
  yarn: 'yarn.lock',
  npm: 'package-lock.json',
  pnpm: 'pnpm-lock.yaml'
}

export const addPkgDirective: Record<PkgManager, string> = {
  yarn: 'add',
  npm: 'i',
  pnpm: 'i'
}

export const runDirective: Record<PkgManager, string> = {
  yarn: '',
  npm: 'run',
  pnpm: ''
}

export const lockFileEntries = Object.entries(lockFileMap)

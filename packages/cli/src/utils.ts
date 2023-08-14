import { readdir, access, stat } from 'node:fs/promises'
import { resolve } from 'node:path'

export async function eachDir(
  pathLike: string,
  cb: (path: string) => void | Promise<void>
) {
  const filenames = await readdir(pathLike)
  for (const filename of filenames) {
    const path = resolve(pathLike, filename)
    const s = await stat(path)
    if (s.isDirectory()) {
      await cb(path)
    }
  }
}

export async function isExist(pathLike: string) {
  try {
    await access(pathLike)
    return true
  } catch {
    return false
  }
}

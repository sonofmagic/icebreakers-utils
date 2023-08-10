import fs from 'fs/promises'
import { Stats } from 'node:fs'
import path from 'path'

export async function currentDir(
  pathLike: string,
  cb: (basename: string, pathLike: string, stat: Stats) => void | Promise<void>
) {
  const stat = await fs.stat(pathLike)
  if (stat.isDirectory()) {
    if (await isExist(path.resolve(pathLike, 'package.json'))) {
      await cb(path.basename(pathLike), pathLike, stat)
    }
  }
}

export async function eachDir(
  pathLike: string,
  cb: (basename: string, pathLike: string, stat: Stats) => void | Promise<void>
) {
  const filenames = await fs.readdir(pathLike)
  for (let i = 0; i < filenames.length; i++) {
    const filename = filenames[i]
    const p = path.resolve(pathLike, filename)
    await currentDir(p, cb)
  }
}

export async function isExist(pathLike: string) {
  try {
    await fs.access(pathLike)
    return true
  } catch (error) {
    return false
  }
}

import fs from 'fs/promises'
import path from 'path'

export async function currentDir (pathLike: string, cb: (...args: any) => any) {
  const stat = await fs.stat(pathLike)
  if (stat.isDirectory()) {
    process.chdir(pathLike)
    if (await isExist('package.json')) {
      await cb(path.basename(pathLike), pathLike, stat)
    }
  }
}

export async function eachDir (pathLike: string, cb: (...args: any) => any) {
  const filenames = await fs.readdir(pathLike)
  for (let i = 0; i < filenames.length; i++) {
    const filename = filenames[i]
    const p = path.resolve(pathLike, filename)
    await currentDir(p, cb)
  }
}

export async function isExist (pathLike: string) {
  try {
    await fs.access(pathLike)
    return true
  } catch (error) {
    return false
  }
}

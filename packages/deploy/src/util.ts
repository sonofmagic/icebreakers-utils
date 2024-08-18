import path from 'node:path'
import process from 'node:process'
import klaw from 'klaw'

export function bytesToSize(bytes: number) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) {
    return '0 Byte'
  }
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${Math.round(bytes / 1024 ** i)} ${sizes[i]}`
}

export async function directorySize(dir: string) {
  let size = 0
  for await (const file of klaw(dir)) {
    const { stats } = file
    if (!stats.isDirectory()) {
      size += stats.size
    }
  }
  return size
}

export function getAbsolutePath(p: string, cwd: string = process.cwd()) {
  return path.isAbsolute(p) ? p : path.resolve(cwd, p)
}

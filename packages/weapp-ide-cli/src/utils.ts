import execa from 'execa'
import fs from 'fs/promises'

export async function exist (filepath: string, mode?: number): Promise<boolean> {
  try {
    await fs.access(filepath, mode)
    return true
  } catch (error) {
    return false
  }
}

export async function execute (cliPath: string, argv: string[]) {
  const task = execa(cliPath, argv)

  task?.stdout?.pipe(process.stdout)

  await task
  // 调用返回码为 0 时代表正常，为 -1 时错误。
  // task.exitCode === 0
  // task.exitCode === -1
}

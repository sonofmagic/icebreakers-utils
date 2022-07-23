
import fs from 'fs/promises'

export async function exist (filepath: string, mode?: number): Promise<boolean> {
  try {
    await fs.access(filepath, mode)
    return true
  } catch (error) {
    return false
  }
}

import os from 'node:os'

export const isWindows = os.type() === 'Windows_NT'

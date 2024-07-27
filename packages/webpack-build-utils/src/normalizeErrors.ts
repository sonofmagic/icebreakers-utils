import process from 'node:process'

function removeCWD(str: string) {
  const isWin = process.platform === 'win32'
  let cwd = process.cwd()

  if (isWin) {
    str = str.replaceAll('\\', '/')

    cwd = cwd.replaceAll('\\', '/')
  }

  return str.replaceAll(new RegExp(cwd, 'g'), '')
}

export default (errors: Error[]) =>
  errors.map(error =>
    removeCWD(error.toString().split('\n').slice(0, 2).join('\n')),
  )

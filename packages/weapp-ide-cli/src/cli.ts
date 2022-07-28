import fs from 'fs/promises'
import readline from 'readline'
import path from 'path'
import {
  defaultCustomConfigDirPath,
  defaultCustomConfigFilePath,
  defaultPath,
  operatingSystemName
} from './defaults'
import { exist, execute } from './utils'
import { compose } from './compose'
import type { IBaseConfig } from './types'
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const isSupported = Boolean(defaultPath)
const argv = process.argv.slice(2)

async function createCustomConfig (params: IBaseConfig) {
  const isExisted = await exist(defaultCustomConfigDirPath)
  if (!isExisted) {
    await fs.mkdir(defaultCustomConfigDirPath, { recursive: true })
  }
  await fs.writeFile(
    defaultCustomConfigFilePath,
    JSON.stringify(
      {
        cliPath: params.cliPath
      },
      null,
      2
    ),
    {
      encoding: 'utf8'
    }
  )
}
async function getConfig (): Promise<IBaseConfig> {
  const isExisted = await exist(defaultCustomConfigFilePath)
  if (isExisted) {
    const content = await fs.readFile(defaultCustomConfigFilePath, {
      encoding: 'utf8'
    })
    const config = JSON.parse(content)
    console.log('自定义cli路径：', config.cliPath)
    return config
  } else {
    return {
      cliPath: defaultPath
    }
  }
}
// https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
// https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html

function rlSetConfig () {
  console.log('请设置微信web开发者工具 cli 的路径')
  console.log('> 提示：命令行工具默认所在位置：')
  console.log('- MacOS: <安装路径>/Contents/MacOS/cli')
  console.log('- Windows: <安装路径>/cli.bat')
  return new Promise((resolve, reject) => {
    rl.question('请输入微信web开发者工具cli路径：', async (cliPath) => {
      await createCustomConfig({
        cliPath
      })
      console.log(`全局配置存储位置：${defaultCustomConfigFilePath}`)
      resolve(cliPath)
    })
  })
}

interface IAliasEntry {
  find: string
  replacement: string
}

function alias (argv: string[], entry: IAliasEntry) {
  let projectOptionIdx = argv.indexOf(entry.find)
  // alias -p as --project
  if (projectOptionIdx > -1) {
    argv[projectOptionIdx] = entry.replacement
  } else {
    projectOptionIdx = argv.indexOf(entry.replacement)
  }

  if (projectOptionIdx > -1) {
    const projectPathIdx = projectOptionIdx + 1
    const projectPath = argv[projectPathIdx]
    // 存在项目目录
    if (projectPath && projectPath[0] !== '-') {
      if (!path.isAbsolute(projectPath)) {
        argv[projectPathIdx] = path.resolve(process.cwd(), projectPath)
      }
    } else {
      argv.splice(projectPathIdx, 0, process.cwd())
    }
  }
  return argv
}

function createAlias (entry: IAliasEntry) {
  return function (argv: string[]) {
    return alias(argv, entry)
  }
}

async function main () {
  if (isSupported) {
    const { cliPath } = await getConfig()
    const isExisted = await exist(cliPath)
    if (isExisted) {
      if (argv[0] === 'config') {
        await rlSetConfig()
        return
      }

      const formattedArgv = compose(
        createAlias({ find: '-p', replacement: '--project' })
      )(argv)

      await execute(cliPath, formattedArgv)
    } else {
      console.log(
        '在当前自定义路径中,未找到微信web开发者命令行工具，请重新指定路径'
      )
      await rlSetConfig()
    }
  } else {
    console.log(`微信web开发者工具不支持当前平台：${operatingSystemName} !`)
  }
}
main().finally(() => {
  process.exit()
})

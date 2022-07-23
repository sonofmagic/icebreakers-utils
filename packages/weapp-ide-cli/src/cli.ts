import execa from 'execa'
import fs from 'fs/promises'
import readline from 'readline'
import path from 'path'
import {
  defaultCustomConfigDirPath,
  defaultCustomConfigFilePath,
  defaultPath,
  operatingSystemName
} from './defaults'
import { exist } from './utils'
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
async function getConfig (): Promise<{ cliPath: string }> {
  const isExisted = await exist(defaultCustomConfigFilePath)
  if (isExisted) {
    const content = await fs.readFile(defaultCustomConfigFilePath, {
      encoding: 'utf8'
    })
    const config = JSON.parse(content)
    console.log('自定义Cli路径：', config.cliPath)
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
  console.log('请设置微信web开发者工具 cli 的路径：')
  console.log('提示：命令行工具默认所在位置：')
  console.log('macOS: <安装路径>/Contents/MacOS/cli')
  console.log('Windows: <安装路径>/cli.bat')
  return new Promise((resolve, reject) => {
    rl.question('请输入微信web开发者工具 cli 的路径：', async (cliPath) => {
      await createCustomConfig({
        cliPath
      })
      console.log(`全局配置存储位置：${defaultCustomConfigFilePath}`)
      resolve(cliPath)
    })
  })
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
      let projectOptionIdx = argv.indexOf('-p')
      // alias -p as --project
      if (projectOptionIdx > -1) {
        argv[projectOptionIdx] = '--project'
      } else {
        projectOptionIdx = argv.indexOf('--project')
      }

      if (projectOptionIdx > -1) {
        const projectPathIdx = projectOptionIdx + 1
        const projectPath = argv[projectPathIdx]
        // 存在项目目录
        if (projectPath) {
          if (!path.isAbsolute(projectPath)) {
            argv[projectPathIdx] = path.resolve(process.cwd(), projectPath)
          }
        } else {
          argv.splice(projectPathIdx, 0, process.cwd())
        }
      }
      const task = execa(cliPath, argv)

      task?.stdout?.pipe(process.stdout)

      await task
      // 调用返回码为 0 时代表正常，为 -1 时错误。
      // task.exitCode === 0
      // task.exitCode === -1
    } else {
      await rlSetConfig()
    }
  } else {
    console.log(`微信web开发者工具不支持当前平台：${operatingSystemName} !`)
  }
}
main().finally(() => {
  process.exit()
})

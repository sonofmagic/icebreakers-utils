import os from 'os'
import execa from 'execa'
import path from 'path'
import fs from 'fs/promises'
import readline from 'readline'
const osType = os.type()
const isWindows = osType === 'Windows_NT'
const isMac = osType === 'Darwin'

// https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
// 没有 Linux 版本
// const isLinux = osType === 'Linux'
const homedir = os.homedir()

const defaultPathMap = {
  Windows_NT: 'C:\\Program Files (x86)\\Tencent\\微信web开发者工具\\cli.bat',
  Darwin: '/Applications/wechatwebdevtools.app/Contents/MacOS/cli'
}

process.cwd()
// https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html
const argv = process.argv.slice(2)

console.log(argv, homedir)

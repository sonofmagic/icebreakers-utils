# icebreakers-utils

## 项目目录

- `_template`: 模板项目
- `cli`: 自定义安装包的命令行工具，本质上是一段脚本，来让不同的子包根据 `lock` 文件的不同，自动选择 `npm`,`yarn`,`pnpm`
- `deploy`: 前端 `OSS` 静态网页部署包，暂时只支持腾讯云 `COS`
- `postcss`: 自用 `postcss plugin hub`， 目前里面暂时只放了一个 `px2viewport` 来给移动端使用
- `rollup`: 预设的 `rollup` 策略
- `serverless-http-proxy`: 快速部署一个 `serverless` 应用的代理函数
- `tsconfig`: 预设的 `tsconfig` 配置，用于继承
- `vue-pdf`: `headless vue hook for display pdf by pdfjs-dist`
- `weapp-ide-cli`: 二次封装的微信开发者工具 `cli` 来让它更加的好用

## 使用方法

具体见各个项目的 `README.md` 文件

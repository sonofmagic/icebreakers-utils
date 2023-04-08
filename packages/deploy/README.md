# @icebreakers/deploy

deploy website to cdn

## Install

```sh
yarn add -D @icebreakers/deploy
```

## Usages

### Cli

```env
# .env
TENCENT_SECRET_ID=
TENCENT_SECRET_KEY=
TENCENT_COS_REGION=
TENCENT_COS_BUCKET=
```

```sh
# default deploy
ice-deploy
# deploy before clean bucket
ice-deploy -c
# deploy dir
ice-deploy --dir build
```

### script

```js
require('dotenv').config()
const { TencentCOSWebsiteDeployer } = require('@icebreakers/deploy')

async function main() {
  const { TENCENT_SECRET_ID, TENCENT_SECRET_KEY, TENCENT_COS_REGION, TENCENT_COS_BUCKET } = process.env
  const deployer = new TencentCOSWebsiteDeployer({
    SecretKey: TENCENT_SECRET_KEY,
    SecretId: TENCENT_SECRET_ID
  })

  await deployer.uploadDir({
    Bucket: TENCENT_COS_BUCKET,
    Region: TENCENT_COS_REGION,
    clean: true,
    targetDir: 'build'
  })
}

main()
```

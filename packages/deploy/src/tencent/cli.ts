import dotenv from 'dotenv'
import { TencentCOSWebsiteDeployer } from './index'
import minimist from 'minimist'
dotenv.config()
const args = minimist(process.argv.slice(2))
async function main() {
  const {
    TENCENT_SECRET_ID,
    TENCENT_SECRET_KEY,
    TENCENT_COS_REGION,
    TENCENT_COS_BUCKET
  } = process.env
  const deployer = new TencentCOSWebsiteDeployer({
    SecretKey: TENCENT_SECRET_KEY,
    SecretId: TENCENT_SECRET_ID
  })

  await deployer.uploadDir({
    Bucket: TENCENT_COS_BUCKET,
    Region: TENCENT_COS_REGION,
    clean: args.c || args.clean || false,
    targetDir: args.dir ?? 'dist'
  })
}

main()

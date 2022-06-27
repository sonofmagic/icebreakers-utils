const path = require('path')

require('dotenv').config({
  path: path.resolve(__dirname, '.env')
})

const { TencentCOSWebsiteDeployer } = require('../')
describe('default', () => {
  /** @type {TencentCOSWebsiteDeployer} */
  let deployer
  beforeEach(() => {
    const { TENCENT_SECRET_ID, TENCENT_SECRET_KEY } = process.env
    deployer = new TencentCOSWebsiteDeployer({
      SecretKey: TENCENT_SECRET_KEY,
      SecretId: TENCENT_SECRET_ID
    })
  })
  test('batch delete list', async () => {
    const { TENCENT_COS_REGION, TENCENT_COS_BUCKET } = process.env
    const res = await deployer.cleanWebsiteContent({
      Bucket: TENCENT_COS_BUCKET,
      Region: TENCENT_COS_REGION
    })
    expect(res.statusCode).toBe(200)
    expect(res.Error.length).toBe(0)
  })
})

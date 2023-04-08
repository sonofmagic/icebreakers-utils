import COS from 'cos-nodejs-sdk-v5'
import klaw from 'klaw'
import fs from 'fs'
import path from 'path'
import cliProgress from 'cli-progress'
import { directorySize } from '../util'
import { isWindows } from '../env'
import type { CleanWebsiteContentParams, UploadDirOptions } from './types'
import {
  TencentCDNClient,
  ITencentCDNClient,
  PurgeUrlsCacheRequest,
  PurgePathCacheRequest
} from './cdn'

export class TencentCOSWebsiteDeployer {
  public cos: COS
  public cdn: ITencentCDNClient
  constructor(options: COS.COSOptions) {
    this.cos = new COS(options)
    this.cdn = new TencentCDNClient({
      credential: {
        secretId: options.SecretId,
        secretKey: options.SecretKey
      }
    })
  }

  putObject(params: COS.PutObjectParams) {
    const { cos } = this
    return cos.putObject(params)
  }

  getBucketWebsite(params: COS.GetBucketWebsiteParams) {
    const { cos } = this
    return cos.getBucketWebsite(params)
  }

  getBucket(params: COS.GetBucketParams) {
    const { cos } = this
    return cos.getBucket(params)
  }

  deleteMultipleObject(params: COS.DeleteMultipleObjectParams) {
    const { cos } = this
    return cos.deleteMultipleObject(params)
  }

  async cleanWebsiteContent(params: CleanWebsiteContentParams) {
    const { Bucket, Region, Prefix = '' } = params
    const MaxKeys = 1000
    const Marker = ''
    const getBucketRes = await this.getBucket({
      Bucket,
      Region,
      Marker,
      MaxKeys,
      Prefix
    })
    if (getBucketRes.Contents.length) {
      const deleteMultipleObjectRes = await this.deleteMultipleObject({
        Bucket,
        Region,
        Objects: getBucketRes.Contents.map((x) => ({
          Key: x.Key
        })),
        // @ts-ignore
        Quiet: true
      })
      return deleteMultipleObjectRes
    } else {
      const result: COS.DeleteMultipleObjectResult = {
        Deleted: [],
        Error: [],
        statusCode: 200
      }
      return result
    }
  }

  async uploadDir(options: UploadDirOptions = {}) {
    const {
      Bucket = '',
      Region = '',
      targetDir = 'dist',
      CacheControl = 'public,max-age=31536000',
      root = process.cwd(),
      clean = false
    } = options
    if (!Bucket) {
      throw new Error('Bucket is required')
    }
    if (!Region) {
      throw new Error('Region is required')
    }
    const absTargetPath = path.resolve(root, targetDir)

    const isExisted = fs.existsSync(absTargetPath)
    if (!isExisted) {
      throw new Error('target dir is not existed')
    }
    if (clean) {
      await this.cleanWebsiteContent({
        Bucket,
        Region
      })
      // TODO
      console.log('clean successfully!')
    }

    // create bar
    const totalSize = await directorySize(absTargetPath)
    const bar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic
    )
    bar.start(100, 0)
    // --------------------------------------------------
    let uploadSize = 0
    const res: COS.PutObjectResult[] = []
    for await (const file of klaw(absTargetPath)) {
      const { path: absPath, stats } = file
      if (stats.isFile()) {
        let Key = absPath.replace(absTargetPath, '')
        if (isWindows) {
          Key = Key.replace(/\\/g, '/')
        }
        const opt: COS.PutObjectParams = {
          Key,
          Body: fs.createReadStream(absPath),
          Bucket,
          Region
        }
        // .html?文件不缓存
        if (/\.html?$/.test(absPath)) {
          opt.CacheControl = 'no-cache'
        } else {
          opt.CacheControl = CacheControl
        }
        res.push(await this.putObject(opt))

        uploadSize += stats.size
        bar.update(parseFloat(((uploadSize * 100) / totalSize).toFixed(2)))
      }
    }
    bar.stop()
    console.log('Deploy successfully!')
    const website = await this.getBucketWebsite({
      Bucket,
      Region
    })
    if (website.statusCode === 200 && website.WebsiteConfiguration) {
      console.log(`https://${Bucket}.cos-website.${Region}.myqcloud.com`)
    }
    return res
  }

  purgeUrlsCache(options: PurgeUrlsCacheRequest) {
    return this.cdn.PurgeUrlsCache(options)
  }

  purgePathCache(options: PurgePathCacheRequest) {
    return this.cdn.PurgePathCache(options)
  }
}

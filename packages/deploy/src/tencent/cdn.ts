import { cdn } from 'tencentcloud-sdk-nodejs'
export type { Client as ITencentCDNClient } from 'tencentcloud-sdk-nodejs/tencentcloud/services/cdn/v20180606/cdn_client'
export type {
  PurgeUrlsCacheRequest,
  PurgePathCacheRequest
} from 'tencentcloud-sdk-nodejs/tencentcloud/services/cdn/v20180606/cdn_models'
export const TencentCDNClient = cdn.v20180606.Client

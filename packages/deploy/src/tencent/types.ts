export interface UploadDirOptions {
  Region?: string
  Bucket?: string
  CacheControl?: string
  /**
   * @description cwd() is the current working directory of the process.
   */
  root?: string
  targetDir?: string
  clean?: boolean
}

export interface CleanWebsiteContentParams {
  Region: string
  Bucket: string
  Prefix?: string
}

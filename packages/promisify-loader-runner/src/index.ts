import type {
  RunLoaderOption as InternalRunLoaderOption,
  RunLoaderResult,
} from 'loader-runner'
import { promisify } from 'node:util'
import { runLoaders as callbackRunLoaders, getContext } from 'loader-runner'

export type * from 'loader-runner'

const promisifyRunLoaders = promisify(callbackRunLoaders)

type RunLoaderOption = Partial<InternalRunLoaderOption>

function runLoaders(options: RunLoaderOption): Promise<RunLoaderResult>
function runLoaders(
  options: RunLoaderOption,
  callback: undefined
): Promise<RunLoaderResult>
function runLoaders(
  options: RunLoaderOption,
  callback: (err: NodeJS.ErrnoException | null, result: RunLoaderResult) => any
): void
function runLoaders(
  options: RunLoaderOption,
  callback?: (err: NodeJS.ErrnoException | null, result: RunLoaderResult) => any,
) {
  if (callback !== undefined) {
    return callbackRunLoaders(options as InternalRunLoaderOption, callback)
  }
  return promisifyRunLoaders(options as InternalRunLoaderOption)
}
export { getContext, runLoaders }

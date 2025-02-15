import type { Options } from 'del'
import type { Plugin } from 'rollup'
import { deleteAsync } from 'del'

export interface DeletePluginOptions extends Options {
  /**
   * Rollup hook the plugin should use.
   * @default 'buildStart'
   */
  readonly hook?: string

  /**
   * Delete items once. Useful in watch mode.
   * @default false
   */
  readonly runOnce?: boolean

  /**
   * Patterns of files and folders to be deleted.
   * @default []
   */
  readonly targets?: string | ReadonlyArray<string>

  /**
   * Outputs removed files and folders to console.
   * @default false
   */
  readonly verbose?: boolean
}

export default function del(options: DeletePluginOptions = {}): Plugin {
  const {
    hook = 'buildStart',
    runOnce = false,
    targets = [],
    verbose = false,
    ...rest
  } = options

  let deleted = false

  return {
    name: 'delete',
    [hook]: async () => {
      if (runOnce && deleted) {
        return
      }

      const paths = await deleteAsync(targets, rest)

      if (verbose || rest.dryRun) {
        const message = rest.dryRun
          ? `Expected files and folders to be deleted: ${paths.length}`
          : `Deleted files and folders: ${paths.length}`

        console.log(message)

        if (paths.length > 0) {
          paths.forEach((path) => {
            console.log(path)
          })
        }
      }

      deleted = true
    },
  }
}

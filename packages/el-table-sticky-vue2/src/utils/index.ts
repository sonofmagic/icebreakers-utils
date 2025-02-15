import type { DirectiveBinding, VNode } from 'vue'

export function convertToPx(value: number | string) {
  if (typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value)) {
    return `${value}px`
  }
  return String(value)
}

/**
 * Check directive is used on el-table
 * @param {object} binding binding
 * @param {object} vnode vnode
 */
export function checkElTable(binding: DirectiveBinding<object>, vnode: VNode) {
  if (
    vnode?.componentOptions?.tag === 'el-table'
    // @ts-ignore
    || vnode.elm.classList.contains('el-table')
  ) {
    return
  }
  throw new Error(`v-${binding.name} directive can only be used on el-table, but got ${vnode?.componentOptions?.tag}.`)
}

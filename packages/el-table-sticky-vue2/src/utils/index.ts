/**
 * Convert value to px or string, if value is number
 * @param {string | number} value input value
 * @returns {string}
 */
export function convertToPx(value) {
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
export function checkElTable(binding, vnode) {
  if (
    vnode?.componentOptions?.tag === 'el-table'
    || vnode.elm.classList.contains('el-table')
  ) {
    return
  }
  throw new Error(`v-${binding.name} directive can only be used on el-table, but got ${vnode?.componentOptions?.tag}.`)
}

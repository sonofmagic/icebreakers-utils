const hasOwnProperty = Object.prototype.hasOwnProperty

export function hasOwn (obj: any, key: string | symbol) {
  return hasOwnProperty.call(obj, key)
}

export function isVNode (node: unknown) {
  return (
    node !== null &&
    typeof node === 'object' &&
    hasOwn(node, 'componentOptions')
  )
}

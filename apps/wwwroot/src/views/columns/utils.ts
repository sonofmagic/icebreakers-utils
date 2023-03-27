const hasOwnProperty = Object.prototype.hasOwnProperty

export function hasOwn(obj: unknown, key: string | symbol) {
  return hasOwnProperty.call(obj, key)
}

export function isVNode(node: unknown) {
  return (
    node !== null &&
    typeof node === 'object' &&
    hasOwn(node, 'componentOptions')
  )
}

export const VNodes = {
  functional: true,
  render: (
    h: (...args: unknown[]) => unknown,
    {
      props
    }: {
      props: {
        vnodes: unknown
      }
    }
  ) => {
    return props.vnodes
  }
}

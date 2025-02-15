import type { Table } from 'element-ui'
import type { ObjectDirective, VNode } from 'vue'
import { checkElTable } from '@/utils'
import { addResizeListener, removeResizeListener } from '@/utils/resize-event'
/**
 * @class HeightAdaptive
 * @classdesc height adaptive for el-table
 */
export default class HeightAdaptive {
  static name = 'HeightAdaptive'

  /**
   * the offset of the table from the bottom of the page
   * @type {number}
   * @private
   */
  #offsetBottom

  /**
   * Constructor for HeightAdaptive
   * @param {object} options options from Vue.use
   * @param {number} [options.offsetBottom] the offset of the table from the bottom of the page
   */
  constructor({ offsetBottom = 0 }) {
    this.#offsetBottom = offsetBottom
  }

  #doResize(el: Element, vnode: VNode) {
    const { componentInstance } = vnode
    const $table = componentInstance as Table
    if (!$table.height) {
      throw new Error('el-table must set the height. Such as height=\'100px\'')
    }
    if (!$table) {
      return
    }
    // @ts-ignore
    const offsetBottom = el.__offsetBottom__ ?? this.#offsetBottom
    const height = window.innerHeight - el.getBoundingClientRect().top - offsetBottom
    // @ts-ignore
    $table.layout.setHeight(height)
    $table.doLayout()
  }

  /**
   * Init directive config for Vue
   * @returns {object} directive config
   */
  init(): ObjectDirective {
    return {
      bind: (el, binding, vnode) => {
        checkElTable(binding, vnode)
        el.__offsetBottom__ = binding?.value?.offsetBottom
        el.__resizeListener__ = () => {
          this.#doResize(el, vnode)
        }
        // parameter 1 is must be "Element" type
        addResizeListener(window.document.body, el.__resizeListener__)
      },
      update: (el, binding, vnode) => {
        if (el.__offsetBottom__ !== binding.value?.offsetBottom) {
          el.__offsetBottom__ = binding?.value?.offsetBottom
          this.#doResize(el, vnode)
        }
      },
      unbind: (el) => {
        removeResizeListener(window.document.body, el.__resizeListener__)
      },
    }
  }
}

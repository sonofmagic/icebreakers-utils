import type { StickyOptions } from '@/utils/sticky'
import type { ObjectDirective } from 'vue'
import { checkElTable } from '@/utils'
import Scroller from '@/utils/scroller'

export interface StickyScrollerOptions extends StickyOptions {

}

/**
 * @class StickyScroller
 * @classdesc sticky horizontal scrollbar for el-table
 */
export default class StickyScroller {
  static name = 'StickyScroller'
  offsetBottom: number
  constructor({ offsetBottom = 0 }: StickyScrollerOptions) {
    this.offsetBottom = offsetBottom
  }

  /**
   * Init directive config for Vue
   * @returns {object} directive config
   */
  init(): ObjectDirective {
    return {
      inserted: (el, binding, vnode) => {
        checkElTable(binding, vnode)
        el.scroller = new Scroller(el, binding, vnode, this.offsetBottom)
      },
      unbind: (el) => {
        if (el.scroller) {
          el.scroller.scrollbar?.destroy()
          el.scroller = null
        }
      },
    }
  }
}

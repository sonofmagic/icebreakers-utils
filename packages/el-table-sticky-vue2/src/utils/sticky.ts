// @ts-nocheck
import type { ObjectDirective } from 'vue'
import { checkElTable, convertToPx } from '@/utils'
import Scroller from '@/utils/scroller'

export interface StickyOptions {
  offsetTop?: number
  offsetBottom?: number
}

const defaultScrollbarHeight = 10
/**
 * @class Sticky
 * @classdesc sticky header or footer for el-table
 * @abstract
 */
export default class Sticky {
  /**
   * from new.target.name
   * @type {string}
   * @private
   */
  #target

  /**
   * Constructor for StickyHeader and StickyFooter
   * @param {object} options options from Vue.use
   * @param {number | string} [options.offsetTop] the top offset of the table header
   * @param {number | string} [options.offsetBottom] the bottom offset of the table footer
   */
  constructor({ offsetTop = 0, offsetBottom = 0 }) {
    this.#target = new.target.name
    if (this.#target === 'StickyHeader') {
      this.offsetTop = convertToPx(offsetTop)
      this.offsetBottom = convertToPx(offsetBottom) // for horizontal scrollbar
    }
    if (this.#target === 'StickyFooter') {
      this.offsetBottom = convertToPx(offsetBottom)
    }
  }

  /**
   * Stack sticky for left fixed columns
   * @param {Array} tableCell table header or footer cells
   */
  #stackLeftColumns(tableCell = []) {
    let stickyLeft = 0
    for (let i = 0; i < tableCell.length; i++) {
      const th = tableCell[i]
      if (th.classList.contains('is-hidden')) {
        th.dataset.sticky = 'left'
        th.style.left = `${stickyLeft}px`
        stickyLeft += th.offsetWidth
        // set data-sticky-left-last attribute for last left fixed column
        if (!th.nextElementSibling?.classList.contains('is-hidden')) {
          th.dataset.sticky = 'end'
          break
        }
      }
      else if (i === 0) {
        // no left fixed columns
        break
      }
    }
  }

  /**
   * Stack sticky for right fixed columns
   * @param {Array} tableCell table header or footer cells
   */
  #stackRightColumns(tableCell = []) {
    let stickyRight = 0
    for (let i = tableCell.length - 1; i >= 0; i--) {
      const th = tableCell[i]
      if (th.classList.contains('is-hidden') && !th.dataset.sticky) {
        th.dataset.sticky = 'right'
        th.style.right = `${stickyRight}px`
        stickyRight += th.offsetWidth
        // set data-sticky-right-first attribute for first right fixed column
        if (!th.previousElementSibling?.classList.contains('is-hidden')) {
          th.dataset.sticky = 'start'
          break
        }
      }
    }
  }

  /**
   * Get table header or footer cells
   * @param {Element} el el-table element
   * @param {object} binding binding
   * @returns {Array<Element>} table header or footer cells
   */
  #getStickyWrapperCells(el, binding) {
    const { value } = binding
    let selector, styleProperty, offsetProperty

    if (this.#target === 'StickyHeader') {
      selector = '.el-table__header'
      styleProperty = 'top'
      offsetProperty = 'offsetTop'
    }

    if (this.#target === 'StickyFooter') {
      selector = '.el-table__footer'
      styleProperty = 'bottom'
      offsetProperty = 'offsetBottom'
    }

    const tableStickyWrapper = el.querySelector(`${selector}-wrapper`)
    tableStickyWrapper.style[styleProperty] = value?.[offsetProperty] !== void 0
      ? convertToPx(value[offsetProperty])
      : this[offsetProperty]
      // element-ui 2.15.0 是没有这个 .el-table__cell 的
      // 但是 .el-table__cell 在 2.15.14 版本是有的
    const selectorAll = `${selector} ${this.#target === 'StickyHeader' ? 'th' : 'td'}`
    return tableStickyWrapper.querySelectorAll(selectorAll)
  }

  /**
   * Init scroller for el-table v-sticky-header or v-sticky-footer
   */
  async #initScroller(el, binding, vnode) {
    const { value } = binding
    // windows 下必须设置这个配置
    vnode.componentInstance.layout.gutterWidth = value?.scrollbarHeight ?? defaultScrollbarHeight
    const scrollerOffsetBottom = value?.offsetBottom !== void 0 ? convertToPx(value.offsetBottom) : this.offsetBottom
    if (this.#target === 'StickyFooter' && el.scroller) {
      // wait for el-table render
      await vnode.componentInstance.$nextTick()
      el.scroller.scrollbar?.destroy()
      el.scroller = null
    }
    el.scroller = new Scroller(el, binding, vnode, scrollerOffsetBottom)
  }

  /**
   * Stack sticky left and right columns for el-table header or footer
   * @param {Element} el el-table element
   * @param {object} binding binding
   * @param {object} vnode vnode
   * @private
   */
  async #stackStickyColumns(el, binding, vnode) {
    // wait for el-table render
    await vnode.componentInstance.$nextTick()

    const tableCell = this.#getStickyWrapperCells(el, binding)

    this.#stackLeftColumns(tableCell)
    this.#stackRightColumns(tableCell)
  }

  /**
   * Init directive config for Vue
   * @returns {object} directive config
   */
  init(): ObjectDirective {
    return {
      inserted: (el, binding, vnode) => {
        checkElTable(binding, vnode)
        // set data-sticky-* attribute for el-table
        el.dataset[this.#target.replace(/^\S/, s => s.toLowerCase())] = ''

        this.#initScroller(el, binding, vnode)
      },
      update: (el, binding, vnode) => {
        this.#stackStickyColumns(el, binding, vnode)
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

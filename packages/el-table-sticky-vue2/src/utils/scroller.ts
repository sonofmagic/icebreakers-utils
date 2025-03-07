// @ts-nocheck
import { convertToPx } from '@/utils'
// reference https://github.com/noeldelgado/gemini-scrollbar
// @ts-ignore
import GeminiScrollbar from 'gemini-scrollbar'
import { throttle } from 'throttle-debounce'

const THROTTLE_TIME = 1000 / 60

/**
 * @class Scroller
 * @classdesc sticky horizontal scrollbar for el-table
 */
export default class Scroller {
  constructor(el: any, binding: any, vnode: any, offsetBottom = 0) {
    this.offsetBottom = convertToPx(offsetBottom)
    this.#createScroller(el, binding, vnode)
  }

  /**
   * Create custom horizontal scrollbar for el-table
   * @param {Element} el el-table element
   * @param {object} binding binding
   * @param {object} vnode vnode
   */
  async #createScroller(el: { scroller: any, dataset: { stickyScroll: string }, querySelector: (arg0: string) => HTMLDivElement, appendChild: (arg0: any) => void }, binding: { value: any }, vnode: { componentInstance: { $nextTick: () => any } }) {
    // create scroller only once for the same el-table
    if (el.scroller) {
      return
    }
    // wait for el-table render
    await vnode.componentInstance.$nextTick()

    const { value } = binding
    el.dataset.stickyScroll = ''
    const tableBodyWrapperEl = el.querySelector('.el-table__body-wrapper')
    // create scroller
    const scroller = el.querySelector('.el-table-horizontal-scrollbar') || document.createElement('div')
    scroller.classList.toggle('el-table-horizontal-scrollbar', true)
    scroller.style.cssText = `
      bottom: ${value?.offsetBottom !== void 0 ? convertToPx(value.offsetBottom) : this.offsetBottom};
      display: ${tableBodyWrapperEl.classList.contains('is-scrolling-none') ? 'none' : ''};
    `
    // set scroller content width to .el-table__body width
    const scrollContent = el.querySelector('.proxy-table-body') || document.createElement('div')
    scrollContent.classList.toggle('proxy-table-body', true)
    scrollContent.style.width = `${tableBodyWrapperEl.querySelector('.el-table__body').offsetWidth}px`
    scroller.appendChild(scrollContent)
    el.appendChild(scroller)

    this.scroller = scroller
    this.scrollContent = scrollContent
    this.tableBodyWrapperEl = tableBodyWrapperEl

    this.#initScrollBar(binding)
    this.#initListenerAndObserver()
  }

  /**
   * Init scroll bar
   * @param {object} binding binding
   */
  #initScrollBar(binding: { modifiers: { always?: false | undefined } }) {
    const { always = false } = binding.modifiers
    this.scrollbar = new GeminiScrollbar({
      element: this.scroller,
      forceGemini: true,
      autoshow: !always,
    }).create()
  }

  /**
   * Init listener and observer
   */
  #initListenerAndObserver() {
    const { tableBodyWrapperEl } = this
    const scrollViewEl = this.scrollbar.getViewElement()

    const bar = this.scrollbar.element.querySelector('.gm-scrollbar.-horizontal')
    const thumb = bar.querySelector('.thumb')

    // sync tableBodyWrapperEl horizontal scroll to scrollView
    tableBodyWrapperEl.addEventListener('scroll', throttle(THROTTLE_TIME, () => {
      // 1. calculate the percentage of table scroll
      // 2. calculate the position of the scrollbar according to the percentage
      const scrollPercent = tableBodyWrapperEl.scrollLeft / (tableBodyWrapperEl.scrollWidth - tableBodyWrapperEl.offsetWidth)
      thumb.style.transform = `translate3d(${scrollPercent * (bar.offsetWidth - thumb.offsetWidth)}px, 0px, 0px)`

      // NOTE due to the disabled native scrollbar, gemini-scrollbar will calculate the deviation in the following way
      // scrollViewEl.scrollLeft = tableBodyWrapperEl.scrollLeft
    }))
    // sync scrollViewEl horizontal scroll to tableBodyWrapperEl
    scrollViewEl.addEventListener('scroll', throttle(THROTTLE_TIME, () => {
      tableBodyWrapperEl.scrollLeft = scrollViewEl.scrollLeft
    }))

    // observe .el-table__body width change
    const observer = new MutationObserver(() => this.update())
    observer.observe(tableBodyWrapperEl.querySelector('.el-table__body'), {
      attributes: true,
      attributeFilter: ['style'],
    })
  }

  /**
   * Recalculate the viewbox and scrollbar dimensions
   */
  update() {
    this.scroller.style.display = this.tableBodyWrapperEl.classList.contains('is-scrolling-none') ? 'none' : ''
    this.scrollContent.style.width = `${this.tableBodyWrapperEl.querySelector('.el-table__body').offsetWidth}px`
    this.scrollbar.update()
  }
}

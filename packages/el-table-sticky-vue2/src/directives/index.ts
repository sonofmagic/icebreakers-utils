import type { VueConstructor } from 'vue'
import HeightAdaptive from './height-adaptive'
import StickyFooter from './sticky-footer'
import StickyHeader from './sticky-header'
import StickyScroller from './sticky-scroller'
import './css/sticky-scroller.scss'

export {
  HeightAdaptive,
  StickyFooter,
  StickyHeader,
  StickyScroller,
}

const plugin = {
  /**
   * Install directives
   * @param {Constructor} Vue Vue Constructor
   * @param {object} [options] options from Vue.use
   * @param {object} [options.StickyHeader] options for v-sticky-header
   * @param {number | string} [options.StickyHeader.offsetTop] the top offset of the table header
   * @param {number | string} [options.StickyHeader.offsetBottom] the bottom offset of horizontal scrollbar
   * @example <el-table v-sticky-header="{ offsetTop: 0 }">...</el-table>
   *
   * @param {object} [options.StickyFooter] options for v-sticky-footer
   * @param {number | string} [options.StickyFooter.offsetBottom] the bottom offset of the table footer
   * @example <el-table v-sticky-footer="{ offsetBottom: 0 }">...</el-table>
   *
   * @param {object} [options.StickyScroller] options for v-sticky-scroller
   * @param {number | string} [options.StickyScroller.offsetBottom] the bottom offset of the table horizontal scroller
   * @example <el-table v-sticky-scroller="{ offsetBottom: 0 }">...</el-table>
   *
   * @param {object} [options.HeightAdaptive] options for v-height-adaptive
   * @param {number} [options.HeightAdaptive.offsetBottom] the offset of the table from the bottom of the page
   * @example <el-table v-height-adaptive="{ offsetBottom: 0 }" height="100px">...</el-table>
   */
  install(Vue: VueConstructor, options = {}) {
    const {
      StickyHeader: headerOptions = {},
      StickyFooter: footerOptions = {},
      StickyScroller: scrollerOptions = {},
      HeightAdaptive: adaptiveOptions = {},
    } = options

    Vue.directive(StickyHeader.name, new StickyHeader(headerOptions).init())
    Vue.directive(StickyFooter.name, new StickyFooter(footerOptions).init())
    Vue.directive(StickyScroller.name, new StickyScroller(scrollerOptions).init())
    Vue.directive(HeightAdaptive.name, new HeightAdaptive(adaptiveOptions).init())
  },
}

// let GlobalVue = null
// if (typeof window !== 'undefined') {
//   GlobalVue = window.Vue
// }
// else if (typeof global !== 'undefined') {
//   GlobalVue = global.Vue
// }

// if (GlobalVue) {
//   GlobalVue.use(plugin)
// }

export default plugin

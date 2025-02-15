import type { StickyOptions } from '@/utils/sticky'
import Sticky from '@/utils/sticky'
import './css/sticky-footer.scss'

export interface StickyFooterOptions extends StickyOptions {

}
/**
 * @class StickyFooter
 * @classdesc sticky footer for el-table
 * @extends Sticky
 */
export default class StickyFooter extends Sticky {
  static name = 'StickyFooter'
}

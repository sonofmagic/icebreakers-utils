import type { StickyOptions } from '@/utils/sticky'
import Sticky from '@/utils/sticky'
import './css/sticky-header.scss'

export interface StickyHeaderOptions extends StickyOptions {

}

/**
 * @class StickyHeader
 * @classdesc sticky header for el-table
 * @extends Sticky
 */
export default class StickyHeader extends Sticky {
  static name = 'StickyHeader'
}

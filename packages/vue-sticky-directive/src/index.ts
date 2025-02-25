import type { ObjectDirective } from 'vue'
import { defu } from 'defu'
import Vue from 'vue'

const events = [
  'resize',
  'scroll',
  'touchstart',
  'touchmove',
  'touchend',
  'pageshow',
  'load',
]

function batchStyle(el: HTMLElement, style: Record<string, any> = {}, className: Record<string, any> = {}) {
  for (const k in style) {
    // @ts-ignore
    el.style[k] = style[k]
  }
  for (const k in className) {
    if (className[k] && !el.classList.contains(k)) {
      el.classList.add(k)
    }
    else if (!className[k] && el.classList.contains(k)) {
      el.classList.remove(k)
    }
  }
}

class Sticky {
  el: HTMLElement
  unsubscribers: Array<() => void>
  isPending: boolean
  state: Record<string, any>
  lastState: Record<string, any>
  options: Record<string, any>
  placeholderEl!: HTMLElement
  containerEl!: HTMLElement

  constructor(el: HTMLElement, options?: StickyOptions) {
    this.el = el
    this.unsubscribers = []
    this.isPending = false
    this.state = {
      isTopSticky: null,
      isBottomSticky: null,
      height: null,
      width: null,
      xOffset: null,
    }

    this.lastState = {
      top: null,
      bottom: null,
      sticked: false,
    }

    const offset = {
      top: options?.topOffset ?? 0,
      bottom: options?.bottomOffset ?? 0,
    }
    const side = options?.side || 'top'
    const zIndex = options?.zIndex || '10'
    const onStick = options?.onStick || null

    this.options = {
      topOffset: Number(offset.top) || 0,
      bottomOffset: Number(offset.bottom) || 0,
      shouldTopSticky: side === 'top' || side === 'both',
      shouldBottomSticky: side === 'bottom' || side === 'both',
      zIndex,
      onStick,
    }
  }

  doBind() {
    if (this.unsubscribers.length > 0) {
      return
    }
    const { el } = this
    Vue.nextTick(() => {
      this.placeholderEl = document.createElement('div')
      this.containerEl = this.getContainerEl()
      el.parentNode?.insertBefore(this.placeholderEl, el)
      events.forEach((event) => {
        const fn = this.update.bind(this)
        this.unsubscribers.push(() => window.removeEventListener(event, fn))
        this.unsubscribers.push(() =>
          this.containerEl.removeEventListener(event, fn),
        )
        window.addEventListener(event, fn, { passive: true })
        this.containerEl.addEventListener(event, fn, { passive: true })
      })
    })
  }

  doUnbind() {
    this.unsubscribers.forEach(fn => fn())
    this.unsubscribers = []
    this.resetElement()
  }

  update() {
    if (!this.isPending) {
      requestAnimationFrame(() => {
        this.isPending = false
        this.recomputeState()
        this.updateElements()
      })
      this.isPending = true
    }
  }

  isTopSticky() {
    if (!this.options.shouldTopSticky) {
      return false
    }
    const fromTop = this.state.placeholderElRect.top
    const fromBottom = this.state.containerElRect.bottom

    const topBreakpoint = this.options.topOffset
    const bottomBreakpoint = this.options.bottomOffset

    return fromTop <= topBreakpoint && fromBottom >= bottomBreakpoint
  }

  isBottomSticky() {
    if (!this.options.shouldBottomSticky) {
      return false
    }
    const fromBottom
      = window.innerHeight - this.state.placeholderElRect.top - this.state.height
    const fromTop = window.innerHeight - this.state.containerElRect.top

    const topBreakpoint = this.options.topOffset
    const bottomBreakpoint = this.options.bottomOffset

    return fromBottom <= bottomBreakpoint && fromTop >= topBreakpoint
  }

  recomputeState() {
    const placeholderElRect = this.getPlaceholderElRect()
    const elRect = this.getElRect()
    this.state = Object.assign({}, this.state, {
      height: elRect.height,
      width: placeholderElRect.width,
      xOffset: placeholderElRect.left,
      placeholderElRect,
      containerElRect: this.getContainerElRect(),
    })
    this.state.isTopSticky = this.isTopSticky()
    this.state.isBottomSticky = this.isBottomSticky()
  }

  fireEvents() {
    if (
      typeof this.options.onStick === 'function'
      && (this.lastState.top !== this.state.isTopSticky
        || this.lastState.bottom !== this.state.isBottomSticky
        || this.lastState.sticked
        !== (this.state.isTopSticky || this.state.isBottomSticky))
    ) {
      this.lastState = {
        top: this.state.isTopSticky,
        bottom: this.state.isBottomSticky,
        sticked: this.state.isBottomSticky || this.state.isTopSticky,
      }
      this.options.onStick(this.lastState)
    }
  }

  updateElements() {
    const placeholderStyle: Record<string, number | string> = { paddingTop: 0 }
    const elStyle = {
      position: 'static',
      top: 'auto',
      bottom: 'auto',
      left: 'auto',
      width: 'auto',
      zIndex: this.options.zIndex,
    }
    const placeholderClassName = { 'vue-sticky-placeholder': true }
    const elClassName = {
      'vue-sticky-el': true,
      'top-sticky': false,
      'bottom-sticky': false,
    }

    if (this.state.isTopSticky) {
      elStyle.position = 'fixed'
      elStyle.top = `${this.options.topOffset}px`
      elStyle.left = `${this.state.xOffset}px`
      elStyle.width = `${this.state.width}px`
      const bottomLimit
        = this.state.containerElRect.bottom
          - this.state.height
          - this.options.bottomOffset
          - this.options.topOffset
      if (bottomLimit < 0) {
        elStyle.top = `${bottomLimit + this.options.topOffset}px`
      }
      placeholderStyle.paddingTop = `${this.state.height}px`
      elClassName['top-sticky'] = true
    }
    else if (this.state.isBottomSticky) {
      elStyle.position = 'fixed'
      elStyle.bottom = `${this.options.bottomOffset}px`
      elStyle.left = `${this.state.xOffset}px`
      elStyle.width = `${this.state.width}px`
      const topLimit
        = window.innerHeight
          - this.state.containerElRect.top
          - this.state.height
          - this.options.bottomOffset
          - this.options.topOffset
      if (topLimit < 0) {
        elStyle.bottom = `${topLimit + this.options.bottomOffset}px`
      }
      placeholderStyle.paddingTop = `${this.state.height}px`
      elClassName['bottom-sticky'] = true
    }
    else {
      placeholderStyle.paddingTop = 0
    }

    batchStyle(this.el, elStyle, elClassName)
    batchStyle(this.placeholderEl, placeholderStyle, placeholderClassName)

    this.fireEvents()
  }

  resetElement() {
    ['position', 'top', 'bottom', 'left', 'width', 'zIndex'].forEach((attr) => {
      this.el.style.removeProperty(attr)
    })
    this.el.classList.remove('bottom-sticky', 'top-sticky')
    const { parentNode } = this.placeholderEl
    if (parentNode) {
      parentNode.removeChild(this.placeholderEl)
    }
  }

  getContainerEl(): HTMLElement {
    let node = this.el.parentNode as HTMLElement
    while (
      node
      && node.tagName !== 'HTML'
      && node.tagName !== 'BODY'
      && node.nodeType === 1
    ) {
      if (node.hasAttribute('data-sticky-container')) {
        return node as HTMLElement
      }
      node = node.parentNode as HTMLElement
    }
    return this.el.parentNode as HTMLElement
  }

  getElRect() {
    return this.el.getBoundingClientRect()
  }

  getPlaceholderElRect() {
    return this.placeholderEl.getBoundingClientRect()
  }

  getContainerElRect() {
    return this.containerEl.getBoundingClientRect()
  }
}

export interface StickyState {
  top: boolean
  bottom: boolean
  sticked: boolean
}

export interface StickyOptions {
  enabled?: boolean
  topOffset?: number
  bottomOffset?: number
  side?: 'top' | 'bottom' | 'both'
  zIndex?: number
  onStick?: (state: StickyState) => void
}

const weakMap = new WeakMap<HTMLElement, Sticky>()

export function getStickyInstance(el: HTMLElement) {
  return weakMap.get(el)
}

export function setStickyInstance(el: HTMLElement, sticky: Sticky) {
  weakMap.set(el, sticky)
}

export function mergeOptions(options?: StickyOptions) {
  return defu<StickyOptions, StickyOptions[]>(options, {
    bottomOffset: 0,
    enabled: true,
    side: 'top',
    topOffset: 0,
    zIndex: 10,
  })
}

export const vSticky: ObjectDirective<HTMLElement, StickyOptions | undefined> = {
  inserted(el, bind) {
    const sticky = new Sticky(el, mergeOptions(bind.value))
    sticky.doBind()
    setStickyInstance(el, sticky)
  },
  unbind(el) {
    const sticky = getStickyInstance(el)
    if (sticky) {
      sticky.doUnbind()
      weakMap.delete(el)
    }
  },
  componentUpdated(el, bind) {
    let sticky = getStickyInstance(el)
    const options = mergeOptions(bind.value)
    if (options.enabled) {
      if (!sticky) {
        sticky = new Sticky(el, options)
        setStickyInstance(el, sticky)
      }
      sticky.doBind()
    }
    else {
      if (sticky) {
        sticky.doUnbind()
      }
    }
  },
}

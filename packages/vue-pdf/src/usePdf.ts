// import * as _pdfjs from 'pdfjs-dist'
import { computed, nextTick, readonly, ref, shallowRef, watch } from 'vue'
import type { PDFDocumentLoadingTask } from 'pdfjs-dist'
import type {
  PDFDocumentProxy,
  PDFPageProxy,
  DocumentInitParameters,
  PDFOperatorList
} from 'pdfjs-dist/types/src/display/api'
import type { PageViewport } from 'pdfjs-dist/types/src/display/display_utils'
import type { PDFHookOptions, PDFHookReturn } from './type'
const _pdfjs = require('pdfjs-dist/webpack')

function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}

type SVGGfx = {
  getSVG: (
    operatorList: PDFOperatorList,
    viewport: PageViewport
  ) => Promise<HTMLElement>
}

export const usePdf = (options: PDFHookOptions): PDFHookReturn => {
  const {
    onDocumentLoadSuccess,
    onDocumentLoadFail,
    onPageLoadSuccess,
    onPageLoadFail,
    onPageRenderSuccess,
    onPageRenderFail,
    onPassword,
    file,
    config,
    renderType = 'canvas',
    element
  } = options

  const pdfPageCache = new Map<number, PDFPageProxy>()
  const pdfDocument = shallowRef<PDFDocumentProxy>()
  const pdfPage = shallowRef<PDFPageProxy>()

  const page = ref(0)
  const scale = ref(1)
  const _rotate = ref(0)
  const rotate = computed({
    get: () => _rotate.value,
    set: (val) => {
      _rotate.value = val % 360
    }
  })

  const viewport = computed(() => {
    const page = pdfPage.value ?? { rotate: 0 }
    const rotation =
      _rotate.value === 0 ? page.rotate : page.rotate + _rotate.value

    return (
      pdfPage.value?.getViewport({
        scale: scale.value,
        rotation
      }) ?? {
        width: 0,
        height: 0,
        rotation: 0
      }
    )
  })

  const defaultViewport = computed(
    () => pdfPage.value?.getViewport({ scale: 1.0 }) ?? { height: 0, width: 0 }
  )

  // const workerSrc =
  //   options.workerSrc ??
  //   `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${_pdfjs.version}/pdf.worker.js`

  // _pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

  watch(
    file,
    (_file, _oldFile) => {
      if (!_file || _oldFile === _file) return

      const _config: DocumentInitParameters = {
        url: _file
      }
      Object.assign(_config, config)
      const documentLoadingTask = _pdfjs.getDocument(
        _config
      ) as PDFDocumentLoadingTask

      documentLoadingTask.onPassword = (
        updatePassword: (password: string) => void,
        reason: number
      ) => {
        switch (reason) {
          case _pdfjs.PasswordResponses.NEED_PASSWORD:
            isFunction(onPassword) &&
              onPassword(updatePassword, 'NEED_PASSWORD')
            break
          case _pdfjs.PasswordResponses.INCORRECT_PASSWORD:
            isFunction(onPassword) &&
              onPassword(updatePassword, 'INCORRECT_PASSWORD')
            break
        }
      }

      documentLoadingTask.promise
        .then((loadedPdfDocument) => {
          pdfDocument.value = loadedPdfDocument
          isFunction(onDocumentLoadSuccess) &&
            onDocumentLoadSuccess(loadedPdfDocument)
        })
        .catch((err) => {
          isFunction(onDocumentLoadFail) && onDocumentLoadFail(err)
        })
    },
    { immediate: true }
  )

  const canvasAttributes = computed(() => {
    const [pixelWidth, pixelHeight] = [
      viewport.value.width,
      viewport.value.height
    ].map((dim) => Math.ceil(dim / 1))
    return {
      width: viewport.value.width,
      height: viewport.value.height,
      class: 'pdf-page',
      style: `width: ${pixelWidth}px; height: ${pixelHeight}px;`
    }
  })

  const renderCanvas = (element: HTMLElement, PDFPage: PDFPageProxy) => {
    const canvasContext = (element as HTMLCanvasElement).getContext('2d')
    if (canvasContext) {
      PDFPage.render({
        canvasContext,
        viewport: viewport.value as PageViewport
      })
    }
  }

  const renderSVG = async (element: HTMLElement, PDFPage: PDFPageProxy) => {
    const operatorList = await PDFPage.getOperatorList()
    const svgGfx: SVGGfx = new _pdfjs.SVGGraphics(
      PDFPage.commonObjs,
      PDFPage.objs
    )
    const svgElement = await svgGfx.getSVG(
      operatorList,
      viewport.value as PageViewport
    )

    element.firstElementChild && element.removeChild(element.firstElementChild)
    element.appendChild(svgElement)
  }

  watch([page, rotate, scale], async ([_page]) => {
    if (_page === 0) {
      element.value?.firstElementChild &&
        element.value.removeChild(element.value.firstElementChild)
      return
    }

    const drawPdfPage = async (_PDFPage: PDFPageProxy) => {
      try {
        if (element.value) {
          if (renderType === 'canvas') renderCanvas(element.value, _PDFPage)
          else await renderSVG(element.value, _PDFPage)
        } else {
          throw new Error('element value on render is undefined')
        }
      } catch (err) {
        return isFunction(onPageRenderFail) && onPageRenderFail(err as Error)
      }

      return isFunction(onPageRenderSuccess) && onPageRenderSuccess(_PDFPage)
    }

    if (!pdfDocument.value) return

    if (pdfPageCache.has(_page)) {
      pdfPage.value = pdfPageCache.get(_page)
    } else {
      try {
        pdfPage.value = await pdfDocument.value.getPage(_page)
        pdfPageCache.set(_page, pdfPage.value)
        isFunction(onPageLoadSuccess) && onPageLoadSuccess(pdfPage.value)
      } catch (err) {
        isFunction(onPageLoadFail) && onPageLoadFail(err as Error)
      }
    }

    if (pdfPage.value) drawPdfPage(pdfPage.value)
  })

  watch(pdfDocument, () => {
    page.value = 0
    pdfPageCache.clear()
    nextTick(() => (page.value = 1))
  })

  const rotateCW = () => {
    rotate.value += 90
  }
  const rotateCCW = () => {
    rotate.value += 270
  }
  const scaleIn = () => {
    scale.value += 0.15
  }
  const scaleOut = () => {
    scale.value -= 0.15
  }
  const fitWidth = () => {
    if (!pdfPage.value || !element.value || !element.value.parentElement) return
    const wantedHeight = element.value.parentElement.clientWidth
    const currentHeight =
      _rotate.value === 0 || _rotate.value === 180
        ? defaultViewport.value.width
        : defaultViewport.value.height
    const height = wantedHeight / currentHeight
    scale.value = height
  }
  const fitAuto = () => {
    if (!pdfPage.value || !element.value || !element.value.parentElement) return
    const wantedHeight = element.value.parentElement.clientHeight

    const currentHeight =
      _rotate.value === 0 || _rotate.value === 180
        ? defaultViewport.value.height
        : defaultViewport.value.width

    const height = wantedHeight / currentHeight
    scale.value = height
  }
  const nextPage = () => {
    if (page.value === pdfDocument.value?.numPages) return
    setPage(page.value + 1)
  }
  const prevPage = () => {
    if (page.value === 1) return
    setPage(page.value - 1)
  }
  const setPage = (_page: number) => {
    if (!pdfDocument.value) return
    if (_page > pdfDocument.value.numPages) return
    page.value = _page
  }

  return {
    pdfDocument: readonly(pdfDocument),
    pdfPage: readonly(pdfPage),
    viewport,

    page: readonly(page),
    rotate: readonly(rotate),
    scale: readonly(scale),
    canvasAttributes,

    rotateCW,
    rotateCCW,
    scaleIn,
    scaleOut,
    fitAuto,
    fitWidth,
    nextPage,
    prevPage,
    setPage
  }
}

import { defineComponent, ref, h } from 'vue'
import pdfjsLib from 'pdfjs-dist'
// eslint-disable-next-line import/no-webpack-loader-syntax
// require('file-loader?esModule=false!pdfjs-dist/build/pdf.worker.entry')

export default defineComponent({
  name: 'VuePdfViewer',
  props: {
    pdfPath: {
      type: String
    }
  },
  setup (props, { expose, emit, slots }) {
    const canvasRef = ref<HTMLCanvasElement>()
    // pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.bundle.js'
    if (props.pdfPath) {
      const loadingTask = pdfjsLib.getDocument(props.pdfPath)
      loadingTask.promise
        .then((pdfDocument) => {
          // Request a first page
          return pdfDocument.getPage(1).then((pdfPage) => {
            // Display page on the existing canvas with 100% scale.
            const viewport = pdfPage.getViewport({ scale: 1.0 })
            const canvas = canvasRef.value!
            canvas.width = viewport.width
            canvas.height = viewport.height
            const ctx = canvas.getContext('2d')
            const renderTask = pdfPage.render({
              canvasContext: ctx as Object,
              viewport
            })
            return renderTask.promise
          })
        })
        .catch((reason) => {
          console.error('Error: ' + reason)
        })
    }

    return () => {
      return h('canvas', {
        ref: canvasRef
      })
    }
  }
})

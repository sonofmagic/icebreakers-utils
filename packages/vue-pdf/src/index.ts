import { defineComponent, ref, h, onMounted } from 'vue'
/** @type {import('pdfjs-dist/types/src/pdf')} */
const pdfjsLib = require('pdfjs-dist/webpack')

export default defineComponent({
  name: 'VuePdf',
  props: {
    src: {
      type: String
    }
  },
  setup (props, { expose, emit, slots }) {
    const canvasRef = ref<HTMLCanvasElement>()

    onMounted(() => {
      if (props.src) {
        const loadingTask = pdfjsLib.getDocument(props.src)
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
    })

    return () => {
      return h('canvas', {
        ref: canvasRef
      })
    }
  }
})

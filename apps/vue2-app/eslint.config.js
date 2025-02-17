import { icebreaker } from '@icebreakers/eslint-config'

export default icebreaker({
  vue: {
    sfcBlocks: {
      blocks: {
        styles: false,
      },
    },
    vueVersion: 2,
  },
})

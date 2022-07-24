<template>
  <el-table-column v-bind="$attrs">
    <template #header="{ column, $index }">
      <template v-if="typeof renderHeader === 'function'">
        <vnodes :vnodes="renderHeader(column, $index)" />
      </template>
      <template v-else>{{ renderHeader }}</template>
    </template>
    <template v-if="renderChildrenFlag">
      <ProColumn v-bind="child" :key="idx" v-for="(child, idx) in children"></ProColumn>
    </template>
  </el-table-column>
</template>

<script>
import { defineComponent } from 'vue'

// import { isVNode } from './utils'
export default defineComponent({
  name: 'ProColumn',
  components: {
    Vnodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
  },
  props: {
    children: {
      type: [Array],
      default: () => []
    },
    render: {
      type: [Function]
    },
    label: {
      type: [String, Object, Function]
    }
  },
  data () {
    return {

    }
  },
  computed: {
    renderChildrenFlag () {
      return Array.isArray(this.children) && this.children.length > 0
    },
    renderHeader () {
      if (typeof this.label === 'string') {
        return this.label
      } else if (typeof this.label === 'function') {
        return (column, index, vm) => this.label(column, index, vm)
      }
      return () => this.label
    }
  },
  methods: {

  }

})
</script>

<style scoped>
</style>

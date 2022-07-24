<template>
  <el-table-column v-if="renderTimes < 3" v-bind="$attrs">
    <template #header="{ column, $index }">
      <template v-if="typeof label === 'function'">
        <VNodes :vnodes="label(column, $index)" />
      </template>
      <template v-else>{{ label }}</template>
    </template>

    <!-- <template #default="{ row, column, $index }"> -->
    <!-- <slot> -->
    <template v-if="renderChildrenFlag">
      <ProColumn :renderTimes="renderTimes + 1" v-bind="child" :key="idx" v-for="(child, idx) in children">
      </ProColumn>
    </template>
    <template v-else-if="typeof render === 'function'">
      <VNodes :vnodes="render()" />
    </template>
    <!-- </slot> -->
    <!-- </template> -->
    <!-- <template v-else v-slot="{ row, column, $index }">
      <slot :row="row" :column="column" :index="$index"></slot>
    </template> -->

  </el-table-column>
</template>

<script>
// v-bind="child"
//  #default="{ row, column, $index }"
// import ProColumnItem from './Column'
import { defineComponent } from 'vue'
import { isVNode, VNodes } from './utils'
export default defineComponent({
  name: 'ProColumn',
  components: {
    VNodes

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
      type: [String, Function]
    },
    renderTimes: {
      type: [Number],
      default: 0
    }
  },
  data () {
    return {

    }
  },
  computed: {
    renderChildrenFlag () {
      return Array.isArray(this.children) && this.children.length > 0
    }
  },
  methods: {
    isVNode
  }

})
</script>

<style scoped>
</style>

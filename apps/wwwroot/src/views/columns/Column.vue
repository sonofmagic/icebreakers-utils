<template>
  <el-table-column v-bind="$attrs">
    <template #header="{ column, $index }">
      <template v-if="typeof label === 'function'">
        <VNodes :vnodes="label(column, $index)" />
      </template>
      <template v-else>{{ label }}</template>
    </template>
    <template v-if="renderChildrenFlag" #default>
      <ProColumn v-bind="child" :key="idx" v-for="(child, idx) in children">
      </ProColumn>
    </template>
    <template v-else-if="typeof render === 'function'" #default="{row, column, $index }">
      <VNodes :vnodes="render(row, column, $index)" />
    </template>
  </el-table-column>
</template>

<script lang="ts">
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
  },
  mounted () {
    console.log(this)
  }

})
</script>

<style scoped>
</style>

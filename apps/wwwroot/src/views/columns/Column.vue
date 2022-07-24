<template>
  <el-table-column v-bind="$attrs">
    <template v-if="renderChildrenFlag">
      <ProColumn v-bind="child" :key="idx" v-for="(child ,idx) in children"></ProColumn>
    </template>
  </el-table-column>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProColumn',
  props: {
    children: {
      type: [Array],
      default: () => []
    }
  },
  computed: {
    renderChildrenFlag () {
      return Array.isArray(this.children) && this.children.length > 0
    }
  },
  methods: {

  }
})
</script>

<style scoped>
</style>

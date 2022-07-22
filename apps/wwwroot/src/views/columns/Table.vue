<template>
  <el-table>
    <template #empty>
      <slot name="empty"></slot>
    </template>
    <template #append>
      <slot name="append"></slot>
    </template>
    <template>
      <slot></slot>
    </template>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProTable',
  props: {
    data: {
      type: [Array],
      default: () => []
    },
    columns: {
      type: [Array],
      default: () => []
    }
  }
})
</script>

<style scoped>
</style>

<template>
  <el-table :data="data">
    <template #empty>
      <slot name="empty"></slot>
    </template>
    <template #append>
      <slot name="append"></slot>
    </template>
    <template>
      <slot>
        <ProColumn :key="idx" v-bind="col" v-for="(col, idx) in columns">
          <template #header>
            <slot name="header" :column="col" :index="idx"></slot>
          </template>
        </ProColumn>
      </slot>
    </template>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProColumn from './Column.vue'
export default defineComponent({
  name: 'ProTable',
  components: {
    ProColumn
  },
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

<style scoped></style>

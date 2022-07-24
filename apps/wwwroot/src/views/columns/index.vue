<template>
  <div>
    <ProTable :data="data" :columns="columns"></ProTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProTable from './Table.vue'
import { tableData } from './demo'
export default defineComponent({
  name: 'ColumnsIndex',
  components: {
    ProTable
  },
  data () {
    return {
      data: tableData,
      columns: [
        {
          prop: 'date',
          label: '日期',
          width: 150
        },
        {
          label: '配送信息',
          children: [
            {
              prop: 'name',
              label: '姓名',
              width: 120
            },
            {
              label: '地址',
              children: [
                {
                  prop: 'province',
                  label: '省份',
                  width: 120
                },
                {
                  prop: 'city',
                  label: '市区',
                  width: 120
                },
                {
                  prop: 'address',
                  label: '地址',
                  width: 300
                },
                {
                  prop: 'zip',
                  label: '邮编',
                  width: 120
                }
              ]
            }
          ]
        }
      ]
    }
  }
})

</script>

<style scoped>
</style>

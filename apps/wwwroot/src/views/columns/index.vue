<template>
  <div>
    <ProTable :data="data" :columns="columns"></ProTable>
    <el-color-picker v-model="headerColor"></el-color-picker>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ProTable from './Table.vue'
import { tableData } from './demo'

export default defineComponent({
  name: 'ColumnsIndex',
  components: {
    ProTable
  },
  // watch: {
  //   headerColor () {
  //     this.vm && this.vm._update()
  //   }
  // },
  data () {
    // leafColumnsLength
    // columns

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const vm = this
    const h = vm.$createElement
    return {
      data: tableData,
      headerColor: null,
      columns: [
        {
          prop: 'date',
          // label: () => {
          //   // @ts-ignore
          //   const headerColor = this.headerColor
          //   console.log('render headerColor')
          //   return h('div', {
          //     style: {
          //       color: headerColor
          //     }
          //   }, ['日期'])
          // },
          label: '日期',
          width: 150
          // render: (text, record, index) => {
          //   return h('a', undefined, ['2020-01-01'])
          // }
          // render: (text, record, index) => {
          //   return <div>{ text } </div>
          // }
        },
        {
          label: '配送信息',
          children: [
            {
              prop: 'name',
              // label: () => vm.$createElement('div', {
              //   style: {
              //     color: vm.headerColor
              //   }
              // }, ['姓名']),
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

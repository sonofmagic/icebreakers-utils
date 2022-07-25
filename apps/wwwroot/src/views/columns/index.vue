<template>
  <div>
    <ProTable :data="data" :columns="columns">
      <!-- <el-table-column prop="date" label="日期" width="150">
      </el-table-column>
      <el-table-column label="配送信息">
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column label="地址1">
          <template #default>
            <el-table-column prop="province" label="省份" width="120">
            </el-table-column>
            <el-table-column prop="city" label="市区" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="300">
            </el-table-column>
            <el-table-column prop="zip" label="邮编" width="120">
            </el-table-column>
          </template>

        </el-table-column>
      </el-table-column> -->
    </ProTable>
    <!-- <el-table :data="data">
      <el-table-column prop="date" label="日期" width="150">
      </el-table-column>
      <el-table-column label="配送信息">
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column label="地址1">
          <template #default>
            <el-table-column prop="province" label="省份" width="120">
            </el-table-column>
            <el-table-column prop="city" label="市区" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="300">
            </el-table-column>
            <el-table-column prop="zip" label="邮编" width="120">
            </el-table-column>
          </template>

        </el-table-column>
      </el-table-column>
    </el-table> -->
    <el-color-picker @active-change="onActiveChange" v-model="headerColor"></el-color-picker>
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

    return {
      data: tableData,
      headerColor: null,
      columns: [
        {
          prop: 'date',
          label: () => {
            return <div style={{
              color: this.headerColor
            }}>日期</div>
          },
          // label: '日期',
          width: 150,
          render: (row, col, index) => {
            return <div style={{
              color: this.headerColor
            }}>{row.date} + {index}</div>
          }
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
  },
  methods: {
    onActiveChange (val) {
      this.headerColor = val
    }
  }
})

</script>

<style scoped>
</style>

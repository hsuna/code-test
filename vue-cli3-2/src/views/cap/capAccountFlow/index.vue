<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" style="margin-left: 50px;" title="账户流水" width="1040px">
    <div class="app-container">
      <!--表格渲染-->
      <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
        <el-table-column prop="inOutName" label="收支类型"/>
        <el-table-column prop="ioTypeName" label="交易类型"/>
        <el-table-column prop="transAmount" label="发生金额（元）"/>
        <el-table-column prop="flowTime" label="交易时间"/>
        <el-table-column prop="bakTotleAmount" label="交易前（元）"/>
        <el-table-column prop="newTotleAmount" label="交易后（元）"/>
        <el-table-column prop="statusName" label="状态"/>
      </el-table>
      <!--分页组件-->
      <el-pagination
        :total="total"
        style="margin-top: 8px;"
        layout="total, prev, pager, next, sizes"
        @size-change="sizeChange"
        @current-change="pageChange"/>
    </div>
  </el-dialog>
</template>

<script>
  import initData from '@/mixins/initData'
  import {parseTime} from '@/utils/index'
  import {doGet} from '@/utils/request'

  export default {
    components: {},
    mixins: [initData],
    data() {
      return {
        delLoading: false, sup_this: this, dialog: false, accountId: ''
      }
    },
    created() {
      this.$nextTick(() => {
        this.init()
      })
    },
    methods: {
      parseTime,
      doInit() {
        this.$nextTick(() => {
          this.init()
        })
      },
      beforeInit() {
        this.url = 'cap/capAccountFlow/queryPage'
        this.params = {page: this.page, size: this.size, accountId: this.accountId}
        return true
      }
    }
  }
</script>
<style scoped>
</style>

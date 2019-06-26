<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" style="margin-left: 50px;" title="对账明细" width="1040px">
  <div class="app-container">
    <eHeader :query="query"/>
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
      <el-table-column prop="realName" label="客户姓名"/>
      <el-table-column prop="phone" label="客户电话"/>
      <el-table-column prop="totalInitAmount" label="初始总金额"/>
      <el-table-column prop="totalAddAmount" label="增加总金额"/>
      <el-table-column prop="totalLastAmount" label="最终总金额"/>
      <el-table-column prop="frozenInitAmount" label="初始冻结金额"/>
      <el-table-column prop="frozenAddAmount" label="新增冻结金额"/>
      <el-table-column prop="frozenLastAmount" label="最终冻结金额"/>
      <el-table-column prop="balanceInitAmount" label="初始可用余额"/>
      <el-table-column prop="balanceAddAmount" label="新增可用余额"/>
      <el-table-column prop="balanceLastAmount" label="最终可用余额"/>
      <el-table-column prop="initTime" label="初始时间"/>
      <el-table-column prop="lastTime" label="截止时间"/>
      <el-table-column prop="errorMsg" label="错误信息"/>
      <el-table-column prop="statusName" label="状态"/>
      <el-table-column prop="remark" label="备注"/>
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
  import eHeader from './module/header'
  import {doDictItem, doGet} from '@/utils/request'


  export default {
    components: {eHeader},
    mixins: [initData],
    data() {
      return {
        delLoading: false, sup_this: this, batchId: '',dialog:false
      }
    },
    created() {
      this.$nextTick(() => {
        this.init()
      })
    },
    methods: {
      doInit(){
        this.$nextTick(() => {
          this.init()
        })
      },
      parseTime,
      beforeInit() {
        this.url = 'cap/capReconciliaAccount/queryPage'
        this.query.batchId = this.batchId
        this.params = this.query
        this.params.page = this.page
        this.params.size = this.size
        return true
      }
    }
  }
</script>
<style scoped>
</style>

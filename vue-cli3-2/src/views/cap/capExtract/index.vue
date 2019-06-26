<template>
  <div class="app-container">
    <eHeader  :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
      <el-table-column prop="realName" label="客户姓名"/>
      <el-table-column prop="phone" label="电话"/>
      <el-table-column prop="extractAmount" label="提现金额(元)"/>
      <el-table-column prop="feeAmount" label="提现手续费(元)"/>
      <el-table-column prop="orderAmount" label="实际到账金额(元)"/>
      <el-table-column prop="statusName" label="状态"/>
      <el-table-column prop="applyTime" label="申请时间"/>
      <el-table-column prop="accountTime" label="到账时间"/>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>

<script>
import initData from '@/mixins/initData'
import eHeader from './module/header'
import { doGet } from '@/utils/request'

export default {
  components: { eHeader },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    beforeInit() {
      this.url = 'cap/capExtract/queryPage'
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
